import React from "react"
import { useIntl, FormattedMessage } from "react-intl"
import { Menu, Edit3, Users, Info, MoreVertical } from "react-feather"
import {
	Col,
	Row,
	FormGroup,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from "reactstrap"

const GroupGeneralInformation = ({ group }) => {
	const intl = useIntl()

	group = {
		name: group.title,
		createdAt: group.createdAt,
		description: group.description
	}
	const fieldLabel = {
		name: intl.formatMessage({ id: "NAME" }),
		createdAt: intl.formatMessage({ id: "CREATED.AT" }),
		description: intl.formatMessage({ id: "DESCRIPTION" })
	}
	const fieldIcon = {
		name: () => <Info size={15} />,
		createdAt: () => <Edit3 size={15} />,
		description: () => <Menu size={15} />
	}
	const fieldType = {
		name: "text",
		createdAt: "text",
		description: "textarea"
	}
	return (
		<Row>
			<Col
				xs={12}
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "15px"
				}}
			>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Users size={18} />
					<h4 className="mb-0 ml-75">
						<FormattedMessage id="GROUP.INFORMATION" />
					</h4>
				</div>
				<></>
			</Col>
			{Object.keys(group).map((key, index) => (
				<Col sm={index === 2 ? 12 : 6}>
					<FormGroup>
						<Label>{fieldLabel[key]}</Label>
						<InputGroup className="input-group-merge">
							<InputGroupAddon addonType="prepend">
								<InputGroupText>{fieldIcon[key]()}</InputGroupText>
							</InputGroupAddon>
							<Input
								style={
									fieldType[key] === "textarea" ? { resize: MoreVertical, maxHeight: "150px" } : {}
								}
								readOnly={true}
								key={key}
								value={group[key]}
								type={fieldType[key]}
							/>
						</InputGroup>
					</FormGroup>
				</Col>
			))}
		</Row>
	)
}

export default GroupGeneralInformation
