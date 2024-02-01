import React, { useContext } from "react"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { AbilityContext } from "../../utility/context/Can"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import BackButton from "../../custom/back button/BackButton.component"
import UserInformation from "./components/user information/UserInformation.component"
import UserContacts from "./components/user contacts/UserContacts.component"
import UserHeader from "./components/user header/UserHeader.component"
import UserConsultationsTable from "./components/user consultaions table/UserConsultationsTable.component"
import StudentPayments from "./components/student payments/StudentPayments.component"
import UserFollowUpsTable from "../follow ups/components/user follow ups table/UserFollowUpsTable.component"
import {
  getSelectedUserConsultationsAsync,
  getFollowUpsOfSingalUserAsync,
} from "../../redux/index.actions"
import {
  selectSelectedUser,
  selectSelectedUserRole,
  selectCurrentUserRole,
  selectSelectedUserUuid,
  selectSelectedUserUserUuid,
  selectGetUserIsLoading,
  selectGetUserErrorMessage,
  selectGetSelectedUserConsultationsErrorMessage,
  selectGetSelectedUserConsultationsIsLoading,
  selectGetFollowUpsOfSingalUserErrorMessage,
  selectGetFollowUpsOfSingalUserIsLoading,
} from "../../redux/index.selectors"
//----------WITH SPINNERS-----------
const UserConsultationsTableWithSpinner = WithSpinner(UserConsultationsTable)
const UserFollowUpsTableWithSpinner = WithSpinner(UserFollowUpsTable)
//----------------------------------
const UserDetailsPage = ({
  user,
  getSelectedUserConsultations,
  getFollowUpsOfSingalUser,
  getUserErrorMessage,
  getUserIsLoading,
  selectedUserRole,
  currentUserRole,
  selectedUserUuid,
  selectedUserUserUuid,
  getSelectedUserConsultationsErrorMessage,
  getSelectedUserConsultationsIsLoading,
  getFollowUpsOfSingalUserErrorMessage,
  getFollowUpsOfSingalUserIsLoading,
}) => {
  const location = useLocation()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const paramAndType = location.state
    ? location.state.paramAndType
      ? location.state.paramAndType
      : { param: user.uuid, type: user.role }
    : { param: user.uuid, type: user.role }

  const userUuid = location.state
    ? location.state.userUuid
      ? location.state.userUuid
      : user.userUuid
    : user.userUuid
  const uuid = location.state
    ? location.state.uuid
      ? location.state.uuid
      : user.uuid
    : user.uuid

  return (
    <Row>
      {currentUserRole === "lecturer" ? (
        <></>
      ) : (
        <BackButton route="/users" messageId="BACK.TO.USERS.PAGE" />
      )}
      {uuid ? (
        currentUserRole === "lecturer" ? (
          <>
            {getUserErrorMessage || getUserIsLoading ? (
              <></>
            ) : (
              <Col xs={12}>
                <UserHeader
                  name={user.fullName}
                  role={user.role}
                  avatar={user.userAvatar}
                />
              </Col>
            )}
            <Col xs={12}>
              <UserInformation
                paramAndType={paramAndType}
                userUuid={userUuid}
                uuid={uuid}
              />
            </Col>
          </>
        ) : (
          <>
            {getUserErrorMessage || getUserIsLoading ? (
              <></>
            ) : (
              <Col xs={12}>
                <UserHeader
                  name={user.fullName}
                  role={user.role}
                  avatar={user.userAvatar}
                />
              </Col>
            )}
            <Col xs={12}>
              <UserInformation
                paramAndType={paramAndType}
                userUuid={userUuid}
                uuid={uuid}
              />
            </Col>
            {getUserErrorMessage || getUserIsLoading ? (
              <></>
            ) : (
              <Col xs={12}>
                <UserContacts />
              </Col>
            )}
            {getUserErrorMessage || getUserIsLoading ? (
              <></>
            ) : (selectedUserRole === "lecturer" &&
                ability.can(
                  "manage",
                  "consultations_single_lecturer_uuid-GET"
                )) ||
              (selectedUserRole === "student" &&
                ability.can(
                  "manage",
                  "consultations_single_student_uuid-GET"
                )) ? (
              <Col xs={12}>
                <UserConsultationsTableWithSpinner
                  requestBody={
                    selectedUserRole === "lecturer"
                      ? { lecturerUuid: selectedUserUuid }
                      : { studentUuid: selectedUserUuid }
                  }
                  errorMessage={getSelectedUserConsultationsErrorMessage}
                  isLoading={getSelectedUserConsultationsIsLoading}
                  card={true}
                  toBeDispatchedUseEffect={getSelectedUserConsultations}
                  toBeDispatchedTryAgain={getSelectedUserConsultations}
                  toBeDispatchedPropsTryAgain={
                    selectedUserRole === "lecturer"
                      ? { lecturerUuid: selectedUserUuid }
                      : { studentUuid: selectedUserUuid }
                  }
                  toBeDispatchedPropsUseEffect={
                    selectedUserRole === "lecturer"
                      ? { lecturerUuid: selectedUserUuid }
                      : { studentUuid: selectedUserUuid }
                  }
                />
              </Col>
            ) : (
              <></>
            )}
            {getUserErrorMessage || getUserIsLoading ? (
              <></>
            ) : selectedUserRole === "student" &&
              ability.can("manage", "payment-GET") ? (
              <Col xs={12}>
                <StudentPayments />
              </Col>
            ) : selectedUserRole === "guardian" ? (
              <UserFollowUpsTableWithSpinner
                card={true}
                toBeDispatchedUseEffect={getFollowUpsOfSingalUser}
                toBeDispatchedPropsUseEffect={{
                  receiverUuid: selectedUserUserUuid,
                }}
                toBeDispatchedTryAgain={getFollowUpsOfSingalUser}
                toBeDispatchedPropsTryAgain={{
                  receiverUuid: selectedUserUserUuid,
                }}
                isLoading={getFollowUpsOfSingalUserIsLoading}
                errorMessage={getFollowUpsOfSingalUserErrorMessage}
                requestBody={{ receiverUuid: selectedUserUserUuid }}
              />
            ) : (
              <></>
            )}
          </>
        )
      ) : (
        <Col xs={12}>
          <ErrorCard
            info={true}
            style={{ width: "100%" }}
            content={intl.formatMessage({ id: "NO.SELECTED.USER" })}
          />
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectSelectedUser,
  getUserErrorMessage: selectGetUserErrorMessage,
  getUserIsLoading: selectGetUserIsLoading,
  selectedUserRole: selectSelectedUserRole,
  currentUserRole: selectCurrentUserRole,
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserUserUuid: selectSelectedUserUserUuid,
  getSelectedUserConsultationsErrorMessage: selectGetSelectedUserConsultationsErrorMessage,
  getSelectedUserConsultationsIsLoading: selectGetSelectedUserConsultationsIsLoading,
  getFollowUpsOfSingalUserErrorMessage: selectGetFollowUpsOfSingalUserErrorMessage,
  getFollowUpsOfSingalUserIsLoading: selectGetFollowUpsOfSingalUserIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getSelectedUserConsultations: requestBody =>
    dispatch(getSelectedUserConsultationsAsync(requestBody)),
  getFollowUpsOfSingalUser: requestBody =>
    dispatch(getFollowUpsOfSingalUserAsync(requestBody)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage)
