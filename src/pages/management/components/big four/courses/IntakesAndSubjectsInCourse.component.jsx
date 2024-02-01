import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { BookOpen, Grid } from "react-feather"
import { Card, CardBody } from "reactstrap"
import IntakesInCourseTable from "./intakes andd subjects in course tables/intakes in course table/IntakesInCourseTable.component"
import SubjectsInCourseTable from "./intakes andd subjects in course tables/subjects in course table/SubjectsInCourseTable.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import WithSpinner from "../../../../../custom/with spinner/WithSpinner.component"
import CardViewerHorizontalNav from "../../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import {
  getAllSubjectsInCourseAsync,
  getAllIntakesInCourseAsync,
} from "../../../../../redux/index.actions"
import {
  selectSelectedCourse,
  selectSelectedCourseSubjects,
  selectSelectedCourseIntakes,
  selectGetAllSubjectsInCourseErrorMessage,
  selectGetAllSubjectsInCourseIsLoading,
  selectGetAllIntakesInCourseErrorMessage,
  selectGetAllIntakesInCourseIsLoading,
} from "../../../../../redux/index.selectors"
//--------WITH SPINNERS---------
const SubjectsInCourseTableWithSpinner = WithSpinner(SubjectsInCourseTable)
const IntakesInCourseTableWithSpinner = WithSpinner(IntakesInCourseTable)
//------------------------------
const IntakesAndSubjectsInCourse = ({
  courseCode,
  getAllSubjectsInCourseUseEffect,
  getAllSubjectsInCourseTryAgain,
  getAllIntakesInCourseUseEffect,
  getAllIntakesInCourseTryAgain,
  selectedCourse,
  selectedCourseSubjects,
  selectedCourseIntakes,
  getAllSubjectsInCourseErrorMessage,
  getAllSubjectsInCourseIsLoading,
  getAllIntakesInCourseErrorMessage,
  getAllIntakesInCourseIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const cards = [
    {
      ability: ability.can("manage", "subjects_in_course-GET"),
      tab: {
        title: intl.formatMessage({ id: "SUBJECTS" }),
        icon: <BookOpen size={18} />,
      },
      content: (
        <SubjectsInCourseTableWithSpinner
          courseCode={courseCode}
          subjects={selectedCourseSubjects}
          toBeDispatchedUseEffect={getAllSubjectsInCourseUseEffect}
          toBeDispatchedPropsUseEffect={{
            courseCode,
            selectedCourse,
            selectedCourseSubjects,
          }}
          toBeDispatchedTryAgain={getAllSubjectsInCourseTryAgain}
          toBeDispatchedPropsTryAgain={courseCode}
          errorMessage={getAllSubjectsInCourseErrorMessage}
          isLoading={getAllSubjectsInCourseIsLoading}
          activeTab={activeTab}
        />
      ),
    },
    {
      ability: ability.can("manage", "intakes_course-GET"),
      tab: {
        title: intl.formatMessage({ id: "INTAKES" }),
        icon: <Grid size={18} />,
      },
      content: (
        <IntakesInCourseTableWithSpinner
          courseCode={courseCode}
          intakes={selectedCourseIntakes}
          toBeDispatchedUseEffect={getAllIntakesInCourseUseEffect}
          toBeDispatchedPropsUseEffect={{
            courseCode,
            selectedCourse,
            selectedCourseIntakes,
          }}
          toBeDispatchedTryAgain={getAllIntakesInCourseTryAgain}
          toBeDispatchedPropsTryAgain={courseCode}
          errorMessage={getAllIntakesInCourseErrorMessage}
          isLoading={getAllIntakesInCourseIsLoading}
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
  return (
    <Card>
      <CardBody>
        <CardViewerHorizontalNav {...attributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedCourse: selectSelectedCourse,
  selectedCourseSubjects: selectSelectedCourseSubjects,
  selectedCourseIntakes: selectSelectedCourseIntakes,
  getAllSubjectsInCourseErrorMessage: selectGetAllSubjectsInCourseErrorMessage,
  getAllSubjectsInCourseIsLoading: selectGetAllSubjectsInCourseIsLoading,
  getAllIntakesInCourseErrorMessage: selectGetAllIntakesInCourseErrorMessage,
  getAllIntakesInCourseIsLoading: selectGetAllIntakesInCourseIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsInCourseUseEffect: ({
    courseCode,
    selectedCourse,
    selectedCourseSubjects,
  }) => {
    if (!selectedCourseSubjects || courseCode !== selectedCourse.code)
      dispatch(getAllSubjectsInCourseAsync(courseCode))
  },
  getAllSubjectsInCourseTryAgain: courseCode =>
    dispatch(getAllSubjectsInCourseAsync(courseCode)),
  getAllIntakesInCourseUseEffect: ({
    courseCode,
    selectedCourse,
    selectedCourseIntakes,
  }) => {
    if (!selectedCourseIntakes || courseCode !== selectedCourse.code)
      dispatch(getAllIntakesInCourseAsync(courseCode))
  },
  getAllIntakesInCourseTryAgain: courseCode =>
    dispatch(getAllIntakesInCourseAsync(courseCode)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntakesAndSubjectsInCourse)
