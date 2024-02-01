import React from "react"
import { LogIn } from "react-feather"
import { Button } from "reactstrap"
import { useHistory } from "react-router-dom"

const UsersTableRow = ({ group }) => {
	const history = useHistory()

	const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

	return (
		<tr>
			<td>
				<div className="d-flex align-items-center ">
					{group.title ? group.title : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center">
					{group.description ? group.description : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center">
					{group.createdAt ? group.createdAt : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center">
					{group.updatedAt ? group.updatedAt : renderEmpty()}
				</div>
			</td>
			<td>
				<div className="d-flex align-items-center">
					<Button
						onClick={() => {
							history.push({
								pathname: "/groupdetails",
								state: { uuid: group.uuid }
							})
						}}
						style={{ padding: "5px" }}
						color="flat-primary"
						className="btn-icon"
					>
						<LogIn size={20} />
					</Button>
				</div>
			</td>
		</tr>
	)
}

export default UsersTableRow
