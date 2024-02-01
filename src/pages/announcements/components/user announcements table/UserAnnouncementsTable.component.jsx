import React, { useState } from "react"
import { connect } from "react-redux"
import { Card, CardBody, Button, Row, Col } from "reactstrap"
import { createStructuredSelector } from "reselect"
import { RefreshCw, Plus, Edit3, AlignCenter, FileText } from "react-feather"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useIntl } from "react-intl"
import { useRTL } from "../../../../utility/hooks/useRTL"
import UserAnnouncementsTableRow from "./UserAnnouncementsTableRow.component"
import Table from "../../../../custom/table/table.component"
import Select from "../../../../custom/select/select.component"
import CustomForm from "../../../../custom/customform/customform.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import { dateFiltering } from "../../../../utility/custom/dateFiltering"
import { announcementTypesArrayWithTitle } from "../../../../utility/custom/announcementTypesArray"
import {
  getAnnouncementsOfSingalUserAsync,
  createAnnouncementAsync,
  sendNotificationAsync,
  clearCreateAnnouncementErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSelectedUserAnnouncements,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
  selectCreateAnnouncementErrorMessage,
  selectCreateAnnouncementIsLoading,
  selectCurrentUserRole,
  selectSelectedUserRole,
  selectCurrentLecturerOngoingSubjects,
} from "../../../../redux/index.selectors"

const UserAnnouncementsTable = ({
  userUuid,
  announcements,
  getUserAnnouncements,
  createAnnouncement,
  sendNotification,
  clearCreateAnnouncementErrorMessage,
  createAnnouncementErrorMessage,
  createAnnouncementIsLoading,
  currentUserRole,
  selectedUserRole,
  selectedUserFullName,
  selectedUserFullNameArabic,
  currentLecturerOngoingSubjects,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState("")
  const [selectedRange, setSelectedRange] = useState("")
  const [targetStudents, setTargetStudents] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()

  const createAnnouncementValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    type: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createAnnouncementFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "normal",
    },
    enableReinitialize: true,
    validationSchema: createAnnouncementValidationSchema,
    onSubmit: values =>
      createAnnouncement(
        {
          ...values,
          targetUsers: "class",
          lecturerSubjectUuid: targetStudents.value,
        },
        userUuid,
        () =>
          sendNotification(
            {
              title: values.title,
              description: values.description,
              targetUsers: "class",
              lecturerSubjectUuid: targetStudents.value,
            },
            intl.formatMessage({ id: "TARGETS" }),
            intl
          ),
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.ANNOUNCEMENT.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.ANNOUNCEMENT.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createAnnouncementFields = [
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "title",
      icon: <Edit3 size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      icon: <AlignCenter size={17} />,
      type: "textarea",
    },
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "type",
      icon: <FileText size={17} />,
      type: "select",
      options: announcementTypesArrayWithTitle(intl),
    },
  ]

  let filteredAnnouncements = []
  if (announcements)
    filteredAnnouncements = announcements.filter(
      announcement =>
        (dateFiltering(selectedRange, announcement.createdAt) ||
          !selectedRange) &&
        announcement.targetUsers.includes(
          selectedTarget ? selectedTarget.value : ""
        )
    )

  let subjects = []
  if (currentUserRole === "lecturer" && currentLecturerOngoingSubjects) {
    currentLecturerOngoingSubjects.map(subject =>
      subjects.push({
        label: `${rtl ? subject.subjectTitleArabic : subject.subjectTitle} - ${
          subject.subjectCode
        }`,
        value: subject.lecturerSubjectUuid,
      })
    )
  }

  const createAnnouncementDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.ANNOUNCEMENTS" }),
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {currentUserRole === "lecturer" ? (
            <Select
              array={subjects}
              value={targetStudents}
              handleChange={setTargetStudents}
              label={intl.formatMessage({ id: "TARGETED.STUDENTS" })}
            />
          ) : (
            <></>
          )}
          <CustomForm
            formik={createAnnouncementFormik}
            fields={createAnnouncementFields}
            buttonTitle={intl.formatMessage({ id: "CREATE.ANNOUNCEMENTS" })}
            isLoading={createAnnouncementIsLoading}
            buttonStatus={targetStudents.length === 0}
          />
        </div>
      ),
    },
    errorMessage: createAnnouncementErrorMessage,
    isLoading: createAnnouncementIsLoading,
    closingAction: () => {
      createAnnouncementFormik.resetForm()
      clearCreateAnnouncementErrorMessage()
      setTargetStudents([])
    },
  }

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getUserAnnouncements(userUuid)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    select: [
      {
        placeHolder: intl.formatMessage({ id: "CHOOSE.THE.TARGET" }),
        handleChange: e => setSelectedTarget(e),
        array:
          selectedUserRole === "lecturer" || currentUserRole === "lecturer"
            ? subjects
            : [
                { value: "all", label: intl.formatMessage({ id: "ALL" }) },
                {
                  value: "student",
                  label: intl.formatMessage({ id: "STUDENTS" }),
                },
                {
                  value: "guardian",
                  label: intl.formatMessage({ id: "GUARDIANS" }),
                },
                {
                  value: "lecturer",
                  label: intl.formatMessage({ id: "LECTURERS" }),
                },
              ],
      },
    ],
    date: {
      value: selectedRange,
      placeHolder: intl.formatMessage({ id: "SELECT.DATE.RANGE" }),
      onChange: e => setSelectedRange(e),
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "ANNOUNCEMENT.TYPE" }),
          styles: { minWidth: "180px" },
        },
        {
          title: intl.formatMessage({ id: "TARGETS" }),
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        { title: intl.formatMessage({ id: "PREVIEW" }) },
      ],
      row: announcement => (
        <UserAnnouncementsTableRow
          announcement={announcement}
          userUuid={userUuid}
        />
      ),
    },
    givenArray: filteredAnnouncements,
    title:
      currentUserRole === "lecturer"
        ? intl.formatMessage({ id: "MY.ANNOUNCEMENTS" })
        : rtl
        ? intl.formatMessage({ id: "S.ANNOUNCEMENTS" }) +
          " " +
          selectedUserFullNameArabic
        : selectedUserFullName + intl.formatMessage({ id: "S.ANNOUNCEMENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.ANNOUNCEMENTS.YET" }),
  }

  if (currentUserRole === "lecturer")
    tableAttributes.buttons = [
      <Dialog {...createAnnouncementDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <Table {...tableAttributes} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  announcements: selectSelectedUserAnnouncements,
  currentUserRole: selectCurrentUserRole,
  selectedUserRole: selectSelectedUserRole,
  createAnnouncementErrorMessage: selectCreateAnnouncementErrorMessage,
  createAnnouncementIsLoading: selectCreateAnnouncementIsLoading,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  currentLecturerOngoingSubjects: selectCurrentLecturerOngoingSubjects,
})

const mapDispatchToProps = dispatch => ({
  getUserAnnouncements: userUuid =>
    dispatch(getAnnouncementsOfSingalUserAsync(userUuid)),
  createAnnouncement: (requestBody, userUuid, func, messages) =>
    dispatch(createAnnouncementAsync(requestBody, userUuid, func, messages)),
  sendNotification: (requestBody, sendingType, intl) =>
    dispatch(sendNotificationAsync(requestBody, sendingType, false, intl)),
  clearCreateAnnouncementErrorMessage: () =>
    dispatch(clearCreateAnnouncementErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAnnouncementsTable)
