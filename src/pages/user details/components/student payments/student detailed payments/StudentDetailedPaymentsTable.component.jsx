import React, { useState } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import { useIntl } from "react-intl"
import Table from "../../../../../custom/table/table.component"
import StudentDetailedPaymentsTableRow from "./StudentDetailedPaymentsTableRow.component"
import { getAllSubjectsOfSingleStudentAsync } from "../../../../../redux/index.actions"

const StudentDetailedPaymentsTable = ({
  subjects,
  studentUuid,
  getAllSubjectsOfSingleStudent,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")

  const intl = useIntl()

  let filteredSubjects = []
  if (subjects)
    filteredSubjects = subjects.filter(
      subject =>
        subject.subjectCode.toLowerCase().includes(searchField.toLowerCase()) &&
        subject.subjectStatus === "onGoing"
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getAllSubjectsOfSingleStudent(studentUuid)}
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
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.SUBJECT.CODE" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "SUBJECT.CODE" }),
        },
        {
          title: intl.formatMessage({ id: "SUBJECT.TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "SUBJECT.HOURS" }),
        },
        {
          title: intl.formatMessage({ id: "SUBJECT.PRICE" }),
        },
      ],
      row: subject => <StudentDetailedPaymentsTableRow subject={subject} />,
    },
    givenArray: filteredSubjects,
    title: intl.formatMessage({ id: "DETAILED.REPORTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.DETAILED.REPORTS.YET" }),
  }
  return <Table {...tableAttributes} />
}

const mapDispatchToProps = dispatch => ({
  getAllSubjectsOfSingleStudent: studentUuid =>
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid)),
})

export default connect(null, mapDispatchToProps)(StudentDetailedPaymentsTable)
