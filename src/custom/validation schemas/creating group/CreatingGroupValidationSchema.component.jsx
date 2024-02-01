import React from "react"
import * as Yup from "yup"
import { useIntl } from "react-intl"
import { Edit3, Users } from "react-feather"

const CreatingGroupValidationSchema = WrappedComponent => props => {
	const intl = useIntl()

	const creatingGroupInitialValues = {
		name: "",
		description: ""
	}

	const creatingGroupFields = [
		{
			title: intl.formatMessage({ id: "NAME" }),
			value: "name",
			icon: <Users size={15} />
		},
		{
			title: intl.formatMessage({ id: "DESCRIPTION" }),
			value: "description",
			icon: <Edit3 size={15} />,
			type: "textarea"
		}
	]

	const creatingGroupValidationSchema = Yup.object().shape({
		name: Yup.string().required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
		description: Yup.string().required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
	})

	props = {
		creatingGroupValidationSchema,
		creatingGroupInitialValues,
		creatingGroupFields,
		...props
	}
	return <WrappedComponent {...props} />
}

export default CreatingGroupValidationSchema
