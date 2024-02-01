import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import { useIntl } from "react-intl"
import { Divider } from "@material-ui/core"
import { AbilityContext } from "../../../../../utility/context/Can"
import Table from "../../../../../custom/table/table.component"
import SubjectsTableRow from "./SubjectsTableRow.component"
import CreateNewSubject from "./CreateNewSubject.component"
import AddSubjectToIntake from "./AddSubjectToIntake.component"
import AddSubjectToCourse from "./AddSubjectToCourse.component"
import CardViewerHorizontalNav from "../../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import {
  createSubjectAsync,
  getAllSubjectsAsync,
  getLecturersAsync,
  getAllIntakesAsync,
} from "../../../../../redux/index.actions"
import {
  selectAllSubjects,
  selectCreateSubjectIsLoading,
} from "../../../../../redux/index.selectors"

const SubjectsTable = ({ subjects, getAllSubjects, activeTab }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const [searchField, setSearchField] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

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
        className="px-1 "
        color="primary"
        onClick={() => getAllSubjects()}
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
          title: intl.formatMessage({ id: "TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "DESCRIPTION" }),
          styles: { minWidth: "280px" },
        },
        {
          title: intl.formatMessage({ id: "TYPE" }),
        },
        {
          title: intl.formatMessage({ id: "PREREQUISITES" }),
        },
        {
          title: "",
        },
      ],
      row: subject => <SubjectsTableRow subject={subject} />,
    },
    givenArray: filteredSubjects,
    title: intl.formatMessage({ id: "SUBJECTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.SUBJECTS.YET" }),
  }

  const cards = [
    {
      ability: ability.can("manage", "add_subject_intake-POST"),
      tab: {
        title: intl.formatMessage({ id: "ADD.SUBJECT.TO.INTAKE" }),
      },
      content: (
        <AddSubjectToIntake activeTab={activeTab} activeCard={activeCard} />
      ),
    },
    {
      ability: ability.can("manage", "add_subject_course-POST"),
      tab: {
        title: intl.formatMessage({ id: "ADD.SUBJECT.TO.COURSE" }),
      },
      content: (
        <AddSubjectToCourse activeTab={activeTab} activeCard={activeCard} />
      ),
    },
    {
      ability: ability.can("manage", "subject-POST"),
      tab: {
        title: intl.formatMessage({ id: "CREATE.NEW.SUBJECT" }),
      },
      content: (
        <CreateNewSubject activeTab={activeTab} activeCard={activeCard} />
      ),
    },
  ]

  const attributes = {
    cards: [],
    activeTab: activeCard,
    setActiveTab: index => setActiveCard(index),
  }

  cards.map(card => {
    if (card.ability) attributes.cards.push(card)
  })

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {!ability.can("manage", "subject-POST") &&
      !ability.can("manage", "add_subject_course-POST") &&
      !ability.can("manage", "add_subject_intake-POST") ? (
        <></>
      ) : (
        <>
          <CardViewerHorizontalNav {...attributes} />
          <Divider variant="middle" className="my-50" />
        </>
      )}
      <Table {...tableAttributes} />
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  subjects: selectAllSubjects,
  createSubjectIsLoading: selectCreateSubjectIsLoading,
})

const mapDisptachToProps = dispatch => ({
  createSubject: (requestBody, messages) =>
    dispatch(createSubjectAsync(requestBody, messages)),
  getAllSubjects: () => {
    dispatch(getAllSubjectsAsync())
    dispatch(getLecturersAsync())
    dispatch(getAllIntakesAsync())
  },
})

export default connect(mapStateToProps, mapDisptachToProps)(SubjectsTable)
