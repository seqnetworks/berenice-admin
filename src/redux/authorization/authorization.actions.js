import authorizationTypes from "./authorization.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"

//----------ADD USER TO GROUP-----------
export const addUserToGroupStart = () => ({
	type: authorizationTypes.ADD_USER_TO_GROUP_START
})
export const addUserToGroupSuccess = () => ({
	type: authorizationTypes.ADD_USER_TO_GROUP_SUCCESS
})
export const addUserToGroupFailure = errorMessage => ({
	type: authorizationTypes.ADD_USER_TO_GROUP_FAILURE,
	payload: errorMessage
})

export const addUserToGroupAsync = (requestBody, messages) => async dispatch => {
	try {
		dispatch(addUserToGroupStart())
		await req.post("/simsim_user/add_user_group", requestBody)
		dispatch(addUserToGroupSuccess())
		noti({
			title: messages.success.title,
			content: messages.success.content,
			type: "success"
		})
		dispatch(getGroupUsersAsync(requestBody.groupUuid))
	} catch (error) {
		dispatch(
			addUserToGroupFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------REMOVE USER FROM GROUP-----------
export const removeUserFromGroupStart = () => ({
	type: authorizationTypes.REMOVE_USER_FROM_GROUP_START
})
export const removeUserFromGroupSuccess = () => ({
	type: authorizationTypes.REMOVE_USER_FROM_GROUP_SUCCESS
})
export const removeUserFromGroupFailure = errorMessage => ({
	type: authorizationTypes.REMOVE_USER_FROM_GROUP_FAILURE,
	payload: errorMessage
})

export const removeUserFromGroupAsync = (requestBody, messages) => async dispatch => {
	try {
		dispatch(removeUserFromGroupStart())
		await req.delete(
			`/simsim_user/remove_user_group?userUuid=${requestBody.userUuid}&groupUuid=${requestBody.groupUuid}`,
			{
				params: {
					userUuid: requestBody.userUuid,
					groupUuid: requestBody.groupUuid
				}
			}
		)
		dispatch(removeUserFromGroupSuccess())
		noti({
			title: messages.success.title,
			content: messages.success.content,
			type: "success"
		})
		dispatch(getGroupUsersAsync(requestBody.groupUuid))
	} catch (error) {
		dispatch(
			removeUserFromGroupFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------GET GROUP-----------
export const getGroupStart = () => ({
	type: authorizationTypes.GET_GROUP_START
})
export const getGroupSuccess = group => ({
	type: authorizationTypes.GET_GROUP_SUCCESS,
	payload: group
})
export const getGroupFailure = errorMessage => ({
	type: authorizationTypes.GET_GROUP_FAILURE,
	payload: errorMessage
})

export const getGroupAsync = groupUuid => async dispatch => {
	try {
		dispatch(getGroupStart())
		const result = await req.get(`/simsim_user/group?uuid=${groupUuid}`, {
			params: { uuid: groupUuid }
		})
		result.data = {
			...result.data,
			createdAt:
				result.data.createdAt.slice(0, 10) + " | " + result.data.createdAt.slice(11, 19)
		}
		dispatch(getGroupSuccess(result.data))
	} catch (error) {
		dispatch(
			getGroupFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------GET ALL GROUPS-----------
export const getAllGroupsStart = () => ({
	type: authorizationTypes.GET_ALL_GROUPS_START
})
export const getAllGroupsSuccess = groups => ({
	type: authorizationTypes.GET_ALL_GROUPS_SUCCESS,
	payload: groups
})
export const getAllGroupsFailure = errorMessage => ({
	type: authorizationTypes.GET_ALL_GROUPS_FAILURE,
	payload: errorMessage
})

export const getAllGroupsAsync = () => async dispatch => {
	try {
		dispatch(getAllGroupsStart())
		const result = await req.get("/simsim_user/groups")
		result.data = result.data.map(
			group =>
				(group = {
					...group,
					createdAt: group.createdAt.slice(0, 10) + " | " + group.createdAt.slice(11, 19),
					updatedAt: group.updatedAt.slice(0, 10) + " | " + group.updatedAt.slice(11, 19)
				})
		)
		dispatch(getAllGroupsSuccess(result.data))
	} catch (error) {
		dispatch(getAllGroupsFailure(error.message))
	}
}
//----------GET GROUP USERS-----------
export const getGroupUsersStart = () => ({
	type: authorizationTypes.GET_GROUP_USERS_START
})
export const getGroupUsersSuccess = users => ({
	type: authorizationTypes.GET_GROUP_USERS_SUCCESS,
	payload: users
})
export const getGroupUsersFailure = errorMessage => ({
	type: authorizationTypes.GET_GROUP_USERS_FAILURE,
	payload: errorMessage
})

export const getGroupUsersAsync = groupUuid => async dispatch => {
	try {
		dispatch(getGroupUsersStart())
		const result = await req.get(`/simsim_user/group_users?uuid=${groupUuid}`, {
			params: { uuid: groupUuid }
		})
		dispatch(getGroupUsersSuccess(result.data[0].users))
	} catch (error) {
		dispatch(
			getGroupUsersFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------CREATE GROUP-----------
export const createGroupStart = () => ({
	type: authorizationTypes.CREATE_GROUP_START
})
export const createGroupSuccess = () => ({
	type: authorizationTypes.CREATE_GROUP_SUCCESS
})
export const createGroupFailure = errorMessage => ({
	type: authorizationTypes.CREATE_GROUP_FAILURE,
	payload: errorMessage
})

export const createGroupAsync = (requestBody, messages) => async dispatch => {
	try {
		dispatch(createGroupStart())
		await req.post("/simsim_user/group", requestBody)
		dispatch(createGroupSuccess())
		noti({
			title: messages.success.title,
			content: messages.success.content,
			type: "success"
		})
		dispatch(getAllGroupsAsync())
	} catch (error) {
		dispatch(
			createGroupFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------DELETE GROUP-----------
export const deleteGroupStart = () => ({
	type: authorizationTypes.DELETE_GROUP_START
})
export const deleteGroupSuccess = () => ({
	type: authorizationTypes.DELETE_GROUP_SUCCESS
})
export const deleteGroupFailure = errorMessage => ({
	type: authorizationTypes.DELETE_GROUP_FAILURE,
	payload: errorMessage
})

export const deleteGroupAsync = (groupName, messages) => async dispatch => {
	try {
		dispatch(deleteGroupStart())
		await req.delete(`/simsim_auth/group?name=${groupName}`, {
			params: { name: groupName }
		})
		dispatch(clearSelectedGroup())
		dispatch(getAllGroupsAsync())
		dispatch(deleteGroupSuccess())
		noti({
			title: messages.success.title,
			content: messages.success.content,
			type: "success"
		})
	} catch (error) {
		dispatch(
			deleteGroupFailure(
				error.response.data.message ? error.response.data.message : error.message
			)
		)
	}
}
//----------OTHERS-----------
export const clearCreateGroupErrorMessage = () => ({
	type: authorizationTypes.CLEAR_CREATE_GROUP_ERROR_MESSAGE
})

export const clearDeleteGroupErrorMessage = () => ({
	type: authorizationTypes.CLEAR_DELETE_GROUP_ERROR_MESSAGE
})

export const clearAddUserToGroupErrorMessage = () => ({
	type: authorizationTypes.CLEAR_ADD_USER_TO_GROUP_ERROR_MESSAGE
})

export const clearRemoveUserFromGroupErrorMessage = () => ({
	type: authorizationTypes.CLEAR_REMOVE_USER_FROM_GROUP_ERROR_MESSAGE
})

export const clearSelectedGroup = () => ({
	type: authorizationTypes.CLEAR_SELECTED_GROUP
})
