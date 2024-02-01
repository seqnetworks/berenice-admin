import financeTypes from "./finance.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"

//---------GET STUDENT PAYMENTS------------
export const getStudentPaymentsStart = () => ({
  type: financeTypes.GET_STUDENT_PAYMENTS_START,
})
export const getStudentPaymentsSuccess = payments => ({
  type: financeTypes.GET_STUDENT_PAYMENTS_SUCCESS,
  payload: payments,
})
export const getStudentPaymentsFailure = errorMessage => ({
  type: financeTypes.GET_STUDENT_PAYMENTS_FAILURE,
  payload: errorMessage,
})

export const getStudentPaymentsAsync = studentUuid => async dispatch => {
  try {
    dispatch(getStudentPaymentsStart())
    const result = await req.get("/berenice_finance/payment", {
      params: { studentUuid },
    })
    dispatch(getStudentPaymentsSuccess(result.data))
  } catch (error) {
    dispatch(getStudentPaymentsFailure(error.message))
  }
}
//---------CREATE PAYMENT------------
export const createPaymentStart = () => ({
  type: financeTypes.CREATE_PAYMENT_START,
})
export const createPaymentSuccess = () => ({
  type: financeTypes.CREATE_PAYMENT_SUCCESS,
})
export const createPaymentFailure = errorMessage => ({
  type: financeTypes.CREATE_PAYMENT_FAILURE,
  payload: errorMessage,
})

export const createPaymentAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createPaymentStart())
    await req.post("/berenice_finance/payment", requestBody)
    dispatch(createPaymentSuccess())
    dispatch(getStudentPaymentsAsync(requestBody.studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createPaymentFailure(error.message))
  }
}
//---------EDIT PAYMENT------------
export const editPaymentStart = () => ({
  type: financeTypes.EDIT_PAYMENT_START,
})
export const editPaymentSuccess = () => ({
  type: financeTypes.EDIT_PAYMENT_SUCCESS,
})
export const editPaymentFailure = errorMessage => ({
  type: financeTypes.EDIT_PAYMENT_FAILURE,
  payload: errorMessage,
})

export const editPaymentAsync = (
  recordId,
  requestBody,
  studentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(editPaymentStart())
    await req.put("/berenice_finance/payment", requestBody, {
      params: { recordId },
    })
    dispatch(editPaymentSuccess())
    dispatch(getStudentPaymentsAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editPaymentFailure(error.message))
  }
}
//---------DELETE PAYMENT------------
export const deletePaymentStart = () => ({
  type: financeTypes.DELETE_PAYMENT_START,
})
export const deletePaymentSuccess = () => ({
  type: financeTypes.DELETE_PAYMENT_SUCCESS,
})
export const deletePaymentFailure = errorMessage => ({
  type: financeTypes.DELETE_PAYMENT_FAILURE,
  payload: errorMessage,
})

export const deletePaymentAsync = (
  recordId,
  studentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(deletePaymentStart())
    await req.delete("/berenice_finance/payment", {
      params: { recordId },
    })
    dispatch(deletePaymentSuccess())
    dispatch(getStudentPaymentsAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deletePaymentFailure(error.message))
  }
}
//---------OTHERS------------
export const clearCreatePaymentErrorMessage = () => ({
  type: financeTypes.CLEAR_CREATE_PAYMENT_ERROR_MESSAGE,
})

export const clearEditPaymentErrorMessage = () => ({
  type: financeTypes.CLEAR_EDIT_PAYMENT_ERROR_MESSAGE,
})
export const clearDeletePaymentErrorMessage = () => ({
  type: financeTypes.CLEAR_DELETE_PAYMENT_ERROR_MESSAGE,
})
