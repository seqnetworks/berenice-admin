import assetsTypes from "./assets.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import toBase64Handler from "../../utility/custom/base64handler"

//------------GET HOME ASSETS-------------
export const getHomeAssetsStart = () => ({
  type: assetsTypes.GET_HOME_ASSETS_START,
})
export const getHomeAssetsSuccess = homeAssets => ({
  type: assetsTypes.GET_HOME_ASSETS_SUCCESS,
  payload: homeAssets,
})
export const getHomeAssetsFailure = errorMessage => ({
  type: assetsTypes.GET_HOME_ASSETS_FAILURE,
  payload: errorMessage,
})

export const getHomeAssetsAsync = () => async dispatch => {
  try {
    dispatch(getHomeAssetsStart())
    const result = await req.get("/berenice_assets/home_asset")
    dispatch(getHomeAssetsSuccess(result.data))
  } catch (error) {
    dispatch(getHomeAssetsFailure(error.message))
  }
}
//------------CREATE HOME ASSETS-------------
export const createHomeAssetStart = () => ({
  type: assetsTypes.CREATE_HOME_ASSET_START,
})
export const createHomeAssetSuccess = () => ({
  type: assetsTypes.CREATE_HOME_ASSET_SUCCESS,
})
export const createHomeAssetFailure = errorMessage => ({
  type: assetsTypes.CREATE_HOME_ASSET_FAILURE,
  payload: errorMessage,
})

export const createHomeAssetAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(createHomeAssetStart())
    let base64Image = await toBase64Handler(requestBody.imageBase64)
    requestBody = { ...requestBody, imageBase64: base64Image }
    let base64Pdf = await toBase64Handler(requestBody.pdfBase64)
    requestBody = { ...requestBody, pdfBase64: base64Pdf }
    await req.post("/berenice_assets/home_asset", requestBody)
    dispatch(getHomeAssetsAsync())
    dispatch(createHomeAssetSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createHomeAssetFailure(error.message))
  }
}
//------------DELETE HOME ASSETS-------------
export const deleteHomeAssetStart = () => ({
  type: assetsTypes.DELETE_HOME_ASSET_START,
})
export const deleteHomeAssetSuccess = () => ({
  type: assetsTypes.DELETE_HOME_ASSET_SUCCESS,
})
export const deleteHomeAssetFailure = errorMessage => ({
  type: assetsTypes.DELETE_HOME_ASSET_FAILURE,
  payload: errorMessage,
})

export const deleteHomeAssetAsync = (
  folderName,
  messages
) => async dispatch => {
  try {
    dispatch(deleteHomeAssetStart())
    await req.delete("/berenice_assets/home_asset", {
      params: { folderName: `homeAssets/${folderName}/` },
    })
    dispatch(getHomeAssetsAsync())
    dispatch(deleteHomeAssetSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteHomeAssetFailure(error.message))
  }
}
//------------GET EFORMS-------------
export const getEFormsStart = () => ({
  type: assetsTypes.GET_EFORMS_START,
})
export const getEFormsSuccess = eForms => ({
  type: assetsTypes.GET_EFORMS_SUCCESS,
  payload: eForms,
})
export const getEFormsFailure = errorMessage => ({
  type: assetsTypes.GET_EFORMS_FAILURE,
  payload: errorMessage,
})

export const getEFormsAsync = () => async dispatch => {
  try {
    dispatch(getEFormsStart())
    const result = await req.get("/berenice_assets/eForms")
    dispatch(getEFormsSuccess(result.data))
  } catch (error) {
    dispatch(getEFormsFailure(error.message))
  }
}
//------------CREATE EFORM-------------
export const createEFormStart = () => ({
  type: assetsTypes.CREATE_EFORM_START,
})
export const createEFormSuccess = () => ({
  type: assetsTypes.CREATE_EFORM_SUCCESS,
})
export const createEFormFailure = errorMessage => ({
  type: assetsTypes.CREATE_EFORM_FAILURE,
  payload: errorMessage,
})

export const createEFormAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createEFormStart())
    let base64Image = await toBase64Handler(requestBody.imageBase64)
    requestBody = { ...requestBody, imageBase64: base64Image }
    let base64Pdf = await toBase64Handler(requestBody.pdfBase64)
    requestBody = { ...requestBody, pdfBase64: base64Pdf }
    await req.post("/berenice_assets/eForm", requestBody)
    dispatch(getEFormsAsync())
    dispatch(createEFormSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createEFormFailure(error.message))
  }
}
//------------DELETE EFORM-------------
export const deleteEFormStart = () => ({
  type: assetsTypes.DELETE_EFORM_START,
})
export const deleteEFormSuccess = () => ({
  type: assetsTypes.DELETE_EFORM_SUCCESS,
})
export const deleteEFormFailure = errorMessage => ({
  type: assetsTypes.DELETE_EFORM_FAILURE,
  payload: errorMessage,
})

export const deleteEFormAsync = (folderName, messages) => async dispatch => {
  try {
    dispatch(deleteEFormStart())
    await req.delete("/berenice_assets/eForm", {
      params: { folderName: `eForms/${folderName}/` },
    })
    dispatch(getEFormsAsync())
    dispatch(deleteEFormSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteEFormFailure(error.message))
  }
}
//------------GET SUBJECTS-------------
export const getSubjectsStart = () => ({
  type: assetsTypes.GET_SUBJECTS_START,
})
export const getSubjectsSuccess = subjects => ({
  type: assetsTypes.GET_SUBJECTS_SUCCESS,
  payload: subjects,
})
export const getSubjectsFailure = errorMessage => ({
  type: assetsTypes.GET_SUBJECTS_FAILURE,
  payload: errorMessage,
})

export const getSubjectsAsync = () => async dispatch => {
  try {
    dispatch(getSubjectsStart())
    const result = await req.get(
      "/berenice_assets/courseMaterialFolders?name=courseMaterial/"
    )
    dispatch(getSubjectsSuccess(result.data))
  } catch (error) {
    dispatch(getSubjectsFailure(error.message))
  }
}
//------------GET COURSE MATERIALS-------------
export const getCourseMaterialsStart = () => ({
  type: assetsTypes.GET_COURSE_MATERIALS_START,
})
export const getCourseMaterialsSuccess = (courseMaterials, subjectCode) => ({
  type: assetsTypes.GET_COURSE_MATERIALS_SUCCESS,
  payload: { courseMaterials, subjectCode },
})
export const getCourseMaterialsFailure = errorMessage => ({
  type: assetsTypes.GET_COURSE_MATERIALS_FAILURE,
  payload: errorMessage,
})

export const getCourseMaterialsAsync = subjectCode => async dispatch => {
  const sizer = {
    "": size => size,
    K: size => size * 1024,
    M: size => size * 1024 * 1024,
  }
  try {
    dispatch(getCourseMaterialsStart())
    const result = await req.get(
      "/berenice_assets/files?folderName=courseMaterial/"
    )
    result.data = result.data.map(
      courseMaterial =>
        (courseMaterial = {
          ...courseMaterial,
          key: courseMaterial.key.slice(15),
          size: sizer[
            courseMaterial.size.charAt(courseMaterial.size.length - 2)
          ](courseMaterial.size.slice(0, -3)),
        })
    )
    dispatch(getSubjectsAsync())
    dispatch(getCourseMaterialsSuccess(result.data, subjectCode))
  } catch (error) {
    dispatch(getCourseMaterialsFailure(error.message))
  }
}
//------------CREATE COUSRE MATERIAL-------------
export const createCourseMaterialForSubjectStart = () => ({
  type: assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_START,
})
export const createCourseMaterialForSubjectSuccess = () => ({
  type: assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_SUCCESS,
})
export const createCourseMaterialForSubjectFailure = errorMessage => ({
  type: assetsTypes.CREATE_COURSE_MATERIAL_FOR_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const createCourseMaterialForSubjectAsync = (
  requestBody,
  newFolder,
  messages
) => async dispatch => {
  try {
    dispatch(createCourseMaterialForSubjectStart())
    let base64Pdf = await toBase64Handler(requestBody.base64)
    requestBody = { ...requestBody, base64: base64Pdf }
    if (requestBody.subjectCode === "New Folder")
      requestBody = { ...requestBody, subjectCode: newFolder }
    await req.post("/berenice_assets/courseMaterial", requestBody)
    dispatch(createCourseMaterialForSubjectSuccess())
    dispatch(getCourseMaterialsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createCourseMaterialForSubjectFailure(error.message))
  }
}
//------------DELETE COURSE MATERIAL-------------
export const deleteCourseMaterialForSubjectStart = () => ({
  type: assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_START,
})
export const deleteCourseMaterialForSubjectSuccess = () => ({
  type: assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_SUCCESS,
})
export const deleteCourseMaterialForSubjectFailure = errorMessage => ({
  type: assetsTypes.DELETE_COURSE_MATERIAL_FOR_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const deleteCourseMaterialForSubjectAsync = (
  key,
  messages
) => async dispatch => {
  try {
    dispatch(deleteCourseMaterialForSubjectStart())
    await req.delete(
      `/berenice_assets/courseMaterial?key=courseMaterial/${key}`
    )
    dispatch(deleteCourseMaterialForSubjectSuccess())
    dispatch(getCourseMaterialsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteCourseMaterialForSubjectFailure(error.message))
  }
}
//------------OTHERS-------------
export const clearCreateHomeAssetErrorMessage = () => ({
  type: assetsTypes.CLEAR_CREATE_HOME_ASSET_ERROR_MESSAGE,
})

export const clearDeleteHomeAssetErrorMessage = () => ({
  type: assetsTypes.CLEAR_DELETE_HOME_ASSET_ERROR_MESSAGE,
})

export const clearCreateEFormErrorMessage = () => ({
  type: assetsTypes.CLEAR_CREATE_EFORM_ERROR_MESSAGE,
})

export const clearDeleteEFormErrorMessage = () => ({
  type: assetsTypes.CLEAR_DELETE_EFORM_ERROR_MESSAGE,
})

export const clearCreateCourseMaterialForSubjectErrorMessage = () => ({
  type: assetsTypes.CLEAR_CREATE_COURSE_MATERIAL_FOR_SUBJECT_ERROR_MESSAGE,
})

export const clearDeleteCourseMaterialForSubjectErrorMessage = () => ({
  type: assetsTypes.CLEAR_DELETE_COURSE_MATERIAL_FOR_SUBJECT_ERROR_MESSAGE,
})
