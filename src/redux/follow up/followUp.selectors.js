import { createSelector } from "reselect"

const selectFollowUp = state => state.followUp

//----------------1ST LEVEL SELECTORS--------------
export const selectSelectedFollowUp = createSelector(
  [selectFollowUp],
  followUp => followUp.selectedFollowUp
)

export const selectSelectedUserFollowUps = createSelector(
  [selectFollowUp],
  followUp => followUp.selectedUserFollowUps
)

export const selectAllFollowUps = createSelector(
  [selectFollowUp],
  followUp => followUp.allFollowUps
)

export const selectFollowUpErrorMessages = createSelector(
  [selectFollowUp],
  followUp => followUp.errorMessages
)

export const selectFollowUpIsLoading = createSelector(
  [selectFollowUp],
  followUp => followUp.isLoading
)
//----------------2ND LEVEL SELECTORS--------------
export const selectCreateFollowUpErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.createFollowUp
)
export const selectCreateFollowUpIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.createFollowUp
)

export const selectGetFollowUpErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.getFollowUp
)
export const selectGetFollowUpIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.getFollowUp
)

export const selectGetAllFollowUpsErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.getAllFollowUps
)
export const selectGetAllFollowUpsIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.getAllFollowUps
)

export const selectGetFollowUpsOfSingalUserErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.getFollowUpsOfSingalUser
)
export const selectGetFollowUpsOfSingalUserIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.getFollowUpsOfSingalUser
)

export const selectDeleteFollowUpErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.deleteFollowUp
)
export const selectDeleteFollowUpIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.deleteFollowUp
)

export const selectEditFollowUpErrorMessage = createSelector(
  [selectFollowUpErrorMessages],
  errorMessages => errorMessages.editFollowUp
)
export const selectEditFollowUpIsLoading = createSelector(
  [selectFollowUpIsLoading],
  isLoading => isLoading.editFollowUp
)
