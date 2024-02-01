import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody } from "reactstrap"
import { useIntl } from "react-intl"
import UserFollowUpsTable from "./components/user follow ups table/UserFollowUpsTable.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import BackButton from "../../custom/back button/BackButton.component"
import {
  getFollowUpsOfSingalUserAsync,
  getStudentsAsync,
} from "../../redux/index.actions"
import {
  selectGetFollowUpsOfSingalUserErrorMessage,
  selectGetFollowUpsOfSingalUserIsLoading,
  selectGetStudentsErrorMessage,
  selectGetStudentsIsLoading,
  selectCurrentUserRole,
  selectCurrentUserUuid,
  selectSelectedUserRole,
  selectSelectedUserUuid,
  selectSelectedUserUserUuid,
} from "../../redux/index.selectors"
//---------WITH SPINNERS------------
const UserFollowUpsTableWithSpinner = WithSpinner(UserFollowUpsTable)
//----------------------------------
const FollowUpsPage = ({
  getFollowUpsOfSingalUser,
  getStudents,
  getFollowUpsOfSingalUserErrorMessage,
  getFollowUpsOfSingalUserIsLoading,
  getStudentsErrorMessage,
  getStudentsIsLoading,
  currentUserRole,
  currentUserUuid,
  selectedUserUuid,
  selectedUserUserUuid,
  selectedUserRole,
}) => {
  const intl = useIntl()

  const toBeDispatched = requestBody => {
    getFollowUpsOfSingalUser(requestBody)
    getStudents()
  }

  return currentUserRole === "lecturer" ? (
    <UserFollowUpsTableWithSpinner
      card={true}
      toBeDispatchedUseEffect={toBeDispatched}
      toBeDispatchedPropsUseEffect={{ userUuid: selectedUserUserUuid }}
      toBeDispatchedTryAgain={toBeDispatched}
      toBeDispatchedPropsTryAgain={{ userUuid: selectedUserUserUuid }}
      isLoading={getFollowUpsOfSingalUserIsLoading || getStudentsIsLoading}
      errorMessage={
        getFollowUpsOfSingalUserErrorMessage || getStudentsErrorMessage
      }
      requestBody={{}}
    />
  ) : selectedUserUuid &&
    (selectedUserRole === "staff" || selectedUserRole === "lecturer") ? (
    <>
      <BackButton messageId="BACK.TO.PROFILE" />
      <UserFollowUpsTableWithSpinner
        card={true}
        toBeDispatchedUseEffect={toBeDispatched}
        toBeDispatchedPropsUseEffect={{ userUuid: selectedUserUserUuid }}
        toBeDispatchedTryAgain={toBeDispatched}
        toBeDispatchedPropsTryAgain={{ userUuid: selectedUserUserUuid }}
        isLoading={getFollowUpsOfSingalUserIsLoading || getStudentsIsLoading}
        errorMessage={
          getFollowUpsOfSingalUserErrorMessage || getStudentsErrorMessage
        }
        requestBody={{ userUuid: selectedUserUserUuid }}
      />
    </>
  ) : selectedUserUserUuid && selectedUserRole === "student" ? (
    <>
      <BackButton messageId="BACK.TO.PROFILE" />
      <UserFollowUpsTableWithSpinner
        card={true}
        toBeDispatchedUseEffect={toBeDispatched}
        toBeDispatchedPropsUseEffect={{ receiverUuid: selectedUserUserUuid }}
        toBeDispatchedTryAgain={toBeDispatched}
        toBeDispatchedPropsTryAgain={{ receiverUuid: selectedUserUserUuid }}
        isLoading={getFollowUpsOfSingalUserIsLoading || getStudentsIsLoading}
        errorMessage={
          getFollowUpsOfSingalUserErrorMessage || getStudentsErrorMessage
        }
        requestBody={{ receiverUuid: selectedUserUserUuid }}
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
  getFollowUpsOfSingalUserErrorMessage: selectGetFollowUpsOfSingalUserErrorMessage,
  getFollowUpsOfSingalUserIsLoading: selectGetFollowUpsOfSingalUserIsLoading,
  getStudentsErrorMessage: selectGetStudentsErrorMessage,
  getStudentsIsLoading: selectGetStudentsIsLoading,
  currentUserRole: selectCurrentUserRole,
  currentUserUuid: selectCurrentUserUuid,
  selectedUserRole: selectSelectedUserRole,
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserUserUuid: selectSelectedUserUserUuid,
})

const mapDispatchToProps = dispatch => ({
  getFollowUpsOfSingalUser: requestBody =>
    dispatch(getFollowUpsOfSingalUserAsync(requestBody)),
  getStudents: () => dispatch(getStudentsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpsPage)
