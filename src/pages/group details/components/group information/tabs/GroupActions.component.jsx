import React from "react"
import { useHistory } from "react-router-dom"
import { X } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner, Row, Col, Badge } from "reactstrap"
import { Divider } from "@material-ui/core"
import ErrorCard from "../../../../../custom/errorcard/ErrorCard.component"
import Dialog from "../../../../../custom/dialog/dialog.component"
import {
  selectDeleteGroupErrorMessage,
  selectDeleteGroupIsLoading,
} from "../../../../../redux/index.selectors"
import {
  deleteGroupAsync,
  clearDeleteGroupErrorMessage,
} from "../../../../../redux/index.actions"

const GroupActions = ({
  name,
  deleteGroup,
  clearDeleteGroupErrorMessage,
  deleteGroupErrorMessage,
  deleteGroupIsLoading,
}) => {
  const intl = useIntl()
  const history = useHistory()

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

  const DeleteGroupContent = () => (
    <span style={{ display: "flex", flexDirection: "row" }}>
      <span>
        <FormattedMessage id="YOU.ARE.ABOUT.TO" />
      </span>
      <Badge className="mx-25" color="light-danger">
        <FormattedMessage id="DELETE" />
      </Badge>
      <span>
        <FormattedMessage id="THIS.GROUP" />
      </span>
    </span>
  )

  const actions = [
    {
      id: "delete group",
      title: intl.formatMessage({ id: "DELETE.GROUP.NOUN" }),
      description: intl.formatMessage({ id: "DELETE.GROUP.DESCRIPTION" }),
      action: (
        <Dialog
          isLoading={deleteGroupIsLoading}
          errorMessage={deleteGroupErrorMessage}
          closingAction={() => clearDeleteGroupErrorMessage()}
          button={{
            title: <ButtonTitle component={X} id="DELETE.GROUP.VERB" />,
            color: "primary",
            styles: { width: "100%" },
          }}
          dialog={{
            title: intl.formatMessage({ id: "DELETE.GROUP.NOUN" }),
            content: <DeleteGroupContent />,
            actions: [
              {
                title: deleteGroupIsLoading ? (
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
                clickHandler: async () => {
                  await deleteGroup(name, {
                    success: {
                      title: intl.formatMessage({
                        id: "DELETE.GROUP.SUCCESS.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "DELETE.GROUP.SUCCESS.CONTENT",
                      }),
                    },
                  })
                  !deleteGroupErrorMessage && history.push("/groups")
                },
                disabled: deleteGroupIsLoading,
              },
              {
                title: intl.formatMessage({ id: "NO" }),
                color: "danger",
                disabled: deleteGroupIsLoading,
              },
            ],
          }}
        />
      ),
    },
  ]

  return (
    <Row>
      {actions.length === 0 ? (
        <ErrorCard
          info={true}
          style={{ width: "100%" }}
          content={intl.formatMessage({ id: "NO.ACTIONS.AVAILABLE" })}
        />
      ) : (
        actions.map((action, index) => (
          <Col style={{ display: "flex", flexDirection: "column" }} xs={12}>
            {index > 0 ? <Divider /> : <></>}
            <h4 className=" mb-50">{action.title}</h4>
            <p className="ml-50">{action.description}</p>
            <Row className="w-100">
              <Col md={6}>{action.action}</Col>
            </Row>
          </Col>
        ))
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteGroupErrorMessage: selectDeleteGroupErrorMessage,
  deleteGroupIsLoading: selectDeleteGroupIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteGroup: (name, messages) => dispatch(deleteGroupAsync(name, messages)),
  clearDeleteGroupErrorMessage: () => dispatch(clearDeleteGroupErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupActions)
