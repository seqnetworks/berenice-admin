import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw, AlignCenter, Edit3, Plus } from "react-feather"
import { Button, Card, CardBody } from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl } from "react-intl"
import { Divider } from "@material-ui/core"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import CustomForm from "../../../../custom/customform/customform.component"
import UserFollowUpsTableRow from "./AllFollowUpsTableRow.component"
import Table from "../../../../custom/table/table.component"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  getAllFollowUpsAsync,
  createFollowUpAsync,
  clearCreateFollowUpErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectAllFollowUps,
  selectStudents,
  selectGuardians,
  selectCurrentUserFullNameArabic,
  selectCreateFollowUpErrorMessage,
  selectCreateFollowUpIsLoading,
} from "../../../../redux/index.selectors"
import { dateFiltering } from "../../../../utility/custom/dateFiltering"

const AllFollowUpsTable = ({
  followUps,
  getAllFollowUps,
  createFollowUp,
  students,
  guardians,
  currentUserFullNameArabic,
  createFollowUpErrorMessage,
  createFollowUpIsLoading,
  clearCreateFollowUpErrorMessage,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedRange, setSelectedRange] = useState("")
  const [selectedReceiver, setSelectedReceiver] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  let studentsArray = []
  if (students)
    students.map(student =>
      studentsArray.push({
        value: student.userUuid,
        label: rtl
          ? student.fullNameArabic
          : student.fullName + " - " + student.uuid,
      })
    )

  let guardiansArray = []
  if (guardians)
    guardians.map(guardian =>
      guardiansArray.push({
        value: guardian.userUuid,
        label: rtl ? guardian.fullNameArabic : guardian.fullName,
      })
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
        { ...values, receiverUuid: selectedReceiver.value },
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
            handleChange={e => setSelectedReceiver(e)}
            height={200}
            label={intl.formatMessage({ id: "TARGET.STUDENT" })}
            value={selectedReceiver}
            array={[
              {
                label: intl.formatMessage({ id: "STUDENTS" }),
                options: studentsArray,
              },
              {
                label: intl.formatMessage({ id: "GUARDIANS" }),
                options: guardiansArray,
              },
            ]}
          />
          <Divider variant="middle" />
          <CustomForm
            formik={createFollowUpFormik}
            fields={createFollowUpFields}
            buttonTitle={intl.formatMessage({ id: "SEND.FOLLOW.UP" })}
            isLoading={createFollowUpIsLoading}
            buttonStatus={!selectedReceiver}
          />
        </div>
      ),
    },
    errorMessage: createFollowUpErrorMessage,
    isLoading: createFollowUpIsLoading,
    closingAction: () => {
      createFollowUpFormik.resetForm()
      clearCreateFollowUpErrorMessage()
      setSelectedReceiver("")
    },
  }

  let followUpsArray = []
  if (followUps)
    followUpsArray = followUps.filter(
      followUp =>
        (followUp.senderFullName
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          followUp.senderFullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          followUp.studentFullName
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          followUp.studentFullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase())) &&
        (dateFiltering(selectedRange, followUp.createdAt) || !selectedRange)
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getAllFollowUps()}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.SENDER.OR.STUDENT" }),
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
          title: intl.formatMessage({ id: "WRITTEN.BY" }),
          styles: { minWidth: "150px" },
        },
        {
          title: intl.formatMessage({ id: "WRITTEN.TO" }),
          styles: { minWidth: "150px" },
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        { title: intl.formatMessage({ id: "PREVIEW" }) },
      ],
      row: followUp => <UserFollowUpsTableRow followUp={followUp} />,
    },
    givenArray: followUpsArray,
    title: intl.formatMessage({ id: "FOLLOW.UPS" }),
    emptyMessage: intl.formatMessage({ id: "NO.FOLLOW.UPS.YET" }),
  }

  if (ability.can("manage", "follow_up-POST"))
    tableAttributes.buttons = [
      <Dialog {...createFollowUpDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return (
    <Card>
      <CardBody>
        <Table {...tableAttributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  followUps: selectAllFollowUps,
  students: selectStudents,
  guardians: selectGuardians,
  currentUserFullNameArabic: selectCurrentUserFullNameArabic,
  createFollowUpErrorMessage: selectCreateFollowUpErrorMessage,
  createFollowUpIsLoading: selectCreateFollowUpIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllFollowUps: () => dispatch(getAllFollowUpsAsync()),
  createFollowUp: (values, messages, senderFullNameArabic) =>
    dispatch(
      createFollowUpAsync(values, false, messages, false, senderFullNameArabic)
    ),
  clearCreateFollowUpErrorMessage: () =>
    dispatch(clearCreateFollowUpErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFollowUpsTable)
