import React, { useContext } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { AbilityContext } from "../../utility/context/Can"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import HomeAssetsAndEFormsContainer from "./components/home assets and eforms/HomeAssetsAndEFormsContainer.component"
import CourseMaterials from "./components/course materials/CourseMaterials.component"
import {
  getCourseMaterialsAsync,
  getSubjectsAsync,
  getCurrentLecturerOngoingSubjectsAsync,
} from "../../redux/index.actions"
import {
  selectCurrentUserRole,
  selectGetCourseMaterialsErrorMessage,
  selectGetCourseMaterialsIsLoading,
  selectGetSubjectsErrorMessage,
  selectGetSubjectsIsLoading,
  selectGetCurrentLecturerOngoingSubjectsErrorMessage,
  selectGetCurrentLecturerOngoingSubjectsIsLoading,
} from "../../redux/index.selectors"
//--------WITH SPINNERS----------
const CourseMaterialsWithSpinner = WithSpinner(CourseMaterials)
//-------------------------------

const FilesPage = ({
  currentUserRole,
  getCourseMaterials,
  getSubjects,
  getCurrentLecturerOngoingSubjects,
  getCourseMaterialsErrorMessage,
  getCourseMaterialsIsLoading,
  getSubjectsErrorMessage,
  getSubjectsIsLoading,
  getCurrentLecturerOngoingSubjectsErrorMessage,
  getCurrentLecturerOngoingSubjectsIsLoading,
}) => {
  const ability = useContext(AbilityContext)

  const toBeDispatched = () => {
    getCourseMaterials()
    currentUserRole === "staff"
      ? getSubjects()
      : getCurrentLecturerOngoingSubjects()
  }
  return (
    <Row>
      {!ability.can("manage", "home_asset-GET") &&
      !ability.can("manage", "eForms-GET") ? (
        <></>
      ) : (
        <Col xs={12}>
          <Card>
            <CardBody>
              <HomeAssetsAndEFormsContainer />
            </CardBody>
          </Card>
        </Col>
      )}
      {ability.can("manage", "courseMaterialFolders-GET") && (
        <Col xs={12}>
          <Card>
            <CardBody>
              <CourseMaterialsWithSpinner
                errorMessage={
                  getCourseMaterialsErrorMessage ||
                  (currentUserRole === "staff"
                    ? getSubjectsErrorMessage
                    : getCurrentLecturerOngoingSubjectsErrorMessage)
                }
                isLoading={
                  getCourseMaterialsIsLoading ||
                  (currentUserRole === "staff"
                    ? getSubjectsIsLoading
                    : getCurrentLecturerOngoingSubjectsIsLoading)
                }
                toBeDispatchedUseEffect={toBeDispatched}
                toBeDispatchedTryAgain={toBeDispatched}
              />
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
  getCourseMaterialsErrorMessage: selectGetCourseMaterialsErrorMessage,
  getCourseMaterialsIsLoading: selectGetCourseMaterialsIsLoading,
  getSubjectsErrorMessage: selectGetSubjectsErrorMessage,
  getSubjectsIsLoading: selectGetSubjectsIsLoading,
  getCurrentLecturerOngoingSubjectsErrorMessage: selectGetCurrentLecturerOngoingSubjectsErrorMessage,
  getCurrentLecturerOngoingSubjectsIsLoading: selectGetCurrentLecturerOngoingSubjectsIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getCourseMaterials: () => dispatch(getCourseMaterialsAsync()),
  getSubjects: () => dispatch(getSubjectsAsync()),
  getCurrentLecturerOngoingSubjects: () =>
    dispatch(getCurrentLecturerOngoingSubjectsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesPage)
