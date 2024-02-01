import React, { useState } from "react"
import { Button, Card } from "reactstrap"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw, Plus, User } from "react-feather"
import { useIntl } from "react-intl"
import GroupUsersTableRow from "./GroupUsersTableRow.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import AddUserToGroup from "./AddUserToGroup.component"
import Table from "../../../../custom/table/table.component"
import {
	getGroupUsersAsync,
	clearGetAllUsersErrorMessage,
	clearAddUserToGroupErrorMessage
} from "../../../../redux/index.actions"
import { selectSelectedGroupUsers } from "../../../../redux/index.selectors"

const GroupUsersTable = ({
	uuid,
	users,
	getGroupUsers,
	clearGetAllUsersErrorMessage,
	clearAddUserToGroupErrorMessage
}) => {
	const [searchField, setSearchField] = useState("")
	const [currentPage, setCurrentPage] = useState(0)

	const intl = useIntl()

	let filteredArray = []
	if (users)
		filteredArray = users.filter(user =>
			user.username.toLowerCase().includes(searchField.toLowerCase())
		)

	const tableAttribute = {
		buttons: [
			<Dialog
				button={{
					color: "primary",
					styles: { paddingRight: "1rem", paddingLeft: "1rem" },
					title: <Plus size={15} />
				}}
				dialog={{
					title: intl.formatMessage({ id: "ADD.USER.TO.GROUP" }),
					content: <AddUserToGroup uuid={uuid} />
				}}
				closingAction={() => {
					clearGetAllUsersErrorMessage()
					clearAddUserToGroupErrorMessage()
				}}
			/>,
			<Button className="px-1 ml-50" color="primary" onClick={() => getGroupUsers(uuid)}>
				<RefreshCw size={15} />
			</Button>
		],
		search: {
			placeHolder: intl.formatMessage({ id: "USERNAME" }),
			handleChange: e => setSearchField(e.target.value),
			value: searchField
		},
		pagination: {
			handleChange: page => setCurrentPage(page),
			rowsPerPage: 5,
			currentPage: currentPage
		},
		table: {
			columns: [
				{ title: intl.formatMessage({ id: "USERNAME" }) },
				{ title: intl.formatMessage({ id: "FULL.NAME" }), styles: { minWidth: "150px" } },
				{ title: intl.formatMessage({ id: "PHONE.NUMBER" }), styles: { minWidth: "170px" } },
				{ title: intl.formatMessage({ id: "EMAIL" }), styles: { minWidth: "150px" } },
				{ title: intl.formatMessage({ id: "ACTIONS" }) }
			],
			row: user => <GroupUsersTableRow user={user} groupUuid={uuid} />
		},
		givenArray: filteredArray,
		title: intl.formatMessage({ id: "THE.GROUP'S.USERS" }),
		emptyMessage: intl.formatMessage({ id: "NO.USERS.AVAILABLE" })
	}
	return <Table {...tableAttribute} />
}

const mapStateToProps = createStructuredSelector({
	users: selectSelectedGroupUsers
})

const mapDispatchToProps = dispatch => ({
	getGroupUsers: uuid => dispatch(getGroupUsersAsync(uuid)),
	clearGetAllUsersErrorMessage: () => dispatch(clearGetAllUsersErrorMessage()),
	clearAddUserToGroupErrorMessage: () => dispatch(clearAddUserToGroupErrorMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersTable)
