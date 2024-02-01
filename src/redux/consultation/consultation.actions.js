import { consultationTypes } from "./consultation.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { sendNotificationToUserAsync } from "../notifications/notifications.actions"

//-------------GET SELECTED USER CONSULTATIONS-------------
export const getSelectedUserConsultationsStart = () => ({
  type: consultationTypes.GET_SELECTED_USER_CONSULTATIONS_START,
})
export const getSelectedUserConsultationsSuccess = consultations => ({
  type: consultationTypes.GET_SELECTED_USER_CONSULTATIONS_SUCCESS,
  payload: consultations,
})
export const getSelectedUserConsultationsFailure = errorMessage => ({
  type: consultationTypes.GET_SELECTED_USER_CONSULTATIONS_FAILURE,
  payload: errorMessage,
})

export const getSelectedUserConsultationsAsync = requestBody => async dispatch => {
  try {
    dispatch(getSelectedUserConsultationsStart())
    const result = requestBody.lecturerUuid
      ? await req.get(
          "/berenice_consultation/consultations_single_lecturer_uuid",
          { params: { lecturerUuid: requestBody.lecturerUuid } }
        )
      : await req.get(
          "/berenice_consultation/consultations_single_student_uuid",
          { params: { studentUuid: requestBody.studentUuid } }
        )
    dispatch(getSelectedUserConsultationsSuccess(result.data))
  } catch (error) {
    dispatch(getSelectedUserConsultationsFailure(error.message))
  }
}
//-------------GET CURRENT USER CONSULTATIONS-------------
export const getCurrentUserConsultationsStart = () => ({
  type: consultationTypes.GET_CURRENT_USER_CONSULTATIONS_START,
})
export const getCurrentUserConsultationsSuccess = consultations => ({
  type: consultationTypes.GET_CURRENT_USER_CONSULTATIONS_SUCCESS,
  payload: consultations,
})
export const getCurrentUserConsultationsFailure = errorMessage => ({
  type: consultationTypes.GET_CURRENT_USER_CONSULTATIONS_FAILURE,
  payload: errorMessage,
})

export const getCurrentUserConsultationsAsync = () => async dispatch => {
  try {
    dispatch(getCurrentUserConsultationsStart())
    const result = await req.get(
      "/berenice_consultation/consultations_single_lecturer"
    )
    dispatch(getCurrentUserConsultationsSuccess(result.data))
  } catch (error) {
    dispatch(getCurrentUserConsultationsFailure(error.message))
  }
}
//-------------CREATE CONSULTATION-------------
export const createConsultationStart = () => ({
  type: consultationTypes.CREATE_CONSULTATION_START,
})
export const createConsultationSuccess = () => ({
  type: consultationTypes.CREATE_CONSULTATION_SUCCESS,
})
export const createConsultationFailure = errorMessage => ({
  type: consultationTypes.CREATE_CONSULTATION_FAILURE,
  payload: errorMessage,
})

export const createConsultationAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(createConsultationStart())
    await req.post("/berenice_consultation/consultation", requestBody)
    dispatch(getCurrentUserConsultationsAsync())
    dispatch(createConsultationSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createConsultationFailure(error.message))
  }
}
//-------------DELETE CONSULTATION-------------
export const deleteConsultationStart = () => ({
  type: consultationTypes.DELETE_CONSULTATION_START,
})
export const deleteConsultationSuccess = () => ({
  type: consultationTypes.DELETE_CONSULTATION_SUCCESS,
})
export const deleteConsultationFailure = errorMessage => ({
  type: consultationTypes.DELETE_CONSULTATION_FAILURE,
  payload: errorMessage,
})

export const deleteConsultationAsync = (
  consultationUuid,
  unbooked,
  messages,
  studentUserUuid,
  lecturerFullNameArabic
) => async dispatch => {
  try {
    dispatch(deleteConsultationStart())
    if (unbooked)
      await req.delete("/berenice_consultation/consultation", {
        params: { consultationUuid },
      })
    else {
      await req.put(
        "/berenice_consultation/cancel_consultation",
        {},
        {
          params: { consultationUuid },
        }
      )
      dispatch(
        sendNotificationToUserAsync({
          uuid: studentUserUuid,
          title: "تم إلغاء الساعة المكتبية",
          description: `قام الأستاذ ${lecturerFullNameArabic} بإلغاء الساعة المكتبية التي قمت بحجزها`,
        })
      )
    }
    dispatch(getCurrentUserConsultationsAsync())
    dispatch(deleteConsultationSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteConsultationFailure(error.message))
  }
}
//-------------OTHERS-------------
export const resetConsultationBadge = () => ({
  type: consultationTypes.RESET_CONSULTATION_BADGE,
})

export const clearCreateConsultationErrorMessage = () => ({
  type: consultationTypes.CLEAR_CREATE_CONSULTATION_ERROR_MESSAGE,
})

export const clearDeleteConsultationErrorMessage = () => ({
  type: consultationTypes.CLEAR_DELETE_CONSULTATION_ERROR_MESSAGE,
})
