import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, CardHeader, Spinner, Button } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { X, Plus } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import Select from "../../../../custom/select/select.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import {
  selectCurrentUserRole,
  selectSelectedClassStudents,
  selectLecturers,
  selectGetAllStudentsInClassErrorMessage,
  selectGetAllStudentsInClassIsLoading,
  selectAddLecturerAssisstantErrorMessage,
  selectAddLecturerAssisstantIsLoading,
  selectRemoveLecturerAssisstantErrorMessage,
  selectRemoveLecturerAssisstantIsLoading,
} from "../../../../redux/index.selectors"
import {
  addLecturerAssisstantAsync,
  removeLecturerAssisstantAsync,
  clearAddLecturerAssisstantErrorMessage,
  clearRemoveLecturerAssisstantErrorMessage,
} from "../../../../redux/index.actions"
import "./SubjectGeneralInformation.styles.scss"

const SubjectGeneralInformation = ({
  subject,
  lecturers,
  currentUserRole,
  selectedClassStudents,
  addLecturerAssisstant,
  removeLecturerAssisstant,
  clearAddLecturerAssisstantErrorMessage,
  clearRemoveLecturerAssisstantErrorMessage,
  getAllStudentsInClassErrorMessage,
  getAllStudentsInClassIsLoading,
  addLecturerAssisstantErrorMessage,
  addLecturerAssisstantIsLoading,
  removeLecturerAssisstantErrorMessage,
  removeLecturerAssisstantIsLoading,
}) => {
  const [selectedAssisstant, setSelectedAssisstant] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [toBeRemovedAssisstant, setToBeRemovedAssisstant] = useState("")

  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let lecturersArray = []
  if (lecturers)
    lecturers.map(lecturer => {
      let found = false
      subject.lecturerAssistant.map(assisstant => {
        if (assisstant.lecturerUuid === lecturer.uuid) found = true
      })
      if (!found && lecturer.uuid !== subject.lecturerUuid)
        lecturersArray.push({
          label: rtl ? lecturer.fullNameArabic : lecturer.fullName,
          value: lecturer.uuid,
        })
    })

  const subHeader = [
    {
      title: <FormattedMessage id="CODE" />,
      content: subject.subjectCode,
    },
    { title: <FormattedMessage id="INTAKE" />, content: subject.intakeCode },
    {
      title: <FormattedMessage id="STUDENTS" />,
      content: getAllStudentsInClassIsLoading ? (
        <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
      ) : getAllStudentsInClassErrorMessage ? (
        ""
      ) : selectedClassStudents ? (
        selectedClassStudents.length
      ) : (
        0
      ),
    },
  ]

  const removeLecturerAssisstantDialogAttributes = {
    button: {},
    dialog: {
      title: intl.formatMessage({ id: "REMOVING.ASSISSTANT.LECTURER" }),
      content: (
        <>
          <FormattedMessage id="ARE.YOU.SURE.YOU.WANT.TO" />{" "}
          <FormattedMessage id="REMOVE" />{" "}
          <b>
            {toBeRemovedAssisstant
              ? rtl
                ? toBeRemovedAssisstant.lecturerFullNameArabic
                : toBeRemovedAssisstant.lecturerFullName
              : ""}
          </b>{" "}
          <FormattedMessage id="FROM.BEING.ASSISSTANT.LECTURER" />{" "}
        </>
      ),
      actions: [
        {
          title: removeLecturerAssisstantIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "REMOVE" })
          ),
          color: "primary",
          clickHandler: () =>
            removeLecturerAssisstant(
              toBeRemovedAssisstant.lecturerUuid,
              subject,
              {
                success: {
                  title: intl.formatMessage({
                    id: "REMOVE.LECTURER.ASSISSTANT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "REMOVE.LECTURER.ASSISSTANT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: removeLecturerAssisstantIsLoading,
        },
      ],
    },
    externalOpenSource: isDialogOpen,
    setExternalOpenSource: setIsDialogOpen,
    errorMessage: removeLecturerAssisstantErrorMessage,
    isLoading: removeLecturerAssisstantIsLoading,
    closingAction: clearRemoveLecturerAssisstantErrorMessage,
  }

  const addLecturerAssisstantDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "btn-icon p-25 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "ADDING.ASSISSTANT.LECTURER" }),
      content: (
        <Select
          array={lecturersArray}
          handleChange={e => setSelectedAssisstant(e)}
          height={120}
          fixed={true}
          value={selectedAssisstant}
          label={intl.formatMessage({ id: "SELECT.LECTURER" })}
          stylesClassnames="marginBottom-130"
        />
      ),
      actions: [
        {
          title: addLecturerAssisstantIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "ADD" })
          ),
          color: "primary",
          clickHandler: () =>
            addLecturerAssisstant(selectedAssisstant.value, subject, {
              success: {
                title: intl.formatMessage({
                  id: "ADD.LECTURER.ASSISSTANT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "ADD.LECTURER.ASSISSTANT.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: addLecturerAssisstantIsLoading,
        },
      ],
    },
    errorMessage: addLecturerAssisstantErrorMessage,
    isLoading: addLecturerAssisstantIsLoading,
    closingAction: () => {
      clearAddLecturerAssisstantErrorMessage()
      setSelectedAssisstant("")
    },
  }

  return (
    <Card className="subject-card">
      <Dialog {...removeLecturerAssisstantDialogAttributes} />
      <CardHeader>
        <span className="subject-card-header">
          {rtl ? subject.subjectTitleArabic : subject.subjectTitle}
        </span>
      </CardHeader>
      <CardBody className="subject-card-sub-header">
        {subHeader.map(item => (
          <div className="subject-card-sub-header-block">
            <span className="mr-50 text-primary subject-card-sub-header-block-title">
              {item.title}
            </span>
            {item.content}
          </div>
        ))}
      </CardBody>
      <CardBody
        style={{
          justifyContent: "flex-start",
        }}
        className="subject-card-sub-header assisstants pt-0 "
      >
        <span className="mr-50 text-primary subject-card-sub-header-block-title assisstant">
          <FormattedMessage id="LECTURER" /> :
        </span>
        <h3>
          {rtl ? subject.lecturerFullNameArabic : subject.lecturerFullName}
        </h3>
      </CardBody>
      <CardBody className="subject-card-sub-header assisstants pt-0">
        <span className="mr-50 text-primary subject-card-sub-header-block-title assisstant">
          {currentUserRole === "lecturer" ? (
            <></>
          ) : (
            ability.can("manage", "add_lecturer_assistant-PUT") && (
              <Dialog {...addLecturerAssisstantDialogAttributes} />
            )
          )}
          <FormattedMessage id="ASSISSTANT.LECTURERS" /> :
        </span>
        <div className="subject-card-sub-header-block-content">
          {subject.lecturerAssistant.map(assisstant => (
            <div className="subject-card-sub-header-block-content-assisstant">
              {rtl
                ? assisstant.lecturerFullNameArabic
                : assisstant.lecturerFullName}
              {currentUserRole === "lecturer" ? (
                <></>
              ) : (
                ability.can("manage", "remove_lecturer_assistant-PUT") && (
                  <X
                    className="subject-card-sub-header-block-content-assisstant-button"
                    onClick={() => {
                      setToBeRemovedAssisstant(assisstant)
                      setIsDialogOpen(true)
                    }}
                    size={15}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
  selectedClassStudents: selectSelectedClassStudents,
  lecturers: selectLecturers,
  getAllStudentsInClassErrorMessage: selectGetAllStudentsInClassErrorMessage,
  getAllStudentsInClassIsLoading: selectGetAllStudentsInClassIsLoading,
  addLecturerAssisstantErrorMessage: selectAddLecturerAssisstantErrorMessage,
  addLecturerAssisstantIsLoading: selectAddLecturerAssisstantIsLoading,
  removeLecturerAssisstantErrorMessage: selectRemoveLecturerAssisstantErrorMessage,
  removeLecturerAssisstantIsLoading: selectRemoveLecturerAssisstantIsLoading,
})

const mapDispatchToProps = dispatch => ({
  addLecturerAssisstant: (lecturerUuid, subject, messages) =>
    dispatch(addLecturerAssisstantAsync(lecturerUuid, subject, messages)),
  removeLecturerAssisstant: (lecturerUuid, subject, messages) =>
    dispatch(removeLecturerAssisstantAsync(lecturerUuid, subject, messages)),
  clearAddLecturerAssisstantErrorMessage: () =>
    dispatch(clearAddLecturerAssisstantErrorMessage()),
  clearRemoveLecturerAssisstantErrorMessage: () =>
    dispatch(clearRemoveLecturerAssisstantErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectGeneralInformation)
