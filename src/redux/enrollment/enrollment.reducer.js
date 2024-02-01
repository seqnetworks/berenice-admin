import enrollmentTypes from "./enrollment.types"

const INITIAL_STATE = {
  departments: "",
  subjects: "",
  subjectsWithIntakes: "",
  intakes: "",
  courses: "",
  selectedIntakeSubjects: "",
  selectedUserIntakes: "",
  currentUserIntakes: "",
  selectedUserSubjects: "",
  selectedLecturerSubjects: "",
  selectedUserEnrollableSubjects: "",
  selectedCourse: "",
  selectedCourseSubjects: "",
  selectedCourseIntakes: "",
  allSubjectsWithLecturer: "",
  selectedStudentCgpa: "",
  currentLecturerOngoingSubjects: "",
  isLoading: {
    getAllSubjects: false,
    getAllSubjectsWithIntakes: false,
    editIntakeSubject: false,
    deleteIntakeSubject: false,
    createSubject: false,
    createEnrollmentSubject: false,
    createEnrollmentSubjectWithSubjectDetails: false,
    editSubject: false,
    deleteSubject: false,
    getAllSubjectsOfSingleLecturer: false,
    addSubjectToLecturer: false,
    removeSubjectFromLecturer: false,
    getAllSubjectsInSingleIntake: false,
    addSubjectToIntake: false,
    removeSubjectFromIntake: false,
    getAllSubjectsInCourse: false,
    getAllIntakesInCourse: false,
    getAllSubjectsInCourseSemester: false,
    addSubjectToCourseSemester: false,
    removeSubjectFromCourse: false,
    getAllSubjectsOfSingleStudent: false,
    getAllActiveSubjectsOfSingleStudent: false,
    changeStatusOfStudentSubject: false,
    getAllSubjectsThatStudentCanEnrollTo: false,
    addSubjectToStudent: false,
    removeSubjectFromStudent: false,
    getAllDepartments: false,
    createDepartment: false,
    editDepartment: false,
    deleteDepartment: false,
    getAllCourses: false,
    getAllCoursesInSingleDepartment: false,
    createCourse: false,
    editCourse: false,
    deleteCourse: false,
    getAllIntakes: false,
    createIntake: false,
    deleteIntake: false,
    addStudentToIntake: false,
    removeStudentFromIntake: false,
    getIntakeEnrollmentStatus: false,
    editIntakeEnrollmentStatus: false,
    editIntake: false,
    getSelectedUserIntakes: false,
    updateStudentIntakeStatus: false,
    getAllSubjectsWithLecturer: false,
    editSubjectStatus: false,
    editStudentGpa: false,
    getAllIntakesOfCurrentUser: false,
    getLecturerSubject: false,
    addLecturerAssisstant: false,
    removeLecturerAssisstant: false,
    getStudentCgpa: false,
    editStudentCgpa: false,
    getCurrentLecturerOngoingSubjects: false,
  },
  errorMessages: {
    getAllSubjects: "",
    getAllSubjectsWithIntakes: "",
    editIntakeSubject: "",
    deleteIntakeSubject: "",
    createSubject: "",
    createEnrollmentSubject: "",
    createEnrollmentSubjectWithSubjectDetails: "",
    editSubject: "",
    deleteSubject: "",
    getAllSubjectsOfSingleLecturer: "",
    addSubjectToLecturer: "",
    removeSubjectFromLecturer: "",
    getAllSubjectsInSingleIntake: "",
    addSubjectToIntake: "",
    removeSubjectFromIntake: "",
    getAllSubjectsInCourse: "",
    getAllIntakesInCourse: "",
    getAllSubjectsInCourseSemester: "",
    addSubjectToCourseSemester: "",
    removeSubjectFromCourse: "",
    getAllSubjectsOfSingleStudent: "",
    getAllActiveSubjectsOfSingleStudent: "",
    changeStatusOfStudentSubject: "",
    getAllSubjectsThatStudentCanEnrollTo: "",
    addSubjectToStudent: "",
    removeSubjectFromStudent: "",
    getAllDepartments: "",
    createDepartment: "",
    editDepartment: "",
    deleteDepartment: "",
    getAllCourses: "",
    getAllCoursesInSingleDepartment: "",
    createCourse: "",
    editCourse: "",
    deleteCourse: "",
    getAllIntakes: "",
    createIntake: "",
    deleteIntake: "",
    addStudentToIntake: "",
    removeStudentFromIntake: "",
    getIntakeEnrollmentStatus: "",
    editIntakeEnrollmentStatus: "",
    editIntake: "",
    getSelectedUserIntakes: "",
    updateStudentIntakeStatus: "",
    getAllSubjectsWithLecturer: "",
    editSubjectStatus: "",
    editStudentGpa: "",
    getAllIntakesOfCurrentUser: "",
    getLecturerSubject: "",
    addLecturerAssisstant: "",
    removeLecturerAssisstant: "",
    getStudentCgpa: "",
    editStudentCgpa: "",
    getCurrentLecturerOngoingSubjects: "",
  },
}

const enrollmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //----------------START----------------
    case enrollmentTypes.GET_ALL_SUBJECTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjects: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsWithIntakes: true,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntakeSubject: true,
        },
      }
    case enrollmentTypes.DELETE_INTAKE_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteIntakeSubject: true,
        },
      }
    case enrollmentTypes.CREATE_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createSubject: true,
        },
      }
    case enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEnrollmentSubject: true,
        },
      }
    case enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_WITH_SUBJECT_DETAILS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEnrollmentSubjectWithSubjectDetails: true,
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubject: true,
        },
      }
    case enrollmentTypes.DELETE_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteSubject: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleLecturer: true,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToLecturer: true,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromLecturer: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInSingleIntake: true,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToIntake: true,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromIntake: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourse: true,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakesInCourse: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourseSemester: true,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToCourseSemester: true,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromCourse: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleStudent: true,
        },
      }
    case enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllActiveSubjectsOfSingleStudent: true,
        },
      }
    case enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatusOfStudentSubject: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsThatStudentCanEnrollTo: true,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToStudent: true,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromStudent: true,
        },
      }
    case enrollmentTypes.GET_ALL_DEPARTMENTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllDepartments: true,
        },
      }
    case enrollmentTypes.CREATE_DEPARTMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createDepartment: true,
        },
      }
    case enrollmentTypes.EDIT_DEPARTMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editDepartment: true,
        },
      }
    case enrollmentTypes.DELETE_DEPARTMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteDepartment: true,
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllCourses: true,
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllCoursesInSingleDepartment: true,
        },
      }
    case enrollmentTypes.CREATE_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourse: true,
        },
      }
    case enrollmentTypes.EDIT_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editCourse: true,
        },
      }
    case enrollmentTypes.DELETE_COURSE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourse: true,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakes: true,
        },
      }
    case enrollmentTypes.CREATE_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createIntake: true,
        },
      }
    case enrollmentTypes.DELETE_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteIntake: true,
        },
      }
    case enrollmentTypes.ADD_STUDENT_TO_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudentToIntake: true,
        },
      }
    case enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeStudentFromIntake: true,
        },
      }
    case enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getIntakeEnrollmentStatus: true,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntakeEnrollmentStatus: true,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntake: true,
        },
      }
    case enrollmentTypes.GET_SELECTED_USER_INTAKES_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSelectedUserIntakes: true,
        },
      }
    case enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentIntakeStatus: true,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsWithLecturer: true,
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_STATUS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubjectStatus: true,
        },
      }
    case enrollmentTypes.EDIT_STUDENT_GPA_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentGpa: true,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakesOfCurrentUser: true,
        },
      }
    case enrollmentTypes.GET_LECTURER_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getLecturerSubject: true,
        },
      }
    case enrollmentTypes.ADD_LECTURER_ASSISSTANT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturerAssisstant: true,
        },
      }
    case enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeLecturerAssisstant: true,
        },
      }
    case enrollmentTypes.GET_STUDENT_CGPA_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentCgpa: true,
        },
      }
    case enrollmentTypes.EDIT_STUDENT_CGPA_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentCgpa: true,
        },
      }
    case enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentLecturerOngoingSubjects: true,
        },
      }
    //----------------SUCCESS----------------
    case enrollmentTypes.GET_ALL_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjects: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_SUCCESS:
      return {
        ...state,
        subjectsWithIntakes: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsWithIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsWithIntakes: "",
        },
      }
    case enrollmentTypes.EDIT_INTAKE_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        isLoading: {
          ...state.isLoading,
          editIntakeSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntakeSubject: "",
        },
      }
    case enrollmentTypes.DELETE_INTAKE_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        isLoading: {
          ...state.isLoading,
          deleteIntakeSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteIntakeSubject: "",
        },
      }
    case enrollmentTypes.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createSubject: "",
        },
      }
    case enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEnrollmentSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createEnrollmentSubject: "",
        },
      }
    case enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_WITH_SUBJECT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEnrollmentSubjectWithSubjectDetails: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createEnrollmentSubjectWithSubjectDetails: "",
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editSubject: "",
        },
      }
    case enrollmentTypes.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteSubject: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_SUCCESS:
      return {
        ...state,
        selectedLecturerSubjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsOfSingleLecturer: "",
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_LECTURER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToLecturer: "",
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromLecturer: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_SUCCESS:
      return {
        ...state,
        selectedIntakeSubjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInSingleIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInSingleIntake: "",
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToIntake: "",
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromIntake: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SUCCESS:
      return {
        ...state,
        selectedCourse: action.payload.courseCode,
        selectedCourseSubjects: action.payload.subjects,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInCourse: "",
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_SUCCESS:
      return {
        ...state,
        selectedCourse: action.payload.courseCode,
        selectedCourseIntakes: action.payload.intakes,
        isLoading: {
          ...state.isLoading,
          getAllIntakesInCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakesInCourse: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourseSemester: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInCourseSemester: "",
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToCourseSemester: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToCourseSemester: "",
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromCourse: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_SUCCESS:
      return {
        ...state,
        selectedUserSubjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsOfSingleStudent: "",
        },
      }
    case enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllActiveSubjectsOfSingleStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllActiveSubjectsOfSingleStudent: "",
        },
      }
    case enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatusOfStudentSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changeStatusOfStudentSubject: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_SUCCESS:
      return {
        ...state,
        selectedUserEnrollableSubjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsThatStudentCanEnrollTo: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsThatStudentCanEnrollTo: "",
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToStudent: "",
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromStudent: "",
        },
      }
    case enrollmentTypes.GET_ALL_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllDepartments: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllDepartments: "",
        },
      }
    case enrollmentTypes.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createDepartment: "",
        },
      }
    case enrollmentTypes.EDIT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editDepartment: "",
        },
      }
    case enrollmentTypes.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteDepartment: "",
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllCourses: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllCourses: "",
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllCoursesInSingleDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllCoursesInSingleDepartment: "",
        },
      }
    case enrollmentTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createCourse: "",
        },
      }
    case enrollmentTypes.EDIT_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editCourse: "",
        },
      }
    case enrollmentTypes.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteCourse: "",
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_SUCCESS:
      return {
        ...state,
        intakes: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakes: "",
        },
      }
    case enrollmentTypes.CREATE_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createIntake: "",
        },
      }
    case enrollmentTypes.DELETE_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteIntake: "",
        },
      }
    case enrollmentTypes.ADD_STUDENT_TO_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudentToIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStudentToIntake: "",
        },
      }
    case enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeStudentFromIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeStudentFromIntake: "",
        },
      }
    case enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getIntakeEnrollmentStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getIntakeEnrollmentStatus: "",
        },
      }
    case enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntakeEnrollmentStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntakeEnrollmentStatus: "",
        },
      }
    case enrollmentTypes.EDIT_INTAKE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntake: "",
        },
      }
    case enrollmentTypes.GET_SELECTED_USER_INTAKES_SUCCESS:
      return {
        ...state,
        selectedUserIntakes: action.payload,
        isLoading: {
          ...state.isLoading,
          getSelectedUserIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSelectedUserIntakes: "",
        },
      }
    case enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentIntakeStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentIntakeStatus: "",
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_SUCCESS:
      return {
        ...state,
        allSubjectsWithLecturer: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsWithLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsWithLecturer: "",
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubjectStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editSubjectStatus: "",
        },
      }
    case enrollmentTypes.EDIT_STUDENT_GPA_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentGpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editStudentGpa: "",
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUserIntakes: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllIntakesOfCurrentUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakesOfCurrentUser: "",
        },
      }
    case enrollmentTypes.GET_LECTURER_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getLecturerSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getLecturerSubject: "",
        },
      }
    case enrollmentTypes.ADD_LECTURER_ASSISSTANT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturerAssisstant: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addLecturerAssisstant: "",
        },
      }
    case enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeLecturerAssisstant: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeLecturerAssisstant: "",
        },
      }
    case enrollmentTypes.GET_STUDENT_CGPA_SUCCESS:
      return {
        ...state,
        selectedStudentCgpa: action.payload,
        isLoading: {
          ...state.isLoading,
          getStudentCgpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentCgpa: "",
        },
      }
    case enrollmentTypes.EDIT_STUDENT_CGPA_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentCgpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editStudentCgpa: "",
        },
      }
    case enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_SUCCESS:
      return {
        ...state,
        currentLecturerOngoingSubjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getCurrentLecturerOngoingSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentLecturerOngoingSubjects: "",
        },
      }
    //----------------FAILURE----------------
    case enrollmentTypes.GET_ALL_SUBJECTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjects: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          subjectsWithIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          subjectsWithIntakes: action.payload,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntakeSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntakeSubject: action.payload,
        },
      }
    case enrollmentTypes.DELETE_INTAKE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteIntakeSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteIntakeSubject: action.payload,
        },
      }
    case enrollmentTypes.CREATE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createSubject: action.payload,
        },
      }
    case enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEnrollmentSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createEnrollmentSubject: action.payload,
        },
      }
    case enrollmentTypes.CREATE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createSubject: action.payload,
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editSubject: action.payload,
        },
      }
    case enrollmentTypes.DELETE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteSubject: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsOfSingleLecturer: action.payload,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToLecturer: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromLecturer: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInSingleIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInSingleIntake: action.payload,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToIntake: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromIntake: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInCourse: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakesInCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakesInCourse: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsInCourseSemester: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsInCourseSemester: action.payload,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToCourseSemester: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToCourseSemester: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromCourse: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsOfSingleStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsOfSingleStudent: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllActiveSubjectsOfSingleStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllActiveSubjectsOfSingleStudent: action.payload,
        },
      }
    case enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          changeStatusOfStudentSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          changeStatusOfStudentSubject: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsThatStudentCanEnrollTo: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsThatStudentCanEnrollTo: action.payload,
        },
      }
    case enrollmentTypes.ADD_SUBJECT_TO_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addSubjectToStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addSubjectToStudent: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeSubjectFromStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromStudent: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_DEPARTMENTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllDepartments: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllDepartments: action.payload,
        },
      }
    case enrollmentTypes.CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createDepartment: action.payload,
        },
      }
    case enrollmentTypes.EDIT_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editDepartment: action.payload,
        },
      }
    case enrollmentTypes.DELETE_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteDepartment: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllCourses: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllCourses: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllCoursesInSingleDepartment: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllCoursesInSingleDepartment: action.payload,
        },
      }
    case enrollmentTypes.CREATE_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createCourse: action.payload,
        },
      }
    case enrollmentTypes.EDIT_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editCourse: action.payload,
        },
      }
    case enrollmentTypes.DELETE_COURSE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourse: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteCourse: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakes: action.payload,
        },
      }
    case enrollmentTypes.CREATE_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createIntake: action.payload,
        },
      }
    case enrollmentTypes.DELETE_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteIntake: action.payload,
        },
      }
    case enrollmentTypes.ADD_STUDENT_TO_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudentToIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStudentToIntake: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeStudentFromIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeStudentFromIntake: action.payload,
        },
      }
    case enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getIntakeEnrollmentStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getIntakeEnrollmentStatus: action.payload,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntakeEnrollmentStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntakeEnrollmentStatus: action.payload,
        },
      }
    case enrollmentTypes.EDIT_INTAKE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editIntake: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editIntake: action.payload,
        },
      }
    case enrollmentTypes.GET_SELECTED_USER_INTAKES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSelectedUserIntakes: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSelectedUserIntakes: action.payload,
        },
      }
    case enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStudentIntakeStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStudentIntakeStatus: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_FAILRE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllSubjectsWithLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllSubjectsWithLecturer: action.payload,
        },
      }
    case enrollmentTypes.EDIT_SUBJECT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editSubjectStatus: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editSubjectStatus: action.payload,
        },
      }
    case enrollmentTypes.EDIT_STUDENT_GPA_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentGpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editStudentGpa: action.payload,
        },
      }
    case enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllIntakesOfCurrentUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllIntakesOfCurrentUser: action.payload,
        },
      }
    case enrollmentTypes.GET_LECTURER_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getLecturerSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getLecturerSubject: action.payload,
        },
      }
    case enrollmentTypes.ADD_LECTURER_ASSISSTANT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturerAssisstant: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addLecturerAssisstant: action.payload,
        },
      }
    case enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          removeLecturerAssisstant: false,
        },
        errorMessages: {
          ...state.errorMessages,
          removeLecturerAssisstant: action.payload,
        },
      }
    case enrollmentTypes.GET_STUDENT_CGPA_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentCgpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentCgpa: action.payload,
        },
      }
    case enrollmentTypes.EDIT_STUDENT_CGPA_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editStudentCgpa: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editStudentCgpa: action.payload,
        },
      }
    case enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentLecturerOngoingSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentLecturerOngoingSubjects: action.payload,
        },
      }
    //----------------OTHERS----------------
    case enrollmentTypes.CLEAR_DELETE_DEPARTMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteDepartment: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_DEPARTMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editDepartment: "",
        },
      }
    case enrollmentTypes.CLEAR_DELETE_COURSE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteCourse: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_INTAKE_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editIntakeSubject: "",
        },
      }
    case enrollmentTypes.CLEAR_DELETE_INTAKE_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteIntakeSubject: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_COURSE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editCourse: "",
        },
      }
    case enrollmentTypes.CLEAR_DELETE_INTAKE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteIntake: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_INTAKE_ENROLLMENT_STATUS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editIntakeEnrollmentStatus: "",
        },
      }
    case enrollmentTypes.CLEAR_DELETE_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteSubject: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editSubject: "",
        },
      }
    case enrollmentTypes.CLEAR_CHANGE_STATUS_OF_STUDENT_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          changeStatusOfStudentSubject: "",
        },
      }
    case enrollmentTypes.CLEAR_ADD_SUBJECT_TO_STUDENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          addSubjectToStudent: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_SUBJECT_STATUS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editSubjectStatus: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_INTAKE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editIntake: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_STUDENT_GPA_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editStudentGpa: "",
        },
      }
    case enrollmentTypes.CLEAR_EDIT_STUDENT_CGPA_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editStudentCgpa: "",
        },
      }
    case enrollmentTypes.CLEAR_ADD_LECTURER_ASSISSTANT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          addLecturerAssisstant: "",
        },
      }
    case enrollmentTypes.CLEAR_REMOVE_LECTURER_ASSISSTANT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          removeLecturerAssisstant: "",
        },
      }
    case enrollmentTypes.CLEAR_REMOVE_SUBJECT_FROM_COURSE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          removeSubjectFromCourse: "",
        },
      }
    default:
      return state
  }
}

export default enrollmentReducer
