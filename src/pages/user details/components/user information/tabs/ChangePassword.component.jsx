import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useIntl } from "react-intl"
import { createStructuredSelector } from "reselect"
import { changePasswordAsync } from "../../../../../redux/index.actions"
import { selectChangePasswordIsLoading } from "../../../../../redux/index.selectors"
import {
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
  Button,
  Spinner,
} from "reactstrap"
import { FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import { Lock, Eye, EyeOff } from "react-feather"
import classnames from "classnames"
import changingUserPasswordValidationSchema from "../../../../../custom/validation schemas/changing user password/ChangingUserPasswordValidationSchema.component"
import "../../../../../custom/styles/animations.styles.scss"

const ChangePassword = ({
  changingUserPasswordValidationSchema,
  activeTab,
  changePassword,
  changePasswordIsLoading,
  setPassword,
}) => {
  const intl = useIntl()

  const [visible, setVisible] = useState({
    old_password: false,
    new_password: false,
    confirm_new_password: false,
  })
  const [resetForm, setResetFrom] = useState(true)

  const visibilityHandleChange = field =>
    setVisible({ ...visible, [field]: !visible[field] })

  const renderIcons = field =>
    visible[field] === true ? <Eye size={14} /> : <EyeOff size={14} />

  const changingPasswordFormik = useFormik({
    validationSchema: changingUserPasswordValidationSchema,
    enableReinitialize: true,
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    onSubmit: values => {
      const messages = {
        success: {
          title: intl.formatMessage({ id: "CHANGE.PASSWORD.SUCCESS.TITLE" }),
          content: intl.formatMessage({
            id: "CHANGE.PASSWORD.SUCCESS.CONTENT",
          }),
        },
        error: {
          title: intl.formatMessage({ id: "CHANGE.PASSWORD.ERROR.TITLE" }),
          content: intl.formatMessage({ id: "CHANGE.PASSWORD.ERROR.CONTENT" }),
        },
      }
      const requestBody = {
        oldPassword: values.old_password,
        newPassword: values.new_password,
        confirmPassword: values.confirm_new_password,
      }
      changePassword(requestBody, messages, () => setResetFrom(!resetForm))
    },
  })

  useEffect(() => changingPasswordFormik.resetForm(), [activeTab, resetForm])

  return (
    <Form onSubmit={changingPasswordFormik.handleSubmit}>
      <Row>
        <Col
          xs="12"
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "15px",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Lock size={18} />
          <h4 className="mb-0 ml-75">
            <FormattedMessage id="CHANGE.PASSWORD" />
          </h4>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label>
              <FormattedMessage id="OLD.PASSWORD" />
            </Label>
            <InputGroup
              className={classnames({
                "is-invalid":
                  changingPasswordFormik.touched["old_password"] &&
                  changingPasswordFormik.errors["old_password"],
                "input-group-merge": true,
              })}
            >
              <Input
                className={classnames({
                  "is-invalid":
                    changingPasswordFormik.touched["old_password"] &&
                    changingPasswordFormik.errors["old_password"],
                  "input-group-merge": true,
                })}
                type={visible["old_password"] === false ? "password" : "text"}
                {...changingPasswordFormik.getFieldProps("old_password")}
              />
              <InputGroupAddon
                addonType="append"
                onClick={() => visibilityHandleChange("old_password")}
              >
                <InputGroupText className="cursor-pointer">
                  {renderIcons("old_password")}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {changingPasswordFormik.touched["old_password"] &&
              changingPasswordFormik.errors["old_password"] && (
                <span
                  className="input-custom-animation-5"
                  style={{ color: "red" }}
                >
                  {" "}
                  {changingPasswordFormik.errors["old_password"]}{" "}
                </span>
              )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Label>
              <FormattedMessage id="NEW.PASSWORD" />
            </Label>
            <InputGroup
              className={classnames({
                "is-invalid":
                  changingPasswordFormik.touched["new_password"] &&
                  changingPasswordFormik.errors["new_password"],
                "input-group-merge": true,
              })}
            >
              <Input
                className={classnames({
                  "is-invalid":
                    changingPasswordFormik.touched["new_password"] &&
                    changingPasswordFormik.errors["new_password"],
                  "input-group-merge": true,
                })}
                type={visible["new_password"] === false ? "password" : "text"}
                {...changingPasswordFormik.getFieldProps("new_password")}
                onChange={e => {
                  changingPasswordFormik.handleChange(e)
                  setPassword(e.target.value)
                }}
              />
              <InputGroupAddon
                addonType="append"
                onClick={() => visibilityHandleChange("new_password")}
              >
                <InputGroupText className="cursor-pointer">
                  {renderIcons("new_password")}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {changingPasswordFormik.touched["new_password"] &&
              changingPasswordFormik.errors["new_password"] && (
                <span
                  className="input-custom-animation-5"
                  style={{ color: "red" }}
                >
                  {" "}
                  {changingPasswordFormik.errors["new_password"]}{" "}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>
              <FormattedMessage id="CONFIRM.NEW.PASSWORD" />
            </Label>
            <InputGroup
              className={classnames({
                "is-invalid":
                  changingPasswordFormik.touched["confirm_new_password"] &&
                  changingPasswordFormik.errors["confirm_new_password"],
                "input-group-merge": true,
              })}
            >
              <Input
                className={classnames({
                  "is-invalid":
                    changingPasswordFormik.touched["confirm_new_password"] &&
                    changingPasswordFormik.errors["confirm_new_password"],
                  "input-group-merge": true,
                })}
                type={
                  visible["confirm_new_password"] === false
                    ? "password"
                    : "text"
                }
                {...changingPasswordFormik.getFieldProps(
                  "confirm_new_password"
                )}
              />
              <InputGroupAddon
                addonType="append"
                onClick={() => visibilityHandleChange("confirm_new_password")}
              >
                <InputGroupText className="cursor-pointer">
                  {renderIcons("confirm_new_password")}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {changingPasswordFormik.touched["confirm_new_password"] &&
              changingPasswordFormik.errors["confirm_new_password"] && (
                <span
                  className="input-custom-animation-5"
                  style={{ color: "red" }}
                >
                  {" "}
                  {changingPasswordFormik.errors["confirm_new_password"]}{" "}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col sm={6}>
          <Button
            disabled={
              !(
                changingPasswordFormik.dirty && changingPasswordFormik.isValid
              ) || changePasswordIsLoading
            }
            block
            className="mt-75"
            type="submit"
            color="primary"
          >
            {changePasswordIsLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                aria-hidden="true"
              />
            ) : (
              <FormattedMessage id="SUBMIT.CHANGES" />
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const mapStateToProps = createStructuredSelector({
  changePasswordIsLoading: selectChangePasswordIsLoading,
})

const mapDispatchToProps = dispatch => ({
  changePassword: (requestBody, messages, toBeCalled) =>
    dispatch(changePasswordAsync(requestBody, messages, toBeCalled)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changingUserPasswordValidationSchema(ChangePassword))
