import carouselTypes from "./carousel.types"

const INITIAL_STATE = {
  carouselImages: [],
  isLoading: {
    getCarouselImages: false,
    addImageToCarousel: false,
    deleteImageFromCarousel: false,
  },
  errorMessages: {
    getCarouselImages: "",
    addImageToCarousel: "",
    deleteImageFromCarousel: "",
  },
}

const carouselReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //--------START-------------
    case carouselTypes.GET_CAROUSEL_IMAGES_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, getCarouselImages: true },
      }
    case carouselTypes.ADD_IMAGE_TO_CAROUSEL_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, addImageToCarousel: true },
      }
    case carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, deleteImageFromCarousel: true },
      }
    //--------SUCCESS-------------
    case carouselTypes.GET_CAROUSEL_IMAGES_SUCCESS:
      return {
        ...state,
        carouselImages: action.payload,
        isLoading: { ...state.isLoading, getCarouselImages: false },
        errorMessages: { ...state.errorMessages, getCarouselImages: "" },
      }
    case carouselTypes.ADD_IMAGE_TO_CAROUSEL_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, addImageToCarousel: false },
        errorMessages: { ...state.errorMessages, addImageToCarousel: "" },
      }
    case carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, deleteImageFromCarousel: false },
        errorMessages: { ...state.errorMessages, deleteImageFromCarousel: "" },
      }
    //---------FAILURES---------------
    case carouselTypes.GET_CAROUSEL_IMAGES_FAILURE:
      return {
        ...state,
        isLoading: { ...state.isLoading, getCarouselImages: false },
        errorMessages: {
          ...state.errorMessages,
          getCarouselImages: action.payload,
        },
      }
    case carouselTypes.ADD_IMAGE_TO_CAROUSEL_FAILURE:
      return {
        ...state,
        isLoading: { ...state.isLoading, addImageToCarousel: false },
        errorMessages: {
          ...state.errorMessages,
          addImageToCarousel: action.payload,
        },
      }
    case carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_FAILURE:
      return {
        ...state,
        isLoading: { ...state.isLoading, deleteImageFromCarousel: false },
        errorMessages: {
          ...state.errorMessages,
          deleteImageFromCarousel: action.payload,
        },
      }
    //--------OTHERS-----------
    case carouselTypes.CLEAR_ADD_IMAGE_TO_CAROUSEL_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          addImageToCarousel: "",
        },
      }
    case carouselTypes.CLEAR_DELETE_IMAGE_FROM_CAROUSEL_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          deleteImageFromCarousel: "",
        },
      }
    case carouselTypes.CLEAR_IMAGES:
      return {
        ...state,
        carouselImages: [],
      }
    default:
      return state
  }
}

export default carouselReducer
