import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import { useIntl } from "react-intl"
import Table from "../../../../../custom/table/table.component"
import OnHoldSubjectsTableRow from "./OnHoldSubjectsTableRow.component"
import { getAllSubjectsOfSingleStudentAsync } from "../../../../../redux/index.actions"
import { selectSelectedUserUuid } from "../../../../../redux/index.selectors"

const OnHoldSubjectsTable = ({
  subjects,
  selectedUserUuid,
  getAllSubjectsOfSingleStudent,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")

  const intl = useIntl()

  let filteredSubjects = []
  if (subjects)
    filteredSubjects = subjects.filter(
      subject =>
        subject.subjectCode.toLowerCase().includes(searchField.toLowerCase()) ||
        subject.subjectTitle
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        subject.subjectTitleArabic
          .toLowerCase()
          .includes(searchField.toLowerCase())
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1"
        color="primary"
        onClick={() => getAllSubjectsOfSingleStudent(selectedUserUuid)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
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
          title: intl.formatMessage({ id: "NAME" }),
        },
        {
          title: intl.formatMessage({ id: "TYPE" }),
        },
        {
          title: "",
        },
      ],
      row: subject => <OnHoldSubjectsTableRow subject={subject} />,
    },
    givenArray: filteredSubjects,
    title: intl.formatMessage({ id: "ON.HOLD.SUBJECTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.ON.HOLD.SUBJECTS.YET" }),
  }

  return <Table {...tableAttributes} />
}
const mapStateToProps = createStructuredSelector({
  selectedUserUuid: selectSelectedUserUuid,
})

const mapDisptachToProps = dispatch => ({
  getAllSubjectsOfSingleStudent: uuid =>
    dispatch(getAllSubjectsOfSingleStudentAsync(uuid)),
})

export default connect(mapStateToProps, mapDisptachToProps)(OnHoldSubjectsTable)
