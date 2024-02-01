import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw, AlignCenter, Edit3, Plus } from "react-feather"
import { Button, Card, CardBody, Row, Col } from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl } from "react-intl"
import { Divider } from "@material-ui/core"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import CustomForm from "../../../../custom/customform/customform.component"
import UserFollowUpsTableRow from "./UserFollowUpsTableRow.component"
import Table from "../../../../custom/table/table.component"
import { dateFiltering } from "../../../../utility/custom/dateFiltering"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  getFollowUpsOfSingalUserAsync,
  createFollowUpAsync,
  clearCreateFollowUpErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSelectedUserFollowUps,
  selectStudents,
  selectCurrentUserRole,
  selectCurrentUserFullNameArabic,
  selectCreateFollowUpErrorMessage,
  selectCreateFollowUpIsLoading,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
} from "../../../../redux/index.selectors"

const UserFollowUpsTable = ({
  requestBody,
  followUps,
  getUserFollowUps,
  createFollowUp,
  students,
  currentUserRole,
  currentUserFullNameArabic,
  createFollowUpErrorMessage,
  createFollowUpIsLoading,
  clearCreateFollowUpErrorMessage,
  selectedUserFullName,
  selectedUserFullNameArabic,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedRange, setSelectedRange] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()

  let studentsArray = []
  if (students)
    students.map(student =>
      studentsArray.push({
        value: student.userUuid,
        label:
          (rtl ? student.fullNameArabic : student.fullName) +
          " - " +
          student.uuid,
      })
    )

  let filteredFollowUps = []
  if (followUps)
    filteredFollowUps = followUps.filter(
      followUp =>
        (dateFiltering(selectedRange, followUp.createdAt) || !selectedRange) &&
        (followUp.receiverFullName
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          followUp.receiverFullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          followUp.receiverUuid
            .toLowerCase()
            .includes(searchField.toLowerCase()))
    )
  const createFollowUpValidationSchema = Yup.object().shape({
    subjectMessage: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    message: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createFollowUpFormik = useFormik({
    initialValues: { subjectMessage: "", message: "" },
    enableReinitialize: true,
    validationSchema: createFollowUpValidationSchema,
    onSubmit: values =>
      createFollowUp(
        { ...values, receiverUuid: selectedStudent.value },
        requestBody,
        {
          success: {
            title: intl.formatMessage({ id: "CREATE.FOLLOWUP.SUCCESS.TITLE" }),
            content: intl.formatMessage({
              id: "CREATE.FOLLOWUP.SUCCESS.CONTENT",
            }),
          },
        },
        currentUserFullNameArabic
      ),
  })

  const createFollowUpFields = [
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "subjectMessage",
      icon: <Edit3 size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "message",
      icon: <AlignCenter size={17} />,
      type: "textarea",
    },
  ]

  const createFollowUpDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "SENDING.FOLLOW.UP" }),
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Select
            handleChange={e => setSelectedStudent(e)}
            height={120}
            label={intl.formatMessage({ id: "TARGET.STUDENT" })}
            value={selectedStudent}
            array={studentsArray}
          />
          <Divider variant="middle" />
          <CustomForm
            formik={createFollowUpFormik}
            fields={createFollowUpFields}
            buttonTitle={intl.formatMessage({ id: "SEND.FOLLOW.UP" })}
            isLoading={createFollowUpIsLoading}
          />
        </div>
      ),
    },
    errorMessage: createFollowUpErrorMessage,
    isLoading: createFollowUpIsLoading,
    closingAction: () => {
      createFollowUpFormik.resetForm()
      clearCreateFollowUpErrorMessage()
      setSelectedStudent("")
    },
  }

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getUserFollowUps(requestBody)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({ id: "STUDENT.NAME.OR.ID" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
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
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        {
          title: !rtl
            ? `Written ${requestBody.receiverUuid ? "By" : "To"}`
            : `كتبت ${requestBody.receiverUuid ? "عن طريق" : "إلى"}`,
          styles: { minWidth: "150px" },
        },
        { title: intl.formatMessage({ id: "PREVIEW" }) },
      ],
      row: followUp => (
        <UserFollowUpsTableRow followUp={followUp} requestBody={requestBody} />
      ),
    },
    givenArray: filteredFollowUps,
    title:
      currentUserRole === "lecturer"
        ? intl.formatMessage({ id: "MY.FOLLOW.UPS" })
        : rtl
        ? intl.formatMessage({ id: "S.FOLLOW.UPS" }) +
          " " +
          selectedUserFullNameArabic
        : selectedUserFullName + intl.formatMessage({ id: "S.FOLLOW.UPS" }),
    emptyMessage: intl.formatMessage({ id: "NO.FOLLOW.UPS.YET" }),
  }

  if (currentUserRole === "lecturer")
    tableAttributes.buttons = [
      <Dialog {...createFollowUpDialogAttributes} />,
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
  followUps: selectSelectedUserFollowUps,
  students: selectStudents,
  currentUserRole: selectCurrentUserRole,
  currentUserFullNameArabic: selectCurrentUserFullNameArabic,
  createFollowUpErrorMessage: selectCreateFollowUpErrorMessage,
  createFollowUpIsLoading: selectCreateFollowUpIsLoading,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
})

const mapDispatchToProps = dispatch => ({
  getUserFollowUps: requestBody =>
    dispatch(getFollowUpsOfSingalUserAsync(requestBody)),
  createFollowUp: (values, requestBody, messages, senderFullNameArabic) =>
    dispatch(
      createFollowUpAsync(
        values,
        requestBody,
        messages,
        false,
        senderFullNameArabic
      )
    ),
  clearCreateFollowUpErrorMessage: () =>
    dispatch(clearCreateFollowUpErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowUpsTable)
