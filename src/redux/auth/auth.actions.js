import authTypes from "./auth.types"
import { api, req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { bannedRules, includesChecker } from "../../utility/custom/banned rules"
import {
  getUserAsync,
  getStudentsAsync,
  getGuardiansAsync,
  getLecturersAsync,
  getAllStaffAsync,
} from "../index.actions"

//------------LOGIN-------------
export const logInStart = () => ({
  type: authTypes.LOG_IN_START,
})

export const logInSuccess = (credentials, info) => ({
  type: authTypes.LOG_IN_SUCCESS,
  payload: { credentials, info },
})

export const logInFailure = message => ({
  type: authTypes.LOG_IN_FAILURE,
  payload: message,
})

export const logInAsync = credentials => {
  return async dispatch => {
    try {
      dispatch(logInStart())
      const res = await api.post("/berenice_auth/login", credentials)
      const info = await api.get("/berenice_user/user_details", {
        headers: { Authorization: `Bearer ${res.data.tokens.accessToken}` },
      })
      if (res.data.role === "staff" || res.data.role === "lecturer") {
        const acl = await api.get("/berenice_auth/acl", {
          params: { uuid: res.data.uuid },
          headers: { Authorization: `Bearer ${res.data.tokens.accessToken}` },
        })
        let rules = []
        Object.keys(acl.data.rules).map(firstKey => {
          if (acl.data.rules[firstKey])
            Object.keys(acl.data.rules[firstKey]).map(secondKey => {
              if (acl.data.rules[firstKey][secondKey])
                acl.data.rules[firstKey][secondKey].map(value => {
                  if (!includesChecker(bannedRules[firstKey][secondKey], value))
                    rules.push({
                      action: "manage",
                      subject: value.slice(1) + "-" + firstKey,
                    })
                })
            })
        })
        await dispatch(getCurrentUserAclSuccess(rules))
        await dispatch(logInSuccess(res.data, info.data))
        window.setTimeout(() => location.reload(), 0.001)
      } else dispatch(logInFailure("not admin"))
    } catch (error) {
      dispatch(logInFailure(error.message))
    }
  }
}
//------------CHANGE PASSWORD-------------
export const changePasswordStart = () => ({
  type: authTypes.CHANGE_PASSWORD_START,
})
export const changePasswordSuccess = () => ({
  type: authTypes.CHANGE_PASSWORD_SUCCESS,
})
export const changePasswordFailure = errorMessage => ({
  type: authTypes.CHANGE_PASSWORD_FAILURE,
  payload: errorMessage,
})

export const changePasswordAsync = (
  requestBody,
  messages,
  toBeCalled
) => async dispatch => {
  try {
    dispatch(changePasswordStart())
    await req.post("/berenice_auth/change_password", requestBody)
    noti({
      title: messages.success.title,
      content: messages.success.content,
      type: "success",
    })
    dispatch(changePasswordSuccess())
    toBeCalled()
  } catch (error) {
    noti({
      title: messages.error.title,
      content: messages.error.content,
      type: "error",
    })
    dispatch(
      changePasswordFailure(
        error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
//------------CHANGE STATUS-------------
export const changeStatusStart = () => ({
  type: authTypes.CHANGE_STATUS_START,
})
export const changeStatusSuccess = () => ({
  type: authTypes.CHANGE_STATUS_SUCCESS,
})
export const changeStatusFailure = errorMessage => ({
  type: authTypes.CHANGE_STATUS_FAILURE,
  payload: errorMessage,
})

export const changeStatusAsync = (
  requestBody,
  paramAndType,
  messages
) => async dispatch => {
  const getAllAfterSuccess = {
    lecturer: () => dispatch(getLecturersAsync()),
    guardian: () => dispatch(getGuardiansAsync()),
    student: () => dispatch(getStudentsAsync()),
    staff: () => dispatch(getAllStaffAsync()),
  }
  try {
    dispatch(changeStatusStart())
    await req.post("/berenice_auth/change_status", requestBody)
    noti({
      title: messages.success.title,
      content: messages.success.content,
      type: "success",
    })
    dispatch(getUserAsync(paramAndType))
    getAllAfterSuccess[paramAndType.type]()
    dispatch(changeStatusSuccess())
  } catch (error) {
    dispatch(changeStatusFailure(error.message))
  }
}
//------------GET CURRENT USER ACL-------------
export const getCurrentUserAclStart = () => ({
  type: authTypes.GET_CURRENT_USER_ACL_START,
})
export const getCurrentUserAclSuccess = acl => ({
  type: authTypes.GET_CURRENT_USER_ACL_SUCCESS,
  payload: acl,
})
export const getCurrentUserAclFailure = errorMessage => ({
  type: authTypes.GET_CURRENT_USER_ACL_FAILURE,
  payload: errorMessage,
})

export const getCurrentUserAclAsync = userUuid => async dispatch => {
  try {
    dispatch(getCurrentUserAclStart())
    const result = await req.get("/berenice_auth/acl", {
      params: { uuid: userUuid },
    })
    dispatch(getCurrentUserAclSuccess(result.data))
  } catch (error) {
    dispatch(getCurrentUserAclFailure(error.message))
  }
}
//------------UPDATE CURRENT USER ACL-------------
export const updateCurrentUserAcl = rules => ({
  type: authTypes.UPDATE_CURRENT_USER_ACL,
  payload: rules,
})

export const updateCurrentUserAclAsync = currentUserUuid => async dispatch => {
  try {
    const acl = await req.get("/berenice_auth/acl", {
      params: { uuid: currentUserUuid },
    })
    let rules = []
    Object.keys(acl.data.rules).map(firstKey => {
      if (acl.data.rules[firstKey])
        Object.keys(acl.data.rules[firstKey]).map(secondKey => {
          if (acl.data.rules[firstKey][secondKey])
            acl.data.rules[firstKey][secondKey].map(value => {
              rules.push({
                action: "manage",
                subject: value.slice(1) + "-" + firstKey,
              })
            })
        })
    })
    dispatch(updateCurrentUserAcl(rules))
  } catch (error) {}
}
//------------OTHERS-------------
export const userLoggedIn = () => ({
  type: authTypes.USER_LOGGED_IN,
})

export const logOut = () => ({
  type: authTypes.LOG_OUT,
})

export const updateToken = token => ({
  type: authTypes.UPDATE_TOKEN,
  payload: token,
})

export const clearChangeStatusErrorMessage = () => ({
  type: authTypes.CLEAR_CHANGE_STATUS_ERROR_MESSAGE,
})
