import notificationsTypes from "./notifications.types"

const INITIAL_STATE = {
  allNotifications: "",
  isLoading: {
    sendNotification: false,
    sendNotificationToUser: false,
  },
  errorMessages: {
    sendNotification: "",
    sendNotificationToUser: "",
  },
}

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //----------------START------------------
    case notificationsTypes.SEND_NOTIFICATION_START:
      return {
        ...state,
        isLoading: {
          sendNotification: true,
        },
      }
    case notificationsTypes.SEND_NOTIFICATION_TO_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendNotificationToUser: true,
        },
      }
    //-------------SUCCESS-------------------
    case notificationsTypes.SEND_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: {
          sendNotification: false,
        },
        errorMessages: {
          sendNotification: "",
        },
      }
    case notificationsTypes.SEND_NOTIFICATION_TO_USER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendNotificationToUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          sendNotificationToUser: "",
        },
      }
    //-------------FAILURE-------------------
    case notificationsTypes.SEND_NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: {
          sendNotification: false,
        },
        errorMessages: {
          sendNotification: action.payload,
        },
      }
    case notificationsTypes.SEND_NOTIFICATION_TO_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendNotificationToUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          sendNotificationToUser: action.payload,
        },
      }
    //-------------OTTHERS------------------
    case notificationsTypes.CLEAR_SEND_NOTIFICATION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          sendNotification: "",
        },
      }
    default:
      return state
  }
}

export default notificationsReducer
