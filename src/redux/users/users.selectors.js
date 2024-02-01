import { createSelector } from "reselect"

const selectUsers = state => state.users

//----------------1ST LEVEL SELECTORS--------------
export const selectAllUsers = createSelector(
  [selectUsers],
  users => users.allUsers
)

export const selectStudents = createSelector(
  [selectUsers],
  users => users.students
)

export const selectGuardians = createSelector(
  [selectUsers],
  users => users.guardians
)

export const selectAllStaff = createSelector(
  [selectUsers],
  users => users.allStaff
)

export const selectLecturers = createSelector(
  [selectUsers],
  users => users.lecturers
)

export const selectSelectedUser = createSelector(
  [selectUsers],
  users => users.selectedUser
)

export const selectSelectedUserRules = createSelector(
  [selectUsers],
  users => users.selectedUserRules
)

export const selectUsersErrorMessages = createSelector(
  [selectUsers],
  users => users.errorMessages
)

export const selectUsersIsLoading = createSelector(
  [selectUsers],
  users => users.isLoading
)

//----------------2nd LEVEL SELECTORS--------------
export const selectSelectedUserIntakeCode = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.intakeCode
)

export const selectSelectedUserGuardians = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.guardians
)

export const selectSelectedUserChildren = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.children
)

export const selectSelectedUserUserUuid = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.userUuid
)

export const selectSelectedUserFullName = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.fullName
)

export const selectSelectedUserFullNameArabic = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.fullNameArabic
)

export const selectSelectedUserUuid = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.uuid
)

export const selectSelectedUserUsername = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.username
)

export const selectSelectedUserRole = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.role
)

export const selectSelectedUserAvatar = createSelector(
  [selectSelectedUser],
  selectedUser => selectedUser.userAvatar
)

export const selectGetAllUsersErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getAllUsers
)
export const selectGetAllUsersIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getAllUsers
)

export const selectGetAllStaffErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getAllStaff
)
export const selectGetAllStaffIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getAllStaff
)

export const selectGetStudentsErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getStudents
)
export const selectGetStudentsIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getStudents
)

export const selectGetGuardiansErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getGuardians
)
export const selectGetGuardiansIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getGuardians
)

export const selectGetLecturersErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getLecturers
)
export const selectGetLecturersIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getLecturers
)

export const selectGetUserErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getUser
)
export const selectGetUserIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getUser
)

export const selectUpdateUserDetailsErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.updateUserDetails
)
export const selectUpdateUserDetailsIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.updateUserDetails
)

export const selectResetPasswordErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.resetPassword
)
export const selectResetPasswordIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.resetPassword
)

export const selectGetUserAclErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getUserAcl
)
export const selectGetUserAclIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getUserAcl
)

export const selectUpdateUserAclErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.updateUserAcl
)
export const selectUpdateUserAclIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.updateUserAcl
)

export const selectAddStaffErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.addStaff
)
export const selectAddStaffIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.addStaff
)

export const selectAddLecturerErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.addLecturer
)
export const selectAddLecturerIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.addLecturer
)

export const selectAddStudentErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.addStudent
)
export const selectAddStudentIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.addStudent
)

export const selectAddGuardianErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.addGuardian
)
export const selectAddGuardianIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.addGuardian
)

export const selectLinkGuardianAndStudentErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.linkGuardianAndStudent
)
export const selectLinkGuardianAndStudentIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.linkGuardianAndStudent
)

export const selectDeleteGuardianAndStudentErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.deleteGuardianAndStudent
)
export const selectDeleteGuardianAndStudentIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.deleteGuardianAndStudent
)

export const selectGetGuardiansOfStudentErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getGuardiansOfStudent
)
export const selectGetGuardiansOfStudentIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getGuardiansOfStudent
)

export const selectGetStudentsOfGuardianErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.getStudentsOfGuardian
)
export const selectGetStudentsOfGuardianIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.getStudentsOfGuardian
)

export const selectUpdateStaffTypeErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.updateStaffType
)
export const selectUpdateStaffTypeIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.updateStaffType
)

export const selectUpdateGuardianTypeErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.updateGuardianType
)
export const selectUpdateGuardianTypeIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.updateGuardianType
)

export const selectEditUserAvatarErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.editUserAvatar
)
export const selectEditUserAvatarIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.editUserAvatar
)

export const selectEditLecturerPositionErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.editLecturerPosition
)
export const selectEditLecturerPositionIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.editLecturerPosition
)

export const selectDeleteUserErrorMessage = createSelector(
  [selectUsersErrorMessages],
  errorMessages => errorMessages.deleteUser
)
export const selectDeleteUserIsLoading = createSelector(
  [selectUsersIsLoading],
  isLoading => isLoading.deleteUser
)
