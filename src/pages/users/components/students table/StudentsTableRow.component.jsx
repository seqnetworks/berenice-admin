import React, { useContext } from "react"
import { Badge, Button, Spinner } from "reactstrap"
import { User, Trash } from "react-feather"
import { useHistory } from "react-router-dom"
import { useIntl } from "react-intl"
import { useRTL } from "../../../../utility/hooks/useRTL"
import Avatar from "../../../../utility/components/avatar/index"
import blankAvatar from "../../../../assets/images/avatar-blank.png"
import "./StudentsTableRow.styles.scss"
import Dialog from "../../../../custom/dialog/dialog.component"
import { AbilityContext } from "../../../../utility/context/Can"
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

const StudentsTableRow = ({
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

  let student = user

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

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

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

  return (
    <tr>
      <td className={student.pendingSubjects ? "pending-student" : ""}>
        <div className="d-flex align-items-center ">
          {student.userAvatar !== "false" ? (
            <Avatar
              img={user.userAvatar}
              imgClassName="objectFit"
              imgHeight="40"
              imgWidth="40"
            />
          ) : (
            <Avatar img={blankAvatar} imgHeight="40" imgWidth="40" />
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.uuid ? student.uuid : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.username ? student.username : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {rtl
            ? student.fullNameArabic
              ? student.fullNameArabic
              : renderEmpty()
            : student.fullName
            ? student.fullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {student.gender ? (
            <Badge color={`light-${helper.gender.color[student.gender]}`}>
              {helper.gender.content[student.gender]}
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Badge
            color={`light-${helper.status.color[student.status.toLowerCase()]}`}
          >
            {helper.status.content[student.status.toLowerCase()]}
          </Badge>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "student-GET") && (
            <Button
              onClick={() => {
                history.push({
                  pathname: "/userdetails",
                  state: {
                    paramAndType: { param: student.uuid, type: "student" },
                    uuid: student.uuid,
                    userUuid: student.UserUuid,
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
    dispatch(deleteUserAsync(userUuid, username, "student", messages)),
  clearDeleteUserErrorMessage: () => dispatch(clearDeleteUserErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTableRow)
