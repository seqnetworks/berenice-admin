import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col, Card, CardBody } from "reactstrap"
import { AbilityContext } from "../../utility/context/Can"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import BigFour from "./components/big four/BigFour.component"
import TimetableWithDaysTabs from "./components/timetables/TimetableWithDaysTabs.component"
import SubjectLecturerTable from "./components/subject lecturer/SubjectLecturerTable.component"
import { getAllSubjectsWithLecturerAsync } from "../../redux/index.actions"
import {
  selectGetAllSubjectsWithLecturerErrorMessage,
  selectGetAllSubjectsWithLecturerIsLoading,
} from "../../redux/index.selectors"
//------------WITH SPINNERS------------
const SubjectLecturerTableWithSpinner = WithSpinner(SubjectLecturerTable)
//-------------------------------------

const ManagementPage = ({
  getAllSubjectsWithLecturer,
  getAllSubjectsWithLecturerErrorMessage,
  getAllSubjectsWithLecturerIsLoading,
}) => {
  const ability = useContext(AbilityContext)

  return (
    <Row>
      {!ability.can("manage", "departments-GET") &&
      !ability.can("manage", "courses-GET") &&
      !ability.can("manage", "intakes-GET") &&
      !ability.can("manage", "subjects-GET") ? (
        <></>
      ) : (
        <Col xs={12}>
          <Card>
            <CardBody>
              <BigFour />
            </CardBody>
          </Card>
        </Col>
      )}
      {ability.can("manage", "classes-GET") && (
        <Col xs={12}>
          <Card>
            <CardBody>
              <TimetableWithDaysTabs />
            </CardBody>
          </Card>
        </Col>
      )}
      {ability.can("manage", "get_all_subjects_of_lecturers-GET") && (
        <Col xs={12}>
          <Card>
            <CardBody>
              <SubjectLecturerTableWithSpinner
                errorMessage={getAllSubjectsWithLecturerErrorMessage}
                isLoading={getAllSubjectsWithLecturerIsLoading}
                toBeDispatchedTryAgain={getAllSubjectsWithLecturer}
                toBeDispatchedUseEffect={getAllSubjectsWithLecturer}
              />
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  getAllSubjectsWithLecturerErrorMessage: selectGetAllSubjectsWithLecturerErrorMessage,
  getAllSubjectsWithLecturerIsLoading: selectGetAllSubjectsWithLecturerIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsWithLecturer: () => dispatch(getAllSubjectsWithLecturerAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagementPage)
