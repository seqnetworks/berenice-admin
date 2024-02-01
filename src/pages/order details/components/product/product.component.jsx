import React from "react"
import { Card, CardBody, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { Star } from "react-feather"
import classnames from "classnames"
import "./product.styles.scss"

const Product = ({ product }) => {
	return (
		<Card key={product.name} className="ecommerce-card">
			<div className="item-img">
				<Link to="#">
					<img className="img-fluid" src={product.image} alt={product.name} />
				</Link>
			</div>
			<CardBody>
				<div className="item-name">
					<h6 className="mb-0">
						<Link to="#">{product.name}</Link>
					</h6>
					<span className="item-company">
						By
						<a className="ml-25" href="/" onClick={e => e.preventDefault()}>
							{product.brand}
						</a>
					</span>
					<div className="item-rating">
						<ul className="unstyled-list list-inline">
							{new Array(5).fill().map((listItem, index) => {
								return (
									<li key={index} className="ratings-list-item mr-25">
										<Star
											className={classnames({
												"filled-star": index + 1 <= product.rating,
												"unfilled-star": index + 1 > product.rating
											})}
										/>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
					<div className="quantity-title mr-50">
						Quantity : <b>1</b>
					</div>
					<div className="quantity-title mr-50">
						Price : <b>{product.price}$</b>
					</div>
				</div>
			</CardBody>
			<div className="item-options text-center">
				<div className="item-wrapper">
					<div className="item-cost">
						<h4 className="item-price mb-25">Total</h4>
						<h4 className="item-price">{product.price}$</h4>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default Product
