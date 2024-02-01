import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col } from "reactstrap"
import AssessmentGeneralInformarion from "./components/assessment general information/AssessmentGeneralInformarion.component"
import StudentsMarksInAssessmentTable from "./components/students marks in assessment table/StudentsMarksInAssessmentTable.component"
import BackButton from "../../custom/back button/BackButton.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import { getAllStudentsMarksInSubjectAsync } from "../../redux/index.actions"
import {
  selectSelectedAssessmentInfo,
  selectGetAllStudentsMarksInSubjectErrorMessage,
  selectGetAllStudentsMarksInSubjectIsLoading,
} from "../../redux/index.selectors"
//--------WITH SPIINNERS--------
const StudentsMarksInAssessmentTableWithSpinner = WithSpinner(
  StudentsMarksInAssessmentTable
)
//------------------------------

const AssessmentPage = ({
  getAllStudentsMarksInSubject,
  info,
  getAllStudentsMarksInSubjectErrorMessage,
  getAllStudentsMarksInSubjectIsLoading,
}) => {
  return (
    <Row>
      <BackButton messageId="BACK.TO.SUBJECT" />
      <Col xs={12}>
        <AssessmentGeneralInformarion />
      </Col>
      <Col xs={12}>
        <StudentsMarksInAssessmentTableWithSpinner
          card={true}
          errorMessage={getAllStudentsMarksInSubjectErrorMessage}
          isLoading={getAllStudentsMarksInSubjectIsLoading}
          toBeDispatchedUseEffect={getAllStudentsMarksInSubject}
          toBeDispatchedPropsUseEffect={info.uuid}
          toBeDispatchedTryAgain={getAllStudentsMarksInSubject}
          toBeDispatchedPropsTryAgain={info.uuid}
        />
      </Col>
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  info: selectSelectedAssessmentInfo,
  getAllStudentsMarksInSubjectErrorMessage: selectGetAllStudentsMarksInSubjectErrorMessage,
  getAllStudentsMarksInSubjectIsLoading: selectGetAllStudentsMarksInSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsMarksInSubject: assessmentUuid =>
    dispatch(getAllStudentsMarksInSubjectAsync(assessmentUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentPage)
