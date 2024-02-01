import React from "react"
import * as Yup from "yup"
import { useIntl } from "react-intl"

const UpdatingUserDetailsValidationSchema = WrappedComponent => props => {
  const intl = useIntl()
  const updatingUserDetailsValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .test(
        "len",
        intl.formatMessage({ id: "ONLY.9.DIGITS.ARE.VALID" }),
        value => (value ? value.length === 9 : null)
      )
      .test(
        "zero",
        intl.formatMessage({
          id: "THE.PHONE.NUMBER.SHOULD.NOT.START.WITH.ZERO",
        }),
        value => (value ? value[0] !== "0" : null)
      ),
    email: Yup.string().email(intl.formatMessage({ id: "WRONG.EMAIL.FORMAT" })),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    gender: Yup.string(),
    birthdate: Yup.string(),
  })

  props = { ...props, updatingUserDetailsValidationSchema }
  return <WrappedComponent {...props} />
}

export default UpdatingUserDetailsValidationSchema
