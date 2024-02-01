import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import LecturerSubjects from "./components/lecturer subjects/LecturerSubjects.component"
import { AbilityContext } from "../../utility/context/Can"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import { getAllSubjectsOfSingleLecturerAsync } from "../../redux/index.actions"
import {
  selectGetAllSubjectsOfSingleLecturerErrorMessage,
  selectGetAllSubjectsOfSingleLecturerIsLoading,
  selectCurrentUserRole,
  selectSelectedUserUuid,
} from "../../redux/index.selectors"
//------WITH SPINNERS------
const LecturerSubjectsWithSpinner = WithSpinner(LecturerSubjects)
//-------------------------
const LecturerSubjectsPage = ({
  getAllSubjectsOfLecturer,
  currentUserRole,
  selectedUserUuid,
  getAllSubjectsOfLecturerErrorMessage,
  getAllSubjectsOfLecturerIsLoading,
}) => {
  const ability = useContext(AbilityContext)

  return (
    ability.can("manage", "get_all_subjects_of_lecturer-GET") && (
      <LecturerSubjectsWithSpinner
        card={true}
        toBeDispatchedPropsTryAgain={
          currentUserRole === "lecturer" ? null : selectedUserUuid
        }
        toBeDispatchedPropsUseEffect={
          currentUserRole === "lecturer" ? null : selectedUserUuid
        }
        toBeDispatchedUseEffect={getAllSubjectsOfLecturer}
        toBeDispatchedTryAgain={getAllSubjectsOfLecturer}
        errorMessage={getAllSubjectsOfLecturerErrorMessage}
        isLoading={getAllSubjectsOfLecturerIsLoading}
      />
    )
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
  selectedUserUuid: selectSelectedUserUuid,
  getAllSubjectsOfLecturerErrorMessage: selectGetAllSubjectsOfSingleLecturerErrorMessage,
  getAllSubjectsOfLecturerIsLoading: selectGetAllSubjectsOfSingleLecturerIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsOfLecturer: lecturerUuid =>
    dispatch(getAllSubjectsOfSingleLecturerAsync(lecturerUuid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LecturerSubjectsPage)
