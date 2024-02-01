import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { createStructuredSelector } from "reselect"
import { Row, Col, ButtonGroup, Button, Spinner } from "reactstrap"
import { PushNotificationPreview } from "push-notification-preview"
import withStyles from "@material-ui/core/styles/withStyles"
import { Divider } from "@material-ui/core"
import Post from "../../../../../../custom/post/Post.component"
import timeConverter from "../../../../../../utility/custom/time12Hour"
import { dateAndTimeFormatter } from "../../../../../../utility/custom/dateAndTimeFormatter"
import { useRTL } from "../../../../../../utility/hooks/useRTL"
import {
  sendNotificationAsync,
  createAnnouncementAsync,
} from "../../../../../../redux/index.actions"
import {
  selectSendNotificationIsLoading,
  selectCreateAnnouncementIsLoading,
  selectCurrentUserFullName,
  selectCurrentUserFullNameArabic,
} from "../../../../../../redux/index.selectors"
import "./Preview.styles.scss"

const Preview = ({
  sendNotification,
  createAnnouncement,
  currentUserFullName,
  currentUserFullNameArabic,
  sendNotificationIsLoading,
  createAnnouncementIsLoading,
  selectedCategory,
  selectedTargets,
  selectedIntakes,
  selectedSubject,
  slides,
  selectedUser,
  notificationTitle,
  notificationContent,
  setDisabledPrev,
  resetState,
  contactType,
  announcementType,
  studentsGroup,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState("apple")

  const intl = useIntl()
  const [rtl] = useRTL()

  useEffect(() => {
    sendNotificationIsLoading || createAnnouncementIsLoading
      ? setDisabledPrev(true)
      : setDisabledPrev(false)
  }, [sendNotificationIsLoading, createAnnouncementIsLoading])

  const platformButtons = [
    {
      title: "Android",
      value: "android",
    },
    {
      title: "IOS",
      value: "apple",
    },
  ]

  const targets = {
    lecturer: intl.formatMessage({ id: "LECTURERS" }),
    student: intl.formatMessage({ id: "ALL.STUDENTS" }),
    guardian: intl.formatMessage({ id: "GUARDIANS" }),
  }

  const toContent = {
    [intl.formatMessage({ id: "EVERYONE" })]: intl.formatMessage({
      id: "EVERYONE",
    }),
    [intl.formatMessage({ id: "TARGETS" })]: (
      <>
        {targets[selectedTargets[0]] ===
          intl.formatMessage({ id: "ALL.STUDENTS" }) && studentsGroup.intake
          ? selectedIntakes.map((intake, index) => (
              <span>
                {intake}
                {index !== selectedIntakes.length - 1 ? ", " : ""}
              </span>
            ))
          : selectedSubject
          ? selectedSubject.title
          : targets[selectedTargets[0]]}
      </>
    ),
    [intl.formatMessage({ id: "USER" })]: selectedUser
      ? selectedUser.label
      : "",
  }

  const styles = {
    root: {
      position: "absolute",
      width: "85%",
      minWidth: "0",
    },
  }

  const sendingTypeWithRequestBody = {
    [intl.formatMessage({ id: "EVERYONE" })]: requestBody => requestBody,
    [intl.formatMessage({ id: "TARGETS" })]: requestBody => {
      if (studentsGroup.intake)
        return {
          ...requestBody,
          targetUsers: "intake",
          intakeCode: selectedIntakes,
        }
      else if (studentsGroup.subject)
        return {
          ...requestBody,
          targetUsers: "class",
          lecturerSubjectUuid: selectedSubject.value,
        }
      else
        return {
          ...requestBody,
          targetUsers: selectedTargets[0],
        }
    },
    [intl.formatMessage({ id: "USER" })]: requestBody => ({
      ...requestBody,
      uuid: selectedUser.value,
    }),
  }

  const StyledPushNotificationPreview = withStyles(styles)(
    PushNotificationPreview
  )

  return (
    <Row>
      <Col ms={7}>
        {contactType.value === "notification" ? (
          <>
            <ButtonGroup className="mb-1 w-100">
              {platformButtons.map((button, index) => (
                <Button
                  key={index}
                  className="mb-1"
                  color="primary"
                  outline={button.value === selectedPlatform ? false : true}
                  onClick={() => setSelectedPlatform(button.value)}
                >
                  {button.title}
                </Button>
              ))}
            </ButtonGroup>
            <div
              className={`mobile${
                selectedPlatform === "apple" ? "-apple" : "-android"
              }`}
            >
              <StyledPushNotificationPreview
                platform={selectedPlatform}
                title={notificationTitle.text}
                message={notificationContent.text}
                appName={intl.formatMessage({ id: "BERENICE" })}
                time={timeConverter(new Date())}
              />
            </div>
          </>
        ) : (
          <Post
            writer={rtl ? currentUserFullNameArabic : currentUserFullName}
            date={dateAndTimeFormatter(new Date())}
            important={announcementType.value === "important"}
            title={notificationTitle.text}
            content={notificationContent.text}
          />
        )}
      </Col>
      <Col md={5}>
        <div className="preview-slide">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4 className="text-primary">
              <FormattedMessage id="CONTACT.TYPE" /> :{" "}
            </h4>
            <h4 className="ml-25 preview-slide-content">{contactType.label}</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4 className="text-primary">
              <FormattedMessage id="TO" />
            </h4>
            <h4 className="ml-25 preview-slide-content">
              {" "}
              {toContent[slides[selectedCategory].name]}
            </h4>
          </div>
          <Divider variant="middle" className="mt-25" />
          <h4 className="text-primary preview-header mb-75">
            <FormattedMessage id="TITLE" />
          </h4>
          <span className="preview-slide-content mb-75">
            {notificationTitle.text}
          </span>
          <h4 className="text-primary preview-header mb-75">
            <FormattedMessage id="CONTENT" />
          </h4>
          <span className="preview-slide-content">
            {notificationContent.text}
          </span>
          <Divider variant="middle" />
          <Button
            disabled={sendNotificationIsLoading || createAnnouncementIsLoading}
            color="primary"
            block
            className="mb-50"
            onClick={() => {
              let requestBody = {
                title: notificationTitle.text,
                description: notificationContent.text,
              }
              requestBody = sendingTypeWithRequestBody[
                slides[selectedCategory].name
              ](requestBody)
              if (contactType.value === "notification")
                sendNotification(
                  requestBody,
                  slides[selectedCategory].name,
                  resetState,
                  intl
                )
              else {
                if (
                  slides[selectedCategory].name ===
                  intl.formatMessage({ id: "EVERYONE" })
                )
                  requestBody = { ...requestBody, targetUsers: "all" }
                createAnnouncement(
                  { ...requestBody, type: announcementType.value },
                  () =>
                    studentsGroup.intake ||
                    studentsGroup.subject ||
                    studentsGroup.all
                      ? sendNotification(
                          requestBody,
                          slides[selectedCategory].name,
                          resetState,
                          intl
                        )
                      : slides[selectedCategory].name ===
                        intl.formatMessage({ id: "EVERYONE" })
                      ? sendNotification(
                          {
                            title: requestBody.title,
                            description: requestBody.description,
                          },
                          slides[selectedCategory].name,
                          resetState,
                          intl
                        )
                      : resetState(),
                  {
                    success: {
                      title: intl.formatMessage({
                        id: "CREATE.ANNOUNCEMENT.SUCCESS.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "CREATE.ANNOUNCEMENT.SUCCESS.CONTENT",
                      }),
                    },
                    error: {
                      title: intl.formatMessage({
                        id: "CREATE.ANNOUNCEMENT.ERROR.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "CREATE.ANNOUNCEMENT.ERROR.CONTENT",
                      }),
                    },
                  }
                )
              }
            }}
          >
            {sendNotificationIsLoading || createAnnouncementIsLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                aria-hidden="true"
              />
            ) : contactType.value === "notification" ? (
              <FormattedMessage id="SEND.NOTIFICATION.VERB" />
            ) : (
              <FormattedMessage id="POST.ANNOUNCEMENT" />
            )}
          </Button>
        </div>
      </Col>
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  sendNotificationIsLoading: selectSendNotificationIsLoading,
  createAnnouncementIsLoading: selectCreateAnnouncementIsLoading,
  currentUserFullName: selectCurrentUserFullName,
  currentUserFullNameArabic: selectCurrentUserFullNameArabic,
})

const mapDispatchToProps = dispatch => ({
  sendNotification: (requestBody, sendingType, func, intl) =>
    dispatch(sendNotificationAsync(requestBody, sendingType, func, intl)),
  createAnnouncement: (requestBody, func, messages) =>
    dispatch(createAnnouncementAsync(requestBody, false, func, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
