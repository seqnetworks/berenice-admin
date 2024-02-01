import React from "react"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"
import { Eye, EyeOff } from "react-feather"
import TimePicker from "../time picker/TimePicker.component"
import "../styles/animations.styles.scss"
import "../styles/dateEmptyPlaceholder.styles.scss"
import {
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Spinner,
  Input,
} from "reactstrap"

const CustomForm = ({
  formik,
  additionalFields,
  additional,
  errorMessage,
  isLoading,
  buttonTitle,
  fields,
  buttonStatus,
  headLines,
  fullControl,
}) => {
  const putIcon = icon => icon

  const renderIcons = visible =>
    visible ? <Eye size={14} /> : <EyeOff size={14} />

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field, index) => (
          <>
            {headLines &&
              headLines.map(headLine =>
                headLine.index === index && headLine.type === "above" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="mb-75"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "-3px",
                      }}
                    >
                      {headLine.icon}
                      <h4 className="mb-0 ml-50">
                        <FormattedMessage
                          id={headLine.title.split(" ").join(".").toUpperCase()}
                        />
                      </h4>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
            {field.type === "time" ? (
              <TimePicker
                label={field.title}
                {...formik.getFieldProps(field.value)}
                onChange={e => formik.setFieldValue(field.value, e)}
              />
            ) : (
              <FormGroup style={{ marginBottom: "5px" }}>
                <Label>{field.title}</Label>
                <InputGroup
                  className={classnames({
                    "is-invalid":
                      formik.touched[field.value] && formik.errors[field.value],
                    "input-group-merge": false,
                  })}
                >
                  {field.icon ? (
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{putIcon(field.icon)}</InputGroupText>
                    </InputGroupAddon>
                  ) : (
                    <></>
                  )}
                  <Input
                    key={index}
                    className={classnames({
                      "is-invalid":
                        formik.touched[field.value] &&
                        formik.errors[field.value],
                    })}
                    placeholder={field.placeHolder}
                    type={
                      field.password
                        ? field.visible
                          ? "text"
                          : "password"
                        : field.type
                    }
                    {...formik.getFieldProps(field.value)}
                    onChange={
                      field.setState
                        ? e => {
                            formik.handleChange(e)
                            field.setState(e.target.value)
                          }
                        : field.type === "input"
                        ? e => formik.handleChange(e.target.files[0])
                        : formik.handleChange
                    }
                  >
                    {field.type === "select"
                      ? field.options.map(option => (
                          <option
                            style={{ margin: "8px 8px" }}
                            value={option.value}
                          >
                            {option.title}
                          </option>
                        ))
                      : null}
                  </Input>
                  {field.password && (
                    <InputGroupAddon
                      addonType="append"
                      onClick={field.setVisible}
                    >
                      <InputGroupText className="cursor-pointer">
                        {renderIcons(field.visible)}
                      </InputGroupText>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {formik.touched[field.value] && formik.errors[field.value] && (
                  <span
                    className="input-custom-animation-5"
                    style={{ color: "red" }}
                  >
                    {formik.errors[field.value]}
                  </span>
                )}
              </FormGroup>
            )}
            {headLines &&
              headLines.map(headLine =>
                headLine.index === index && headLine.type === "below" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="my-1"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "-3px",
                        }}
                      >
                        {headLine.icon}
                        <h4 className="mb-0 ml-50">
                          <FormattedMessage
                            id={headLine.title
                              .split(" ")
                              .join(".")
                              .toUpperCase()}
                          />
                        </h4>
                      </div>
                      {headLine.companion ? headLine.companion : <></>}
                    </div>
                    {headLine.content ? headLine.content : <></>}
                  </div>
                ) : (
                  <></>
                )
              )}
          </>
        ))}
        {additionalFields && additionalFields.map(field => field)}
        {additional}
        <Button
          className="my-1"
          block
          color="primary"
          disabled={
            isLoading ||
            (fullControl
              ? false
              : !(formik.dirty && formik.isValid) || buttonStatus)
          }
          type="submit"
        >
          {isLoading ? (
            <Spinner
              color="secondary"
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            <span>{buttonTitle}</span>
          )}
        </Button>
      </form>
    </div>
  )
}

export default CustomForm
