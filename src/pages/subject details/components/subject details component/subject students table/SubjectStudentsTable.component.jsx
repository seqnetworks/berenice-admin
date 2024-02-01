import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import Table from "../../../../../custom/table/table.component"
import SubjectStudentsTableRow from "./SubjectStudentsTableRow.component"
import { getAllStudentsInClassAsync } from "../../../../../redux/index.actions"
import {
  selectSelectedClassStudents,
  selectSelectedClassStudentsClassUuid,
} from "../../../../../redux/index.selectors"

const SubjectStudentsTable = ({
  getAllStudentsInClass,
  students,
  selectedClassStudentsClassUuid,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")

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

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 "
        color="primary"
        onClick={() => getAllStudentsInClass(selectedClassStudentsClassUuid)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
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
          title: "",
        },
        {
          title: intl.formatMessage({ id: "STUDENT.ID" }),
        },
        {
          title: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
        },
        {
          title: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
        },
      ],
      row: student => <SubjectStudentsTableRow student={student} />,
    },
    givenArray: filteredStudents,
    title: <FormattedMessage id="STUDENTS.IN.THIS.SUBJECT" />,
    emptyMessage: intl.formatMessage({ id: "NO.STUDENTS.AVAILABLE" }),
  }
  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  students: selectSelectedClassStudents,
  selectedClassStudentsClassUuid: selectSelectedClassStudentsClassUuid,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsInClass: classUuid =>
    dispatch(getAllStudentsInClassAsync(classUuid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectStudentsTable)
