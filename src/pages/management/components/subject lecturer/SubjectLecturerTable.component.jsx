import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw } from "react-feather"
import { Button } from "reactstrap"
import { useIntl } from "react-intl"
import SubjectLecturerTableRow from "./SubjectLecturerTableRow.component"
import Table from "../../../../custom/table/table.component"
import { getAllSubjectsWithLecturerAsync } from "../../../../redux/index.actions"
import { selectAllSubjectsWithLecturer } from "../../../../redux/index.selectors"

const SubjectLecturerTable = ({ subjects, getAllSubjectsWithLecturer }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const intl = useIntl()

  let filteredSubjects = []
  if (subjects)
    filteredSubjects = subjects.filter(
      subject =>
        (subject.intakeCode.toLowerCase().includes(searchField.toLowerCase()) ||
          subject.subjectCode
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          subject.lecturerFullName
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          subject.lecturerFullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase())) &&
        (selectedStatus ? subject.status === selectedStatus.value : true)
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getAllSubjectsWithLecturer()}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({
        id: "SEARCH.BY.LECTURER.NAME.OR.INTAKE.OR.SUBJECT.CODE",
      }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    select: [
      {
        placeHolder: intl.formatMessage({ id: "SELECT.SUBJECT.STATUS" }),
        handleChange: e => setSelectedStatus(e),
        array: [
          {
            label: intl.formatMessage({ id: "STATUSES" }),
            options: [
              {
                value: "onGoing",
                label: intl.formatMessage({ id: "ONGOING" }),
              },
              {
                value: "finished",
                label: intl.formatMessage({ id: "FINISHED" }),
              },
              {
                value: "cancelled",
                label: intl.formatMessage({ id: "CANCELLED" }),
              },
            ],
          },
        ],
      },
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "SUBJECT.CODE" }),
        },
        {
          title: intl.formatMessage({ id: "LECTURER" }),
        },
        {
          title: intl.formatMessage({ id: "INTAKE.CODE" }),
        },
        {
          title: intl.formatMessage({ id: "STATUS" }),
        },
        { title: "" },
      ],
      row: subject => <SubjectLecturerTableRow subject={subject} />,
    },
    givenArray: filteredSubjects,
    title: intl.formatMessage({ id: "SUBJECT.-.LECTURER.-.INTAKE" }),
    emptyMessage: intl.formatMessage({ id: "NO.SUBJECTS.YET" }),
  }

  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  subjects: selectAllSubjectsWithLecturer,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsWithLecturer: () => dispatch(getAllSubjectsWithLecturerAsync()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectLecturerTable)
