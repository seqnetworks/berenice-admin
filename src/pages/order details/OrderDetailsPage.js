import React, { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectSelectedOrder } from "../../redux/index.selectors"
import OrderDetails from "./components/order details/OrderDetails.component"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"

const OrderDetailsPage = ({ order }) => {
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <>
      {order ? (
        <OrderDetails order={order} />
      ) : (
        <ErrorCard content="No Selected Order Yet" />
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  order: selectSelectedOrder,
})

export default connect(mapStateToProps)(OrderDetailsPage)
