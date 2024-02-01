import React from "react"
import { useState } from "react"
import { Button } from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "./swal.styles.scss"

const CallbackSweetAlert = ({
	title,
	content,
	toBeDispatched,
	buttons,
	errorMessage,
	isLoading,
	success,
	failure
}) => {
	const sweetAlert = withReactContent(Swal)
	const nothing = () => {}

	const [actionDone, setActionDone] = useState(false)

	const initiateHandler = () =>
		sweetAlert
			.fire({
				title: title,
				text: content,
				icon: "warning",
				showCancelButton: true,
				cancelButtonText: buttons.cancel.title,
				confirmButtonText: buttons.confirm.title,
				customClass: {
					confirmButton: buttons.confirm.className,
					cancelButton: buttons.cancel.className
				}
			})
			.then(async results => {
				if (results.value) {
					toBeDispatched()
					setActionDone(true)
				}
			})

	const successHandler = () =>
		sweetAlert.fire({
			icon: "success",
			title: success.title,
			text: success.content,
			confirmButtonText: success.buttonTitle,
			customClass: {
				confirmButton: success.buttonClassName
			}
		})

	const failureHandler = () =>
		sweetAlert.fire({
			icon: "error",
			title: failure.title,
			text: failure.content,
			confirmButtonText: failure.buttonTitle,
			customClass: {
				confirmButton: failure.buttonClassName
			}
		})

	const loadingHandler = () =>
		sweetAlert.fire({
			onBeforeOpen() {
				sweetAlert.showLoading()
			},
			showConfirmButton: false
		})
	const loading = {
		onBeforeOpen() {
			sweetAlert.showLoading()
		},
		showConfirmButton: false
	}
	const failureO = {
		icon: "error",
		title: failure.title,
		text: failure.content,
		confirmButtonText: failure.buttonTitle,
		customClass: {
			confirmButton: failure.buttonClassName
		}
	}
	const successO = {
		icon: "success",
		title: success.title,
		text: success.content,
		confirmButtonText: success.buttonTitle,
		customClass: {
			confirmButton: success.buttonClassName
		}
	}

	const object = isLoading ? loading : errorMessage ? failureO : successO
	const testing = () => {
		if (isLoading) return sweetAlert.fire(loading)
		else if (errorMessage) return sweetAlert.fire(failureO)
		else return sweetAlert.fire(success)
	}

	return (
		<>
			<Button color="primary" onClick={() => initiateHandler()}>
				yes
			</Button>
			{actionDone ? testing() : nothing()}
		</>
	)
}

export default CallbackSweetAlert
