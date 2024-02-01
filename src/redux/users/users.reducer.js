import usersTypes from "./users.types"

const INITIAL_STATE = {
  allUsers: "",
  students: "",
  guardians: "",
  allStaff: "",
  lecturers: "",
  selectedUser: "",
  selectedUserRules: "",
  isLoading: {
    getAllUsers: false,
    getAllStaff: false,
    getStudents: false,
    getGuardians: false,
    getLecturers: false,
    getUser: false,
    getUserAcl: false,
    getCurrentUserAcl: false,
    updateUserAcl: false,
    editUserAvatar: false,
    updateUserDetails: false,
    resetPassword: false,
    addStaff: false,
    addStudent: false,
    addLecturer: false,
    addGuardian: false,
    deleteUser: false,
    linkGuardianAndStudent: false,
    deleteGuardianAndStudent: false,
    getStudentsOfGuardian: false,
    getGuardiansOfStudent: false,
    updateStaffType: false,
    editLecturerPosition: false,
    updateGuardianType: false,
  },
  errorMessages: {
    getAllUsers: "",
    getAllStaff: "",
    getStudents: "",
    getGuardians: "",
    getLecturers: "",
    getUser: "",
    getUserAcl: "",
    getCurrentUserAcl: "",
    updateUserAcl: "",
    editUserAvatar: "",
    updateUserDetails: "",
    resetPassword: "",
    addStaff: "",
    addStudent: "",
    addLecturer: "",
    addGuardian: "",
    deleteUser: "",
    linkGuardianAndStudent: "",
    deleteGuardianAndStudent: "",
    getStudentsOfGuardian: "",
    getGuardiansOfStudent: "",
    updateStaffType: "",
    editLecturerPosition: "",
    updateGuardianType: "",
  },
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-------------------START--------------------
    case usersTypes.GET_ALL_USERS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllUsers: true,
        },
      }
    case usersTypes.GET_ALL_STAFF_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStaff: true,
        },
      }
    case usersTypes.GET_STUDENTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudents: true,
        },
      }
    case usersTypes.GET_GUARDIANS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getGuardians: true,
        },
      }
    case usersTypes.GET_LECTURERS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getLecturers: true,
        },
      }
    case usersTypes.GET_USER_ACL_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getUserAcl: true,
        },
      }
    case usersTypes.GET_CURRENT_USER_ACL_START:
      return {
        ...state,
        isLoadiing: {
          ...state.isLoading,
          getCurrentUserAcl: true,
        },
      }
    case usersTypes.UPDATE_USER_ACL_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserAcl: true,
        },
      }
    case usersTypes.EDIT_USER_AVATAR_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editUserAvatar: true,
        },
      }
    case usersTypes.GET_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getUser: true,
        },
      }
    case usersTypes.UPDATE_USER_DETAILS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserDetails: true,
        },
      }
    case usersTypes.RESET_PASSWORD_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          resetPassword: true,
        },
      }
    case usersTypes.ADD_STAFF_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStaff: true,
        },
      }
    case usersTypes.ADD_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudent: true,
        },
      }
    case usersTypes.ADD_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturer: true,
        },
      }
    case usersTypes.ADD_GUARDIAN_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addGuardian: true,
        },
      }
    case usersTypes.LINK_GUARDIAN_AND_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          linkGuardianAndStudent: true,
        },
      }
    case usersTypes.DELETE_GUARDIAN_AND_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteGuardianAndStudent: true,
        },
      }
    case usersTypes.GET_STUDENTS_OF_GUARDIAN_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentsOfGuardian: true,
        },
      }
    case usersTypes.GET_GUARDIANS_OF_STUDENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getGuardiansOfStudent: true,
        },
      }
    case usersTypes.UPDATE_STAFF_TYPE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStaffType: true,
        },
      }
    case usersTypes.EDIT_LECTURER_POSITION_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editLecturerPosition: true,
        },
      }
    case usersTypes.UPDATE_GUARDIAN_TYPE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateGuardianType: true,
        },
      }
    case usersTypes.DELETE_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteUser: true,
        },
      }
    //-------------------SUCCESS--------------------
    case usersTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllUsers: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllUsers: "",
        },
      }
    case usersTypes.GET_ALL_STAFF_SUCCESS:
      return {
        ...state,
        allStaff: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllStaff: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStaff: "",
        },
      }
    case usersTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        isLoading: {
          ...state.isLoading,
          getStudents: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudents: "",
        },
      }
    case usersTypes.GET_GUARDIANS_SUCCESS:
      return {
        ...state,
        guardians: action.payload,
        isLoading: {
          ...state.isLoading,
          getGuardians: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getGuardians: "",
        },
      }
    case usersTypes.GET_LECTURERS_SUCCESS:
      return {
        ...state,
        lecturers: action.payload,
        isLoading: {
          ...state.isLoading,
          getLecturers: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getLecturers: "",
        },
      }
    case usersTypes.GET_USER_ACL_SUCCESS:
      return {
        ...state,
        selectedUserRules: action.payload,
        selectedUser: {
          ...state.selectedUser,
          acl: action.payload,
        },
        isLoading: {
          ...state.isLoading,
          getUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getUserAcl: "",
        },
      }

    case usersTypes.GET_CURRENT_USER_ACL_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCurrentUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCurrentUserAcl: "",
        },
      }
    case usersTypes.UPDATE_USER_ACL_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateUserAcl: "",
        },
      }
    case usersTypes.EDIT_USER_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editUserAvatar: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editUserAvatar: "",
        },
      }
    case usersTypes.GET_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        isLoading: {
          ...state.isLoading,
          getUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getUser: "",
        },
      }
    case usersTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserDetails: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateUserDetails: "",
        },
      }
    case usersTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          resetPassword: false,
        },
        errorMessages: {
          ...state.errorMessages,
          resetPassword: "",
        },
      }
    case usersTypes.ADD_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStaff: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStaff: "",
        },
      }
    case usersTypes.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStudent: "",
        },
      }
    case usersTypes.ADD_LECTURER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addLecturer: "",
        },
      }
    case usersTypes.ADD_GUARDIAN_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addGuardian: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addGuardian: "",
        },
      }
    case usersTypes.LINK_GUARDIAN_AND_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          linkGuardianAndStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          linkGuardianAndStudent: "",
        },
      }
    case usersTypes.DELETE_GUARDIAN_AND_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteGuardianAndStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteGuardianAndStudent: "",
        },
      }
    case usersTypes.GET_STUDENTS_OF_GUARDIAN_SUCCESS:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, children: action.payload },
        isLoading: {
          ...state.isLoading,
          getStudentsOfGuardian: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentsOfGuardian: "",
        },
      }
    case usersTypes.GET_GUARDIANS_OF_STUDENT_SUCCESS:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, guardians: action.payload },
        isLoading: {
          ...state.isLoading,
          getGuardiansOfStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getGuardiansOfStudent: "",
        },
      }
    case usersTypes.UPDATE_STAFF_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStaffType: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStaffType: "",
        },
      }
    case usersTypes.EDIT_LECTURER_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editLecturerPosition: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editLecturerPosition: "",
        },
      }
    case usersTypes.UPDATE_GUARDIAN_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateGuardianType: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateGuardianType: "",
        },
      }
    case usersTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteUser: "",
        },
      }
    //-------------------FAILURE--------------------
    case usersTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        allUsers: "",
        isLoading: {
          ...state.isLoading,
          getAllUsers: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllUsers: action.payload,
        },
      }
    case usersTypes.GET_ALL_STAFF_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllStaff: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllStaff: action.payload,
        },
      }
    case usersTypes.GET_STUDENTS_FAILURE:
      return {
        ...state,
        allUsers: "",
        isLoading: {
          ...state.isLoading,
          getStudents: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudents: action.payload,
        },
      }
    case usersTypes.GET_GUARDIANS_FAILURE:
      return {
        ...state,
        allUsers: "",
        isLoading: {
          ...state.isLoading,
          getGuardians: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getGuardians: action.payload,
        },
      }
    case usersTypes.GET_LECTURERS_FAILURE:
      return {
        ...state,
        allUsers: "",
        isLoading: {
          ...state.isLoading,
          getLecturers: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getLecturers: action.payload,
        },
      }
    case usersTypes.GET_USER_ACL_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getUserAcl: action.payload,
        },
      }
    case usersTypes.UPDATE_USER_ACL_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserAcl: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateUserAcl: action.payload,
        },
      }
    case usersTypes.EDIT_USER_AVATAR_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editUserAvatar: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editUserAvatar: action.payload,
        },
      }
    case usersTypes.GET_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getUser: action.payload,
        },
      }
    case usersTypes.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateUserDetails: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateUserDetails: action.payload,
        },
      }
    case usersTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          resetPassword: false,
        },
        errorMessages: {
          ...state.errorMessages,
          resetPassword: action.payload,
        },
      }
    case usersTypes.ADD_STAFF_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStaff: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStaff: action.payload,
        },
      }
    case usersTypes.ADD_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addStudent: action.payload,
        },
      }
    case usersTypes.ADD_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addLecturer: action.payload,
        },
      }
    case usersTypes.ADD_GUARDIAN_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          addGuardian: false,
        },
        errorMessages: {
          ...state.errorMessages,
          addGuardian: action.payload,
        },
      }
    case usersTypes.LINK_GUARDIAN_AND_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          linkGuardianAndStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          linkGuardianAndStudent: action.payload,
        },
      }
    case usersTypes.DELETE_GUARDIAN_AND_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteGuardianAndStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteGuardianAndStudent: action.payload,
        },
      }
    case usersTypes.GET_STUDENTS_OF_GUARDIAN_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getStudentsOfGuardian: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getStudentsOfGuardian: action.payload,
        },
      }
    case usersTypes.GET_GUARDIANS_OF_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getGuardiansOfStudent: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getGuardiansOfStudent: action.payload,
        },
      }
    case usersTypes.UPDATE_STAFF_TYPE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateStaffType: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateStaffType: action.payload,
        },
      }
    case usersTypes.EDIT_LECTURER_POSITION_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editLecturerPosition: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editLecturerPosition: action.payload,
        },
      }
    case usersTypes.UPDATE_GUARDIAN_TYPE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          updateGuardianType: false,
        },
        errorMessages: {
          ...state.errorMessages,
          updateGuardianType: action.payload,
        },
      }
    case usersTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteUser: action.payload,
        },
      }
    //-------------------OTHERS--------------------
    case usersTypes.CLEAR_ADD_USER_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          addStaff: "",
          addLecturer: "",
          addStudent: "",
          addGuardian: "",
        },
      }
    case usersTypes.CLEAR_RESET_PASSWORD_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          resetPassword: "",
        },
      }
    case usersTypes.UPDATE_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      }
    case usersTypes.CLEAR_NEW_PASSWORD:
      return {
        ...state,
        newPassword: "",
      }
    case usersTypes.CLEAR_GET_ALL_USERS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          getAllUsers: "",
        },
      }
    case usersTypes.CLEAR_DELETE_GUARDIAN_AND_STUDENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteGuardianAndStudent: "",
        },
      }
    case usersTypes.CLEAR_UPDATE_GUARDIAN_TYPE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          updateGuardianType: "",
        },
      }
    case usersTypes.CLEAR_LINK_GUARDIAN_AND_STUDENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          linkGuardianAndStudent: "",
        },
      }
    case usersTypes.CLEAR_EDIT_USER_AVATAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editUserAvatar: "",
        },
      }
    case usersTypes.CLEAR_DELETE_USER_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteUser: "",
        },
      }
    default:
      return state
  }
}

export default usersReducer
