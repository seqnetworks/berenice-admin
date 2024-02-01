import React, { useState } from "react"
import { useIntl } from "react-intl"
import Table from "../../../../../../custom/table/table.component"
import SubjectsInIntakeTableRow from "./SubjectsInIntakeTableRow.component"

const SubjectsInIntakeTable = ({ subjects, intakeCode }) => {
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
          title: intl.formatMessage({ id: "LECTURER" }),
        },
        {
          title: intl.formatMessage({ id: "HOURS" }),
        },
        {
          title: intl.formatMessage({ id: "CREDITS" }),
        },
        {
          title: intl.formatMessage({ id: "PRICE" }),
        },
        {
          title: "",
        },
      ],
      row: subject => (
        <SubjectsInIntakeTableRow subject={subject} intakeCode={intakeCode} />
      ),
    },
    givenArray: filteredSubjects,
    title: (
      <>
        {intl.formatMessage({ id: "SUBJECTS.IN" })}
        <span className="">{intakeCode}</span>
      </>
    ),
    emptyMessage: intl.formatMessage({ id: "NO.SUBJECTS.YET" }),
  }
  return <Table {...tableAttributes} />
}

export default SubjectsInIntakeTable
