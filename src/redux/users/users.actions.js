import usersTypes from "./users.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import toBase64Handler from "../../utility/custom/base64handler"
import { bannedRules, includesChecker } from "../../utility/custom/banned rules"

//-------------GET ALL USERS---------------
export const getAllUsersStart = () => ({
  type: usersTypes.GET_ALL_USERS_START,
})

export const getAllUsersSuccess = users => ({
  type: usersTypes.GET_ALL_USERS_SUCCESS,
  payload: users,
})

export const getAllUsersFailure = errorMessage => ({
  type: usersTypes.GET_ALL_USERS_FAILURE,
  payload: errorMessage,
})

export const getAllUsersAsync = () => async dispatch => {
  try {
    dispatch(getAllUsersStart())
    const result = await req.get("/berenice_user/users")
    result.data = result.data.map(
      user => (user = { ...user, phoneNumber: user.phoneNumber.slice(4) })
    )
    dispatch(getAllUsersSuccess(result.data))
  } catch (error) {
    dispatch(getAllUsersFailure(error.message))
  }
}
//-------------GET STUDENTS---------------
export const getStudentsStart = () => ({
  type: usersTypes.GET_STUDENTS_START,
})

export const getStudentsSuccess = users => ({
  type: usersTypes.GET_STUDENTS_SUCCESS,
  payload: users,
})

export const getStudentsFailure = errorMessage => ({
  type: usersTypes.GET_STUDENTS_FAILURE,
  payload: errorMessage,
})

export const getStudentsAsync = () => async dispatch => {
  try {
    dispatch(getStudentsStart())
    const result = await req.get("/berenice_user/students")
    result.data = result.data.map(
      student =>
        (student = { ...student, phoneNumber: student.phoneNumber.slice(4) })
    )
    dispatch(getStudentsSuccess(result.data))
  } catch (error) {
    dispatch(getStudentsFailure(error.message))
  }
}
//-------------GET ALL STAFF---------------
export const getAllStaffStart = () => ({
  type: usersTypes.GET_ALL_STAFF_START,
})

export const getAllStaffSuccess = users => ({
  type: usersTypes.GET_ALL_STAFF_SUCCESS,
  payload: users,
})

export const getAllStaffFailure = errorMessage => ({
  type: usersTypes.GET_ALL_STAFF_FAILURE,
  payload: errorMessage,
})

export const getAllStaffAsync = () => async dispatch => {
  try {
    dispatch(getAllStaffStart())
    const result = await req.get("/berenice_user/all_staff")
    result.data = result.data.map(
      staff => (staff = { ...staff, phoneNumber: staff.phoneNumber.slice(4) })
    )
    dispatch(getAllStaffSuccess(result.data))
  } catch (error) {
    dispatch(getAllStaffFailure(error.message))
  }
}
//-------------GET GUARDIANS---------------
export const getGuardiansStart = () => ({
  type: usersTypes.GET_GUARDIANS_START,
})

export const getGuardiansSuccess = users => ({
  type: usersTypes.GET_GUARDIANS_SUCCESS,
  payload: users,
})

export const getGuardiansFailure = errorMessage => ({
  type: usersTypes.GET_GUARDIANS_FAILURE,
  payload: errorMessage,
})

export const getGuardiansAsync = () => async dispatch => {
  try {
    dispatch(getGuardiansStart())
    const result = await req.get("/berenice_user/guardians")
    result.data = result.data.map(
      guardian =>
        (guardian = { ...guardian, phoneNumber: guardian.phoneNumber.slice(4) })
    )
    dispatch(getGuardiansSuccess(result.data))
  } catch (error) {
    dispatch(getGuardiansFailure(error.message))
  }
}
//-------------GET LECTURERS---------------
export const getLecturersStart = () => ({
  type: usersTypes.GET_LECTURERS_START,
})

export const getLecturersSuccess = users => ({
  type: usersTypes.GET_LECTURERS_SUCCESS,
  payload: users,
})

export const getLecturersFailure = errorMessage => ({
  type: usersTypes.GET_LECTURERS_FAILURE,
  payload: errorMessage,
})

export const getLecturersAsync = () => async dispatch => {
  try {
    dispatch(getLecturersStart())
    const result = await req.get("/berenice_user/lecturers")
    result.data = result.data.map(
      lecturer =>
        (lecturer = { ...lecturer, phoneNumber: lecturer.phoneNumber.slice(4) })
    )
    dispatch(getLecturersSuccess(result.data))
  } catch (error) {
    dispatch(getLecturersFailure(error.message))
  }
}
//-------------GET USER---------------
export const getUserStart = () => ({
  type: usersTypes.GET_USER_START,
})
export const getUserSuccess = user => ({
  type: usersTypes.GET_USER_SUCCESS,
  payload: user,
})
export const getUserFailure = errorMessage => ({
  type: usersTypes.GET_USER_FAILURE,
  payload: errorMessage,
})

export const getUserAsync = paramAndType => async dispatch => {
  const requestHelper = {
    params: {
      student: { studentUuid: paramAndType.param },
      guardian: { guardianUuid: paramAndType.param },
      lecturer: { lecturerId: paramAndType.param },
      staff: { staffId: paramAndType.param },
    },
    urlParams: {
      student: { first: "student", second: "studentUuid" },
      guardian: { first: "guardian", second: "guardianUuid" },
      lecturer: { first: "lecturer", second: "lecturerUuid" },
      staff: { first: "staff", second: "staffUuid" },
    },
  }
  try {
    dispatch(getUserStart())
    const result = paramAndType.lecturer
      ? await req.get("/berenice_user/user_details")
      : await req.get(
          `/berenice_user/${requestHelper.urlParams[paramAndType.type].first}?${
            requestHelper.urlParams[paramAndType.type].second
          }=${paramAndType.param}`,
          {
            params: requestHelper.params[paramAndType.type],
          }
        )
    dispatch(
      paramAndType.lecturer
        ? getUserSuccess({
            ...result.data,
            phoneNumber: result.data.phoneNumber.slice(4),
          })
        : getUserSuccess({
            ...result.data,
            phoneNumber: result.data.phoneNumber.slice(4),
            createdAt:
              result.data.createdAt.slice(0, 10) +
              " | " +
              result.data.createdAt.slice(11, 19),
            updatedAt:
              result.data.updatedAt.slice(0, 10) +
              " | " +
              result.data.updatedAt.slice(11, 19),
          })
    )
  } catch (error) {
    dispatch(getUserFailure(error.message))
  }
}
//-------------UPDATE USER DETAILS---------------
export const updateUserDetailsStart = () => ({
  type: usersTypes.UPDATE_USER_DETAILS_START,
})
export const updateUserDetailsSuccess = () => ({
  type: usersTypes.UPDATE_USER_DETAILS_SUCCESS,
})
export const updateUserDetailsFailure = errorMessage => ({
  type: usersTypes.UPDATE_USER_DETAILS_FAILURE,
  payload: errorMessage,
})

export const updateUserDetailsAsync = (
  requestBody,
  uuid,
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
    dispatch(updateUserDetailsStart())
    await req.put("/berenice_user/user", requestBody, {
      params: { userUuid: uuid },
    })
    noti({
      content: messages.success.content,
      title: messages.success.title,
      type: "success",
    })
    dispatch(getUserAsync(paramAndType))
    getAllAfterSuccess[paramAndType.type]()
    dispatch(updateUserDetailsSuccess())
  } catch (error) {
    noti({
      content: messages.error.content,
      title: messages.error.title,
      type: "error",
    })
    dispatch(updateUserDetailsFailure(error.message))
  }
}
//-------------ADD STAFF---------------
export const addStaffStart = () => ({
  type: usersTypes.ADD_STAFF_START,
})
export const addStaffSuccess = () => ({
  type: usersTypes.ADD_STAFF_SUCCESS,
})
export const addStaffFailure = errorMessage => ({
  type: usersTypes.ADD_STAFF_FAILURE,
  payload: errorMessage,
})

export const addStaffAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(addStaffStart())
    let base64UserAvatar = requestBody.userAvatar
      ? await toBase64Handler(requestBody.userAvatar)
      : ""
    requestBody = { ...requestBody, userAvatar: base64UserAvatar }
    await req.post("/berenice_auth/signup", requestBody)
    dispatch(addStaffSuccess())
    dispatch(getAllStaffAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addStaffFailure(error.message))
  }
}
//-------------ADD STUDENT---------------
export const addStudentStart = () => ({
  type: usersTypes.ADD_STUDENT_START,
})
export const addStudentSuccess = () => ({
  type: usersTypes.ADD_STUDENT_SUCCESS,
})
export const addStudentFailure = errorMessage => ({
  type: usersTypes.ADD_STUDENT_FAILURE,
  payload: errorMessage,
})

export const addStudentAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(addStudentStart())
    let base64UserAvatar = requestBody.userAvatar
      ? await toBase64Handler(requestBody.userAvatar)
      : ""
    requestBody = { ...requestBody, userAvatar: base64UserAvatar }
    await req.post("/berenice_auth/signup", requestBody)
    dispatch(addStudentSuccess())
    dispatch(getStudentsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addStudentFailure(error.message))
  }
}
//-------------ADD LECTURER---------------
export const addLecturerStart = () => ({
  type: usersTypes.ADD_LECTURER_START,
})
export const addLecturerSuccess = () => ({
  type: usersTypes.ADD_LECTURER_SUCCESS,
})
export const addLecturerFailure = errorMessage => ({
  type: usersTypes.ADD_LECTURER_FAILURE,
  payload: errorMessage,
})

export const addLecturerAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(addLecturerStart())
    let base64UserAvatar = requestBody.userAvatar
      ? await toBase64Handler(requestBody.userAvatar)
      : ""
    requestBody = { ...requestBody, userAvatar: base64UserAvatar }
    await req.post("/berenice_auth/signup", requestBody)
    dispatch(addLecturerSuccess())
    dispatch(getLecturersAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addLecturerFailure(error.message))
  }
}
//-------------ADD GUARDIAN---------------
export const addGuardianStart = () => ({
  type: usersTypes.ADD_GUARDIAN_START,
})
export const addGuardianSuccess = () => ({
  type: usersTypes.ADD_GUARDIAN_SUCCESS,
})
export const addGuardianFailure = errorMessage => ({
  type: usersTypes.ADD_GUARDIAN_FAILURE,
  payload: errorMessage,
})

export const addGuardianAsync = (
  requestBody,
  children,
  messages
) => async dispatch => {
  let error = false
  let guardianUuid = ""
  try {
    dispatch(addGuardianStart())
    let base64UserAvatar = requestBody.userAvatar
      ? await toBase64Handler(requestBody.userAvatar)
      : ""
    requestBody = { ...requestBody, userAvatar: base64UserAvatar }
    const result = await req.post("/berenice_auth/signup", requestBody)
    guardianUuid = result.data.guardianUuid
  } catch (error) {
    dispatch(addGuardianFailure(error.message))
    error = true
  }
  if (children && !error) {
    for (const child of children) {
      await req.post("/berenice_user/add_guardian_to_student", {
        ...child,
        guardianUuid: guardianUuid,
      })
    }
    dispatch(addGuardianSuccess())
    dispatch(getGuardiansAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
    noti({
      type: "info",
      title: messages.info.title,
      content: messages.info.content,
    })
  } else {
    dispatch(addGuardianSuccess())
    dispatch(getGuardiansAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  }
}
//-------------LINK GUARDIAN AND STUDENT---------------
export const linkGuardianAndStudentStart = () => ({
  type: usersTypes.LINK_GUARDIAN_AND_STUDENT_START,
})
export const linkGuardianAndStudentSuccess = () => ({
  type: usersTypes.LINK_GUARDIAN_AND_STUDENT_SUCCESS,
})
export const linkGuardianAndStudentFailure = errorMessage => ({
  type: usersTypes.LINK_GUARDIAN_AND_STUDENT_FAILURE,
  payload: errorMessage,
})

export const linkGuardianAndStudentAsync = (
  requestBody,
  type,
  messages
) => async dispatch => {
  try {
    dispatch(linkGuardianAndStudentStart())
    await req.post("/berenice_user/add_guardian_to_student", requestBody)
    dispatch(linkGuardianAndStudentSuccess())
    if (type)
      type === "guardian"
        ? dispatch(getStudentsOfGuardianAsync(requestBody.guardianUuid))
        : dispatch(getGuardiansOfStudentAsync(requestBody.studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(linkGuardianAndStudentFailure(error.message))
  }
}
//-------------DELETE GUARDIAN AND STUDENT---------------
export const deleteGuardianAndStudentStart = () => ({
  type: usersTypes.DELETE_GUARDIAN_AND_STUDENT_START,
})
export const deleteGuardianAndStudentSuccess = () => ({
  type: usersTypes.DELETE_GUARDIAN_AND_STUDENT_SUCCESS,
})
export const deleteGuardianAndStudentFailure = errorMessage => ({
  type: usersTypes.DELETE_GUARDIAN_AND_STUDENT_FAILURE,
  payload: errorMessage,
})

export const deleteGuardianAndStudentAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(deleteGuardianAndStudentStart())
    await req.delete("/berenice_user/delete_guardian_of_student", {
      params: { studentGuardianUuid: requestBody.studentGuardianUuid },
    })
    dispatch(deleteGuardianAndStudentSuccess())
    requestBody.type === "guardian"
      ? dispatch(getStudentsOfGuardianAsync(requestBody.id))
      : dispatch(getGuardiansOfStudentAsync(requestBody.id))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteGuardianAndStudentFailure(error.message))
  }
}
//-------------GET GUARDIANS OF STUDENT---------------
export const getGuardiansOfStudentStart = () => ({
  type: usersTypes.GET_GUARDIANS_OF_STUDENT_START,
})
export const getGuardiansOfStudentSuccess = guardians => ({
  type: usersTypes.GET_GUARDIANS_OF_STUDENT_SUCCESS,
  payload: guardians,
})
export const getGuardiansOfStudentFailure = errorMessage => ({
  type: usersTypes.GET_GUARDIANS_OF_STUDENT_FAILURE,
  payload: errorMessage,
})

export const getGuardiansOfStudentAsync = studentId => async dispatch => {
  try {
    dispatch(getGuardiansOfStudentStart())
    const result = await req.get("/berenice_user/student_guardians", {
      params: { studentUuid: studentId },
    })
    dispatch(getGuardiansOfStudentSuccess(result.data))
  } catch (error) {
    dispatch(getGuardiansOfStudentFailure(error.message))
  }
}
//-------------GET STUDENTS OF GUARDIAN---------------
export const getStudentsOfGuardianStart = () => ({
  type: usersTypes.GET_STUDENTS_OF_GUARDIAN_START,
})
export const getStudentsOfGuardianSuccess = students => ({
  type: usersTypes.GET_STUDENTS_OF_GUARDIAN_SUCCESS,
  payload: students,
})
export const getStudentsOfGuardianFailure = errorMessage => ({
  type: usersTypes.GET_STUDENTS_OF_GUARDIAN_FAILURE,
  payload: errorMessage,
})

export const getStudentsOfGuardianAsync = guardianUuid => async dispatch => {
  try {
    dispatch(getStudentsOfGuardianStart())
    const result = await req.get("/berenice_user/guardian_sutdents", {
      params: { guardianUuid: guardianUuid },
    })
    dispatch(getStudentsOfGuardianSuccess(result.data))
  } catch (error) {
    dispatch(getStudentsOfGuardianFailure(error.message))
  }
}
//----------GET USER ACL-----------
export const getUserAclStart = () => ({
  type: usersTypes.GET_USER_ACL_START,
})
export const getUserAclSuccess = acl => ({
  type: usersTypes.GET_USER_ACL_SUCCESS,
  payload: acl,
})
export const getUserAclFailure = errorMessage => ({
  type: usersTypes.GET_USER_ACL_FAILURE,
  payload: errorMessage,
})

export const getUserAclAsync = uuid => async dispatch => {
  try {
    dispatch(getUserAclStart())
    const result = await req.get("/berenice_auth/acl", {
      params: { uuid },
    })
    let rules = {
      "/berenice_auth": [],
      "/berenice_user": [],
      "/berenice_announcement": [],
      "/berenice_chat": [],
      "/berenice_notifications": [],
      "/berenice_finance": [],
      "/berenice_timetable": [],
      "/berenice_consultation": [],
      "/berenice_assets": [],
      "/berenice_enrollment": [],
      "/berenice_assessment": [],
    }
    Object.keys(result.data.rules).map(firstKey => {
      if (result.data.rules[firstKey])
        Object.keys(result.data.rules[firstKey]).map(secondKey => {
          if (result.data.rules[firstKey][secondKey])
            result.data.rules[firstKey][secondKey].map(value => {
              if (!includesChecker(bannedRules[firstKey][secondKey], value))
                rules[secondKey].push({ value: value, type: firstKey })
            })
        })
    })
    dispatch(getUserAclSuccess(rules))
  } catch (error) {
    dispatch(getUserAclFailure(error.message))
  }
}
//----------UPDATE USER ACL-----------
export const updateUserAclStart = () => ({
  type: usersTypes.UPDATE_USER_ACL_START,
})
export const updateUserAclSuccess = () => ({
  type: usersTypes.UPDATE_USER_ACL_SUCCESS,
})
export const updateUserAclFailure = errorMessage => ({
  type: usersTypes.UPDATE_USER_ACL_FAILURE,
  payload: errorMessage,
})

export const updateUserAclAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(updateUserAclStart())
    await req.post("/berenice_auth/acl", requestBody)
    dispatch(updateUserAclSuccess())
    noti({
      title: messages.success.title,
      content: messages.success.content,
      type: "success",
    })
    dispatch(getUserAclAsync(requestBody.userUuid))
  } catch (error) {
    noti({
      title: messages.error.title,
      content: messages.error.content,
      type: "error",
    })
    dispatch(updateUserAclFailure(error.message))
  }
}
//-------------EDIT USER AVATAR---------------
export const editUserAvatarStart = () => ({
  type: usersTypes.EDIT_USER_AVATAR_START,
})
export const editUserAvatarSuccess = () => ({
  type: usersTypes.EDIT_USER_AVATAR_SUCCESS,
})
export const editUserAvatarFailure = errorMessage => ({
  type: usersTypes.EDIT_USER_AVATAR_FAILURE,
  payload: errorMessage,
})

export const editUserAvatarAsync = (
  requestBody,
  messages,
  role
) => async dispatch => {
  const getAllAfterSuccess = {
    lecturer: () => dispatch(getLecturersAsync()),
    guardian: () => dispatch(getGuardiansAsync()),
    student: () => dispatch(getStudentsAsync()),
    staff: () => dispatch(getAllStaffAsync()),
  }
  try {
    dispatch(editUserAvatarStart())
    requestBody.base64 = await toBase64Handler(requestBody.base64)
    await req.post("berenice_assets/file", requestBody)
    getAllAfterSuccess[role]()
    dispatch(editUserAvatarSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editUserAvatarFailure(error.message))
  }
}
//-------------RESET PASSWORD---------------
export const resetPasswordStart = () => ({
  type: usersTypes.RESET_PASSWORD_START,
})
export const resetPasswordSuccess = password => ({
  type: usersTypes.RESET_PASSWORD_SUCCESS,
  payload: password,
})
export const resetPasswordFailure = errorMessage => ({
  type: usersTypes.RESET_PASSWORD_FAILURE,
  payload: errorMessage,
})

export const resetPassswordAsync = (
  username,
  func,
  messages
) => async dispatch => {
  try {
    dispatch(resetPasswordStart())
    const result = await req.get("/berenice_auth/reset_password", {
      params: { username },
    })
    dispatch(resetPasswordSuccess(result.data.newPassword))
    func(result.data.newPassword)
  } catch (error) {
    dispatch(resetPasswordFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-------------UPDATE STAFF TYPE---------------
export const updateStaffTypeStart = () => ({
  type: usersTypes.UPDATE_STAFF_TYPE_START,
})
export const updateStaffTypeSuccess = () => ({
  type: usersTypes.UPDATE_STAFF_TYPE_SUCCESS,
})
export const updateStaffTypeFailure = errorMessage => ({
  type: usersTypes.UPDATE_STAFF_TYPE_FAILURE,
  payload: errorMessage,
})

export const updateStaffTypeAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(updateStaffTypeStart())
    await req.put(
      "/berenice_user/staff",
      { staffType: requestBody.staffType },
      { params: { staffUuid: requestBody.staffId } }
    )
    dispatch(updateStaffTypeSuccess())
    dispatch(getUserAsync({ param: requestBody.staffId, type: "staff" }))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateStaffTypeFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-------------EDIT LECTURER POSITION---------------
export const editLecturerPositionStart = () => ({
  type: usersTypes.EDIT_LECTURER_POSITION_START,
})
export const editLecturerPositionSuccess = () => ({
  type: usersTypes.EDIT_LECTURER_POSITION_SUCCESS,
})
export const editLecturerPositionFailure = errorMessage => ({
  type: usersTypes.EDIT_LECTURER_POSITION_FAILURE,
  payload: errorMessage,
})

export const editLecturerPositionAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(editLecturerPositionStart())
    await req.put(
      "/berenice_user/lecturer",
      { lecturerPosition: requestBody.position },
      { params: { lecturerUuid: requestBody.lecturerUuid } }
    )
    dispatch(
      getUserAsync({ param: requestBody.lecturerUuid, type: "lecturer" })
    )
    dispatch(editLecturerPositionSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editLecturerPositionFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-------------UPDATE GUARDIAN TYPE---------------
export const updateGuardianTypeStart = () => ({
  type: usersTypes.UPDATE_GUARDIAN_TYPE_START,
})
export const updateGuardianTypeSuccess = () => ({
  type: usersTypes.UPDATE_GUARDIAN_TYPE_SUCCESS,
})
export const updateGuardianTypeFailure = errorMessage => ({
  type: usersTypes.UPDATE_GUARDIAN_TYPE_FAILURE,
  payload: errorMessage,
})

export const updateGuardianTypeAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(updateGuardianTypeStart())
    await req.put(
      "/berenice_user/guardian",
      { guardianType: requestBody.guardianType },
      { params: { studentGuardainUuid: requestBody.studentGuardianUuid } }
    )
    requestBody.type === "student"
      ? dispatch(getGuardiansOfStudentAsync(requestBody.id))
      : dispatch(getStudentsOfGuardianAsync(requestBody.id))
    dispatch(updateGuardianTypeSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateGuardianTypeFailure(error.message))
  }
}
//-------------DELETE USER---------------
export const deleteUserStart = () => ({
  type: usersTypes.DELETE_USER_START,
})
export const deleteUserSuccess = () => ({
  type: usersTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailure = errorMessage => ({
  type: usersTypes.DELETE_USER_FAILURE,
  payload: errorMessage,
})

export const deleteUserAsync = (
  userUuid,
  username,
  type,
  messages
) => async dispatch => {
  const getter = {
    staff: () => dispatch(getAllStaffAsync()),
    lecturer: () => dispatch(getLecturersAsync()),
    guardian: () => dispatch(getGuardiansAsync()),
    student: () => dispatch(getStudentsAsync()),
  }
  try {
    dispatch(deleteUserStart())
    await req.delete(
      `/berenice_auth/user?username=${username}&userUuid=${userUuid}`
    )
    dispatch(deleteUserSuccess())
    getter[type]()
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}
//-------------OTHERS---------------
export const clearGetAllUsersErrorMessage = () => ({
  type: usersTypes.CLEAR_GET_ALL_USERS_ERROR_MESSAGE,
})

export const clearAddUserErrorMessage = () => ({
  type: usersTypes.CLEAR_ADD_USER_ERROR_MESSAGE,
})

export const clearResetPasswordErrorMessage = () => ({
  type: usersTypes.CLEAR_RESET_PASSWORD_ERROR_MESSAGE,
})

export const clearDeleteGuardianAndStudentErrorMessage = () => ({
  type: usersTypes.CLEAR_DELETE_GUARDIAN_AND_STUDENT_ERROR_MESSAGE,
})

export const clearUpdateGuardianTypeErrorMessage = () => ({
  type: usersTypes.CLEAR_UPDATE_GUARDIAN_TYPE_ERROR_MESSAGE,
})

export const clearLinkGuardianAndStudentErrorMessage = () => ({
  type: usersTypes.CLEAR_LINK_GUARDIAN_AND_STUDENT_ERROR_MESSAGE,
})

export const clearEditUserAvatarErrorMessage = () => ({
  type: usersTypes.CLEAR_EDIT_USER_AVATAR_ERROR_MESSAGE,
})

export const clearDeleteUserErrorMessage = () => ({
  type: usersTypes.CLEAR_DELETE_USER_ERROR_MESSAGE,
})

export const updateSelectedUser = user => ({
  type: usersTypes.UPDATE_SELECTED_USER,
  payload: user,
})

export const clearNewPassword = () => ({
  type: usersTypes.CLEAR_NEW_PASSWORD,
})
