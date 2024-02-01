import React, { Fragment } from "react"
import classnames from "classnames"
import { ChevronRight, Check } from "react-feather"
import { Button } from "reactstrap"
import { useIntl } from "react-intl"
import { Divider } from "@material-ui/core"
import "bs-stepper/dist/css/bs-stepper.min.css"
import "../../@core/scss/base/plugins/forms/form-wizard.scss"

const Wizard = ({
	steps,
	disabledNext,
	disabledPrev,
	activeTab,
	setActiveTab,
	title
}) => {
	const intl = useIntl()

	const buttons = [
		{
			title: intl.formatMessage({ id: "PREV" }),
			handleClick: () => {
				if (activeTab !== 0) setActiveTab(activeTab - 1)
			},
			disabled: disabledPrev,
			visibility: activeTab === 0
		},
		{
			title: intl.formatMessage({ id: "NEXT" }),
			handleClick: () => {
				if (activeTab !== 2) setActiveTab(activeTab + 1)
			},
			disabled: disabledNext,
			visibility: activeTab === 2
		}
	]
	return (
		<div className="bs-stepper horizontal  checkout-tab-steps">
			<h2 className="ml-2">{title}</h2>
			<div className="bs-stepper-header">
				{steps.map((step, index) => (
					<Fragment key={step.id}>
						{index !== 0 && index !== steps.length ? (
							<div className="line">
								<ChevronRight size={17} />
							</div>
						) : null}
						<div
							className={classnames("step", {
								crossed: activeTab > index,
								active: index === activeTab
							})}
						>
							<button style={{ cursor: "default" }} type="span" className="step-trigger">
								<span className="bs-stepper-box">
									{activeTab > index ? <Check size={18} /> : step.icon}
								</span>
								<span className="bs-stepper-label">
									<span className="bs-stepper-title">{step.title}</span>
									{step.subtitle ? (
										<span className="bs-stepper-subtitle">{step.subtitle}</span>
									) : null}
								</span>
							</button>
						</div>
					</Fragment>
				))}
			</div>
			<Divider variant="middle" className="my-0" />
			<div className="bs-stepper-content">
				{steps.map((step, index) => (
					<div
						className={classnames("content", {
							"active dstepper-block": activeTab === index
						})}
						id={step.id}
						key={step.id}
					>
						{step.content}
					</div>
				))}
			</div>
			<div
				className="px-2"
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					paddingBottom: "10px"
				}}
			>
				{buttons.map(button => (
					<Button
						color="primary"
						style={{ padding: "10px", visibility: button.visibility ? "hidden" : "visible" }}
						onClick={button.handleClick}
						disabled={button.disabled}
					>
						{button.title}
					</Button>
				))}
			</div>
		</div>
	)
}

export default Wizard
