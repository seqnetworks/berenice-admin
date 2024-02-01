import React, { useState } from "react"
import { useIntl } from "react-intl"
import Table from "../../../../../../../custom/table/table.component"
import SubjectsInCourseTableRow from "./SubjectsInCourseTableRow.component"

const SubjectsInCourseTable = ({ subjects, courseCode }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")

  const intl = useIntl()

  let filteredSubjects = []
  if (subjects)
    filteredSubjects = subjects.filter(
      subject =>
        subject.subjectCode.toLowerCase().includes(searchField.toLowerCase()) ||
        subject.subjectTitle.toLowerCase().includes(searchField.toLowerCase())
    )

  const tableAttributes = {
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 5,
      currentPage: currentPage,
    },
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.NAME.OR.CODE" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "CODE" }),
        },
        {
          title: intl.formatMessage({ id: "TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "SEMESTER" }),
        },
        {
          title: "",
        },
      ],
      row: subject => <SubjectsInCourseTableRow subject={subject} />,
    },
    givenArray: filteredSubjects,
    title: (
      <>
        {intl.formatMessage({ id: "SUBJECTS.IN" })}
        <span className="">{courseCode}</span>
      </>
    ),
    emptyMessage: intl.formatMessage({ id: "NO.SUBJECTS.YET" }),
  }
  return <Table {...tableAttributes} />
}

export default SubjectsInCourseTable
