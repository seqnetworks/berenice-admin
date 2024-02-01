import assetsTypes from "./assets.types"

const INITIAL_STATE = {
  homeAssets: "",
  eForms: "",
  subjects: "",
  courseMaterials: "",
  isLoading: {
    getHomeAssets: false,
    createHomeAsset: false,
    deleteHomeAsset: false,
    getEForms: false,
    createEForm: false,
    deleteEForm: false,
    getSubjects: false,
    getCourseMaterials: false,
    createCourseMaterialForSubject: false,
    deleteCourseMaterialForSubject: false,
  },
  errorMessages: {
    getHomeAssets: "",
    createHomeAsset: "",
    deleteHomeAsset: "",
    getEForms: "",
    createEForm: "",
    deleteEForm: "",
    getSubjects: "",
    getCourseMaterials: "",
    createCourseMaterialForSubject: "",
    deleteCourseMaterialForSubject: "",
  },
}

const assetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-------------------START-------------------
    case assetsTypes.GET_HOME_ASSETS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getHomeAssets: true,
        },
      }
    case assetsTypes.CREATE_HOME_ASSET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createHomeAsset: true,
        },
      }
    case assetsTypes.DELETE_HOME_ASSET_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteHomeAsset: true,
        },
      }
    case assetsTypes.GET_EFORMS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getEForms: true,
        },
      }
    case assetsTypes.CREATE_EFORM_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEForm: true,
        },
      }
    case assetsTypes.DELETE_EFORM_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteEForm: true,
        },
      }
    case assetsTypes.GET_SUBJECTS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSubjects: true,
        },
      }
    case assetsTypes.GET_COURSE_MATERIALS_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCourseMaterials: true,
        },
      }
    case assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourseMaterialForSubject: true,
        },
      }
    case assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourseMaterialForSubject: true,
        },
      }
    //-------------------SUCCESS-------------------
    case assetsTypes.GET_HOME_ASSETS_SUCCESS:
      return {
        ...state,
        homeAssets: action.payload,
        isLoading: {
          ...state.isLoading,
          getHomeAssets: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getHomeAssets: "",
        },
      }
    case assetsTypes.CREATE_HOME_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createHomeAsset: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createHomeAsset: "",
        },
      }
    case assetsTypes.DELETE_HOME_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteHomeAsset: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteHomeAsset: "",
        },
      }
    case assetsTypes.GET_EFORMS_SUCCESS:
      return {
        ...state,
        eForms: action.payload,
        isLoading: {
          ...state.isLoading,
          getEForms: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getEForms: "",
        },
      }
    case assetsTypes.CREATE_EFORM_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEForm: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createEForm: "",
        },
      }
    case assetsTypes.DELETE_EFORM_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteEForm: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteEForm: "",
        },
      }
    case assetsTypes.GET_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        isLoading: {
          ...state.isLoading,
          getSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSubjects: "",
        },
      }
    case assetsTypes.GET_COURSE_MATERIALS_SUCCESS:
      return {
        ...state,
        courseMaterials: action.payload.courseMaterials,
        isLoading: {
          ...state.isLoading,
          getCourseMaterials: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCourseMaterials: "",
        },
      }
    case assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourseMaterialForSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createCourseMaterialForSubject: "",
        },
      }
    case assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourseMaterialForSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteCourseMaterialForSubject: "",
        },
      }
    //-------------------FAILURE-------------------
    case assetsTypes.GET_HOME_ASSETS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getHomeAssets: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getHomeAssets: action.payload,
        },
      }
    case assetsTypes.CREATE_HOME_ASSET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createHomeAsset: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createHomeAsset: action.payload,
        },
      }
    case assetsTypes.DELETE_HOME_ASSET_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteHomeAsset: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteHomeAsset: action.payload,
        },
      }
    case assetsTypes.GET_EFORMS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getEForms: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getEForms: action.payload,
        },
      }
    case assetsTypes.CREATE_EFORM_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createEForm: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createEForm: action.payload,
        },
      }
    case assetsTypes.DELETE_EFORM_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteEForm: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteEForm: action.payload,
        },
      }
    case assetsTypes.GET_SUBJECTS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getSubjects: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getSubjects: action.payload,
        },
      }
    case assetsTypes.GET_COURSE_MATERIALS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getCourseMaterials: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getCourseMaterials: action.payload,
        },
      }
    case assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createCourseMaterialForSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          createCourseMaterialForSubject: action.payload,
        },
      }
    case assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteCourseMaterialForSubject: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteCourseMaterialForSubject: action.payload,
        },
      }
    //-------------------OTHER-------------------
    case assetsTypes.CLEAR_CREATE_HOME_ASSET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createHomeAsset: "",
        },
      }
    case assetsTypes.CLEAR_DELETE_HOME_ASSET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteHomeAsset: "",
        },
      }
    case assetsTypes.CLEAR_CREATE_EFORM_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createEForm: "",
        },
      }
    case assetsTypes.CLEAR_DELETE_EFORM_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteEForm: "",
        },
      }
    case assetsTypes.CLEAR_CREATE_COURSE_MATERIAL_FOR_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          createCourseMaterialForSubject: "",
        },
      }
    case assetsTypes.CLEAR_DELETE_COURSE_MATERIAL_FOR_SUBJECT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteCourseMaterialForSubject: "",
        },
      }
    default:
      return state
  }
}

export default assetsReducer
