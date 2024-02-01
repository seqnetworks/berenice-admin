import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Database, Grid, BookOpen, Bookmark } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import DepartmentsTable from "./departments/DepartmentsTable.component"
import CoursesTable from "./courses/CoursesTable.component"
import IntakesTable from "./intakes/IntakesTable.component"
import SubjectsTable from "./subjects/SubjectsTable.component"
import {
  getAllDepartmentsAsync,
  getAllCoursesAsync,
  getAllIntakesAsync,
  getAllSubjectsAsync,
  getLecturersAsync,
} from "../../../../redux/index.actions"
import {
  selectAllDepartments,
  selectAllCourses,
  selectAllIntakes,
  selectAllSubjects,
  selectGetAllDepartmentsErrorMessage,
  selectGetAllDepartmentsIsLoading,
  selectGetAllCoursesErrorMessage,
  selectGetAllCoursesIsLoading,
  selectGetAllIntakesErrorMessage,
  selectGetAllIntakesIsLoading,
  selectGetAllSubjectsErrorMessage,
  selectGetAllSubjectsIsLoading,
  selectGetLecturersErrorMessage,
  selectGetLecturersIsLoading,
} from "../../../../redux/index.selectors"

//---------WITH SPINNERS---------
const DepartmentsTableWithSpinner = WithSpinner(DepartmentsTable)
const CoursesTableWithSpinner = WithSpinner(CoursesTable)
const IntakesTableWithSpinner = WithSpinner(IntakesTable)
const SubjectsTableWithSpinner = WithSpinner(SubjectsTable)
//-------------------------------
const BigFour = ({
  getAllDepartmentsUseEffect,
  getAllDepartmentsTryAgain,
  getAllCoursesUseEffect,
  getAllCoursesTryAgain,
  getAllIntakesUseEffect,
  getAllIntakesTryAgain,
  getAllSubjectsUseEffect,
  getAllSubjectsTryAgain,
  departments,
  courses,
  intakes,
  subjects,
  getAllDepartmentsErrorMessage,
  getAllDepartmentsIsLoading,
  getAllCoursesErrorMessage,
  getAllCoursesIsLoading,
  getAllIntakesErrorMessage,
  getAllIntakesIsLoading,
  getAllSubjectsErrorMessage,
  getAllSubjectsIsLoading,
  getLecturersErrorMessage,
  getLecturersIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const cards = [
    {
      ability: ability.can("manage", "departments-GET"),
      tab: {
        title: intl.formatMessage({ id: "DEPARTMENTS" }),
        icon: <Database size={18} />,
      },
      content: (
        <DepartmentsTableWithSpinner
          toBeDispatchedUseEffect={getAllDepartmentsUseEffect}
          toBeDispatchedPropsUseEffect={departments}
          toBeDispatchedTryAgain={getAllDepartmentsTryAgain}
          errorMessage={getAllDepartmentsErrorMessage}
          isLoading={getAllDepartmentsIsLoading}
          activeTab={activeTab}
        />
      ),
    },
    {
      ability: ability.can("manage", "courses-GET"),
      tab: {
        title: intl.formatMessage({ id: "COURSES" }),
        icon: <Bookmark size={18} />,
      },
      content: (
        <CoursesTableWithSpinner
          toBeDispatchedUseEffect={getAllCoursesUseEffect}
          toBeDispatchedPropsUseEffect={courses}
          toBeDispatchedTryAgain={getAllCoursesTryAgain}
          errorMessage={getAllCoursesErrorMessage}
          isLoading={getAllCoursesIsLoading}
          activeTab={activeTab}
        />
      ),
    },
    {
      ability: ability.can("manage", "intakes-GET"),
      tab: {
        title: intl.formatMessage({ id: "INTAKES" }),
        icon: <Grid size={18} />,
      },
      content: (
        <IntakesTableWithSpinner
          toBeDispatchedUseEffect={getAllIntakesUseEffect}
          toBeDispatchedPropsUseEffect={intakes}
          toBeDispatchedTryAgain={getAllIntakesTryAgain}
          errorMessage={getAllIntakesErrorMessage}
          isLoading={getAllIntakesIsLoading}
          activeTab={activeTab}
        />
      ),
    },
    {
      ability: ability.can("manage", "subjects-GET"),
      tab: {
        title: intl.formatMessage({ id: "SUBJECTS" }),
        icon: <BookOpen size={18} />,
      },
      content: (
        <SubjectsTableWithSpinner
          toBeDispatchedUseEffect={getAllSubjectsUseEffect}
          toBeDispatchedPropsUseEffect={subjects}
          toBeDispatchedTryAgain={getAllSubjectsTryAgain}
          errorMessage={getAllSubjectsErrorMessage}
          isLoading={
            getAllSubjectsIsLoading ||
            getLecturersIsLoading ||
            getAllIntakesIsLoading
          }
          activeTab={activeTab}
        />
      ),
    },
  ]

  const attributes = {
    cards: [],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  cards.map(card => {
    if (card.ability) attributes.cards.push(card)
  })
  return <CardViewerHorizontalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  departments: selectAllDepartments,
  courses: selectAllCourses,
  intakes: selectAllIntakes,
  subjects: selectAllSubjects,
  getAllDepartmentsErrorMessage: selectGetAllDepartmentsErrorMessage,
  getAllDepartmentsIsLoading: selectGetAllDepartmentsIsLoading,
  getAllCoursesErrorMessage: selectGetAllCoursesErrorMessage,
  getAllCoursesIsLoading: selectGetAllCoursesIsLoading,
  getAllIntakesErrorMessage: selectGetAllIntakesErrorMessage,
  getAllIntakesIsLoading: selectGetAllIntakesIsLoading,
  getAllSubjectsErrorMessage: selectGetAllSubjectsErrorMessage,
  getAllSubjectsIsLoading: selectGetAllSubjectsIsLoading,
  getLecturersErrorMessage: selectGetLecturersErrorMessage,
  getLecturersIsLoading: selectGetLecturersIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllDepartmentsUseEffect: departments => {
    if (!departments) dispatch(getAllDepartmentsAsync())
  },
  getAllDepartmentsTryAgain: () => dispatch(getAllDepartmentsAsync()),
  getAllCoursesUseEffect: courses => {
    if (!courses) dispatch(getAllCoursesAsync())
  },
  getAllCoursesTryAgain: () => dispatch(getAllCoursesAsync()),
  getAllIntakesUseEffect: intakes => {
    if (!intakes) dispatch(getAllIntakesAsync())
  },
  getAllIntakesTryAgain: () => dispatch(getAllIntakesAsync()),
  getAllSubjectsUseEffect: subjects => {
    if (!subjects) {
      dispatch(getAllSubjectsAsync())
      dispatch(getLecturersAsync())
      dispatch(getAllIntakesAsync())
    }
  },
  getAllSubjectsTryAgain: () => {
    dispatch(getAllSubjectsAsync())
    dispatch(getLecturersAsync())
    dispatch(getAllIntakesAsync())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BigFour)
