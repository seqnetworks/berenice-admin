import { createSelector } from "reselect"

export const selectCarousel = state => state.carousel

//-------1ST LEVEL SELECTORS-------------
export const selectCarouselImages = createSelector(
  [selectCarousel],
  carousel => carousel.carouselImages
)

export const selectCarouselIsloading = createSelector(
  [selectCarousel],
  carousel => carousel.isLoading
)

export const selectCarouselErrorMessages = createSelector(
  [selectCarousel],
  carousel => carousel.errorMessages
)
//-------2ND LEVEL SELECTORS-------------
export const selectGetCarouselImagesErrorMessage = createSelector(
  [selectCarouselErrorMessages],
  errorMessages => errorMessages.getCarouselImages
)
export const selectGetCarouselImagesIsLoading = createSelector(
  [selectCarouselIsloading],
  isLoading => isLoading.getCarouselImages
)

export const selectAddImageToCarouselErrorMessage = createSelector(
  [selectCarouselErrorMessages],
  errorMessages => errorMessages.addImageToCarousel
)
export const selectAddImageToCarouselIsLoading = createSelector(
  [selectCarouselIsloading],
  isLoading => isLoading.addImageToCarousel
)

export const selectDeleteImageFromCarouselErrorMessage = createSelector(
  [selectCarouselErrorMessages],
  errorMessages => errorMessages.deleteImageFromCarousel
)
export const selectDeleteImageFromCarouselIsLoading = createSelector(
  [selectCarouselIsloading],
  isLoading => isLoading.deleteImageFromCarousel
)
