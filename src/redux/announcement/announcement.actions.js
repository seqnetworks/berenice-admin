import announcementTypes from "./announcement.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"

//-----------CREATE ANNOUNCEMENT-----------
export const createAnnouncementStart = () => ({
  type: announcementTypes.CREATE_ANNOUNCEMENT_START,
})
export const createAnnouncementSuccess = () => ({
  type: announcementTypes.CREATE_ANNOUNCEMENT_SUCCESS,
})
export const createAnnouncementFailure = errorMessae => ({
  type: announcementTypes.CREATE_ANNOUNCEMENT_FAILURE,
  payload: errorMessae,
})

export const createAnnouncementAsync = (
  requestBody,
  userUuid,
  func,
  messages
) => async dispatch => {
  try {
    dispatch(createAnnouncementStart())
    await req.post("/berenice_announcement/announcement", requestBody)
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
    if (func) func()
    if (userUuid) dispatch(getAnnouncementsOfSingalUserAsync(userUuid))
    dispatch(createAnnouncementSuccess())
  } catch (error) {
    dispatch(createAnnouncementFailure(error.message))
    if (!userUuid)
      noti({
        type: "error",
        title: messages.error.title,
        content: messages.error.content,
      })
  }
}
//-----------GET ANNOUNCEMENT-----------
export const getAnnouncementStart = () => ({
  type: announcementTypes.GET_ANNOUNCEMENT_START,
})
export const getAnnouncementSuccess = announcement => ({
  type: announcementTypes.GET_ANNOUNCEMENT_SUCCESS,
  payload: announcement,
})
export const getAnnouncementFailure = errorMessage => ({
  type: announcementTypes.GET_ANNOUNCEMENT_FAILURE,
  payload: errorMessage,
})

export const getAnnouncementAsync = (
  requestBody,
  username,
  messages
) => async dispatch => {
  try {
    dispatch(getAnnouncementStart())
    const result = await req.get()
    dispatch(getAnnouncementSuccess(result.data))
  } catch (error) {
    dispatch(getAnnouncementFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-----------GET ALL ANNOUNCEMENTS-----------
export const getAllAnnouncementsStart = () => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_START,
})
export const getAllAnnouncementsSuccess = announcements => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS,
  payload: announcements,
})
export const getAllAnnouncementsFailure = errorMessage => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_FAILURE,
  payload: errorMessage,
})

export const getAllAnnouncementsAsync = () => async dispatch => {
  try {
    dispatch(getAllAnnouncementsStart())
    const result = await req.get("/berenice_announcement/announcements")
    dispatch(getAllAnnouncementsSuccess(result.data))
  } catch (error) {
    dispatch(getAllAnnouncementsFailure(error.message))
  }
}
//-----------GET ALL ANNOUNCEMENTS FOR LECTURER-----------
export const getAllAnnouncementsForLecturerStart = () => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_START,
})
export const getAllAnnouncementsForLecturerSuccess = announcements => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_SUCCESS,
  payload: announcements,
})
export const getAllAnnouncementsForLecturerFailure = errorMessage => ({
  type: announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_FAILURE,
  payload: errorMessage,
})

export const getAllAnnouncementsForLecturerAsync = () => async dispatch => {
  try {
    dispatch(getAllAnnouncementsForLecturerStart())
    const result = await req.get(
      "/berenice_announcement/announcements_user_role"
    )
    dispatch(getAllAnnouncementsForLecturerSuccess(result.data))
  } catch (error) {
    dispatch(getAllAnnouncementsForLecturerFailure(error.message))
  }
}
//-----------GET ANNOUNCEMENTS OF SINGAL USER-----------
export const getAnnouncementsOfSingalUserStart = () => ({
  type: announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_START,
})
export const getAnnouncementsOfSingalUserSuccess = announcements => ({
  type: announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_SUCCESS,
  payload: announcements,
})
export const getAnnouncementsOfSingalUserFailure = errorMessage => ({
  type: announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_FAILURE,
  payload: errorMessage,
})

export const getAnnouncementsOfSingalUserAsync = userUuid => async dispatch => {
  try {
    dispatch(getAnnouncementsOfSingalUserStart())
    const result = await req.get(
      "/berenice_announcement/announcements_user_sender",
      { params: { userUuid } }
    )
    dispatch(getAnnouncementsOfSingalUserSuccess(result.data))
  } catch (error) {
    dispatch(getAnnouncementsOfSingalUserFailure(error.message))
  }
}
//-----------DELETE ANNOUNCEMENT-----------
export const deleteAnnouncementStart = () => ({
  type: announcementTypes.DELETE_ANNOUNCEMENT_START,
})
export const deleteAnnouncementSuccess = () => ({
  type: announcementTypes.DELETE_ANNOUNCEMENT_SUCCESS,
})
export const deleteAnnouncementFailure = errorMessage => ({
  type: announcementTypes.DELETE_ANNOUNCEMENT_FAILURE,
  payload: errorMessage,
})

export const deleteAnnouncementAsync = (
  announcementUuid,
  userUuid,
  messages
) => async dispatch => {
  try {
    dispatch(deleteAnnouncementStart())
    await req.delete("/berenice_announcement/announcement", {
      params: { announcementUuid },
    })
    userUuid
      ? dispatch(getAnnouncementsOfSingalUserAsync(userUuid))
      : dispatch(getAllAnnouncementsAsync())
    dispatch(deleteAnnouncementSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteAnnouncementFailure(error.message))
  }
}
//-----------EDIT ANNOUNCEMENT-----------
export const editAnnouncementStart = () => ({
  type: announcementTypes.EDIT_ANNOUNCEMENT_START,
})
export const editAnnouncementSuccess = () => ({
  type: announcementTypes.EDIT_ANNOUNCEMENT_SUCCESS,
})
export const editAnnouncementFailure = errorMessage => ({
  type: announcementTypes.EDIT_ANNOUNCEMENT_FAILURE,
  payload: errorMessage,
})

export const editAnnouncementAsync = (
  requestBody,
  announcementUuid,
  userUuid,
  messages
) => async dispatch => {
  try {
    dispatch(editAnnouncementStart())
    await req.put("/berenice_announcement/announcement", requestBody, {
      params: { announcementUuid },
    })
    userUuid
      ? dispatch(getAnnouncementsOfSingalUserAsync(userUuid))
      : dispatch(getAllAnnouncementsAsync())
    dispatch(editAnnouncementSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editAnnouncementFailure(error.message))
  }
}
//-----------OTHER-----------
export const clearCreateAnnouncementErrorMessage = () => ({
  type: announcementTypes.CLEAR_CREATE_ANNOUNCEMENT_ERROR_MESSAGE,
})

export const clearDeleteAnnouncementErrorMessage = () => ({
  type: announcementTypes.CLEAR_DELETE_ANNOUNCEMENT_ERROR_MESSAGE,
})

export const clearEditAnnouncementErrorMessage = () => ({
  type: announcementTypes.CLEAR_EDIT_ANNOUNCEMENT_ERROR_MESSAGE,
})
