import { createSelector } from "reselect"

const selectAssets = state => state.assets

//----------------1ST LEVEL SELECTORS----------------
export const selectHomeAssets = createSelector(
  [selectAssets],
  assets => assets.homeAssets
)

export const selectEForms = createSelector(
  [selectAssets],
  assets => assets.eForms
)

export const selectSubjects = createSelector(
  [selectAssets],
  assets => assets.subjects
)

export const selectCourseMaterials = createSelector(
  [selectAssets],
  assets => assets.courseMaterials
)

export const selectAssetsErrorMessages = createSelector(
  [selectAssets],
  assets => assets.errorMessages
)

export const selectAssetsIsLoading = createSelector(
  [selectAssets],
  assets => assets.isLoading
)

//----------------2ND LEVEL SELECTORS----------------
export const selectGetHomeAssetsErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.getHomeAssets
)
export const selectGetHomeAssetsIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.getHomeAssets
)

export const selectCreateHomeAssetErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.createHomeAsset
)
export const selectCreateHomeAssetIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.createHomeAsset
)

export const selectDeleteHomeAssetErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.deleteHomeAsset
)
export const selectDeleteHomeAssetIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.deleteHomeAsset
)

export const selectGetEFormsErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.getEForms
)
export const selectGetEFormsIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.getEForms
)

export const selectCreateEFormErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.createEForm
)
export const selectCreateEFormIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.createEForm
)

export const selectDeleteEFormErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.deleteEForm
)
export const selectDeleteEFormIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.deleteEForm
)

export const selectGetSubjectsErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.getSubjects
)
export const selectGetSubjectsIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.getSubjects
)

export const selectGetCourseMaterialsErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.getCourseMaterials
)
export const selectGetCourseMaterialsIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.getCourseMaterials
)

export const selectCreateCourseMaterialForSubjectErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.createCourseMaterialForSubject
)
export const selectCreateCourseMaterialForSubjectIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.createCourseMaterialForSubject
)

export const selectDeleteCourseMaterialForSubjectErrorMessage = createSelector(
  [selectAssetsErrorMessages],
  errorMessages => errorMessages.deleteCourseMaterialForSubject
)
export const selectDeleteCourseMaterialForSubjectIsLoading = createSelector(
  [selectAssetsIsLoading],
  isLoading => isLoading.deleteCourseMaterialForSubject
)
