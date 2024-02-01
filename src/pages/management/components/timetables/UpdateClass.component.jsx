import React from "react"
import { useIntl } from "react-intl"
import CustomForm from "../../../../custom/customform/customform.component"

const UpdateClass = ({ formik, fields, isLoading }) => {
  const intl = useIntl()

  return (
    <CustomForm
      formik={formik}
      fields={fields}
      buttonTitle={intl.formatMessage({ id: "EDIT.CLASS" })}
      isLoading={isLoading}
      fullControl={true}
    />
  )
}

export default UpdateClass
