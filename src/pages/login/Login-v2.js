import React, { useState, Fragment } from "react"
import logo from "../../assets/images/bereniceLogo.png"
import { connect } from "react-redux"
import classnames from "classnames"
import { createStructuredSelector } from "reselect"
import * as Yup from "yup"
import { useFormik } from "formik"
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Spinner,
} from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { Slide, toast } from "react-toastify"
import { Coffee, Eye, EyeOff } from "react-feather"
import { Redirect } from "react-router-dom"
import Avatar from "../../utility/components/avatar/index"
import ErrorCard from "../../custom/errorcard/ErrorCard.component"
import { logInAsync } from "../../redux/index.actions"
import {
  selectLoginErrorMessage,
  selectLoginIsLoading,
  selectCurrentUserUsername,
} from "../../redux/index.selectors"
import "../../@core/scss/base/pages/page-auth.scss"

const ToastContent = ({ name }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an admin user to Berenice University
        Admin Panel
      </span>
    </div>
  </Fragment>
)

const Login = ({
  login,
  currentUserUsername,
  loginIsLoading,
  loginErrorMessage,
}) => {
  const [actionDone, setActionDone] = useState(false)
  const [visible, setVisible] = useState(false)

  const intl = useIntl()

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    password: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      await login(values)
      setActionDone(true)
    },
  })

  const renderIcon = () => {
    if (visible === true) return <EyeOff size={14} />
    else return <Eye size={14} />
  }

  return (
    <div className="auth-wrapper auth-v1 px-2">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="brand-logo mb-2"
            >
              <img style={{ width: "20px" }} src={logo} />
              <h2 className="brand-text text-primary ml-2">
                <FormattedMessage id="BERENICE.UNIVERSITY" />
              </h2>
            </div>
            {actionDone && !loginErrorMessage
              ? toast.success(<ToastContent name={currentUserUsername} />, {
                  transition: Slide,
                  hideProgressBar: true,
                  autoClose: 2500,
                })
              : null}
            {actionDone && !loginErrorMessage ? window.location.reload() : null}
            {actionDone && !loginErrorMessage ? <Redirect to="/" /> : null}
            {loginErrorMessage ? (
              loginErrorMessage === "not admin" ? (
                <ErrorCard
                  content={intl.formatMessage({
                    id: "ONLY.ADMINS.ARE.ABLE.TO.LOGIN",
                  })}
                />
              ) : (
                <ErrorCard
                  content={intl.formatMessage({
                    id: "USERNAME.OR.PASSWORD.WAS.WRONG",
                  })}
                />
              )
            ) : null}
            <Form
              className="auth-login-form mt-2"
              onSubmit={loginFormik.handleSubmit}
            >
              <FormGroup>
                <Input
                  placeholder={intl.formatMessage({ id: "USERNAME" })}
                  type="text"
                  {...loginFormik.getFieldProps("username")}
                  className={classnames({
                    "is-invalid":
                      loginFormik.errors["username"] &&
                      loginFormik.touched["username"]
                        ? true
                        : false,
                  })}
                />
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-merge">
                  <Input
                    {...loginFormik.getFieldProps("password")}
                    className={classnames({
                      "is-invalid":
                        loginFormik.errors["password"] &&
                        loginFormik.touched["password"],
                    })}
                    placeholder={intl.formatMessage({ id: "PASSWORD" })}
                    type={visible ? "text" : "password"}
                  />
                  <InputGroupAddon
                    addonType="append"
                    onClick={() => setVisible(!visible)}
                  >
                    <InputGroupText className="cursor-pointer">
                      {renderIcon()}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <Button
                className="mt-2"
                disabled={
                  loginIsLoading || !(loginFormik.dirty && loginFormik.isValid)
                }
                type="submit"
                color="primary"
                block
              >
                {loginIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                  />
                ) : (
                  <FormattedMessage id="SIGN.IN" />
                )}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserUsername: selectCurrentUserUsername,
  loginIsLoading: selectLoginIsLoading,
  loginErrorMessage: selectLoginErrorMessage,
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(logInAsync(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
