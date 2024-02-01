import { createSelector } from "reselect"

const selectAuthorization = state => state.authorization

//-------------------1ST LEVEL SELECTORS----------------------
export const selectAllGroups = createSelector(
	[selectAuthorization],
	authorization => authorization.allGroups
)

export const selectSelectedGroup = createSelector(
	[selectAuthorization],
	authorization => authorization.selectedGroup
)

export const selectSelectedGroupUsers = createSelector(
	[selectAuthorization],
	authorization => authorization.selectedGroupUsers
)

export const selectAuthorizationIsLoading = createSelector(
	[selectAuthorization],
	authorization => authorization.isLoading
)

export const selectAuthorizationErrorMessages = createSelector(
	[selectAuthorization],
	authorization => authorization.errorMessages
)
//-------------------2ND LEVEL SELECTORS----------------------
export const selectGetAllGroupsErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.getAllGroups
)
export const selectGetAllGroupsIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.getAllGroups
)

export const selectCreateGroupErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.createGroup
)
export const selectCreateGroupIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.createGroup
)

export const selectDeleteGroupErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.deleteGroup
)
export const selectDeleteGroupIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.deleteGroup
)

export const selectGetGroupErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.getGroup
)
export const selectGetGroupIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.getGroup
)

export const selectGetGroupUsersErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.getGroupUsers
)
export const selectGetGroupUsersIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.getGroupUsers
)

export const selectAddUserToGroupErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.addUserToGroup
)
export const selectAddUserToGroupIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.addUserToGroup
)

export const selectRemoveUserFromGroupErrorMessage = createSelector(
	[selectAuthorizationErrorMessages],
	errorMessages => errorMessages.removeUserFromGroup
)
export const selectRemoveUserFromGroupIsLoading = createSelector(
	[selectAuthorizationIsLoading],
	isLoading => isLoading.removeUserFromGroup
)
