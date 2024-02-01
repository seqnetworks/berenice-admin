import financeTypes from "./finance.types"

const INITIAL_STATE = {
  selectedUserPayments: "",
  errorMessages: {
    getStudentPayments: "",
    createPayment: "",
    editPayment: "",
    deletePayment: "",
  },
  isLoading: {
    getStudentPayments: false,
    createPayment: false,
    editPayment: false,
    deletePayment: false,
  },
}

const financeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-------------START-------------
    case financeTypes.GET_STUDENT_PAYMENTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentPayments: true,
        },
      }
    case financeTypes.CREATE_PAYMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createPayment: true,
        },
      }
    case financeTypes.EDIT_PAYMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editPayment: true,
        },
      }
    case financeTypes.DELETE_PAYMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deletePayment: true,
        },
      }
    //-------------SUCCESS-------------
    case financeTypes.GET_STUDENT_PAYMENTS_SUCCESS:
      return {
        ...state,
        selectedUserPayments: action.payload,
        isLoading: {
          ...state.isLoading,
          getStudentPayments: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentPayments: "",
        },
      }
    case financeTypes.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createPayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createPayment: "",
        },
      }
    case financeTypes.EDIT_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editPayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editPayment: "",
        },
      }
    case financeTypes.DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deletePayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deletePayment: "",
        },
      }
    //-------------FAILURE-------------
    case financeTypes.GET_STUDENT_PAYMENTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentPayments: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentPayments: action.payload,
        },
      }
    // createPayment: false,
    // editPayment: false,
    // deletePayment: false,
    case financeTypes.CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createPayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createPayment: action.payload,
        },
      }
    case financeTypes.EDIT_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editPayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editPayment: action.payload,
        },
      }
    case financeTypes.DELETE_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deletePayment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deletePayment: action.payload,
        },
      }
    //-------------OTHER-------------
    case financeTypes.CLEAR_CREATE_PAYMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createPayment: "",
        },
      }
    case financeTypes.CLEAR_EDIT_PAYMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editPayment: "",
        },
      }
    case financeTypes.CLEAR_DELETE_PAYMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deletePayment: "",
        },
      }
    default:
      return state
  }
}

export default financeReducer
