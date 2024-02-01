import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { Badge, Spinner } from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Edit, Trash, Activity } from "react-feather"
import { AbilityContext } from "../../../../../utility/context/Can"
import {
  paymentTypes,
  transactionTypes,
} from "../../../../../utility/custom/finance"
import CustomForm from "../../../../../custom/customform/customform.component"
import Dialog from "../../../../../custom/dialog/dialog.component"
import {
  deletePaymentAsync,
  editPaymentAsync,
  clearDeletePaymentErrorMessage,
  clearEditPaymentErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectEditPaymentErrorMessage,
  selectDeletePaymentErrorMessage,
  selectEditPaymentIsLoading,
  selectDeletePaymentIsLoading,
} from "../../../../../redux/index.selectors"

const StudentPaymentsTableRow = ({
  payment,
  deletePayment,
  editPayment,
  clearDeletePaymentErrorMessage,
  clearEditPaymentErrorMessage,
  editPaymentErrorMessage,
  editPaymentIsLoading,
  deletePaymentErrorMessage,
  deletePaymentIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const helper = {
    row: {
      display: "success",
      hide: "danger",
    },
    action: {
      display: "hide",
      hide: "display",
    },
    dialog: {
      display: {
        color: "danger",
        content: "HIDE.VERB",
      },
      hide: {
        color: "success",
        content: "DISPLAY.VERB",
      },
    },
  }

  const editPaymentValidationSchema = Yup.object().shape({
    amount: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    paymentType: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    transactionType: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editPaymentFormik = useFormik({
    initialValues: {
      amount: payment.amount,
      paymentType: payment.paymentType,
      transactionType: payment.transactionType,
      description: payment.description,
    },
    enableReinitialize: true,
    validationSchema: editPaymentValidationSchema,
    onSubmit: values =>
      editPayment(
        payment.recordId,
        { ...values, amount: `${values.amount}`, status: payment.status },
        payment.studentUuid,
        {
          success: {
            title: intl.formatMessage({ id: "EDIT.PAYMENT.SUCCESS.TITLE" }),
            content: intl.formatMessage({ id: "EDIT.PAYMENT.SUCCESS.CONTENT" }),
          },
        }
      ),
  })

  const editPaymentFields = [
    {
      title: intl.formatMessage({ id: "AMOUNT" }),
      value: "amount",
    },
    {
      title: intl.formatMessage({ id: "PAYMENT.TYPE" }),
      value: "paymentType",
      type: "select",
      options: paymentTypes(intl),
    },
    {
      title: intl.formatMessage({ id: "TRANSACTION.TYPE" }),
      value: "transactionType",
      type: "select",
      options: transactionTypes(intl),
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      type: "textarea",
    },
  ]

  const editPaymentDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.PAYMENT" }),
      content: (
        <CustomForm
          formik={editPaymentFormik}
          fields={editPaymentFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.PAYMENT" })}
          isLoading={editPaymentIsLoading}
        />
      ),
    },
    errorMessage: editPaymentErrorMessage,
    isLoading: editPaymentIsLoading,
    closingAction: () => {
      clearEditPaymentErrorMessage()
      editPaymentFormik.resetForm()
    },
  }

  const deletePaymentDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.PAYMENT" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.PAYMENT",
      }),
      actions: [
        {
          title: deletePaymentIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "DELETE" })
          ),
          color: "primary",
          clickHandler: () =>
            deletePayment(payment.recordId, payment.studentUuid, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.PAYMENT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.PAYMENT.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deletePaymentIsLoading,
        },
      ],
    },
    errorMessage: deletePaymentErrorMessage,
    isLoading: deletePaymentIsLoading,
    closingAction: () => clearDeletePaymentErrorMessage(),
  }

  const editPaymentStatusDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Activity size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "CHANGING.PAYMENT.STATUS" }),
      content: (
        <span>
          <FormattedMessage id="YOU.ARE.ABOUT.TO" />
          <Badge color={`light-${helper.dialog[payment.status].color}`}>
            <FormattedMessage id={helper.dialog[payment.status].content} />
          </Badge>
          <FormattedMessage id="THIS.PAYMENT" />
        </span>
      ),
      actions: [
        {
          title: editPaymentIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "CHANGE" })
          ),
          color: "primary",
          clickHandler: () =>
            editPayment(
              payment.recordId,
              {
                amount: `${payment.amount}`,
                paymentType: payment.paymentType,
                transactionType: payment.transactionType,
                description: payment.description,
                status: helper.action[payment.status],
              },
              payment.studentUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "CHANGING.PAYMENT.STATUS.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "CHANGING.PAYMENT.STATUS.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: editPaymentIsLoading,
        },
      ],
    },
    errorMessage: editPaymentErrorMessage,
    isLoading: editPaymentIsLoading,
    closingAction: () => {
      clearEditPaymentErrorMessage()
    },
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {payment.amount ? payment.amount : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {payment.paymentType
            ? intl.formatMessage({ id: payment.paymentType.toUpperCase() })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {payment.transactionType
            ? intl.formatMessage({ id: payment.transactionType.toUpperCase() })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {payment.status ? (
            <Badge color={`light-${helper.row[payment.status]}`} pill>
              <FormattedMessage id={payment.status.toUpperCase()} />
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {payment.paymentDate ? payment.paymentDate : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {payment.description ? payment.description : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "payment-PUT") && (
            <>
              <Dialog {...editPaymentDialogAttributes} />
              <Dialog {...editPaymentStatusDialogAttributes} />
            </>
          )}
          {ability.can("manage", "payment-DELETE") && (
            <Dialog {...deletePaymentDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  editPaymentErrorMessage: selectEditPaymentErrorMessage,
  editPaymentIsLoading: selectEditPaymentIsLoading,
  deletePaymentErrorMessage: selectDeletePaymentErrorMessage,
  deletePaymentIsLoading: selectDeletePaymentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deletePayment: (recordId, studentUuid, messages) =>
    dispatch(deletePaymentAsync(recordId, studentUuid, messages)),
  editPayment: (recordId, requestBody, studentUuid, messages) =>
    dispatch(editPaymentAsync(recordId, requestBody, studentUuid, messages)),
  clearDeletePaymentErrorMessage: () =>
    dispatch(clearDeletePaymentErrorMessage()),
  clearEditPaymentErrorMessage: () => dispatch(clearEditPaymentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPaymentsTableRow)
