import React, { useContext } from "react"
import { Lock, Activity } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { Row, Col, Badge, Spinner } from "reactstrap"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Divider } from "@material-ui/core"
import { AbilityContext } from "../../../../../utility/context/Can"
import ErrorCard from "../../../../../custom/errorcard/ErrorCard.component"
import Dialog from "../../../../../custom/dialog/dialog.component"
import { noti } from "../../../../../custom/push notification/noti"
import { basicSweetAlert } from "../../../../../custom/sweet aletrs/basicSweetAlert"
import {
  clearResetPasswordErrorMessage,
  clearChangeStatusErrorMessage,
  resetPassswordAsync,
  changeStatusAsync,
} from "../../../../../redux/index.actions"
import {
  selectSelectedUser,
  selectResetPasswordErrorMessage,
  selectResetPasswordIsLoading,
  selectChangeStatusErrorMessage,
  selectChangeStatusIsLoading,
  selectCurrentUserUuid,
} from "../../../../../redux/index.selectors"

const Actions = ({
  user,
  paramAndType,
  currentUserUuid,
  clearResetPasswordErrorMessage,
  resetPasssword,
  resetPasswordErrorMessage,
  resetPasswordIsLoading,
  changeStatus,
  changeStatusErrorMessage,
  changeStatusIsLoading,
  clearChangeStatusErrorMessage,
}) => {
  const nothing = () => {}
  const intl = useIntl()

  const ability = useContext(AbilityContext)

  const statusObject = {
    requestBody: {
      enable: {
        username: user.username,
        status: "disable",
      },
      disable: {
        username: user.username,
        status: "enable",
      },
    },
    alert: {
      enable: intl.formatMessage({ id: "DISABLE" }),
      disable: intl.formatMessage({ id: "ENABLE" }),
    },
    color: {
      disable: "success",
      enable: "danger",
    },
  }

  const ChangeStatusContent = ({ status }) => (
    <span style={{ display: "flex", flexDirection: "row" }}>
      <span>
        <FormattedMessage id="YOU.ARE.ABOUT.TO" />
      </span>
      <Badge className="mx-25" color={`light-${statusObject.color[status]}`}>
        {statusObject.alert[status]}
      </Badge>
      <span>
        <FormattedMessage id="THIS.USER" />
      </span>
    </span>
  )

  const ButtonTitle = ({ component, id }) => {
    const IconComponent = component
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComponent className="mx-50" size={15} />{" "}
        {intl.formatMessage({ id: id })}
      </span>
    )
  }

  const actions = [
    {
      id: "reset password",
      ability: ability.can("manage", "reset_password-GET"),
      title: intl.formatMessage({ id: "RESET.PASSWORD" }),
      description: intl.formatMessage({
        id: "RESET.PASSWORD.ACTION.DESCRIPTION",
      }),
      action: (
        <Dialog
          isLoading={resetPasswordIsLoading}
          errorMessage={resetPasswordErrorMessage}
          closingAction={() => clearResetPasswordErrorMessage()}
          button={{
            title: <ButtonTitle component={Lock} id="RESET.PASSWORD" />,
            color: "primary",
            styles: { width: "100%" },
          }}
          dialog={{
            title: intl.formatMessage({ id: "RESETTING.PASSWORD" }),
            content: intl.formatMessage({
              id: "YOU.ARE.ABOUT.TO.RESET.THIS.USER'S.PASSWORD",
            }),
            actions: [
              {
                title: resetPasswordIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                  />
                ) : (
                  intl.formatMessage({ id: "YES" })
                ),
                color: "primary",
                clickHandler: async () =>
                  await resetPasssword(
                    user.username,
                    newPassword =>
                      basicSweetAlert({
                        title: intl.formatMessage({
                          id: "RESET.PASSWORD.SUCCESS.TITLE",
                        }),
                        html:
                          intl.formatMessage({
                            id: "RESET.PASSWORD.SUCCESS.CONTENT",
                          }) + `<h3>${newPassword}</h3>`,
                        buttonTitle: intl.formatMessage({ id: "DONE" }),
                        buttonClassName: "btn btn-success mb-25",
                        type: "success",
                        additional: {
                          className: "btn btn-primary ml-1 mb-25",
                          text: intl.formatMessage({ id: "COPY.NEW.PASSWORD" }),
                          action: () => {
                            var input = document.createElement("textarea")
                            input.innerHTML = newPassword
                            document.body.appendChild(input)
                            input.select()
                            document.execCommand("copy")
                            document.body.removeChild(input)
                            noti({
                              title: intl.formatMessage({
                                id: "NEW.PASSWORD.COPIED",
                              }),
                              type: "success",
                            })
                          },
                        },
                      }),
                    {
                      error: {
                        title: intl.formatMessage({
                          id: "RESET.PASSWORD.ERROR.TITLE",
                        }),
                        content: intl.formatMessage({
                          id: "RESET.PASSWORD.ERROR.CONTENT",
                        }),
                      },
                    }
                  ),
                disabled: resetPasswordIsLoading,
              },
              {
                title: intl.formatMessage({ id: "NO" }),
                color: "secondary",
                disabled: resetPasswordIsLoading,
              },
            ],
          }}
        />
      ),
    },
    {
      id: "change status",
      ability:
        ability.can("manage", "change_status-POST") &&
        currentUserUuid !== user.uuid,
      title: intl.formatMessage({ id: "CHANGE.STATUS" }),
      description: intl.formatMessage({
        id: "CHANGE.STATUS.ACTION.DESCRIPTION",
      }),
      action: (
        <Dialog
          isLoading={changeStatusIsLoading}
          errorMessage={changeStatusErrorMessage}
          closingAction={() => clearChangeStatusErrorMessage()}
          button={{
            title: <ButtonTitle component={Activity} id="CHANGE.STATUS" />,
            color: "primary",
            styles: { width: "100%" },
          }}
          dialog={{
            title: intl.formatMessage({ id: "CHANGING.STATUS" }),
            content: <ChangeStatusContent status={user.status} />,
            actions: [
              {
                title: changeStatusIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                  />
                ) : (
                  intl.formatMessage({ id: "YES" })
                ),
                color: "primary",
                clickHandler: () =>
                  changeStatus(
                    statusObject.requestBody[user.status],
                    paramAndType,
                    {
                      success: {
                        title: intl.formatMessage({
                          id: "CHANGE.STATUS.SUCCESS.TITLE",
                        }),
                        content: intl.formatMessage({
                          id: "CHANGE.STATUS.SUCCESS.CONTENT",
                        }),
                      },
                    }
                  ),
                disabled: changeStatusIsLoading,
              },
              {
                title: intl.formatMessage({ id: "NO" }),
                color: "secondary",
                disabled: changeStatusIsLoading,
              },
            ],
          }}
        />
      ),
    },
  ]

  const filteredActions = []
  actions.map(action =>
    action.ability ? filteredActions.push(action) : nothing()
  )

  return (
    <Row>
      {filteredActions.length === 0 ? (
        <ErrorCard
          info={true}
          style={{ width: "100%" }}
          content={intl.formatMessage({ id: "NO.ACTIONS.AVAILABLE" })}
        />
      ) : (
        filteredActions.map(
          (action, index) =>
            action.ability && (
              <Col style={{ display: "flex", flexDirection: "column" }} xs={12}>
                {index > 0 ? <Divider /> : <></>}
                <h4 className=" mb-50">{action.title}</h4>
                <p className="ml-50">{action.description}</p>
                <Row className="w-100">
                  <Col md={6}>{action.action}</Col>
                </Row>
              </Col>
            )
        )
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectSelectedUser,
  resetPasswordIsLoading: selectResetPasswordIsLoading,
  resetPasswordErrorMessage: selectResetPasswordErrorMessage,
  changeStatusIsLoading: selectChangeStatusIsLoading,
  changeStatusErrorMessage: selectChangeStatusErrorMessage,
  currentUserUuid: selectCurrentUserUuid,
})

const mapDispatchToProps = dispatch => ({
  clearResetPasswordErrorMessage: () =>
    dispatch(clearResetPasswordErrorMessage()),
  clearChangeStatusErrorMessage: () =>
    dispatch(clearChangeStatusErrorMessage()),
  resetPasssword: (username, func, messsages) =>
    dispatch(resetPassswordAsync(username, func, messsages)),
  changeStatus: (requestBody, paramsAndType, messages) =>
    dispatch(changeStatusAsync(requestBody, paramsAndType, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
