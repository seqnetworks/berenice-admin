import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col, Card, CardBody } from "reactstrap"
import { useIntl } from "react-intl"
import AddSubjectToStudent from "./components/add subject to student/AddSubjectToStudent.component"
import StudentSubjects from "./components/student subjects/StudentSubjects.somponent"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import BackButton from "../../custom/back button/BackButton.component"
import { AbilityContext } from "../../utility/context/Can"
import { useRTL } from "../../utility/hooks/useRTL"
import {
  getAllSubjectsThatStudentCanEnrollToAsync,
  getAllSubjectsWithIntakesAsync,
} from "../../redux/index.actions"
import {
  selectSelectedUserUuid,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
  selectGetAllSubjectsThatStudentCanEnrollToErrorMessage,
  selectGetAllSubjectsThatStudentCanEnrollToIsLoading,
  selectGetAllSubjectsWithIntakesErrorMessage,
  selectGetAllSubjectsWithIntakesIsLoading,
} from "../../redux/index.selectors"
//--------WITH SPINNERS---------
const AddSubjectToStudentDialogWithSpinner = WithSpinner(AddSubjectToStudent)
//------------------------------

const SubjectsPage = ({
  getAllSubjectsWithIntakes,
  getAllSubjectsThatStudentCanEnrollTo,
  selectedUserUuid,
  selectedUserFullName,
  selectedUserFullNameArabic,
  getAllSubjectsThatStudentCanEnrollToErrorMessage,
  getAllSubjectsThatStudentCanEnrollToIsLoading,
  getAllSubjectsWithIntakesErrorMessage,
  getAllSubjectsWithIntakesIsLoading,
}) => {
  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  return (
    <Row>
      <BackButton messageId="BACK.TO.PROFILE" />
      {ability.can("manage", "add_subject_student-POST") && (
        <Col xs={12}>
          <Card className="mb-1 w-100">
            <CardBody
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="m-0">
                {rtl
                  ? intl.formatMessage({ id: "'S.SUBJECTS" }) +
                    selectedUserFullNameArabic
                  : selectedUserFullName +
                    intl.formatMessage({ id: "'S.SUBJECTS" })}
              </h2>
              <AddSubjectToStudentDialogWithSpinner
                noCardBody={true}
                toBeDispatchedTryAgain={selectedUserUuid => {
                  getAllSubjectsThatStudentCanEnrollTo(selectedUserUuid)
                  getAllSubjectsWithIntakes()
                }}
                toBeDispatchedUseEffect={selectedUserUuid => {
                  getAllSubjectsThatStudentCanEnrollTo(selectedUserUuid)
                  getAllSubjectsWithIntakes()
                }}
                toBeDispatchedPropsTryAgain={selectedUserUuid}
                toBeDispatchedPropsUseEffect={selectedUserUuid}
                errorMessage={
                  getAllSubjectsThatStudentCanEnrollToErrorMessage ||
                  getAllSubjectsWithIntakesErrorMessage
                }
                isLoading={
                  getAllSubjectsThatStudentCanEnrollToIsLoading ||
                  getAllSubjectsWithIntakesIsLoading
                }
              />
            </CardBody>
          </Card>
        </Col>
      )}

      {ability.can("manage", "get_all_subjects_of_student-GET") && (
        <Col xs={12}>
          <Card>
            <CardBody>
              <StudentSubjects />
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  getAllSubjectsThatStudentCanEnrollToErrorMessage: selectGetAllSubjectsThatStudentCanEnrollToErrorMessage,
  getAllSubjectsThatStudentCanEnrollToIsLoading: selectGetAllSubjectsThatStudentCanEnrollToIsLoading,
  getAllSubjectsWithIntakesErrorMessage: selectGetAllSubjectsWithIntakesErrorMessage,
  getAllSubjectsWithIntakesIsLoading: selectGetAllSubjectsWithIntakesIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsThatStudentCanEnrollTo: studentUuid =>
    dispatch(getAllSubjectsThatStudentCanEnrollToAsync(studentUuid)),
  getAllSubjectsWithIntakes: () => dispatch(getAllSubjectsWithIntakesAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage)
