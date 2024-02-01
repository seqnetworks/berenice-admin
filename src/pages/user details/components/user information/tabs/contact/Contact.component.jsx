import React from "react"
import {
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Spinner,
} from "reactstrap"
import { createStructuredSelector } from "reselect"
import classnames from "classnames"
import { connect } from "react-redux"
import { Edit3, AlignCenter } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createFollowUpAsync } from "../../../../../../redux/index.actions"
import { selectCreateFollowUpIsLoading, selectCurrentUserFullNameArabic } from "../../../../../../redux/index.selectors"

const Contact = ({ userUuid, currentUserFullNameArabic, createFollowUp, createFollowUpIsLoading }) => {
  const intl = useIntl()

  const writeFollowUpValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const writeFollowUpFormik = useFormik({
    initialValues: { title: "", description: "" },
    enableReinitialize: true,
    validationSchema: writeFollowUpValidationSchema,
    onSubmit: async values =>
      await createFollowUp(
        {
          message: values.description,
          subjectMessage: values.title,
          receiverUuid: userUuid,
        },
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.FOLLOWUP.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.FOLLOWUP.SUCCESS.CONTENT",
            }),
          },
          error: {
            title: intl.formatMessage({
              id: "CREATE.FOLLOWUP.ERROR.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.FOLLOWUP.ERROR.CONTENT",
            }),
          },
        },
        writeFollowUpFormik.resetForm(),
        currentUserFullNameArabic
      ),
  })

  return (
    <Row>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        xs={12}
      >
        <form onSubmit={writeFollowUpFormik.handleSubmit}>
          <Row>
            <Col style={{ display: "flex", flexDirection: "column" }} md={12}>
              <FormGroup className="mb-1">
                <InputGroup
                  className={classnames("input-group-merge ", {
                    "is-invalid":
                      writeFollowUpFormik.errors["title"] &&
                      writeFollowUpFormik.touched["title"],
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <Edit3 size={17} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    key="title"
                    className={classnames({
                      "is-invalid":
                        writeFollowUpFormik.errors["title"] &&
                        writeFollowUpFormik.touched["title"],
                    })}
                    type="text"
                    placeholder={intl.formatMessage({ id: "TITLE" })}
                    {...writeFollowUpFormik.getFieldProps("title")}
                  />
                </InputGroup>
                {writeFollowUpFormik.touched["title"] &&
                  writeFollowUpFormik.errors["title"] && (
                    <span
                      className="input-custom-animation-5"
                      style={{ color: "red" }}
                    >
                      {writeFollowUpFormik.errors["title"]}
                    </span>
                  )}
              </FormGroup>
              <FormGroup className="mb-1">
                <InputGroup
                  className={classnames("input-group-merge ", {
                    "is-invalid":
                      writeFollowUpFormik.errors["description"] &&
                      writeFollowUpFormik.touched["description"],
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <AlignCenter size={17} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    key="content"
                    style={{ resize: "none" }}
                    className={classnames({
                      "is-invalid":
                        writeFollowUpFormik.errors["description"] &&
                        writeFollowUpFormik.touched["description"],
                    })}
                    type="textarea"
                    placeholder={intl.formatMessage({ id: "CONTENT" })}
                    {...writeFollowUpFormik.getFieldProps("description")}
                  />
                </InputGroup>
                {writeFollowUpFormik.touched["description"] &&
                  writeFollowUpFormik.errors["description"] && (
                    <span
                      className="input-custom-animation-5"
                      style={{ color: "red" }}
                    >
                      {writeFollowUpFormik.errors["description"]}
                    </span>
                  )}
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                disabled={
                  createFollowUpIsLoading ||
                  !(writeFollowUpFormik.dirty && writeFollowUpFormik.isValid)
                }
              >
                {createFollowUpIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                  />
                ) : (
                  <FormattedMessage id="CREATE.FOLLOW.UP" />
                )}
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  createFollowUpIsLoading: selectCreateFollowUpIsLoading,
  currentUserFullNameArabic: selectCurrentUserFullNameArabic
})

const mapdispatchToProps = dispatch => ({
  createFollowUp: (requestBody, messages, func, senderFullNameArabic) =>
    dispatch(createFollowUpAsync(requestBody, false, messages, func, senderFullNameArabic)),
})

export default connect(mapStateToProps, mapdispatchToProps)(Contact)
