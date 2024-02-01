import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw, Calendar, Edit, Plus, FileText } from "react-feather"
import { Button, Label, Input } from "reactstrap"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl, FormattedMessage } from "react-intl"
import { CSVLink } from "react-csv"
import SubjectAttendanceSheetsTableRow from "./SubjectAttendanceSheetsTableRow.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import Table from "../../../../../custom/table/table.component"
import TimePicker from "../../../../../custom/time picker/TimePicker.component"
import { dateFiltering } from "../../../../../utility/custom/dateFiltering"
import { rooms } from "../../../../../utility/custom/rooms"
import weekDaysArray from "../../../../../utility/custom/weekDaysArray"
import {
  getAllAttendanceSheetsInClassAsync,
  createAttendanceSheetAsync,
  clearCreateAttendanceSheetErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectCurrentUserRole,
  selectSelectedSubject,
  selectSelectedClassAttendanceSheets,
  selectSelectedClassAttendanceSheetsClassUuid,
  selectSelectedClassStudentsAttendances,
  selectCreateAttendanceSheetErrorMessage,
  selectCreateAttendanceSheetIsLoading,
} from "../../../../../redux/index.selectors"

const SubjectAttendanceSheetsTable = ({
  currentUserRole,
  subject,
  getAllAttendanceSheetsInClass,
  createAttendanceSheet,
  clearCreateAttendanceSheetErrorMessage,
  attendanceSheets,
  selectedClassAttendanceSheetsClassUuid,
  selectedClassStudentsAttendances,
  createAttendanceSheetErrorMessage,
  createAttendanceSheetIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRange, setSelectedRange] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedStartTime, setSelectedStartTime] = useState("")
  const [selectedEndTime, setSelectedEndTime] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")

  const intl = useIntl()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const csvHeaders = [
    { label: intl.formatMessage({ id: "STUDENT.ID" }), key: "studentUuid" },
    { label: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }), key: "fullName" },
    {
      label: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
      key: "fullNameArabic",
    },
    { label: intl.formatMessage({ id: "TOTAL.CLASSES" }), key: "totalClasses" },
    { label: intl.formatMessage({ id: "PRESENT" }), key: "classesPresent" },
    { label: intl.formatMessage({ id: "ABSENT" }), key: "classsesAbsent" },
    {
      label: intl.formatMessage({ id: "ABSENT.WITH.REASON" }),
      key: "classesAbsentWithReason",
    },
  ]

  let classesArray = [{ title: "", value: "" }]
  if (ability.can("manage", "extra_class-POST"))
    classesArray.push({
      title: intl.formatMessage({ id: "NEW.CLASS" }),
      value: "new class",
    })
  if (subject)
    subject.classes.map(oneClass => {
      if (oneClass.type === "core")
        classesArray.push({
          title:
            intl.formatMessage({ id: oneClass.day.toUpperCase() }) +
            " / " +
            oneClass.startTime.slice(0, 5) +
            " - " +
            oneClass.endTime.slice(0, 5) +
            " / " +
            oneClass.room,
          value: oneClass.uuid,
        })
    })

  const createAttendanceSheetValidationSchema = Yup.object().shape({
    classUuid: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    date: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createAttendanceSheetFormik = useFormik({
    initialValues: { classUuid: "", date: "" },
    enableReinitialize: true,
    validationSchema: createAttendanceSheetValidationSchema,
    onSubmit: values => {
      let attendanceClass = { room: "", day: "", timeRange: "" }
      if (subject)
        subject.classes.map(oneClass => {
          if (oneClass.uuid === values.classUuid) {
            attendanceClass.room = oneClass.room
            attendanceClass.day = oneClass.day
            attendanceClass.timeRange =
              oneClass.startTime.slice(0, 5) +
              " - " +
              oneClass.endTime.slice(0, 5)
          }
        })
      let info = {
        classUuid: subject.lecturerSubjectUuid,
        classDate: values.date,
        subjectCode: subject.subjectCode,
        intakeCode: subject.intakeCode,
        lecturerUuid: subject.lecturerUuid,
        timeRange: attendanceClass.timeRange,
        day: attendanceClass.day,
        room: attendanceClass.room,
      }
      if (selectedClass === "new class")
        info = {
          ...info,
          day: selectedDay,
          room: selectedRoom,
          timeRange:
            selectedStartTime.slice(0, 5) + " - " + selectedEndTime.slice(0, 5),
        }
      let requestBody =
        selectedClass === "new class"
          ? {
              lecturerSubjectUuid: subject.lecturerSubjectUuid,
              room: selectedRoom,
              day: selectedDay,
              startTime: selectedStartTime,
              endTime: selectedEndTime,
              date: values.date,
            }
          : values

      if (selectedClass === "new class" && currentUserRole !== "lecturer")
        requestBody = { ...requestBody, lecturerUuid: subject.lecturerUuid }
      createAttendanceSheet(requestBody, info, history)
    },
  })

  const createAttendanceSheetFields = [
    {
      title: intl.formatMessage({ id: "CLASS" }),
      value: "classUuid",
      icon: <Edit size={17} />,
      type: "select",
      options: classesArray,
      setState: setSelectedClass,
    },
    {
      title: intl.formatMessage({ id: "DATE" }),
      value: "date",
      icon: <Calendar size={17} />,
      type: "date",
    },
  ]

  const createAttendanceSheetDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.ATTENDANCE.SHEET" }),
      content: (
        <>
          <CustomForm
            formik={createAttendanceSheetFormik}
            fields={createAttendanceSheetFields}
            buttonTitle={intl.formatMessage({ id: "CREATE.ATTENDANCE.SHEET" })}
            isLoading={createAttendanceSheetIsLoading}
            buttonStatus={
              selectedClass === "new class" &&
              (!selectedDay ||
                !selectedRoom ||
                !selectedStartTime ||
                !selectedEndTime)
            }
            additional={
              selectedClass === "new class" ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label>
                    <FormattedMessage id="DAY" />
                  </Label>
                  <Input
                    type="select"
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value)}
                  >
                    {weekDaysArray(intl).map(day => (
                      <option value={day.value}>{day.title}</option>
                    ))}
                  </Input>
                  <Label>
                    <FormattedMessage id="ROOM" />
                  </Label>
                  <Input
                    type="select"
                    value={selectedRoom}
                    onChange={e => setSelectedRoom(e.target.value)}
                  >
                    {rooms.map(room => (
                      <option value={room.value}>{room.title}</option>
                    ))}
                  </Input>
                  <Label>
                    <FormattedMessage id="START.TIME" />
                  </Label>
                  <TimePicker
                    value={selectedStartTime}
                    onChange={setSelectedStartTime}
                  />
                  <Label>
                    <FormattedMessage id="END.TIME" />
                  </Label>
                  <TimePicker
                    value={selectedEndTime}
                    onChange={setSelectedEndTime}
                  />
                </div>
              ) : (
                <></>
              )
            }
          />
        </>
      ),
    },
    errorMessage: createAttendanceSheetErrorMessage,
    isLoading: createAttendanceSheetIsLoading,
    closingAction: () => {
      createAttendanceSheetFormik.resetForm()
      clearCreateAttendanceSheetErrorMessage()
      setSelectedClass("")
      setSelectedDay("")
      setSelectedStartTime("")
      setSelectedEndTime("")
      setSelectedRoom("")
    },
  }

  let attendanceSheetsArray = []
  if (attendanceSheets)
    attendanceSheetsArray = attendanceSheets.filter(
      attendanceSheet =>
        dateFiltering(selectedRange, attendanceSheet.date) || !selectedRange
    )

  const date = new Date()
  const tableAttributes = {
    buttons: [
      <CSVLink
        className="btn px-1 ml-50"
        style={{ backgroundColor: "#820024", color: "white" }}
        data={selectedClassStudentsAttendances}
        headers={csvHeaders}
        filename={
          subject.subjectCode +
          " " +
          intl.formatMessage({ id: "STUDENTS.ATTENDANCES.IN.SUBJECT" }) +
          " " +
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear()
        }
      >
        <FileText size={15} />
      </CSVLink>,
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() =>
          getAllAttendanceSheetsInClass(selectedClassAttendanceSheetsClassUuid)
        }
      >
        <RefreshCw size={15} />
      </Button>,
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
          title: intl.formatMessage({ id: "DATE" }),
        },
        {
          title: intl.formatMessage({ id: "DAY" }),
        },
        {
          title: intl.formatMessage({ id: "ROOM" }),
        },
        {
          title: intl.formatMessage({ id: "TIME.RANGE" }),
        },
        { title: "" },
      ],
      row: attendanceSheet => (
        <SubjectAttendanceSheetsTableRow attendanceSheet={attendanceSheet} />
      ),
    },
    givenArray: attendanceSheetsArray,
    title: intl.formatMessage({ id: "ATTENDANCE.SHEETS.FOR.THIS.SUBJECT" }),
    emptyMessage: intl.formatMessage({ id: "NO.ATTENDANCE.SHEETS.YET" }),
  }

  if (ability.can("manage", "attendance_sheet-POST"))
    tableAttributes.buttons = [
      <Dialog {...createAttendanceSheetDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
  subject: selectSelectedSubject,
  attendanceSheets: selectSelectedClassAttendanceSheets,
  selectedClassAttendanceSheetsClassUuid: selectSelectedClassAttendanceSheetsClassUuid,
  selectedClassStudentsAttendances: selectSelectedClassStudentsAttendances,
  createAttendanceSheetErrorMessage: selectCreateAttendanceSheetErrorMessage,
  createAttendanceSheetIsLoading: selectCreateAttendanceSheetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllAttendanceSheetsInClass: classUuid =>
    dispatch(getAllAttendanceSheetsInClassAsync(classUuid)),
  createAttendanceSheet: (requestBody, info, history) =>
    dispatch(createAttendanceSheetAsync(requestBody, info, history)),
  clearCreateAttendanceSheetErrorMessage: () =>
    dispatch(clearCreateAttendanceSheetErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectAttendanceSheetsTable)
