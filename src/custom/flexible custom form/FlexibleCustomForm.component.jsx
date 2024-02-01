import React from "react"
import {
  Form,
  Row,
  Col,
  Label,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap"
import classnames from "classnames"

const FlexibleCustomForm = ({
  fields,
  formik,
  isLoading,
  buttonTitle,
  buttonStatus,
  additional,
  preAdditional,
  style,
}) => (
  <Form style={style} onSubmit={formik.handleSubmit}>
    <Row>
      {preAdditional ? (
        preAdditional.map(item => <Col sm="6">{item}</Col>)
      ) : (
        <></>
      )}
      {fields.map((field, index) => (
        <Col sm="6">
          <FormGroup style={{ marginBottom: "5px" }}>
            <Label>{field.title}</Label>
            <InputGroup
              className={classnames({
                "is-invalid":
                  formik.touched[field.value] && formik.errors[field.value],
                "input-group-merge": false,
              })}
            >
              <Input
                key={index}
                size="sm"
                className={classnames({
                  "is-invalid":
                    formik.touched[field.value] && formik.errors[field.value],
                })}
                type={field.type ? field.type : "text"}
                {...formik.getFieldProps(field.value)}
                onChange={
                  field.setState
                    ? e => {
                        formik.handleChange(e)
                        field.setState(e.target.value)
                      }
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
        </Col>
      ))}
      {additional ? additional.map(item => <Col sm="6">{item}</Col>) : <></>}
    </Row>
    <Row>
      <Col sm="4">
        <Button
          className="my-1"
          block
          color="primary"
          disabled={
            buttonStatus || isLoading || !(formik.dirty && formik.isValid)
          }
          type="submit"
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            <span>{buttonTitle}</span>
          )}
        </Button>
      </Col>
    </Row>
  </Form>
)

export default FlexibleCustomForm
