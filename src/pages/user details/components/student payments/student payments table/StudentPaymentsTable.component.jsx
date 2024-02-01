import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { Button, Card, CardBody } from "reactstrap"
import { RefreshCw, Plus } from "react-feather"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import * as Yup from "yup"
import { useFormik } from "formik"
import { AbilityContext } from "../../../../../utility/context/Can"
import CustomForm from "../../../../../custom/customform/customform.component"
import Dialog from "../../../../../custom/dialog/dialog.component"
import Table from "../../../../../custom/table/table.component"
import { dateFiltering } from "../../../../../utility/custom/dateFiltering"
import {
  paymentTypes,
  transactionTypes,
} from "../../../../../utility/custom/finance"
import StudentPaymentsTableRow from "./StudentPaymentsTableRow.component"
import {
  getStudentPaymentsAsync,
  createPaymentAsync,
  clearCreatePaymentErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedUserPayments,
  selectCreatePaymentErrorMessage,
  selectCreatePaymentIsLoading,
} from "../../../../../redux/index.selectors"

const StudentPaymentsTable = ({
  getStudentPayments,
  createPayment,
  clearCreatePaymentErrorMessage,
  payments,
  studentUuid,
  createPaymentErrorMessage,
  createPaymentIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRange, setSelectedRange] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let filteredPayments = []
  if (payments)
    filteredPayments = payments.filter(
      payment =>
        dateFiltering(selectedRange, payment.paymentDate) || !selectedRange
    )

  const createPaymentValidationSchema = Yup.object().shape({
    recordId: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    paymentDate: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    amount: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
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

  const createPaymentFormik = useFormik({
    initialValues: {
      recordId: "",
      paymentDate: "",
      amount: "",
      paymentType: "",
      transactionType: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: createPaymentValidationSchema,
    onSubmit: values =>
      createPayment(
        { ...values, amount: `${values.amount}`, studentUuid, status: "hide" },
        {
          success: {
            title: intl.formatMessage({ id: "CREATE.PAYMENT.SUCCESS.TITLE" }),
            content: intl.formatMessage({
              id: "CREATE.PAYMENT.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createPaymentFields = [
    {
      title: intl.formatMessage({ id: "RECORD.ID" }),
      value: "recordId",
    },
    {
      title: intl.formatMessage({ id: "DATE" }),
      value: "paymentDate",
      type: "date",
    },
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

  const createPaymentDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.PAYMENT" }),
      content: (
        <CustomForm
          formik={createPaymentFormik}
          fields={createPaymentFields}
          buttonTitle={intl.formatMessage({ id: "CREATE.PAYMENT" })}
          isLoading={createPaymentIsLoading}
        />
      ),
    },
    errorMessage: createPaymentErrorMessage,
    isLoading: createPaymentIsLoading,
    closingAction: () => {
      createPaymentFormik.resetForm()
      clearCreatePaymentErrorMessage()
    },
  }

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getStudentPayments(studentUuid)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    date: {
      value: selectedRange,
      placeHolder: intl.formatMessage({ id: "SELECT.DATE.RANGE" }),
      onChange: e => setSelectedRange(e),
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "AMOUNT" }),
        },
        {
          title: intl.formatMessage({ id: "PAYMENT.TYPE" }),
        },
        {
          title: intl.formatMessage({ id: "TRANSACTION.TYPE" }),
        },
        {
          title: intl.formatMessage({ id: "STATUS" }),
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        {
          title: intl.formatMessage({ id: "PAYMENT.DESCRIPTION" }),
          styles: { minWidth: "150px" },
        },
        {
          title: "",
        },
      ],
      row: payment => <StudentPaymentsTableRow payment={payment} />,
    },
    givenArray: filteredPayments,
    title: intl.formatMessage({ id: "PAYMENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.PAYMENTS.YET" }),
  }
  if (ability.can("manage", "payment-POST"))
    tableAttributes.buttons = [
      <Dialog {...createPaymentDialogAttributes} />,
      ...tableAttributes.buttons,
    ]
  return (
    <Card>
      <CardBody>
        <Table {...tableAttributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  payments: selectSelectedUserPayments,
  createPaymentErrorMessage: selectCreatePaymentErrorMessage,
  createPaymentIsLoading: selectCreatePaymentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getStudentPayments: studentUuid =>
    dispatch(getStudentPaymentsAsync(studentUuid)),
  createPayment: (requestBody, messages) =>
    dispatch(createPaymentAsync(requestBody, messages)),
  clearCreatePaymentErrorMessage: () =>
    dispatch(clearCreatePaymentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPaymentsTable)
