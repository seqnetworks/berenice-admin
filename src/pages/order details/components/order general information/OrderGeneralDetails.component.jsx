import React from "react"
import { Card, CardBody, Button } from "reactstrap"
import "./OrderGeneralDetails.styles.scss"

const OrderGeneralDetails = ({ order }) => {
	const user = order.user
	order = order.order
	const userDetails = [
		{
			title: "Full Name",
			content: user.name
		},
		{
			title: "Phone Number",
			content: user.phone_number
		},
		{
			title: "Username",
			content: user.username
		}
	]

	const orderDetails = [
		{
			title: "Order No.",
			content: order.no
		},
		{
			title: "Status",
			content: (
				<span className={order.status === "shipped" ? "text-success" : "text-danger"}>
					{order.status}
				</span>
			)
		},
		{
			title: "Date",
			content: order.date
		}
	]
	return (
		<div className="checkout-options">
			<Card>
				<CardBody>
					<div className="price-details">
						<h6 className="price-title">User Details</h6>
						<ul className="list-unstyled">
							{userDetails.map(info => (
								<li className="custom-li">
									<span>{info.title}</span>
									<span>{info.content}</span>
								</li>
							))}
						</ul>
					</div>
					<hr />
					<div className="price-details">
						<h6 className="price-title">Order Details</h6>
						<ul className="list-unstyled">
							{orderDetails.map(info => (
								<li className="custom-li">
									<span>{info.title}</span>
									<span>{info.content}</span>
								</li>
							))}
						</ul>
						<hr />
						<ul className="list-unstyled">
							<li className="custom-li">
								<span>Total</span>
								<span>{order.total}$</span>
							</li>
						</ul>
						<Button color="primary" classnames="btn-next place-order" block>
							Print Invoice
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

export default OrderGeneralDetails
