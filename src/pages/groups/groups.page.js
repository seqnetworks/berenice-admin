import React from "react"
import { Row, Col, Card } from "reactstrap"
import GroupsTable from "./groups table/GroupsTable.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { getAllGroupsAsync } from "../../redux/index.actions"
import {
	selectGetAllGroupsErrorMessage,
	selectGetAllGroupsIsLoading,
	selectAllGroups
} from "../../redux/index.selectors"

//-------WITH SPINNERS---------
const GroupsTableWithSpinner = WithSpinner(GroupsTable)
//----------------------------------

const GroupsPage = ({
	getAllGroupsTryAgain,
	getAllGroupsUseEffect,
	getAllGroupsIsLoading,
	getAllGRoupsErrorMessage,
	groups
}) => {
	return (
		<Row>
			<Col xs={12}>
				<Card>
					<GroupsTableWithSpinner
						isLoading={getAllGroupsIsLoading}
						errorMessage={getAllGRoupsErrorMessage}
						toBeDispatchedUseEffect={getAllGroupsUseEffect}
						toBeDispatchedPropsUseEffect={groups}
						toBeDispatchedTryAgain={getAllGroupsTryAgain}
						groups={groups}
					/>
				</Card>
			</Col>
		</Row>
	)
}

const mapStateToProps = createStructuredSelector({
	getAllGroupsIsLoading: selectGetAllGroupsIsLoading,
	getAllGRoupsErrorMessage: selectGetAllGroupsErrorMessage,
	groups: selectAllGroups
})

const mapDispatchToProps = dispatch => ({
	getAllGroupsTryAgain: () => dispatch(getAllGroupsAsync()),
	getAllGroupsUseEffect: groups => {
		if (!groups) dispatch(getAllGroupsAsync())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)
