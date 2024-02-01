import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import ClassesTable from "./ClassesTable.component"
import {
  getAllClassesAsync,
  getSubjectsAsync,
  getAllIntakesAsync,
} from "../../../../redux/index.actions"
import {
  selectAllClasses,
  selectGetAllClassesErrorMessage,
  selectGetAllClassesIsLoading,
  selectGetSubjectsErrorMessage,
  selectGetSubjectsIsLoading,
  selectGetAllIntakesErrorMessage,
  selectGetAllIntakesInCourseIsLoading,
} from "../../../../redux/index.selectors"
//--------WITH SPINNERS--------
const ClassesTableWithSpinner = WithSpinner(ClassesTable)
//-----------------------------
const TimetableWithDaysTabs = ({
  classes,
  getAllClasses,
  getSubjects,
  getAllIntakes,
  getAllClassesErrorMessage,
  getAllClassesIsLoading,
  getSubjectsErrorMessage,
  getSubjectsIsLoading,
  getAllIntakesErrorMessage,
  getAllIntakesInCourseIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()

  let withSpinnerComponentAttributes = {
    toBeDispatchedTryAgain: () => {
      getAllClasses()
      getSubjects()
      getAllIntakes()
    },
    errorMessage: getAllClassesErrorMessage,
    isLoading:
      getAllClassesIsLoading ||
      getSubjectsIsLoading ||
      getAllIntakesInCourseIsLoading,
  }

  const attributes = {
    cards: [
      {
        tab: {
          title: intl.formatMessage({ id: "ALL.DAYS" }),
        },
        content: (
          <ClassesTableWithSpinner
            toBeDispatchedUseEffect={classes => {
              if (!classes) {
                getAllClasses()
                getSubjects()
                getAllIntakes()
              }
            }}
            toBeDispatchedPropsUseEffect={classes}
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "SATURDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="saturday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "SUNDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="sunday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "MONDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="monday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "TUESDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="tuesday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "WEDNESDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="wednesday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "THURSDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="thursday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "FRIDAY" }),
        },
        content: (
          <ClassesTableWithSpinner
            day="friday"
            {...withSpinnerComponentAttributes}
          />
        ),
      },
    ],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  return <CardViewerHorizontalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  classes: selectAllClasses,
  getAllClassesErrorMessage: selectGetAllClassesErrorMessage,
  getAllClassesIsLoading: selectGetAllClassesIsLoading,
  getSubjectsErrorMessage: selectGetSubjectsErrorMessage,
  getSubjectsIsLoading: selectGetSubjectsIsLoading,
  getAllIntakesErrorMessage: selectGetAllIntakesErrorMessage,
  getAllIntakesInCourseIsLoading: selectGetAllIntakesInCourseIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllClasses: () => dispatch(getAllClassesAsync()),
  getSubjects: () => dispatch(getSubjectsAsync()),
  getAllIntakes: () => dispatch(getAllIntakesAsync()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimetableWithDaysTabs)
