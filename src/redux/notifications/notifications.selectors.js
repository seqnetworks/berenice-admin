import { createSelector } from "reselect"

export const selectNotifications = state => state.notifications

//-------------1ST-LEVEL-SELECTORS-----------------

export const selectNotificationsIsLoading = createSelector(
  [selectNotifications],
  notifications => notifications.isLoading
)

export const selectNotificationsErrorMessages = createSelector(
  [selectNotifications],
  notifications => notifications.errorMessages
)

//-------------2ND-LEVEL-SELECTORS-----------------

export const selectSendNotificationErrorMessage = createSelector(
  [selectNotificationsErrorMessages],
  errorMessages => errorMessages.sendNotification
)
export const selectSendNotificationIsLoading = createSelector(
  [selectNotificationsIsLoading],
  isLoading => isLoading.sendNotification
)

export const selectSendNotificationToUserErrorMessage = createSelector(
  [selectNotificationsErrorMessages],
  errorMessages => errorMessages.sendNotificationToUser
)
export const selectSendNotificationToUserIsLoading = createSelector(
  [selectNotificationsIsLoading],
  isLoading => isLoading.sendNotificationToUser
)
