import { createSelector } from "reselect"

export const selectFinance = state => state.finance

//----------1ST LEVEL SELECTORS------------
export const selectSelectedUserPayments = createSelector(
  [selectFinance],
  finance => finance.selectedUserPayments
)
export const selectFinanceErrorMessages = createSelector(
  [selectFinance],
  finance => finance.errorMessages
)

export const selectFinanceIsLoading = createSelector(
  [selectFinance],
  finance => finance.isLoading
)
//----------2ND LEVEL SELECTORS------------
export const selectGetStudentPaymentsErrorMessage = createSelector(
  [selectFinanceErrorMessages],
  errorMessages => errorMessages.getStudentPayments
)
export const selectGetStudentPaymentsIsLoading = createSelector(
  [selectFinanceIsLoading],
  isLoading => isLoading.getStudentPayments
)

export const selectCreatePaymentErrorMessage = createSelector(
  [selectFinanceErrorMessages],
  errorMessages => errorMessages.createPayment
)
export const selectCreatePaymentIsLoading = createSelector(
  [selectFinanceIsLoading],
  isLoading => isLoading.createPayment
)

export const selectEditPaymentErrorMessage = createSelector(
  [selectFinanceErrorMessages],
  errorMessages => errorMessages.editPayment
)
export const selectEditPaymentIsLoading = createSelector(
  [selectFinanceIsLoading],
  isLoading => isLoading.editPayment
)

export const selectDeletePaymentErrorMessage = createSelector(
  [selectFinanceErrorMessages],
  errorMessages => errorMessages.deletePayment
)
export const selectDeletePaymentIsLoading = createSelector(
  [selectFinanceIsLoading],
  isLoading => isLoading.deletePayment
)
