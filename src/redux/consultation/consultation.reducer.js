import { consultationTypes } from "./consultation.types"

const INITIAL_STATE = {
  allConsultations: "",
  selectedUserConsultations: "",
  badge: 0,
  isLoading: {
    getAllConsultations: false,
    getSelectedUserConsultations: false,
    getCurrentUserConsultations: false,
    createConsultation: false,
    deleteConsultation: false,
  },
  errorMessages: {
    getAllConsultations: "",
    getSelectedUserConsultations: "",
    getCurrentUserConsultations: "",
    createConsultation: "",
    deleteConsultation: "",
  },
}

const consultationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //----------------START----------------
    case consultationTypes.GET_ALL_CONSULTATIONS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllConsultations: true,
        },
      }
    case consultationTypes.GET_SELECTED_USER_CONSULTATIONS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSelectedUserConsultations: true,
        },
      }
    case consultationTypes.GET_CURRENT_USER_CONSULTATIONS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentUserConsultations: true,
        },
      }
    case consultationTypes.CREATE_CONSULTATION_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createConsultation: true,
        },
      }
    case consultationTypes.DELETE_CONSULTATION_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteConsultation: true,
        },
      }
    //----------------SUCCESS----------------
    case consultationTypes.GET_ALL_CONSULTATIONS_SUCCESS:
      return {
        ...state,
        allConsultations: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllConsultations: "",
        },
      }
    case consultationTypes.GET_SELECTED_USER_CONSULTATIONS_SUCCESS:
      return {
        ...state,
        selectedUserConsultations: action.payload,
        isLoading: {
          ...state.isLoading,
          getSelectedUserConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSelectedUserConsultations: "",
        },
      }
    case consultationTypes.GET_CURRENT_USER_CONSULTATIONS_SUCCESS: {
      let badge = 0
      if (state.allConsultations) {
        action.payload.map(consultation => {
          state.allConsultations.map(stateConsultation => {
            if (stateConsultation.uuid === consultation.uuid) {
              if (stateConsultation.status !== consultation.status) badge++
            }
          })
        })
      }
      return {
        ...state,
        badge,
        allConsultations: action.payload,
        isLoading: {
          ...state.isLoading,
          getCurrentUserConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentUserConsultations: "",
        },
      }
    }
    case consultationTypes.CREATE_CONSULTATION_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createConsultation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createConsultation: "",
        },
      }
    case consultationTypes.DELETE_CONSULTATION_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteConsultation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteConsultation: "",
        },
      }
    //----------------FAILURE----------------
    case consultationTypes.GET_ALL_CONSULTATIONS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllConsultations: action.payload,
        },
      }
    case consultationTypes.GET_SELECTED_USER_CONSULTATIONS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSelectedUserConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSelectedUserConsultations: action.payload,
        },
      }
    case consultationTypes.GET_CURRENT_USER_CONSULTATIONS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentUserConsultations: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentUserConsultations: action.payload,
        },
      }
    case consultationTypes.CREATE_CONSULTATION_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createConsultation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createConsultation: action.payload,
        },
      }
    case consultationTypes.DELETE_CONSULTATION_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteConsultation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteConsultation: action.payload,
        },
      }
    //----------------OTHER----------------
    case consultationTypes.RESET_BADGE:
      return {
        ...state,
        badge: 0,
      }
    case consultationTypes.CLEAR_CREATE_CONSULTATION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createConsultation: "",
        },
      }
    case consultationTypes.CLEAR_DELETE_CONSULTATION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteConsultation: "",
        },
      }
    default:
      return state
  }
}

export default consultationReducer
