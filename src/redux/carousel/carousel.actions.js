import carouselTypes from "./carousel.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import toBase64Handler from "../../utility/custom/base64handler"
import { v4 as uuidv4 } from "uuid"

//--------GET CAROUSEL IMAGES------------
export const getCarouselImagesStart = () => ({
  type: carouselTypes.GET_CAROUSEL_IMAGES_START,
})
export const getCarouselImagesSuccess = carouselImagesArray => ({
  type: carouselTypes.GET_CAROUSEL_IMAGES_SUCCESS,
  payload: carouselImagesArray,
})
export const getCarouselImagesFailure = errorMessage => ({
  type: carouselTypes.GET_CAROUSEL_IMAGES_FAILURE,
  payload: errorMessage,
})

export const getCarouselImagesAsync = () => {
  return async dispatch => {
    try {
      dispatch(getCarouselImagesStart())
      const result = await req.get("/berenice_assets/files", {
        params: { folderName: "newsCarousel/" },
      })
      dispatch(getCarouselImagesSuccess(result.data))
    } catch (error) {
      dispatch(getCarouselImagesFailure(error.message))
    }
  }
}
//--------ADD IMAGE TO CAROUSEL--------------
export const addImageToCarouselStart = () => ({
  type: carouselTypes.ADD_IMAGE_TO_CAROUSEL_START,
})
export const addImageToCarouselSuccess = () => ({
  type: carouselTypes.ADD_IMAGE_TO_CAROUSEL_SUCCESS,
})
export const addImageToCarouselFailure = errorMessage => ({
  type: carouselTypes.ADD_IMAGE_TO_CAROUSEL_FAILURE,
  payload: errorMessage,
})

export const addImageToCarouselAsync = (image, messages) => {
  return async dispatch => {
    try {
      dispatch(addImageToCarouselStart())
      const result = await toBase64Handler(image)
      await req.post("/berenice_assets/file", {
        base64: result,
        fileType: "jpg",
        fileName: uuidv4(),
        folderName: "newsCarousel",
      })
      noti({
        title: messages.success.title,
        content: messages.success.content,
        type: "success",
      })
      dispatch(getCarouselImagesAsync())
      dispatch(addImageToCarouselSuccess())
    } catch (error) {
      dispatch(addImageToCarouselFailure(error.message))
    }
  }
}
//---------DELETE IMAGE-----------
export const deleteImageFromCarouselStart = () => ({
  type: carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_START,
})
export const deleteImageFromCarouselSuccess = () => ({
  type: carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_SUCCESS,
})
export const deleteImageFromCarouselFailure = errorMessage => ({
  type: carouselTypes.DELETE_IMAGE_FROM_CAROUSEL_FAILURE,
  payload: errorMessage,
})

export const deleteImageFromCarouselAsync = (key, messages) => {
  return async dispatch => {
    try {
      dispatch(deleteImageFromCarouselStart())
      await req.delete(`/berenice_assets/file`, { data: { key } })
      await dispatch(getCarouselImagesAsync())
      noti({
        title: messages.success.title,
        content: messages.success.content,
        type: "success",
      })
      dispatch(deleteImageFromCarouselSuccess())
    } catch (error) {
      dispatch(deleteImageFromCarouselFailure(error.message))
    }
  }
}
//-------OTHERS-------------
export const clearAddImageToCarouselErrorMessage = () => ({
  type: carouselTypes.CLEAR_ADD_IMAGE_TO_CAROUSEL_ERROR_MESSAGE,
})

export const clearDeleteImageFromCarouselErrorMessage = () => ({
  type: carouselTypes.CLEAR_DELETE_IMAGE_FROM_CAROUSEL_ERROR_MESSAGE,
})

export const clearImages = () => ({
  type: carouselTypes.CLEAR_IMAGES,
})
