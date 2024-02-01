import React from "react"
import { Row, Col } from "reactstrap"
import OrderGeneralDetails from "../order general information/OrderGeneralDetails.component"
import Product from "../product/product.component"
import "./OrderDetails.styles.scss"

const OrderDetails = ({ order }) => {
	return (
		<Row className="ecommerce-application">
			<Col
				className="active dstepper-block"
				id="cart"
				style={{ display: "flex", flexDirection: "column" }}
				md={8}
			>
				<div className="list-view ">
					<div className="checkout-items">
						{order.order.products.map(product => (
							<Product product={product} />
						))}
					</div>
				</div>
			</Col>
			<Col md={4}>
				<OrderGeneralDetails order={order} />
			</Col>
		</Row>
	)
}

export default OrderDetails
