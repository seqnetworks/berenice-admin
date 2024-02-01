import React, { useContext } from "react"
import { Badge, Button, Spinner } from "reactstrap"
import { User, Trash } from "react-feather"
import { useHistory } from "react-router-dom"
import { useIntl } from "react-intl"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { AbilityContext } from "../../../../utility/context/Can"
import Dialog from "../../../../custom/dialog/dialog.component"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  deleteUserAsync,
  clearDeleteUserErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectDeleteUserErrorMessage,
  selectDeleteUserIsLoading,
} from "../../../../redux/index.selectors"

const GuardiansTableRow = ({
  user,
  deleteUser,
  clearDeleteUserErrorMessage,
  deleteUserErrorMessage,
  deleteUserIsLoading,
}) => {
  const history = useHistory()
  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  let guardian = user

  const helper = {
    status: {
      color: {
        enable: "success",
        disable: "danger",
      },
      content: {
        enable: intl.formatMessage({ id: "ENABLED" }),
        disable: intl.formatMessage({ id: "DISABLED" }),
      },
    },
    gender: {
      color: {
        male: "info",
        female: "warning",
      },
      content: {
        male: intl.formatMessage({ id: "MALE" }),
        female: intl.formatMessage({ id: "FEMALE" }),
      },
    },
  }

  const deleteUserDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.USER" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.USER",
      }),
      actions: [
        {
          title: deleteUserIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "DELETE" })
          ),
          color: "primary",
          clickHandler: () =>
            deleteUser(user.userUuid, user.username, {
              success: {
                title: intl.formatMessage({ id: "DELETE.USER.SUCCESS.TITLE" }),
                content: intl.formatMessage({
                  id: "DELETE.USER.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteUserIsLoading,
        },
      ],
    },
    errorMessage: deleteUserErrorMessage,
    isLoading: deleteUserIsLoading,
    closingAction: () => clearDeleteUserErrorMessage(),
  }

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {guardian.username ? guardian.username : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {rtl
            ? guardian.fullNameArabic
              ? guardian.fullNameArabic
              : renderEmpty()
            : guardian.fullName
            ? guardian.fullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {guardian.gender ? (
            <Badge color={`light-${helper.gender.color[guardian.gender]}`}>
              {helper.gender.content[guardian.gender]}
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {guardian.phoneNumber ? guardian.phoneNumber : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Badge
            color={`light-${
              helper.status.color[guardian.status.toLowerCase()]
            }`}
          >
            {helper.status.content[guardian.status.toLowerCase()]}
          </Badge>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "guardian-GET") && (
            <Button
              onClick={() => {
                history.push({
                  pathname: "/userdetails",
                  state: {
                    paramAndType: { param: guardian.uuid, type: "guardian" },
                    uuid: guardian.uuid,
                    userUuid: guardian.userUuid,
                  },
                })
              }}
              style={{ padding: "5px" }}
              color="flat-primary"
              className="btn-icon mr-50"
            >
              <User size={20} />
            </Button>
          )}
          {ability.can("manage", "user-DELETE") && (
            <Dialog {...deleteUserDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteUserErrorMessage: selectDeleteUserErrorMessage,
  deleteUserIsLoading: selectDeleteUserIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteUser: (userUuid, username, messages) =>
    dispatch(deleteUserAsync(userUuid, username, "guardian", messages)),
  clearDeleteUserErrorMessage: () => dispatch(clearDeleteUserErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuardiansTableRow)
