import React, { useState } from "react"
import classnames from "classnames"
import { ChevronUp } from "react-feather"
import { Collapse, Card, CardHeader, CardBody, CardTitle, CustomInput } from "reactstrap"

const CollapseRadioButton = ({ title, description, checked, handleChange }) => {
	const [open, setOpen] = useState(false)
	return (
		<Card
			onClick={() => setOpen(!open)}
			className={classnames("app-collapse mb-1", {
				open: open
			})}
		>
			<CardHeader
				className={classnames("align-items-center", {
					collapsed: open
				})}
			>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<CardTitle className="collapse-title">
						<CustomInput type="radio" id={title} checked={checked} onChange={handleChange} />
					</CardTitle>
					<small>{title}</small>
				</div>
				<ChevronUp size={14} />
			</CardHeader>
			<Collapse isOpen={open}>
				<CardBody className="p-0 pl-1 pb-1">
					<p>{description}</p>
				</CardBody>
			</Collapse>
		</Card>
	)
}

export default CollapseRadioButton
