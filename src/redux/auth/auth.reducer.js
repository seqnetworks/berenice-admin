import authTypes from "./auth.types"
import { acl } from "./auth.ability"

const INITIAL_STATE = {
  currentUser: "",
  loggedIn: false,
  isLoading: {
    login: false,
    changePassword: false,
    changeStatus: false,
    getCurrentUserAcl: false,
  },
  errorMessages: {
    login: "",
    changePassword: "",
    changeStatus: "",
    getCurrentUserAcl: "",
  },
  ability: [],
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-------------------START----------------------
    case authTypes.LOG_IN_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          login: true,
        },
      }
    case authTypes.CHANGE_PASSWORD_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changePassword: true,
        },
      }
    case authTypes.CHANGE_STATUS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatus: true,
        },
      }
    case authTypes.GET_CURRENT_USER_ACL_START:
      return {
        ...state,
        currentUser: { ...state.currentUser, acl: action.payload },
        isLoading: {
          ...state.isLoading,
          getCurrentUserAcl: true,
        },
      }
    //-------------------SUCCESS----------------------
    case authTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...action.payload.credentials,
          fullName: action.payload.info.fullName,
          fullNameArabic: action.payload.info.fullNameArabic,
          avatar: action.payload.info.userAvatar,
        },
        ability: [...acl[action.payload.info.role], ...state.ability],
        isLoading: {
          ...state.isLoading,
          login: false,
        },
        errorMessages: {
          ...state.errorMessages,
          login: "",
        },
      }

    case authTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changePassword: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changePassword: "",
        },
      }
    case authTypes.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changeStatus: "",
        },
      }
    case authTypes.GET_CURRENT_USER_ACL_SUCCESS:
      return {
        ...state,
        ability: [...action.payload, ...state.ability],
        isLoading: {
          ...state.isLoading,
          getCurrentUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentUserAcl: "",
        },
      }
    //-------------------FAILURE----------------------
    case authTypes.LOG_IN_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          login: false,
        },
        errorMessages: {
          ...state.errorMessages,
          login: action.payload,
        },
      }
    case authTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changePassword: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changePassword: action.payload,
        },
      }
    case authTypes.CHANGE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changeStatus: action.payload,
        },
      }
    case authTypes.GET_CURRENT_USER_ACL_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentUserAcl: action.payload,
        },
      }
    //-------------------OTHERS----------------------
    case authTypes.USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      }
    case authTypes.LOG_OUT: {
      window.localStorage.clear()
      location.reload()
      return INITIAL_STATE
    }
    case authTypes.UPDATE_TOKEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          tokens: { ...state.currentUser.tokens, accessToken: action.payload },
        },
      }
    case authTypes.UPDATE_CURRENT_USER_ACL:
      return {
        ...state,
        ability: [...acl[state.currentUser.role], ...action.payload],
      }
    case authTypes.CLEAR_CHANGE_STATUS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          changeStatus: "",
        },
      }
    default:
      return state
  }
}

export default authReducer
