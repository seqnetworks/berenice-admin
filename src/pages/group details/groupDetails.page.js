import React, { useEffect } from "react"
import { Row, Col, Card } from "reactstrap"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { getGroupAsync, getGroupUsersAsync } from "../../redux/index.actions"
import {
  selectSelectedGroup,
  selectGetGroupUsersErrorMessage,
  selectGetGroupUsersIsLoading,
} from "../../redux/index.selectors"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import GroupInformation from "./components/group information/GroupInformation.component"
import GroupUsersTable from "./components/group users table/GroupUsersTable.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"

//-------WITH SPINNERS----------
const GroupUsersTableWithSpinner = WithSpinner(GroupUsersTable)
//-----------------------------------
const GroupDetails = ({
  getGroup,
  getGroupUsers,
  group,
  getGroupUsersErrorMessage,
  getGroupUsersIsLoading,
}) => {
  const location = useLocation()
  const intl = useIntl()

  let uuid = ""
  if (location.state) {
    if (location.state.uuid) uuid = location.state.uuid
    else uuid = group.uuid
  } else {
    uuid = group.uuid
  }
  return (
    <Row>
      {uuid ? (
        <>
          <Col xs={12}>
            <GroupInformation uuid={uuid} />
          </Col>
          <Col xs={12}>
            <Card>
              <GroupUsersTableWithSpinner
                toBeDispatchedUseEffect={getGroupUsers}
                toBeDispatchedTryAgain={getGroupUsers}
                toBeDispatchedPropsUseEffect={uuid}
                toBeDispatchedPropsTryAgain={uuid}
                isLoading={getGroupUsersIsLoading}
                errorMessage={getGroupUsersErrorMessage}
                uuid={uuid}
              />
            </Card>
          </Col>
        </>
      ) : (
        <Col xs={12}>
          <ErrorCard
            info={true}
            style={{ width: "100%" }}
            content={intl.formatMessage({ id: "NO.SELECTED.GROUP" })}
          />
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  group: selectSelectedGroup,
  getGroupUsersErrorMessage: selectGetGroupUsersErrorMessage,
  getGroupUsersIsLoading: selectGetGroupUsersIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getGroup: uuid => dispatch(getGroupAsync(uuid)),
  getGroupUsers: uuid => dispatch(getGroupUsersAsync(uuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails)
