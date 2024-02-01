import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col } from "reactstrap"
import { useIntl } from "react-intl"
import SubjectGeneralInformation from "./components/subject general information/SubjectGeneralInformation.component"
import SubjectDetailsComponent from "./components/subject details component/SubjectDetails.component"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import BackButton from "../../custom/back button/BackButton.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import {
  selectSelectedSubject,
  selectCurrentUserRole,
  selectSelectedUserUuid,
  selectGetLecturerSubjectErrorMessage,
  selectGetLecturerSubjectIsLoading,
} from "../../redux/index.selectors"
import { getLecturerSubjectAsync } from "../../redux/index.actions"
//-------------WITH SPINNER-------------
const SubjectGeneralInformationWithSpinner = WithSpinner(
  SubjectGeneralInformation
)
//--------------------------------------

const SubjectDetails = ({
  getLecturerSubject,
  lecturerUuid,
  selectedSubject,
  currentUserRole,
  getLecturerSubjectErrorMessage,
  getLecturerSubjectIsLoading,
}) => {
  const intl = useIntl()

  return (
    <Row>
      <BackButton
        messageId={
          currentUserRole === "lecturer"
            ? "BACK.TO.MY.SUBJECTS"
            : "BACK.TO.LECTURER.SUBJECTS"
        }
      />
      {selectedSubject ? (
        <>
          <Col xs={12}>
            <SubjectGeneralInformationWithSpinner
              subject={{ ...selectedSubject, lecturerUuid }}
              errorMessage={getLecturerSubjectErrorMessage}
              isLoading={getLecturerSubjectIsLoading}
              toBeDispatchedTryAgain={getLecturerSubject}
              toBeDispatchedPropsTryAgain={selectedSubject}
            />
          </Col>
          <Col xs={12}>
            <SubjectDetailsComponent />
          </Col>
        </>
      ) : (
        <Col xs={12}>
          <ErrorCard
            content={intl.formatMessage({ id: "NO.SUBJECT.SELECTED" })}
            info={true}
          />
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedSubject: selectSelectedSubject,
  currentUserRole: selectCurrentUserRole,
  lecturerUuid: selectSelectedUserUuid,
  getLecturerSubjectErrorMessage: selectGetLecturerSubjectErrorMessage,
  getLecturerSubjectIsLoading: selectGetLecturerSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getLecturerSubject: subject => dispatch(getLecturerSubjectAsync(subject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetails)
