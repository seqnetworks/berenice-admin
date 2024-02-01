import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import LecturerTimetableComponent from "./components/lecturer timtable/LecturerTimetable.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import { getAllClassesOfLecturerAsync } from "../../redux/index.actions"
import {
  selectCurrentUserRole,
  selectSelectedUserUuid,
  selectGetAllClassesOfLecturerErrorMessage,
  selectGetAllClassesOfLecturerIsLoading,
} from "../../redux/index.selectors"
//--------WITH SPINNERS--------
const LecturerTimetableComponentWithSpinner = WithSpinner(
  LecturerTimetableComponent
)
//-----------------------------

const LecturerTimetable = ({
  selectedUserUuid,
  currentUserRole,
  getAllClassesOfLecturer,
  getAllClassesOfLecturerErrorMessage,
  getAllClassesOfLecturerIsLoading,
}) => {
  return (
    <LecturerTimetableComponentWithSpinner
      card={true}
      toBeDispatchedUseEffect={getAllClassesOfLecturer}
      toBeDispatchedTryAgain={getAllClassesOfLecturer}
      toBeDispatchedPropsTryAgain={
        currentUserRole === "lecturer" ? null : selectedUserUuid
      }
      toBeDispatchedPropsUseEffect={
        currentUserRole === "lecturer" ? null : selectedUserUuid
      }
      errorMessage={getAllClassesOfLecturerErrorMessage}
      isLoading={getAllClassesOfLecturerIsLoading}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserUuid: selectSelectedUserUuid,
  currentUserRole: selectCurrentUserRole,
  getAllClassesOfLecturerErrorMessage: selectGetAllClassesOfLecturerErrorMessage,
  getAllClassesOfLecturerIsLoading: selectGetAllClassesOfLecturerIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllClassesOfLecturer: lecturerUuid =>
    dispatch(getAllClassesOfLecturerAsync(lecturerUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LecturerTimetable)
