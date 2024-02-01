import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { Button, Card, CardBody, Spinner, CustomInput, Badge } from "reactstrap"
import { RefreshCw, Check } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import Table from "../../../../custom/table/table.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import StudentsMarksInAssessmentTableRow from "./StudentsMarksInAssessmentTableRow.component"
import {
  getAllStudentsMarksInSubjectAsync,
  updateStudentsMarksAsync,
  updateAssessmentVisibilityAsync,
  clearUpdateAssessmentVisibilityErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSelectedAssessmentInfo,
  selectSelectedAssessmentStudents,
  selectUpdateStudentsMarksIsLoading,
  selectUpdateAssessmentVisibilityErrorMessage,
  selectUpdateAssessmentVisibilityIsLoading,
} from "../../../../redux/index.selectors"

const StudentsMarksInAssessmentTable = ({
  updateAssessmentVisibility,
  getAllStudentsMarksInSubject,
  updateStudentsMarks,
  clearUpdateAssessmentVisibilityErrorMessage,
  info,
  students,
  updateStudentsMarksIsLoading,
  updateAssessmentVisibilityErrorMessage,
  updateAssessmentVisibilityIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [marks, setMarks] = useState({})
  const [changeButtonStatus, setChangeButtonStatus] = useState(false)
  const [assessmentStatus, setAssessmentStatus] = useState("hide")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (students.length > 0) setAssessmentStatus(students[0].status)
  }, [])

  useEffect(() => {
    if (students) {
      let object = {}
      students.map(
        student =>
          (object = {
            ...object,
            [student.studentUuid]: {
              mark: student.mark,
              grade: student.grade,
              note: student.note,
            },
          })
      )
      setMarks(object)
    }
  }, [])

  useEffect(() => {
    let changed = false
    if (students) {
      students.map(student => {
        if (
          marks[student.studentUuid]?.mark !== student.mark ||
          marks[student.studentUuid]?.note !== student.note ||
          marks[student.studentUuid]?.grade !== student.grade
        )
          changed = true
      })
    }
    setChangeButtonStatus(!changed)
  }, [marks])

  const intl = useIntl()

  let filteredStudents = []
  if (students)
    filteredStudents = students.filter(
      student =>
        student.studentUuid.toLowerCase().includes(searchField.toLowerCase()) ||
        student.studentFullName
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        student.studentFullNameArabic
          .toLowerCase()
          .includes(searchField.toLowerCase())
    )

  const helper = {
    action: {
      display: "hide",
      hide: "display",
    },
    dialog: {
      display: {
        color: "danger",
        content: "HIDE.VERB",
        ability: "WON'T",
      },
      hide: {
        color: "success",
        content: "SHOW",
        ability: "WILL",
      },
    },
  }

  const assessmentStatusDialogAttributes = {
    button: {},
    dialog: {
      title: intl.formatMessage({ id: "EDITING.ASSESSMENT.STATUS" }),
      content:
        students.length > 0 ? (
          <>
            <FormattedMessage id="YOU.ARE.ABOUT.TO" />{" "}
            <Badge color={`light-${helper.dialog[students[0].status].color}`}>
              <FormattedMessage
                id={helper.dialog[students[0].status].content}
              />
            </Badge>{" "}
            <FormattedMessage id="THIS.ASSESSMENT'S.MARKS.THAT.MEANS.ALL.RELATED.STUDENTS" />{" "}
            <Badge color={`light-${helper.dialog[students[0].status].color}`}>
              <FormattedMessage
                id={helper.dialog[students[0].status].ability}
              />
            </Badge>{" "}
            <FormattedMessage id="BE.ABLE.TO.SEE.THEIR.MARKS.ARE.YOU.SURE.YOU.WANT.TO.DO.THAT?" />{" "}
          </>
        ) : (
          <></>
        ),
      actions: [
        {
          title: updateAssessmentVisibilityIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "CHANGE" })
          ),
          color: "primary",
          disabled: updateAssessmentVisibilityIsLoading,
          clickHandler: async () =>
            updateAssessmentVisibility(
              { status: helper.action[students[0].status] },
              info.uuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "UPDATE.ASSESSMENT.VISIBILITY.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "UPDATE.ASSESSMENT.VISIBILITY.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: updateAssessmentVisibilityIsLoading,
        },
      ],
    },
    externalOpenSource: isDialogOpen,
    setExternalOpenSource: setIsDialogOpen,
    errorMessage: updateAssessmentVisibilityErrorMessage,
    closingAction: () => clearUpdateAssessmentVisibilityErrorMessage(),
  }

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1"
        color="primary"
        onClick={() => getAllStudentsMarksInSubject(info.uuid)}
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
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "STUDENT.ID" }),
        },
        {
          title: intl.formatMessage({ id: "FULL.NAME" }),
        },
        {
          title: intl.formatMessage({ id: "MARK" }),
        },
        {
          title: intl.formatMessage({ id: "GRADE" }),
        },
        {
          title: intl.formatMessage({ id: "NOTE" }),
        },
      ],
      row: student => (
        <StudentsMarksInAssessmentTableRow
          marks={marks}
          setMarks={setMarks}
          student={student}
          overallMark={info.overallMark}
        />
      ),
    },
    givenArray: filteredStudents,
    title: <FormattedMessage id="STUDENTS.MARKS" />,
    emptyMessage: intl.formatMessage({ id: "NO.STUDENTS.AVAILABLE" }),
  }

  if (
    students.length > 0 &&
    ability.can("manage", "assessment_results_status-PUT")
  )
    tableAttributes.buttons = [
      <CustomInput
        type="switch"
        className="custom-control-success"
        inline
        checked={assessmentStatus === "display"}
        id="icon-secondary"
        name="icon-secondary"
        onClick={() => setIsDialogOpen(true)}
      />,
      tableAttributes.buttons,
    ]

  if (ability.can("manage", "mark_results-PUT"))
    tableAttributes.buttons = [
      <Button
        disabled={changeButtonStatus}
        className="px-1 mr-1"
        color="success"
        onClick={() => {
          let requestBody = []
          Object.keys(marks).map(key =>
            requestBody.push({
              studentUuid: key,
              mark:
                marks[key].mark > info.overallMark
                  ? info.overallMark
                  : marks[key].mark,
              note: marks[key].note,
              grade: marks[key].grade,
            })
          )
          updateStudentsMarks(info.uuid, requestBody, {
            success: {
              title: intl.formatMessage({
                id: "UPDATE.STUDENT.MARKS.SUCCESS.TITLE",
              }),
              content: intl.formatMessage({
                id: "UPDATE.STUDENT.MARKS.SUCCESS.CONTENT",
              }),
            },
            error: {
              title: intl.formatMessage({
                id: "UPDATE.STUDENT.MARKS.ERROR.TITLE",
              }),
              content: intl.formatMessage({
                id: "UPDATE.STUDENT.MARKS.ERROR.CONTENT",
              }),
            },
          })
        }}
      >
        {updateStudentsMarksIsLoading ? (
          <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
        ) : (
          <Check size={15} />
        )}
      </Button>,
      tableAttributes.buttons,
    ]
  return (
    <>
      <Dialog {...assessmentStatusDialogAttributes} />
      <Card>
        <CardBody>
          <Table {...tableAttributes} />
        </CardBody>
      </Card>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  info: selectSelectedAssessmentInfo,
  students: selectSelectedAssessmentStudents,
  updateStudentsMarksIsLoading: selectUpdateStudentsMarksIsLoading,
  updateAssessmentVisibilityErrorMessage: selectUpdateAssessmentVisibilityErrorMessage,
  updateAssessmentVisibilityIsLoading: selectUpdateAssessmentVisibilityIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsMarksInSubject: assessmentUuid =>
    dispatch(getAllStudentsMarksInSubjectAsync(assessmentUuid)),
  updateStudentsMarks: (assessmentUuid, requestBody, messages) =>
    dispatch(updateStudentsMarksAsync(assessmentUuid, requestBody, messages)),
  updateAssessmentVisibility: (requestBody, assessmentUuid, messages) =>
    dispatch(
      updateAssessmentVisibilityAsync(requestBody, assessmentUuid, messages)
    ),
  clearUpdateAssessmentVisibilityErrorMessage: () =>
    dispatch(clearUpdateAssessmentVisibilityErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsMarksInAssessmentTable)
