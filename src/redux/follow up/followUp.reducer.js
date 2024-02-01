import followUpTypes from "./followUp.types"

const INITIAL_STATE = {
  allFollowUps: "",
  selectedFollowUp: "",
  selectedUserFollowUps: "",
  isLoading: {
    getFollowUp: false,
    getAllFollowUps: false,
    getFollowUpsOfSingalUser: false,
    createFollowUp: false,
    deleteFollowUp: false,
    editFollowUp: false,
  },
  errorMessages: {
    getFollowUp: "",
    getAllFollowUps: "",
    getFollowUpsOfSingalUser: "",
    createFollowUp: "",
    deleteFollowUp: "",
    editFollowUp: "",
  },
}

const followUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-----------START----------
    case followUpTypes.CREATE_FOLLOW_UP_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createFollowUp: true,
        },
      }
    case followUpTypes.GET_FOLLOW_UP_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getFollowUp: true,
        },
      }
    case followUpTypes.GET_ALL_FOLLOW_UPS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllFollowUps: true,
        },
      }
    case followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getFollowUpsOfSingalUser: true,
        },
      }
    case followUpTypes.DELETE_FOLLOW_UP_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteFollowUp: true,
        },
      }
    case followUpTypes.EDIT_FOLLOW_UP_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editFollowUp: true,
        },
      }
    //-----------SUCCESS----------
    case followUpTypes.CREATE_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createFollowUp: "",
        },
      }
    case followUpTypes.GET_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        selectedFollowUp: action.payload,
        isLoading: {
          ...state.isLoading,
          getFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getFollowUp: "",
        },
      }
    case followUpTypes.GET_ALL_FOLLOW_UPS_SUCCESS:
      return {
        ...state,
        allFollowUps: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllFollowUps: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllFollowUps: "",
        },
      }
    case followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_SUCCESS:
      return {
        ...state,
        selectedUserFollowUps: action.payload,
        isLoading: {
          ...state.isLoading,
          getFollowUpsOfSingalUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getFollowUpsOfSingalUser: "",
        },
      }
    case followUpTypes.DELETE_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteFollowUp: "",
        },
      }
    case followUpTypes.EDIT_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editFollowUp: "",
        },
      }
    //-----------FAILURE----------
    case followUpTypes.CREATE_FOLLOW_UP_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createFollowUp: action.payload,
        },
      }
    case followUpTypes.GET_FOLLOW_UP_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getFollowUp: action.payload,
        },
      }
    case followUpTypes.GET_ALL_FOLLOW_UPS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllFollowUps: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllFollowUps: action.payload,
        },
      }
    case followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getFollowUpsOfSingalUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getFollowUpsOfSingalUser: action.payload,
        },
      }
    case followUpTypes.DELETE_FOLLOW_UP_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteFollowUp: action.payload,
        },
      }
    case followUpTypes.EDIT_FOLLOW_UP_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editFollowUp: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editFollowUp: action.payload,
        },
      }
    //-----------OTHER----------
    case followUpTypes.CLEAR_CREATE_FOLLOW_UP_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createFollowUp: "",
        },
      }
    case followUpTypes.CLEAR_DELETE_FOLLOW_UP_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteFollowUp: "",
        },
      }
    case followUpTypes.CLEAR_EDIT_FOLLOW_UP_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editFollowUp: "",
        },
      }
    default:
      return state
  }
}

export default followUpReducer
