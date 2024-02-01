import announcementTypes from "./announcement.types"

const INITIAL_STATE = {
  allAnnouncements: "",
  selectedAnnouncement: "",
  selectedUserAnnouncements: "",
  isLoading: {
    getAnnouncement: false,
    getAllAnnouncements: false,
    getAllAnnouncementsForLecturer: false,
    getAnnouncementsOfSingalUser: false,
    createAnnouncement: false,
    deleteAnnouncement: false,
    editAnnouncement: false,
  },
  errorMessages: {
    getAnnouncement: "",
    getAllAnnouncements: "",
    getAllAnnouncementsForLecturer: "",
    getAnnouncementsOfSingalUser: "",
    createAnnouncement: "",
    deleteAnnouncement: "",
    editAnnouncement: "",
  },
}

const announcementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-----------START----------
    case announcementTypes.CREATE_ANNOUNCEMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAnnouncement: true,
        },
      }
    case announcementTypes.GET_ANNOUNCEMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAnnouncement: true,
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncements: true,
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncementsForLecturer: true,
        },
      }
    case announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAnnouncementsOfSingalUser: true,
        },
      }
    case announcementTypes.DELETE_ANNOUNCEMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAnnouncement: true,
        },
      }
    case announcementTypes.EDIT_ANNOUNCEMENT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editAnnouncement: true,
        },
      }
    //-----------SUCCESS----------
    case announcementTypes.CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAnnouncement: "",
        },
      }
    case announcementTypes.GET_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        selectedannouncement: action.payload,
        isLoading: {
          ...state.isLoading,
          getAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAnnouncement: "",
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        allAnnouncements: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncements: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAnnouncements: "",
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_SUCCESS:
      return {
        ...state,
        allAnnouncements: action.payload,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncementsForLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAnnouncementsForLecturer: "",
        },
      }
    case announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_SUCCESS:
      return {
        ...state,
        selectedUserAnnouncements: action.payload,
        isLoading: {
          ...state.isLoading,
          getAnnouncementsOfSingalUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAnnouncementsOfSingalUser: "",
        },
      }
    case announcementTypes.DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAnnouncement: "",
        },
      }
    case announcementTypes.EDIT_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editAnnouncement: "",
        },
      }
    //-----------FAILURE----------
    case announcementTypes.CREATE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createAnnouncement: action.payload,
        },
      }
    case announcementTypes.GET_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAnnouncement: action.payload,
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncements: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAnnouncements: action.payload,
        },
      }
    case announcementTypes.GET_ALL_ANNOUNCEMENTS_FOR_LECTURER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAllAnnouncementsForLecturer: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAllAnnouncementsForLecturer: action.payload,
        },
      }
    case announcementTypes.GET_ANNOUNCEMENTS_OF_SINGAL_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getAnnouncementsOfSingalUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getAnnouncementsOfSingalUser: action.payload,
        },
      }
    case announcementTypes.DELETE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteAnnouncement: action.payload,
        },
      }
    case announcementTypes.EDIT_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          editAnnouncement: false,
        },
        errorMessages: {
          ...state.errorMessages,
          editAnnouncement: action.payload,
        },
      }
    //-----------OTHER----------
    case announcementTypes.CLEAR_CREATE_ANNOUNCEMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createAnnouncement: "",
        },
      }
    case announcementTypes.CLEAR_DELETE_ANNOUNCEMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteAnnouncement: "",
        },
      }
    case announcementTypes.CLEAR_EDIT_ANNOUNCEMENT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          editAnnouncement: "",
        },
      }
    default:
      return state
  }
}

export default announcementReducer
