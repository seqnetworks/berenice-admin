import { createSelector } from "reselect"

export const selectAuth = state => state.auth

//-------------1ST-LEVEL-SELECTORS-----------------

export const selectCurrentUser = createSelector(
  [selectAuth],
  auth => auth.currentUser
)

export const selectAuthIsLoading = createSelector(
  [selectAuth],
  auth => auth.isLoading
)

export const selectAuthErrorMessages = createSelector(
  [selectAuth],
  auth => auth.errorMessages
)

export const selectAuthAbility = createSelector(
  [selectAuth],
  auth => auth.ability
)

export const selectAuthUserLoggedIn = createSelector(
  [selectAuth],
  auth => auth.loggedIn
)
//-------------2ND-LEVEL-SELECTORS-----------------
export const selectCurrentUserUsername = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.username
)

export const selectCurrentUserRole = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.role
)

export const selectCurrentUserUuid = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.uuid
)

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.userId
)

export const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.fullName
)

export const selectCurrentUserFullNameArabic = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.fullNameArabic
)

export const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.avatar
)

export const selectLoginIsLoading = createSelector(
  [selectAuthIsLoading],
  isLoading => isLoading.login
)
export const selectLoginErrorMessage = createSelector(
  [selectAuthErrorMessages],
  errorMessages => errorMessages.login
)

export const selectChangePasswordErrorMessage = createSelector(
  [selectAuthErrorMessages],
  errorMessages => errorMessages.changePassword
)
export const selectChangePasswordIsLoading = createSelector(
  [selectAuthIsLoading],
  isLoading => isLoading.changePassword
)

export const selectChangeStatusErrorMessage = createSelector(
  [selectAuthErrorMessages],
  errorMessages => errorMessages.changeStatus
)
export const selectChangeStatusIsLoading = createSelector(
  [selectAuthIsLoading],
  isLoading => isLoading.changeStatus
)
