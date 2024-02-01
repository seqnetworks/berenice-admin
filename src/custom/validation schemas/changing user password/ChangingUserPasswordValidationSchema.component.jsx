import React, { useState } from "react"
import * as Yup from "yup"
import { useIntl } from "react-intl"

const ChangingUserPasswordValidationSchema = WrappedComponent => props => {
  const [password, setPassword] = useState("")

  const intl = useIntl()

  const changingUserPasswordValidationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    new_password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    confirm_new_password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      )
      .test(
        "match",
        intl.formatMessage({ id: "PASSWORDS.MUST.MATCH" }),
        value => (value ? value === password : null)
      ),
  })
  props = {
    ...props,
    changingUserPasswordValidationSchema,
    setPassword: setPassword,
  }
  return <WrappedComponent {...props} />
}

export default ChangingUserPasswordValidationSchema
