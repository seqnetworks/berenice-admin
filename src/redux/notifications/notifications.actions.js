import notificationsTypes from "./notifications.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { basicSweetAlert } from "../../custom/sweet aletrs/basicSweetAlert"

//-----------------SEND NOTIFICATION----------------
export const sendNotificationStart = () => ({
  type: notificationsTypes.SEND_NOTIFICATION_START,
})

export const sendNotificationSuccess = () => ({
  type: notificationsTypes.SEND_NOTIFICATION_SUCCESS,
})

export const sendNotificationFailure = errorMessage => ({
  type: notificationsTypes.SEND_NOTIFICATION_FAILURE,
  payload: errorMessage,
})

export const sendNotificationAsync = (
  requestBody,
  sendingType,
  func,
  intl
) => async dispatch => {
  const urls = {
    [intl.formatMessage({ id: "EVERYONE" })]: "notification",
    [intl.formatMessage({ id: "TARGETS" })]: "user_notification_filters",
    [intl.formatMessage({ id: "USER" })]: "user_notification",
  }
  try {
    dispatch(sendNotificationStart())
    await req.post(`/berenice_notifications/${urls[sendingType]}`, requestBody)
    dispatch(sendNotificationSuccess())
    basicSweetAlert({
      type: "success",
      title: intl.formatMessage({
        id: "SEND.NOTIFICATION.SUCCESS.TITLE",
      }),
      buttonTitle: intl.formatMessage({ id: "DONE" }),
    })
    if (func) func()
  } catch (error) {
    dispatch(sendNotificationFailure(error.message))
    noti({
      type: "error",
      title: intl.formatMessage({ id: "SEND.NOTIFICATION.ERROR.TITLE" }),
      content: intl.formatMessage({ id: "SEND.NOTIFICATION.ERROR.CONTENT" }),
    })
  }
}
//-----------------SEND NOTIFICATION TO USER----------------
export const sendNotificationToUserStart = () => ({
  type: notificationsTypes.SEND_NOTIFICATION_TO_USER_START,
})
export const sendNotificationToUserSuccess = () => ({
  type: notificationsTypes.SEND_NOTIFICATION_TO_USER_SUCCESS,
})
export const sendNotificationToUserFailure = errorMessage => ({
  type: notificationsTypes.SEND_NOTIFICATION_TO_USER_FAILURE,
  payload: errorMessage,
})

export const sendNotificationToUserAsync = requestBody => async dispatch => {
  try {
    dispatch(sendNotificationToUserStart())
    await req.post("/berenice_notifications/user_notification", requestBody)
    dispatch(sendNotificationToUserSuccess())
  } catch (error) {
    dispatch(sendNotificationToUserFailure(error.message))
  }
}
