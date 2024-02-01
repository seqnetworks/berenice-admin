import { createSelector } from "reselect"

export const selectEnrollment = state => state.enrollment

//-------------1ST-LEVEL-SELECTORS-----------------
export const selectAllDepartments = createSelector(
  [selectEnrollment],
  enrollment => enrollment.departments
)
export const selectAllCourses = createSelector(
  [selectEnrollment],
  enrollment => enrollment.courses
)
export const selectAllIntakes = createSelector(
  [selectEnrollment],
  enrollment => enrollment.intakes
)
export const selectAllSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.subjects
)
export const selectAllSubjectsWithIntakes = createSelector(
  [selectEnrollment],
  enrollment => enrollment.subjectsWithIntakes
)
export const selectSelectedIntakeSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedIntakeSubjects
)
export const selectSelectedUserIntakes = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedUserIntakes
)
export const selectSelectedUserCurrentIntakeCode = createSelector(
  [selectEnrollment],
  enrollment =>
    enrollment.selectedUserIntakes[0]
      ? enrollment.selectedUserIntakes[0].intakeCode
      : ""
)
export const selectSelectedUserCurrentIntakeStatus = createSelector(
  [selectEnrollment],
  enrollment =>
    enrollment.selectedUserIntakes[0]
      ? enrollment.selectedUserIntakes[0].status
      : ""
)
export const selectSelectedUserSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedUserSubjects
)

export const selectSelectedLecturerSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedLecturerSubjects
)
export const selectSelectedUserEnrollableSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedUserEnrollableSubjects
)
export const selectSelectedCourse = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedCourse
)
export const selectSelectedCourseSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedCourseSubjects
)
export const selectSelectedCourseIntakes = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedCourseIntakes
)
export const selectAllSubjectsWithLecturer = createSelector(
  [selectEnrollment],
  enrollment => enrollment.allSubjectsWithLecturer
)
export const selectCurrentUserIntakes = createSelector(
  [selectEnrollment],
  enrollment => enrollment.currentUserIntakes
)
export const selectSelectedStudentCgpa = createSelector(
  [selectEnrollment],
  enrollment => enrollment.selectedStudentCgpa
)
export const selectCurrentLecturerOngoingSubjects = createSelector(
  [selectEnrollment],
  enrollment => enrollment.currentLecturerOngoingSubjects
)
export const selectEnrollmentIsLoading = createSelector(
  [selectEnrollment],
  enrollment => enrollment.isLoading
)
export const selectEnrollmentErrorMessages = createSelector(
  [selectEnrollment],
  enrollment => enrollment.errorMessages
)
//-------------2ND-LEVEL-SELECTORS-----------------
export const selectGetAllSubjectsErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjects
)
export const selectGetAllSubjectsIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjects
)

export const selectGetAllSubjectsWithIntakesErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsWithIntakes
)
export const selectGetAllSubjectsWithIntakesIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsWithIntakes
)

export const selectEditIntakeSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editIntakeSubject
)
export const selectEditIntakeSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editIntakeSubject
)

export const selectDeleteIntakeSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.deleteIntakeSubject
)
export const selectDeleteIntakeSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.deleteIntakeSubject
)

export const selectCreateSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createSubject
)
export const selectCreateSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createSubject
)

export const selectCreateEnrollmentSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createEnrollmentSubject
)
export const selectCreateEnrollmentSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createEnrollmentSubject
)

export const selectCreateEnrollmentSubjectWithSubjectDetailsErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createEnrollmentSubjectWithSubjectDetails
)
export const selectCreateEnrollmentSubjectWithSubjectDetailsIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createEnrollmentSubjectWithSubjectDetails
)

export const selectEditSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editSubject
)
export const selectEditSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editSubject
)

export const selectDeleteSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.deleteSubject
)
export const selectDeleteSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.deleteSubject
)

export const selectGetAllSubjectsOfSingleLecturerErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsOfSingleLecturer
)
export const selectGetAllSubjectsOfSingleLecturerIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsOfSingleLecturer
)

export const selectAddSubjectToLecturerErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addSubjectToLecturer
)
export const selectAddSubjectToLecturerIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addSubjectToLecturer
)

export const selectRemoveSubjectFromLecturerErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeSubjectFromLecturer
)
export const selectRemoveSubjectFromLecturerIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeSubjectFromLecturer
)

export const selectGetAllSubjectsInSingleIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsInSingleIntake
)
export const selectGetAllSubjectsInSingleIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsInSingleIntake
)

export const selectAddSubjectToIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addSubjectToIntake
)
export const selectAddSubjectToIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addSubjectToIntake
)

export const selectRemoveSubjectFromIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeSubjectFromIntake
)
export const selectRemoveSubjectFromIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeSubjectFromIntake
)

export const selectGetAllSubjectsInCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsInCourse
)
export const selectGetAllSubjectsInCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsInCourse
)

export const selectGetAllIntakesInCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllIntakesInCourse
)
export const selectGetAllIntakesInCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllIntakesInCourse
)

export const selectGetAllSubjectsInCourseSemesterErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsInCourseSemester
)
export const selectGetAllSubjectsInCourseSemesterIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsInCourseSemester
)

export const selectAddSubjectToCourseSemesterErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addSubjectToCourseSemester
)
export const selectAddSubjectToCourseSemesterIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addSubjectToCourseSemester
)

export const selectRemoveSubjectFromCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeSubjectFromCourse
)
export const selectRemoveSubjectFromCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeSubjectFromCourse
)

export const selectGetAllSubjectsOfSingleStudentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsOfSingleStudent
)
export const selectGetAllSubjectsOfSingleStudentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsOfSingleStudent
)

export const selectGetAllActiveSubjectsOfSingleStudentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllActiveSubjectsOfSingleStudent
)
export const selectGetAllActiveSubjectsOfSingleStudentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllActiveSubjectsOfSingleStudent
)

export const selectChangeStatusOfStudentSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.changeStatusOfStudentSubject
)
export const selectChangeStatusOfStudentSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.changeStatusOfStudentSubject
)

export const selectAddSubjectToStudentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addSubjectToStudent
)
export const selectAddSubjectToStudentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addSubjectToStudent
)

export const selectRemoveSubjectFromStudentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeSubjectFromStudent
)
export const selectRemoveSubjectFromStudentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeSubjectFromStudent
)

export const selectGetAllDepartmentsErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllDepartments
)
export const selectGetAllDepartmentsIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllDepartments
)

export const selectCreateDepartmentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createDepartment
)
export const selectCreateDepartmentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createDepartment
)

export const selectEditDepartmentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editDepartment
)
export const selectEditDepartmentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editDepartment
)

export const selectDeleteDepartmentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.deleteDepartment
)
export const selectDeleteDepartmentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.deleteDepartment
)

export const selectGetAllCoursesErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllCourses
)
export const selectGetAllCoursesIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllCourses
)

export const selectGetAllCoursesInSingleDepartmentErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllCoursesInSingleDepartment
)
export const selectGetAllCoursesInSingleDepartmentIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllCoursesInSingleDepartment
)

export const selectCreateCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createCourse
)
export const selectCreateCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createCourse
)

export const selectEditCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editCourse
)
export const selectEditCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editCourse
)

export const selectDeleteCourseErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.deleteCourse
)
export const selectDeleteCourseIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.deleteCourse
)

export const selectGetAllIntakesErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllIntakes
)
export const selectGetAllIntakesIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllIntakes
)

export const selectCreateIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.createIntake
)
export const selectCreateIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.createIntake
)

export const selectDeleteIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.deleteIntake
)
export const selectDeleteIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.deleteIntake
)

export const selectAddStudentToIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addStudentToIntake
)
export const selectAddStudentToIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addStudentToIntake
)

export const selectRemoveStudentFromIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeStudentFromIntake
)
export const selectRemoveStudentFromIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeStudentFromIntake
)

export const selectGetIntakeEnrollmentStatusErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getIntakeEnrollmentStatus
)
export const selectGetIntakeEnrollmentStatusIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getIntakeEnrollmentStatus
)

export const selectEditIntakeEnrollmentStatusErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editIntakeEnrollmentStatus
)
export const selectEditIntakeEnrollmentStatusIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editIntakeEnrollmentStatus
)

export const selectEditIntakeErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editIntake
)
export const selectEditIntakeIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editIntake
)

export const selectGetAllSubjectsThatStudentCanEnrollToErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsThatStudentCanEnrollTo
)
export const selectGetAllSubjectsThatStudentCanEnrollToIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsThatStudentCanEnrollTo
)

export const selectGetSelectedUserIntakesErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getSelectedUserIntakes
)
export const selectGetSelectedUserIntakesIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getSelectedUserIntakes
)

export const selectUpdateStudentIntakeStatusErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.updateStudentIntakeStatus
)
export const selectUpdateStudentIntakeStatusIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.updateStudentIntakeStatus
)

export const selectGetAllSubjectsWithLecturerErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllSubjectsWithLecturer
)
export const selectGetAllSubjectsWithLecturerIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllSubjectsWithLecturer
)

export const selectEditSubjectStatusErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editSubjectStatus
)
export const selectEditSubjectStatusIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editSubjectStatus
)

export const selectEditStudentGpaErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editStudentGpa
)
export const selectEditStudentGpaIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editStudentGpa
)

export const selectGetAllIntakesOfCurrentUserErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getAllIntakesOfCurrentUser
)
export const selectGetAllIntakesOfCurrentUserIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getAllIntakesOfCurrentUser
)

export const selectGetLecturerSubjectErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getLecturerSubject
)
export const selectGetLecturerSubjectIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getLecturerSubject
)

export const selectAddLecturerAssisstantErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.addLecturerAssisstant
)
export const selectAddLecturerAssisstantIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.addLecturerAssisstant
)

export const selectRemoveLecturerAssisstantErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.removeLecturerAssisstant
)
export const selectRemoveLecturerAssisstantIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.removeLecturerAssisstant
)

export const selectGetStudentCgpaErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getStudentCgpa
)
export const selectGetStudentCgpaIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getStudentCgpa
)

export const selectEditStudentCgpaErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.editStudentCgpa
)
export const selectEditStudentCgpaIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.editStudentCgpa
)

export const selectGetCurrentLecturerOngoingSubjectsErrorMessage = createSelector(
  [selectEnrollmentErrorMessages],
  errorMessages => errorMessages.getCurrentLecturerOngoingSubjects
)
export const selectGetCurrentLecturerOngoingSubjectsIsLoading = createSelector(
  [selectEnrollmentIsLoading],
  isLoading => isLoading.getCurrentLecturerOngoingSubjects
)
