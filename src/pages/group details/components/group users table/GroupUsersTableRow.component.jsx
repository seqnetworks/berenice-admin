import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useHistory } from "react-router-dom"
import { Button, Badge, Spinner } from "reactstrap"
import { User, X } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import Dialog from "../../../../custom/dialog/dialog.component"
import {
	removeUserFromGroupAsync,
	clearRemoveUserFromGroupErrorMessage
} from "../../../../redux/index.actions"
import {
	selectRemoveUserFromGroupErrorMessage,
	selectRemoveUserFromGroupIsLoading
} from "../../../../redux/index.selectors"

const GroupUsersTableRow = ({
	user,
	groupUuid,
	removeUserFromGroup,
	removeUserFromGroupErrorMessage,
	removeUserFromGroupIsLoading,
	clearRemoveUserFromGroupErrorMessage
}) => {
	const history = useHistory()
	const intl = useIntl()

	const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

	const RemoveUserFromGroupDialogContent = () => (
		<>
			<span style={{ display: "flex", flexDirection: "row" }}>
				<span>
					<FormattedMessage id="YOU.ARE.ABOUT.TO" />
				</span>
				<Badge className="mx-25" color="light-danger">
					<FormattedMessage id="REMOVE" />
				</Badge>
				<span>
					<FormattedMessage id="THIS.USER.FROM.GROUP" />
				</span>
			</span>
		</>
	)

	return (
		<tr>
			<td>
				<div className="d-flex align-items-center ">
					{user.username ? user.username : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center ">
					{user.fullName ? user.fullName : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center ">
					{user.phoneNumber ? user.phoneNumber : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center ">
					{user.email ? user.email : renderEmpty()}
				</div>
			</td>
			<td style={{ display: "flex", flexDirection: "row" }}>
				<div className="d-flex align-items-center">
					<Dialog
						errorMessage={removeUserFromGroupErrorMessage}
						button={{
							color: "flat-primary",
							styles: { padding: "5px" },
							title: <X size={20} />,
							className: "btn-icon"
						}}
						dialog={{
							title: intl.formatMessage({ id: "REMOVE.USER.FROM.GROUP" }),
							content: <RemoveUserFromGroupDialogContent />,
							actions: [
								{
									className: "mr-50 p-50",
									disabled: removeUserFromGroupIsLoading,
									color: "primary",
									title: removeUserFromGroupIsLoading ? (
										<Spinner as="span" animation="border" size="sm" aria-hidden="true" />
									) : (
										<FormattedMessage id="REMOVE" />
									),
									clickHandler: () =>
										removeUserFromGroup(
											{ userUuid: user.uuid, groupUuid: groupUuid },
											{
												success: {
													title: intl.formatMessage({ id: "REMOVE.USER.FROM.GROUP.SUCCESS.TITLE" }),
													content: intl.formatMessage({ id: "REMOVE.USER.FROM.GROUP.SUCCESS.CONTENT" })
												}
											}
										)
								},
								{
									className: "p-50",
									disabled: removeUserFromGroupIsLoading,
									color: "secondary",
									title: <FormattedMessage id="NO" />
								}
							]
						}}
						closingAction={() => clearRemoveUserFromGroupErrorMessage()}
					/>
				</div>
				<div className="d-flex align-items-center">
					<Button
						onClick={() => {
							history.push({
								pathname: "/userdetails",
								state: { uuid: user.uuid }
							})
						}}
						style={{ padding: "5px" }}
						color="flat-primary"
						className="btn-icon"
					>
						<User size={20} />
					</Button>
				</div>
			</td>
		</tr>
	)
}

const mapStateToProps = createStructuredSelector({
	removeUserFromGroupErrorMessage: selectRemoveUserFromGroupErrorMessage,
	removeUserFromGroupIsLoading: selectRemoveUserFromGroupIsLoading
})

const mapDispatchToProps = dispatch => ({
	removeUserFromGroup: (requestBody, messages) =>
		dispatch(removeUserFromGroupAsync(requestBody, messages)),
	clearRemoveUserFromGroupErrorMessage: () =>
		dispatch(clearRemoveUserFromGroupErrorMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersTableRow)
