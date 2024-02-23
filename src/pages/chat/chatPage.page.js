import React, { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, Button } from "reactstrap"
import { useIntl } from "react-intl"
import Chat from "./index"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import {
  selectCurrentUserRole,
  selectCurrentUserUuid,
  selectSelectedUserUuid,
  selectSelectedUserRole,
  selectGetChatsOfUserErrorMessage,
  selectGetChatsOfUserIsLoading,
  selectGetStudentsErrorMessage,
  selectGetStudentsIsLoading,
} from "../../redux/index.selectors"
import {
  getChatsOfUserAsync,
  getStudentsAsync,
} from "../../redux/index.actions"
//---------WITH SPINNERS--------------
const ChatWithSpinner = WithSpinner(Chat)
//------------------------------------

const ChatPage = ({
  getChatsOfUser,
  getStudents,
  currentUserRole,
  selectedUserUuid,
  selectedUserRole,
  getChatsOfUserErrorMessage,
  getChatsOfUserIsLoading,
  getStudentsErrorMessage,
  getStudentsIsLoading,
}) => {
  const intl = useIntl()

  useEffect(() => {
    if(currentUserRole === "lecturer") {
      toBesDispatchedForLecturer()
    } else if(selectedUserUuid && (selectedUserRole === "student" || selectedUserRole === "lecturer")) {
      getChatsOfUser({ userId: selectedUserUuid })
    }
  }, []);

  const toBesDispatchedForLecturer = () => {
    getChatsOfUser({})
    getStudents()
  }

  return currentUserRole === "lecturer" ? (
    <ChatWithSpinner
      errorMessage={getChatsOfUserErrorMessage || getStudentsErrorMessage}
      isLoading={getChatsOfUserIsLoading || getStudentsIsLoading}
      toBeDispatchedTryAgain={toBesDispatchedForLecturer}
      card={true}
    />
  ) : selectedUserUuid &&
    (selectedUserRole === "student" || selectedUserRole === "lecturer") ? (
    <ChatWithSpinner
      errorMessage={getChatsOfUserErrorMessage}
      isLoading={getChatsOfUserIsLoading}
      toBeDispatchedTryAgain={getChatsOfUser}
      toBeDispatchedPropsTryAgain={{ userId: selectedUserUuid }}
      card={true}
    />
  ) : (
    <Card className="w-100">
      <CardBody>
        <ErrorCard
          info={true}
          content={intl.formatMessage({ id: "NO.SELECTED.USER" })}
        />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserRole: selectSelectedUserRole,
  currentUserRole: selectCurrentUserRole,
  currentUserUuid: selectCurrentUserUuid,
  getChatsOfUserErrorMessage: selectGetChatsOfUserErrorMessage,
  getChatsOfUserIsLoading: selectGetChatsOfUserIsLoading,
  getStudentsErrorMessage: selectGetStudentsErrorMessage,
  getStudentsIsLoading: selectGetStudentsIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getChatsOfUser: requestBody =>
    dispatch(
      getChatsOfUserAsync(requestBody)
    ),
  getStudents: () => dispatch(getStudentsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
