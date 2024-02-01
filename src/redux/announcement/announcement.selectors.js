import { createSelector } from "reselect"

const selectAnnouncement = state => state.announcement

//----------------1ST LEVEL SELECTORS--------------
export const selectSelectedAnnouncement = createSelector(
  [selectAnnouncement],
  announcement => announcement.selectedAnnouncement
)

export const selectSelectedUserAnnouncements = createSelector(
  [selectAnnouncement],
  announcement => announcement.selectedUserAnnouncements
)

export const selectAllAnnouncements = createSelector(
  [selectAnnouncement],
  announcement => announcement.allAnnouncements
)

export const selectAnnouncementErrorMessages = createSelector(
  [selectAnnouncement],
  announcement => announcement.errorMessages
)

export const selectAnnouncementIsLoading = createSelector(
  [selectAnnouncement],
  announcement => announcement.isLoading
)
//----------------2ND LEVEL SELECTORS--------------
export const selectCreateAnnouncementErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.createAnnouncement
)
export const selectCreateAnnouncementIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.createAnnouncement
)

export const selectGetAnnouncementErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.getAnnouncement
)
export const selectGetAnnouncementIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.getAnnouncement
)

export const selectGetAllAnnouncementsErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.getAllAnnouncements
)
export const selectGetAllAnnouncementsIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.getAllAnnouncements
)

export const selectGetAllAnnouncementsForLecturerErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.getAllAnnouncementsForLecturer
)
export const selectGetAllAnnouncementsForLecturerIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.getAllAnnouncementsForLecturer
)

export const selectGetAnnouncementsOfSingalUserErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.getAnnouncementsOfSingalUser
)
export const selectGetAnnouncementsOfSingalUserIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.getAnnouncementsOfSingalUser
)

export const selectDeleteAnnouncementErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.deleteAnnouncement
)
export const selectDeleteAnnouncementIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.deleteAnnouncement
)

export const selectEditAnnouncementErrorMessage = createSelector(
  [selectAnnouncementErrorMessages],
  errorMessages => errorMessages.editAnnouncement
)
export const selectEditAnnouncementIsLoading = createSelector(
  [selectAnnouncementIsLoading],
  isLoading => isLoading.editAnnouncement
)
