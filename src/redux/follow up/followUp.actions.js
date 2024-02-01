import followUpTypes from "./followUp.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"

//-------------GET FOLLOW UP----------------
export const getFollowUpStart = () => ({
  type: followUpTypes.GET_FOLLOW_UP_START,
})
export const getFollowUpSuccess = followUp => ({
  type: followUpTypes.GET_FOLLOW_UP_SUCCESS,
  payload: followUp,
})
export const getFollowUpFailure = errorMessage => ({
  type: followUpTypes.GET_FOLLOW_UP_FAILURE,
  payload: errorMessage,
})

export const getFollowUpAsync = (followUpUuid, messages) => async dispatch => {
  try {
    dispatch(getFollowUpStart())
    const result = await req.get("/berenice_announcement/follow_up", {
      params: { followUpUuid },
    })
    dispatch(getFollowUpSuccess(result.data))
  } catch (error) {
    dispatch(getFollowUpFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-------------GET ALL FOLLOW UPS----------------
export const getAllFollowUpsStart = () => ({
  type: followUpTypes.GET_ALL_FOLLOW_UPS_START,
})
export const getAllFollowUpsSuccess = followUps => ({
  type: followUpTypes.GET_ALL_FOLLOW_UPS_SUCCESS,
  payload: followUps,
})
export const getAllFollowUpsFailure = errorMessage => ({
  type: followUpTypes.GET_ALL_FOLLOW_UPS_FAILURE,
  payload: errorMessage,
})

export const getAllFollowUpsAsync = () => async dispatch => {
  try {
    dispatch(getAllFollowUpsStart())
    const result = await req.get("/berenice_announcement/follow_ups")
    dispatch(getAllFollowUpsSuccess(result.data))
  } catch (error) {
    dispatch(getAllFollowUpsFailure(error.message))
  }
}
//-------------GET FOLLOW UP OF SINGAL USER----------------
export const getFollowUpsOfSingalUserStart = () => ({
  type: followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_START,
})
export const getFollowUpsOfSingalUserSuccess = followUps => ({
  type: followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_SUCCESS,
  payload: followUps,
})

export const getFollowUpsOfSingalUserFailure = errorMessage => ({
  type: followUpTypes.GET_FOLLOW_UPS_OF_SINGAL_USER_FAILURE,
  payload: errorMessage,
})

export const getFollowUpsOfSingalUserAsync = requestBody => async dispatch => {
  try {
    dispatch(getFollowUpsOfSingalUserStart())
    const result = requestBody.userUuid
      ? await req.get("/berenice_announcement/follow_ups_user", {
          params: { userUuid: requestBody.userUuid },
        })
      : requestBody.receiverUuid
      ? await req.get(
          "/berenice_announcement/follow_ups_user_sender_single_student",
          { params: { receiverUuid: requestBody.receiverUuid } }
        )
      : await req.get("/berenice_announcement/follow_ups_user_sender")
    dispatch(getFollowUpsOfSingalUserSuccess(result.data))
  } catch (error) {
    dispatch(getFollowUpsOfSingalUserFailure(error.message))
  }
}
//-------------CREATE FOLLOW UP----------------
export const createFollowUpStart = () => ({
  type: followUpTypes.CREATE_FOLLOW_UP_START,
})
export const createFollowUpSuccess = () => ({
  type: followUpTypes.CREATE_FOLLOW_UP_SUCCESS,
})
export const createFollowUpfailure = errorMessage => ({
  type: followUpTypes.CREATE_FOLLOW_UP_FAILURE,
  payload: errorMessage,
})

export const createFollowUpAsync = (
  values,
  requestBody,
  messages,
  func,
  senderFullNameArabic
) => async dispatch => {
  try {
    dispatch(createFollowUpStart())
    await req.post("/berenice_announcement/follow_up", values)
    requestBody
      ? dispatch(getFollowUpsOfSingalUserAsync(requestBody))
      : dispatch(getAllFollowUpsAsync())
    dispatch(createFollowUpSuccess())
    if (func) func()
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
    req.post("/berenice_notifications/user_notification", {
      uuid: values.receiverUuid,
      title: "ملحوظة جديدة",
      description: `تم إرسال ملحوظة جديدة إليك من ${senderFullNameArabic}`,
    })
  } catch (error) {
    dispatch(createFollowUpfailure(error.message))
    if (messages.error)
      noti({
        type: "error",
        title: messages.error.title,
        content: messages.error.content,
      })
  }
}
//-------------DELETE FOLLOW UP----------------
export const deleteFollowUpStart = () => ({
  type: followUpTypes.DELETE_FOLLOW_UP_START,
})
export const deleteFollowUpSuccess = () => ({
  type: followUpTypes.DELETE_FOLLOW_UP_SUCCESS,
})
export const deleteFollowUpFailure = errorMessage => ({
  type: followUpTypes.DELETE_FOLLOW_UP_FAILURE,
  payload: errorMessage,
})

export const deleteFollowUpAsync = (
  followUpUuid,
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(deleteFollowUpStart())
    await req.delete("/berenice_announcement/follow_up", {
      params: { followUpUuid },
    })
    requestBody
      ? dispatch(getFollowUpsOfSingalUserAsync(requestBody))
      : dispatch(getAllFollowUpsAsync())
    dispatch(deleteFollowUpSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteFollowUpFailure(error.message))
  }
}
//-------------EDIT FOLLOW UP----------------
export const editFollowUpStart = () => ({
  type: followUpTypes.EDIT_FOLLOW_UP_START,
})
export const editFollowUpSuccess = () => ({
  type: followUpTypes.EDIT_FOLLOW_UP_SUCCESS,
})
export const editFollowUpfailure = errorMessage => ({
  type: followUpTypes.EDIT_FOLLOW_UP_FAILURE,
  payload: errorMessage,
})

export const editFollowUpAsync = (
  values,
  followUpUuid,
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(editFollowUpStart())
    await req.put("/berenice_announcement/follow_up", values, {
      params: { followUpUuid },
    })
    requestBody
      ? dispatch(getFollowUpsOfSingalUserAsync(requestBody))
      : dispatch(getAllFollowUpsAsync())
    dispatch(editFollowUpSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editFollowUpfailure(error.message))
  }
}
//-------------OTHER----------------
export const clearCreateFollowUpErrorMessage = () => ({
  type: followUpTypes.CLEAR_CREATE_FOLLOW_UP_ERROR_MESSAGE,
})

export const clearDeleteFollowUpErrorMessage = () => ({
  type: followUpTypes.CLEAR_DELETE_FOLLOW_UP_ERROR_MESSAGE,
})

export const clearEditFollowUpErrorMessage = () => ({
  type: followUpTypes.CLEAR_EDIT_FOLLOW_UP_ERROR_MESSAGE,
})
