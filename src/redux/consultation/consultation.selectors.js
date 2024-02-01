import { createSelector } from "reselect"

export const selectConsultation = state => state.consultation

//-------------1ST-LEVEL-SELECTORS-----------------
export const selectAllConsultations = createSelector(
  [selectConsultation],
  consultation => consultation.allConsultations
)

export const selectSelectedUserConsultations = createSelector(
  [selectConsultation],
  consultation => consultation.selectedUserConsultations
)

export const selectConsultationBadge = createSelector(
  [selectConsultation],
  consultation => consultation.badge
)

export const selectConsultationIsLoading = createSelector(
  [selectConsultation],
  consultation => consultation.isLoading
)

export const selectConsultationErrorMessages = createSelector(
  [selectConsultation],
  consultation => consultation.errorMessages
)
//-------------2ND-LEVEL-SELECTORS-----------------

export const selectGetAllConsultationsErrorMessage = createSelector(
  [selectConsultationErrorMessages],
  errorMessages => errorMessages.getAllConsultations
)
export const selectGetAllConsultationsIsLoading = createSelector(
  [selectConsultationIsLoading],
  isLoading => isLoading.getAllConsultations
)

export const selectGetSelectedUserConsultationsErrorMessage = createSelector(
  [selectConsultationErrorMessages],
  errorMessages => errorMessages.getSelectedUserConsultations
)
export const selectGetSelectedUserConsultationsIsLoading = createSelector(
  [selectConsultationIsLoading],
  isLoading => isLoading.getSelectedUserConsultations
)

export const selectGetCurrentUserConsultationsErrorMessage = createSelector(
  [selectConsultationErrorMessages],
  errorMessages => errorMessages.getCurrentUserConsultations
)
export const selectGetCurrentUserConsultationsIsLoading = createSelector(
  [selectConsultationIsLoading],
  isLoading => isLoading.getCurrentUserConsultations
)

export const selectCreateConsultationErrorMessage = createSelector(
  [selectConsultationErrorMessages],
  errorMessages => errorMessages.createConsultation
)
export const selectCreateConsultationIsLoading = createSelector(
  [selectConsultationIsLoading],
  isLoading => isLoading.createConsultation
)

export const selectDeleteConsultationErrorMessage = createSelector(
  [selectConsultationErrorMessages],
  errorMessages => errorMessages.deleteConsultation
)
export const selectDeleteConsultationIsLoading = createSelector(
  [selectConsultationIsLoading],
  isLoading => isLoading.deleteConsultation
)
