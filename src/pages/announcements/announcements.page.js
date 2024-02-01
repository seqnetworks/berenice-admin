import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody } from "reactstrap"
import { useIntl } from "react-intl"
import UserAnnouncementsTable from "./components/user announcements table/UserAnnouncementsTable.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import BackButton from "../../custom/back button/BackButton.component"
import {
  getAnnouncementsOfSingalUserAsync,
  getCurrentLecturerOngoingSubjectsAsync,
} from "../../redux/index.actions"
import {
  selectGetAnnouncementsOfSingalUserErrorMessage,
  selectGetAnnouncementsOfSingalUserIsLoading,
  selectGetCurrentLecturerOngoingSubjectsErrorMessage,
  selectGetCurrentLecturerOngoingSubjectsIsLoading,
  selectCurrentUserRole,
  selectSelectedUserRole,
  selectCurrentUserUuid,
  selectSelectedUserUuid,
  selectSelectedUserUserUuid,
} from "../../redux/index.selectors"
//---------WITH SPINNERS--------------
const UserAnnouncementsTableWithSpinner = WithSpinner(UserAnnouncementsTable)
//------------------------------------

const AnnouncementsPage = ({
  getCurrentLecturerOngoingSubjects,
  getCurrentLecturerOngoingSubjectsErrorMessage,
  getCurrentLecturerOngoingSubjectsIsLoading,
  getAnnouncementsOfSingalUser,
  getAnnouncementsOfSingalUserErrorMessage,
  getAnnouncementsOfSingalUserIsLoading,
  currentUserRole,
  currentUserUuid,
  selectedUserRole,
  selectedUserUuid,
  selectedUserUserUuid,
}) => {
  const intl = useIntl()

  return currentUserRole === "lecturer" ? (
    <UserAnnouncementsTableWithSpinner
      card={true}
      toBeDispatchedUseEffect={currentUserUuid => {
        getAnnouncementsOfSingalUser(currentUserUuid)
        getCurrentLecturerOngoingSubjects()
      }}
      toBeDispatchedPropsUseEffect={currentUserUuid}
      toBeDispatchedTryAgain={currentUserUuid => {
        getAnnouncementsOfSingalUser(currentUserUuid)
        getCurrentLecturerOngoingSubjects()
      }}
      toBeDispatchedPropsTryAgain={currentUserUuid}
      isLoading={
        getAnnouncementsOfSingalUserIsLoading ||
        getCurrentLecturerOngoingSubjectsIsLoading
      }
      errorMessage={
        getAnnouncementsOfSingalUserErrorMessage ||
        getCurrentLecturerOngoingSubjectsErrorMessage
      }
      userUuid={currentUserUuid}
    />
  ) : selectedUserUuid &&
    (selectedUserRole === "staff" || selectedUserRole === "lecturer") ? (
    <>
      <BackButton messageId="BACK.TO.PROFILE" />
      <UserAnnouncementsTableWithSpinner
        card={true}
        toBeDispatchedUseEffect={getAnnouncementsOfSingalUser}
        toBeDispatchedPropsUseEffect={selectedUserUserUuid}
        toBeDispatchedTryAgain={getAnnouncementsOfSingalUser}
        toBeDispatchedPropsTryAgain={selectedUserUserUuid}
        isLoading={getAnnouncementsOfSingalUserIsLoading}
        errorMessage={getAnnouncementsOfSingalUserErrorMessage}
        userUuid={selectedUserUserUuid}
      />
    </>
  ) : (
    <>
      <BackButton messageId="BACK.TO.PROFILE" />
      <Card className="w-100">
        <CardBody>
          <ErrorCard
            info={true}
            content={intl.formatMessage({ id: "NO.SELECTED.USER" })}
          />
        </CardBody>
      </Card>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  getAnnouncementsOfSingalUserErrorMessage: selectGetAnnouncementsOfSingalUserErrorMessage,
  getAnnouncementsOfSingalUserIsLoading: selectGetAnnouncementsOfSingalUserIsLoading,
  getCurrentLecturerOngoingSubjectsErrorMessage: selectGetCurrentLecturerOngoingSubjectsErrorMessage,
  getCurrentLecturerOngoingSubjectsIsLoading: selectGetCurrentLecturerOngoingSubjectsIsLoading,
  currentUserRole: selectCurrentUserRole,
  currentUserUuid: selectCurrentUserUuid,
  selectedUserRole: selectSelectedUserRole,
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserUserUuid: selectSelectedUserUserUuid,
})

const mapDispatchToProps = dispatch => ({
  getAnnouncementsOfSingalUser: username =>
    dispatch(getAnnouncementsOfSingalUserAsync(username)),
  getCurrentLecturerOngoingSubjects: () =>
    dispatch(getCurrentLecturerOngoingSubjectsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage)
