import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import IntakeManagment from "./intake managment/IntakeManagment.component"
import StudentIntakesTable from "./student intakes table/StudentIntakesTable.component"
import CardViewerHorizontalNav from "../../../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import { AbilityContext } from "../../../../../../utility/context/Can"
import WithSpinner from "../../../../../../custom/with spinner/WithSpinner.component"
import { getStudentCgpaAsync } from "../../../../../../redux/index.actions"
import {
  selectGetStudentCgpaErrorMessage,
  selectGetStudentCgpaIsLoading,
} from "../../../../../../redux/index.selectors"
//----------WITH SPINNER----------
const IntakeManagmentWithSpinner = WithSpinner(IntakeManagment)
//--------------------------------
const StudentIntake = ({
  getStudentCgpa,
  studentUuid,
  getStudentCgpaErrorMessage,
  getStudentCgpaIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const attributes = {
    cards: [
      {
        tab: {
          title: intl.formatMessage({
            id: "INTAKE.MANAGMENT",
          }),
        },
        content: (
          <IntakeManagmentWithSpinner
            errorMessage={getStudentCgpaErrorMessage}
            isLoading={getStudentCgpaIsLoading}
            toBeDispatchedUseEffect={getStudentCgpa}
            toBeDispatchedPropsUseEffect={studentUuid}
            toBeDispatchedTryAgain={getStudentCgpa}
            toBeDispatchedPropsTryAgain={studentUuid}
          />
        ),
      },
    ],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }

  if (ability.can("manage", "student_intakes-GET"))
    attributes.cards.push({
      tab: {
        title: intl.formatMessage({
          id: "STUDENT.INTAKES",
        }),
      },
      content: <StudentIntakesTable />,
    })
  if (ability.can("manage", "student_intakes-GET")) attributes.cards.push()
  return <CardViewerHorizontalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  getStudentCgpaErrorMessage: selectGetStudentCgpaErrorMessage,
  getStudentCgpaIsLoading: selectGetStudentCgpaIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getStudentCgpa: studentUuid => dispatch(getStudentCgpaAsync(studentUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentIntake)
