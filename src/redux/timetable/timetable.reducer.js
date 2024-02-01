import timetableTypes from "./timetable.types"

const INITIAL_STATE = {
  classes: "",
  selectedLecturerClasses: "",
  selectedSubject: "",
  selectedSubject: "",
  selectedClass: "",
  selectedClassAttendanceSheets: "",
  selectedClassStudentsAttendances: "",
  selectedClassAssessments: "",
  selectedClassStudents: "",
  selectedClassAvailableLecturers: "",
  selectedAttendanceSheet: {
    info: "",
    students: "",
  },
  selectedAssessment: {
    info: "",
    students: "",
  },
  isLoading: {
    getAllClasses: false,
    getAllClassesOfLecturer: false,
    createClass: false,
    updateClass: false,
    deleteClass: false,
    createAttendanceSheet: false,
    deleteAttendanceSheet: false,
    getAllStudentsAttendancesInAttendanceSheet: false,
    getAllAttendanceSheetsInClass: false,
    getAllStudentsInClass: false,
    updateStudentsAttendancesInAttendanceSheet: false,
    createAssessment: false,
    deleteAssessment: false,
    getAllStudentsMarksInSubject: false,
    getAllAssessmentsOfSubjectForLecturer: false,
    updateStudentsMarks: false,
    updateAssessmentVisibility: false,
    getAvailableLecturersForClass: false,
    getStudentsAttendancesInSubject: false,
  },
  errorMessages: {
    getAllClasses: "",
    getAllClassesOfLecturer: "",
    createClass: "",
    updateClass: "",
    deleteClass: "",
    createAttendanceSheet: "",
    deleteAttendanceSheet: "",
    getAllStudentsAttendancesInAttendanceSheet: "",
    getAllAttendanceSheetsInClass: "",
    getAllStudentsInClass: "",
    updateStudentsAttendancesInAttendanceSheet: "",
    createAssessment: "",
    deleteAssessment: "",
    getAllStudentsMarksInSubject: "",
    getAllAssessmentsOfSubjectForLecturer: "",
    updateStudentsMarks: "",
    updateAssessmentVisibility: "",
    getAvailableLecturersForClass: "",
    getStudentsAttendancesInSubject: "",
  },
}

const timetableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-----------START----------
    case timetableTypes.GET_ALL_CLASSES_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllClasses: true,
        },
      }
    case timetableTypes.GET_ALL_CLASSES_OF_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllClassesOfLecturer: true,
        },
      }
    case timetableTypes.CREATE_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createClass: true,
        },
      }
    case timetableTypes.UPDATE_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateClass: true,
        },
      }
    case timetableTypes.DELETE_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteClass: true,
        },
      }
    case timetableTypes.CREATE_ATTENDANCE_SHEET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAttendanceSheet: true,
        },
      }
    case timetableTypes.DELETE_ATTENDANCE_SHEET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAttendanceSheet: true,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsAttendancesInAttendanceSheet: true,
        },
      }
    case timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAttendanceSheetsInClass: true,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_IN_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsInClass: true,
        },
      }
    case timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsAttendancesInAttendanceSheet: true,
        },
      }
    case timetableTypes.CREATE_ASSESSMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAssessment: true,
        },
      }
    case timetableTypes.DELETE_ASSESSMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAssessment: true,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsMarksInSubject: true,
        },
      }
    case timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAssessmentsOfSubjectForLecturer: true,
        },
      }
    case timetableTypes.UPDATE_STUDENTS_MARKS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsMarks: true,
        },
      }
    case timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateAssessmentVisibility: true,
        },
      }
    case timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAvailableLecturersForClass: true,
        },
      }
    case timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentsAttendancesInSubject: true,
        },
      }
    //-----------SUCCESS----------
    case timetableTypes.GET_ALL_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllClasses: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllClasses: "",
        },
      }
    case timetableTypes.GET_ALL_CLASSES_OF_LECTURER_SUCCESS:
      return {
        ...state,
        selectedLecturerClasses: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllClassesOfLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllClassesOfLecturer: "",
        },
      }
    case timetableTypes.CREATE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createClass: "",
        },
      }
    case timetableTypes.UPDATE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateClass: "",
        },
      }
    case timetableTypes.DELETE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteClass: "",
        },
      }
    case timetableTypes.CREATE_ATTENDANCE_SHEET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAttendanceSheet: "",
        },
      }
    case timetableTypes.DELETE_ATTENDANCE_SHEET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAttendanceSheet: "",
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_SUCCESS:
      return {
        ...state,
        selectedAttendanceSheet: {
          ...state.selectedAttendanceSheet,
          students: action.payload,
        },
        isLoading: {
          ...state.isLoading,
          getAllStudentsAttendancesInAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsAttendancesInAttendanceSheet: "",
        },
      }
    case timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_SUCCESS:
      return {
        ...state,
        selectedClassAttendanceSheets: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllAttendanceSheetsInClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAttendanceSheetsInClass: "",
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_IN_CLASS_SUCCESS:
      return {
        ...state,
        selectedClassStudents: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllStudentsInClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsInClass: "",
        },
      }
    case timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsAttendancesInAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentsAttendancesInAttendanceSheet: "",
        },
      }
    case timetableTypes.CREATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAssessment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAssessment: "",
        },
      }
    case timetableTypes.DELETE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAssessment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAssessment: "",
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_SUCCESS:
      return {
        ...state,
        selectedAssessment: {
          ...state.selectedAssessment,
          students: action.payload,
        },
        isLoading: {
          ...state.isLoading,
          getAllStudentsMarksInSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsMarksInSubject: "",
        },
      }
    case timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_SUCCESS:
      return {
        ...state,
        selectedClassAssessments: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllAssessmentsOfSubjectForLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAssessmentsOfSubjectForLecturer: "",
        },
      }
    case timetableTypes.UPDATE_STUDENTS_MARKS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsMarks: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentsMarks: "",
        },
      }
    case timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        isLoading: {
          ...state.isLoading,
          updateAssessmentVisibility: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateAssessmentVisibility: "",
        },
      }
    case timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_SUCCESS:
      return {
        ...state,
        selectedClassAvailableLecturers: action.payload,
        isLoading: {
          ...state.isLoading,
          getAvailableLecturersForClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAvailableLecturersForClass: "",
        },
      }
    case timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_SUCCESS:
      return {
        ...state,
        selectedClassStudentsAttendances: action.payload,
        isLoading: {
          ...state.isLoading,
          getStudentsAttendancesInSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentsAttendancesInSubject: "",
        },
      }
    //-----------FAILURE----------
    case timetableTypes.GET_ALL_CLASSES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllClasses: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllClasses: action.payload,
        },
      }
    case timetableTypes.GET_ALL_CLASSES_OF_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllClassesOfLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllClassesOfLecturer: action.payload,
        },
      }
    case timetableTypes.CREATE_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createClass: action.payload,
        },
      }
    case timetableTypes.UPDATE_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateClass: action.payload,
        },
      }
    case timetableTypes.DELETE_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteClass: action.payload,
        },
      }
    case timetableTypes.CREATE_ATTENDANCE_SHEET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAttendanceSheet: action.payload,
        },
      }
    case timetableTypes.DELETE_ATTENDANCE_SHEET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAttendanceSheet: action.payload,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsAttendancesInAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsAttendancesInAttendanceSheet: action.payload,
        },
      }
    case timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAttendanceSheetsInClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAttendanceSheetsInClass: action.payload,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_IN_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsInClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsInClass: action.payload,
        },
      }
    case timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsAttendancesInAttendanceSheet: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentsAttendancesInAttendanceSheet: action.payload,
        },
      }
    case timetableTypes.CREATE_ASSESSMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAssessment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAssessment: action.payload,
        },
      }
    case timetableTypes.DELETE_ASSESSMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAssessment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAssessment: action.payload,
        },
      }
    case timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStudentsMarksInSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStudentsMarksInSubject: action.payload,
        },
      }
    case timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAssessmentsOfSubjectForLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAssessmentsOfSubjectForLecturer: action.payload,
        },
      }
    case timetableTypes.UPDATE_STUDENTS_MARKS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentsMarks: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentsMarks: action.payload,
        },
      }
    case timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateAssessmentVisibility: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateAssessmentVisibility: action.payload,
        },
      }
    case timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAvailableLecturersForClass: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAvailableLecturersForClass: action.payload,
        },
      }
    case timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentsAttendancesInSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentsAttendancesInSubject: action.payload,
        },
      }
    //-----------OTHER----------
    case timetableTypes.SET_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload,
      }
    case timetableTypes.SET_SELECTED_ATTENDANCE_SHEET:
      return {
        ...state,
        selectedAttendanceSheet: {
          ...state.selectedAttendanceSheet,
          info: action.payload,
        },
      }
    case timetableTypes.CLEAR_CREATE_CLASS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createClass: "",
        },
      }
    case timetableTypes.CLEAR_UPDATE_CLASS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          updateClass: "",
        },
      }
    case timetableTypes.CLEAR_DELETE_CLASS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteClass: "",
        },
      }
    case timetableTypes.CLEAR_CREATE_ATTENDANCE_SHEET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createAttendanceSheet: "",
        },
      }
    case timetableTypes.CLEAR_DELETE_ATTENDANCE_SHEET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteAttendanceSheet: "",
        },
      }
    case timetableTypes.CLEAR_CREATE_ASSESSMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createAssessment: "",
        },
      }
    case timetableTypes.CLEAR_DELETE_ASSESSMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteAssessment: "",
        },
      }
    case timetableTypes.CLEAR_UPDATE_ASSESSMENT_VISIBILITY_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          updateAssessmentVisibility: "",
        },
      }
    case timetableTypes.SET_SELECTED_ASSESSMENT:
      return {
        ...state,
        selectedAssessment: {
          ...state.selectedAssessment,
          info: action.payload,
        },
      }
    default:
      return state
  }
}

export default timetableReducer
