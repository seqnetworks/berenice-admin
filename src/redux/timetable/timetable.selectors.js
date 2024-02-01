import { createSelector } from "reselect"

const selectTimetable = state => state.timetable

//----------------1ST LEVEL SELECTORS--------------
export const selectAllClasses = createSelector(
  [selectTimetable],
  timetable => timetable.classes
)

export const selectSelectedLecturerClasses = createSelector(
  [selectTimetable],
  timetable => timetable.selectedLecturerClasses
)

export const selectSelectedSubject = createSelector(
  [selectTimetable],
  timetable => timetable.selectedSubject
)

export const selectSelectedAttendanceSheetInfo = createSelector(
  [selectTimetable],
  timetable => timetable.selectedAttendanceSheet.info
)

export const selectSelectedAttendanceSheetStudents = createSelector(
  [selectTimetable],
  timetable => timetable.selectedAttendanceSheet.students
)

export const selectSelectedAssessmentInfo = createSelector(
  [selectTimetable],
  timetable =>
    timetable.selectedAssessment ? timetable.selectedAssessment.info : ""
)

export const selectSelectedAssessmentStudents = createSelector(
  [selectTimetable],
  timetable =>
    timetable.selectedAssessment ? timetable.selectedAssessment.students : ""
)

export const selectSelectedClassStudents = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassStudents.students
)

export const selectSelectedClassStudentsClassUuid = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassStudents.classUuid
)

export const selectSelectedClassAttendanceSheets = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassAttendanceSheets.attendanceSheets
)

export const selectSelectedClassAttendanceSheetsClassUuid = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassAttendanceSheets.classUuid
)

export const selectSelectedClassAssessments = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassAssessments.assessments
)

export const selectSelectedClassAssessmentsClassUuid = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassAssessments.classUuid
)

export const selectSelectedClassAvailableLecturers = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassAvailableLecturers
)

export const selectSelectedClassStudentsAttendances = createSelector(
  [selectTimetable],
  timetable => timetable.selectedClassStudentsAttendances
)

export const selectTimetableErrorMessages = createSelector(
  [selectTimetable],
  timetable => timetable.errorMessages
)

export const selectTimetableIsLoading = createSelector(
  [selectTimetable],
  timetable => timetable.isLoading
)
//----------------2ND LEVEL SELECTORS--------------
export const selectGetAllClassesErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllClasses
)
export const selectGetAllClassesIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllClasses
)

export const selectGetAllClassesOfLecturerErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllClassesOfLecturer
)
export const selectGetAllClassesOfLecturerIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllClassesOfLecturer
)

export const selectCreateClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.createClass
)
export const selectCreateClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.createClass
)

export const selectUpdateClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.updateClass
)
export const selectUpdateClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.updateClass
)

export const selectDeleteClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.deleteClass
)
export const selectDeleteClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.deleteClass
)

export const selectGetAllAttendanceSheetsInClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllAttendanceSheetsInClass
)
export const selectGetAllAttendanceSheetsInClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllAttendanceSheetsInClass
)

export const selectGetAllStudentsInClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllStudentsInClass
)
export const selectGetAllStudentsInClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllStudentsInClass
)

export const selectGetAllStudentsAttendancesInAttendanceSheetErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllStudentsAttendancesInAttendanceSheet
)
export const selectGetAllStudentsAttendancesInAttendanceSheetIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllStudentsAttendancesInAttendanceSheet
)

export const selectUpdateStudentsAttendancesInAttendanceSheetErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.updateStudentsAttendancesInAttendanceSheet
)
export const selectUpdateStudentsAttendancesInAttendanceSheetIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.updateStudentsAttendancesInAttendanceSheet
)

export const selectCreateAttendanceSheetErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.createAttendanceSheet
)
export const selectCreateAttendanceSheetIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.createAttendanceSheet
)

export const selectDeleteAttendanceSheetErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.deleteAttendanceSheet
)
export const selectDeleteAttendanceSheetIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.deleteAttendanceSheet
)

export const selectCreateAssessmentErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.createAssessment
)
export const selectCreateAssessmentIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.createAssessment
)

export const selectDeleteAssessmentErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.deleteAssessment
)
export const selectDeleteAssessmentIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.deleteAssessment
)

export const selectGetAllStudentsMarksInSubjectErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllStudentsMarksInSubject
)
export const selectGetAllStudentsMarksInSubjectIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllStudentsMarksInSubject
)

export const selectGetAllAssessmentsOfSubjectForLecturerErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAllAssessmentsOfSubjectForLecturer
)
export const selectGetAllAssessmentsOfSubjectForLecturerIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAllAssessmentsOfSubjectForLecturer
)

export const selectUpdateStudentsMarksErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.updateStudentsMarks
)
export const selectUpdateStudentsMarksIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.updateStudentsMarks
)

export const selectUpdateAssessmentVisibilityErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.updateAssessmentVisibility
)
export const selectUpdateAssessmentVisibilityIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.updateAssessmentVisibility
)

export const selectGetAvailableLecturersForClassErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getAvailableLecturersForClass
)
export const selectGetAvailableLecturersForClassIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getAvailableLecturersForClass
)

export const selectGetStudentsAttendancesInSubjectErrorMessage = createSelector(
  [selectTimetableErrorMessages],
  errorMessages => errorMessages.getStudentsAttendancesInSubject
)
export const selectGetStudentsAttendancesInSubjectIsLoading = createSelector(
  [selectTimetableIsLoading],
  isLoading => isLoading.getStudentsAttendancesInSubject
)
