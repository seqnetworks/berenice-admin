import React from "react"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import { FormattedMessage } from "react-intl"
import { useLang } from "../../i18n"

const TryAgain = ({ toBeDispatched, toBeDispatchedProps }) => {
	const currentLang = useLang()

	return (
		<Button
			onClick={() => {
				if (toBeDispatchedProps) toBeDispatched(toBeDispatchedProps)
				else toBeDispatched()
			}}
			color="danger"
		>
			<RefreshCw
				color="white"
				size={15}
				style={currentLang === "en" ? { marginRight: "8px" } : { marginLeft: "8px" }}
			/>{" "}
			<FormattedMessage id="TRY.AGAIN" />
		</Button>
	)
}

export default TryAgain
