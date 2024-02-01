import { Card, CardBody } from "reactstrap"

const HorizontalStatisticsCard = ({ icon, color, stats, statTitle }) => {
	const putIcon = icon => icon
	return (
		<Card>
			<CardBody style={{ padding: "1.2rem" }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "start"
						}}
					>
						<div
							style={{ cursor: "default" }}
							className={`avatar avatar-stats p-25 m-0 bg-light-${color}`}
						>
							<div className="avatar-content ">{putIcon(icon)}</div>
						</div>
						<h4 className="card-text ml-75">{statTitle}</h4>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end"
						}}
					>
						<h2 className="font-weight-bolder mb-0 ">{stats}</h2>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default HorizontalStatisticsCard
