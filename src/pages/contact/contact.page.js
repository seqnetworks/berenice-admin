import React, { useContext, useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col, Card } from "reactstrap"
import { createStructuredSelector } from "reselect"
import SendNotificationOrAnnouncement from "./components/send notification or announcement/SendNotificationOrAnnouncement.component"
import AllAnnouncementsTable from "./components/all announcements table/AllAnnouncementsTable.component"
import AllFollowUpsTable from "./components/all follow ups table/AllFollowUpsTable.component"
import { AbilityContext } from "../../utility/context/Can"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import {
  getAllUsersAsync,
  getAllIntakesAsync,
  getAllAnnouncementsAsync,
  getAllFollowUpsAsync,
  getStudentsAsync,
  getGuardiansAsync,
  getAllSubjectsWithLecturerAsync,
} from "../../redux/index.actions"
import {
  selectGetAllUsersErrorMessage,
  selectGetAllUsersIsLoading,
  selectGetAllIntakesErrorMessage,
  selectGetAllIntakesIsLoading,
  selectGetAllAnnouncementsErrorMessage,
  selectGetAllAnnouncementsIsLoading,
  selectGetAllFollowUpsErrorMessage,
  selectGetAllFollowUpsIsLoading,
  selectGetStudentsErrorMessage,
  selectGetStudentsIsLoading,
  selectGetGuardiansErrorMessage,
  selectGetGuardiansIsLoading,
  selectGetAllSubjectsWithLecturerErrorMessage,
  selectGetAllSubjectsWithLecturerIsLoading,
} from "../../redux/index.selectors"
//-----------WITH SPINNERS-----------
const SendNotificationOrAnnouncementWithSpinner = WithSpinner(
  SendNotificationOrAnnouncement
)
const AllAnnouncementsTableWithSpinner = WithSpinner(AllAnnouncementsTable)
const AllFollowUpsTableWithSpinner = WithSpinner(AllFollowUpsTable)
//-----------------------------------
const ContactPage = ({
  getAllUsers,
  getAllIntakes,
  getAllAnnouncements,
  getAllFollowUps,
  getStudents,
  getGuardians,
  getAllSubjectsWithLecturer,
  getAllUsersErrorMessage,
  getAllUsersIsLoading,
  getAllIntakesErrorMessage,
  getAllIntakesIsLoading,
  getAllAnnouncementsErrorMessage,
  getAllAnnouncementsIsLoading,
  getAllFollowUpsErrorMessage,
  getAllFollowUpsIsLoading,
  getStudentsErrorMessage,
  getStudentsIsLoading,
  getGuardiansErrorMessage,
  getGuardiansIsLoading,
  getAllSubjectsWithLecturerErrorMessage,
  getAllSubjectsWithLecturerIsLoading,
}) => {
  const ability = useContext(AbilityContext)

  const SendNotificationOrAnnouncementToBeDispatched = () => {
    getAllUsers()
    getAllIntakes()
    getAllSubjectsWithLecturer()
  }

  const allFollowUpsToBeDispatched = () => {
    getAllFollowUps()
    getStudents()
    getGuardians()
  }
  return (
    <Row>
      {!ability.can("manage", "announcement-POST") &&
      !ability.can("manage", "notification-POST") ? (
        <></>
      ) : (
        <Col xs={12}>
          <Card>
            <SendNotificationOrAnnouncementWithSpinner
              errorMessage={getAllUsersErrorMessage}
              isLoading={
                getAllUsersIsLoading ||
                getAllIntakesIsLoading ||
                getAllSubjectsWithLecturerIsLoading
              }
              toBeDispatchedUseEffect={
                SendNotificationOrAnnouncementToBeDispatched
              }
              toBeDispatchedTryAgain={
                SendNotificationOrAnnouncementToBeDispatched
              }
            />
          </Card>
        </Col>
      )}
      {ability.can("manage", "announcements-GET") && (
        <Col xs={12}>
          <Card>
            <AllAnnouncementsTableWithSpinner
              errorMessage={getAllAnnouncementsErrorMessage}
              isLoading={getAllAnnouncementsIsLoading}
              toBeDispatchedUseEffect={getAllAnnouncements}
              toBeDispatchedTryAgain={getAllAnnouncements}
            />
          </Card>
        </Col>
      )}
      {ability.can("manage", "follow_ups-GET") && (
        <Col xs={12}>
          <Card>
            <AllFollowUpsTableWithSpinner
              errorMessage={
                getAllFollowUpsErrorMessage ||
                getStudentsErrorMessage ||
                getGuardiansErrorMessage
              }
              isLoading={
                getAllFollowUpsIsLoading ||
                getStudentsIsLoading ||
                getGuardiansIsLoading
              }
              toBeDispatchedUseEffect={allFollowUpsToBeDispatched}
              toBeDispatchedTryAgain={allFollowUpsToBeDispatched}
            />
          </Card>
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  getAllUsersIsLoading: selectGetAllUsersIsLoading,
  getAllUsersErrorMessage: selectGetAllUsersErrorMessage,
  getAllIntakesErrorMessage: selectGetAllIntakesErrorMessage,
  getAllIntakesIsLoading: selectGetAllIntakesIsLoading,
  getAllAnnouncementsErrorMessage: selectGetAllAnnouncementsErrorMessage,
  getAllAnnouncementsIsLoading: selectGetAllAnnouncementsIsLoading,
  getAllFollowUpsErrorMessage: selectGetAllFollowUpsErrorMessage,
  getAllFollowUpsIsLoading: selectGetAllFollowUpsIsLoading,
  getStudentsErrorMessage: selectGetStudentsErrorMessage,
  getStudentsIsLoading: selectGetStudentsIsLoading,
  getGuardiansErrorMessage: selectGetGuardiansErrorMessage,
  getGuardiansIsLoading: selectGetGuardiansIsLoading,
  getAllSubjectsWithLecturerErrorMessage: selectGetAllSubjectsWithLecturerErrorMessage,
  getAllSubjectsWithLecturerIsLoading: selectGetAllSubjectsWithLecturerIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsersAsync()),
  getAllIntakes: () => dispatch(getAllIntakesAsync()),
  getAllAnnouncements: () => dispatch(getAllAnnouncementsAsync()),
  getAllFollowUps: () => dispatch(getAllFollowUpsAsync()),
  getStudents: () => dispatch(getStudentsAsync()),
  getGuardians: () => dispatch(getGuardiansAsync()),
  getAllSubjectsWithLecturer: () => dispatch(getAllSubjectsWithLecturerAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
