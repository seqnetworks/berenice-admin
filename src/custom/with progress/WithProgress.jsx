import React, { useEffect } from "react"
import { LinearProgress } from "@material-ui/core"
import TryAgain from "../try again/TryAgain.component"
import { CardBody } from "reactstrap"

const WithSpinner = WrappedComponent => ({
	isLoading,
	errorMessage,
	toBeDispatchedUseEffect,
	toBeDispatchedPropsUseEffect,
	toBeDispatchedTryAgain,
	toBeDispatchedPropsTryAgain,
	...otherProps
}) => {
	useEffect(() => {
		if (toBeDispatchedUseEffect) toBeDispatchedUseEffect(toBeDispatchedPropsUseEffect)
	}, [])

	return isLoading ? (
		<CardBody>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<LinearProgress />
			</div>
		</CardBody>
	) : errorMessage ? (
		<CardBody>
			<div style={{ display: "flex", justifyContent: "center", margin: "auto 0" }}>
				<TryAgain
					toBeDispatchedProps={toBeDispatchedPropsTryAgain}
					toBeDispatched={toBeDispatchedTryAgain}
				/>
			</div>
		</CardBody>
	) : (
		<WrappedComponent {...otherProps} />
	)
}
export default WithSpinner
