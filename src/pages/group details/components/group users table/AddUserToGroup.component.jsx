import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button, Spinner } from "reactstrap"
import { LinearProgress } from "@material-ui/core"
import { useIntl, FormattedMessage } from "react-intl"
import Select from "../../../../custom/select/select.component"
import ErrorCard from "../../../../custom/errorcard/ErrorCard.component"
import {
  getAllUsersAsync,
  addUserToGroupAsync,
} from "../../../../redux/index.actions"
import {
  selectAllUsers,
  selectSelectedGroupUsers,
  selectGetAllUsersErrorMessage,
  selectGetAllUsersIsLoading,
  selectAddUserToGroupErrorMessage,
  selectAddUserToGroupIsLoading,
} from "../../../../redux/index.selectors"

const AddUserToGroup = ({
  users,
  selectedGroupUsers,
  uuid,
  getAllUsers,
  addUserToGroup,
  getAllUsersIsLoading,
  getAllUsersErrorMessage,
  addUserToGroupErrorMessage,
  addUserToGroupIsLoading,
}) => {
  const [selectedUser, setSelectedUser] = useState("")

  useEffect(() => getAllUsers(), [])

  const intl = useIntl()
  const nothing = () => {}

  let newSelectedGroupUsers = []
  selectedGroupUsers.map(user => newSelectedGroupUsers.push(user.uuid))

  const givenArray = []
  if (users)
    users.map(user =>
      newSelectedGroupUsers.includes(user.uuid)
        ? nothing()
        : givenArray.push({ label: user.username, value: user.uuid })
    )

  return (
    <>
      {getAllUsersIsLoading ? (
        <LinearProgress />
      ) : getAllUsersErrorMessage ? (
        <ErrorCard
          content={intl.formatMessage({
            id:
              "SOMETHING.WENT.WRONG.WHILE.TRYING.TO.FETCH.THE.USERS.,.PLEASE.TRY.AGAIN",
          })}
        />
      ) : (
        <>
          {addUserToGroupErrorMessage ? (
            <ErrorCard style={{ marginBottom: "10px" }} />
          ) : (
            <></>
          )}
          <Select
            array={givenArray}
            placeHolder={intl.formatMessage({ id: "USERNAME" })}
            handleChange={value => setSelectedUser(value)}
            styles={{ margin: "40px" }}
            height={140}
          />
          <Button
            onClick={() =>
              addUserToGroup(
                { userUuid: selectedUser.value, groupUuid: uuid },
                {
                  success: {
                    title: intl.formatMessage({
                      id: "ADD.USER.TO.GROUP.SUCCESS.TITLE",
                    }),
                    content: intl.formatMessage({
                      id: "ADD.USER.TO.GROUP.SUCCESS.CONTENT",
                    }),
                  },
                }
              )
            }
            block
            color="primary"
            disabled={!selectedUser || addUserToGroupIsLoading}
          >
            {addUserToGroupIsLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                aria-hidden="true"
              />
            ) : (
              <FormattedMessage id="ADD.USER" />
            )}
          </Button>
        </>
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  users: selectAllUsers,
  selectedGroupUsers: selectSelectedGroupUsers,
  getAllUsersErrorMessage: selectGetAllUsersErrorMessage,
  getAllUsersIsLoading: selectGetAllUsersIsLoading,
  addUserToGroupErrorMessage: selectAddUserToGroupErrorMessage,
  addUserToGroupIsLoading: selectAddUserToGroupIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsersAsync()),
  addUserToGroup: (requestBody, messages) =>
    dispatch(addUserToGroupAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToGroup)
