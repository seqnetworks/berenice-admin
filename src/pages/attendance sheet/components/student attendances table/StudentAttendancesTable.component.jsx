import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { Button, Card, CardBody, Spinner } from "reactstrap"
import { RefreshCw, Check } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import Table from "../../../../custom/table/table.component"
import StudentAttendancesTableRow from "./StudentAttendancesTableRow.component"
import {
  getAllStudentsAttendancesInAttendanceSheetAsync,
  updateStudentsAttendancesInAttendanceSheetAsync,
} from "../../../../redux/index.actions"
import {
  selectSelectedAttendanceSheetInfo,
  selectSelectedAttendanceSheetStudents,
  selectUpdateStudentsAttendancesInAttendanceSheetIsLoading,
} from "../../../../redux/index.selectors"

const StudentAttendancesTable = ({
  getAllStudentsAttendancesInAttendanceSheet,
  updateStudentsAttendancesInAttendanceSheet,
  students,
  info,
  updateStudentsAttendancesInAttendanceSheetIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [statuses, setStatuses] = useState({})
  const [changeButtonStatus, setChangeButtonStatus] = useState(false)

  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (students) {
      let object = {}
      students.map(
        student =>
          (object = {
            ...object,
            [student.studentUuid]: {
              status: student.status,
              absenceReason: student.absenceReason,
            },
          })
      )
      setStatuses(object)
    }
  }, [])

  useEffect(() => {
    let changed = false
    if (students) {
      students.map(student => {
        if (
          statuses[student.studentUuid]?.status !== student.status ||
          statuses[student.studentUuid]?.absenceReason !== student.absenceReason
        )
          changed = true
      })
    }
    setChangeButtonStatus(!changed)
  }, [statuses])

  const intl = useIntl()

  let filteredStudents = []
  if (students)
    filteredStudents = students.filter(
      student =>
        (student.studentUuid
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          student.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
          student.fullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase())) &&
        (selectedStatus
          ? student.status === selectedStatus.value ||
            (student.status === "absent with reason" &&
              selectedStatus.value === "absent")
          : true)
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1"
        color="primary"
        onClick={() =>
          getAllStudentsAttendancesInAttendanceSheet(
            info.subjectCode,
            info.intakeCode,
            info.classDate
          )
        }
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 100,
      currentPage: currentPage,
    },
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.STUDENT.ID.OR.NAME" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    select: [
      {
        placeHolder: intl.formatMessage({ id: "STUDENT.STATUS" }),
        handleChange: e => setSelectedStatus(e),
        array: [
          {
            label: intl.formatMessage({ id: "STATUS" }),
            options: [
              {
                label: intl.formatMessage({ id: "PRESENT" }),
                value: "present",
              },
              { label: intl.formatMessage({ id: "ABSENT" }), value: "absent" },
              { label: intl.formatMessage({ id: "LATE" }), value: "late" },
            ],
          },
        ],
      },
    ],
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "STUDENT.ID" }),
        },
        {
          title: intl.formatMessage({ id: "FULL.NAME" }),
        },
        {
          title: intl.formatMessage({ id: "PRESENT/ABSENT" }),
        },
        {
          title: intl.formatMessage({ id: "ABSENCE.REASON" }),
        },
      ],
      row: student => (
        <StudentAttendancesTableRow
          statuses={statuses}
          setStatuses={setStatuses}
          student={student}
        />
      ),
    },
    givenArray: filteredStudents,
    title: <FormattedMessage id="STUDENTS.ATTENDANCES" />,
    emptyMessage: intl.formatMessage({ id: "NO.STUDENTS.AVAILABLE" }),
  }
  if (ability.can("manage", "mark_attendance-PUT"))
    tableAttributes.buttons = [
      <Button
        disabled={
          changeButtonStatus ||
          updateStudentsAttendancesInAttendanceSheetIsLoading
        }
        className="px-1 mr-50"
        color="success"
        onClick={() => {
          let requestBody = []
          Object.keys(statuses).map(key =>
            requestBody.push({
              studentUuid: key,
              status: statuses[key].status,
              absenceReason:
                statuses[key].status === "absent with reason"
                  ? statuses[key].absenceReason === ""
                    ? "-"
                    : statuses[key].absenceReason
                  : "-",
            })
          )
          updateStudentsAttendancesInAttendanceSheet(
            info.uuid,
            info.classDate,
            requestBody,
            {
              success: {
                title: intl.formatMessage({
                  id: "UPDATE.STUDENT.ATTENDANCES.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "UPDATE.STUDENT.ATTENDANCES.SUCCESS.CONTENT",
                }),
              },
              error: {
                title: intl.formatMessage({
                  id: "UPDATE.STUDENT.ATTENDANCES.ERROR.TITLE",
                }),
                content: intl.formatMessage({
                  id: "UPDATE.STUDENT.ATTENDANCES.ERROR.CONTENT",
                }),
              },
            }
          )
        }}
      >
        {updateStudentsAttendancesInAttendanceSheetIsLoading ? (
          <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
        ) : (
          <Check size={15} />
        )}
      </Button>,
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
  students: selectSelectedAttendanceSheetStudents,
  info: selectSelectedAttendanceSheetInfo,
  updateStudentsAttendancesInAttendanceSheetIsLoading: selectUpdateStudentsAttendancesInAttendanceSheetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsAttendancesInAttendanceSheet: (
    subjectcode,
    intakeCode,
    classDate
  ) =>
    dispatch(
      getAllStudentsAttendancesInAttendanceSheetAsync(
        subjectcode,
        intakeCode,
        classDate
      )
    ),
  updateStudentsAttendancesInAttendanceSheet: (
    attendanceUuid,
    date,
    requestBody,
    messages
  ) =>
    dispatch(
      updateStudentsAttendancesInAttendanceSheetAsync(
        attendanceUuid,
        date,
        requestBody,
        messages
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAttendancesTable)
