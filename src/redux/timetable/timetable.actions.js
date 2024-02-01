import timetableTypes from "./timetable.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { timetablePoints } from "../../utility/custom/timetablePoints"

//-------------GET ALL CLASSES----------------
export const getAllClassesStart = () => ({
  type: timetableTypes.GET_ALL_CLASSES_START,
})
export const getAllClassesSuccess = classes => ({
  type: timetableTypes.GET_ALL_CLASSES_SUCCESS,
  payload: classes,
})
export const getAllClassesFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_CLASSES_FAILURE,
  payload: errorMessage,
})

export const getAllClassesAsync = () => async dispatch => {
  try {
    dispatch(getAllClassesStart())
    const result = await req.get("/berenice_timetable/classes")
    dispatch(getAllClassesSuccess(result.data))
  } catch (error) {
    dispatch(getAllClassesFailure(error.message))
  }
}
//-------------GET ALL CLASSES OF LECTURER----------------
export const getAllClassesOfLecturerStart = () => ({
  type: timetableTypes.GET_ALL_CLASSES_OF_LECTURER_START,
})
export const getAllClassesOfLecturerSuccess = classes => ({
  type: timetableTypes.GET_ALL_CLASSES_OF_LECTURER_SUCCESS,
  payload: classes,
})
export const getAllClassesOfLecturerFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_CLASSES_OF_LECTURER_FAILURE,
  payload: errorMessage,
})

export const getAllClassesOfLecturerAsync = lecturerUuid => async dispatch => {
  try {
    dispatch(getAllClassesOfLecturerStart())
    const result = await req.get(
      lecturerUuid
        ? "/berenice_timetable/class_lecturer"
        : "/berenice_timetable/class_lecturer",
      { params: lecturerUuid ? { lecturerUuid } : {} }
    )
    let classes = []
    Object.keys(result.data).map(
      key => (classes = [...classes, ...result.data[key]])
    )
    classes = classes.map(
      oneClass =>
        (oneClass = {
          ...oneClass,
          startTime: oneClass.startTime.slice(0, 5),
          endTime: oneClass.endTime.slice(0, 5),
          points: timetablePoints({
            day: oneClass.day,
            start: oneClass.startTime,
            end: oneClass.endTime,
            code: oneClass.subjectCode,
          }),
        })
    )
    dispatch(getAllClassesOfLecturerSuccess(classes))
  } catch (error) {
    dispatch(getAllClassesOfLecturerFailure(error.message))
  }
}
//-------------CREATE CLASS----------------
export const createClassStart = () => ({
  type: timetableTypes.CREATE_CLASS_START,
})
export const createClassSuccess = () => ({
  type: timetableTypes.CREATE_CLASS_SUCCESS,
})
export const createClassFailure = errorMessage => ({
  type: timetableTypes.CREATE_CLASS_FAILURE,
  payload: errorMessage,
})

export const createClassAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createClassStart())
    requestBody = {
      ...requestBody,
      startTime: requestBody.startTime + ":00",
      endTime: requestBody.endTime + ":00",
      lecturerUuids: requestBody.lecturerUuids.map(
        lecturer => (lecturer = lecturer.value)
      ),
    }
    const result = await req.post("/berenice_timetable/class", requestBody)
    dispatch(createClassSuccess(result.data))
    dispatch(getAllClassesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createClassFailure(error.message))
  }
}
//-------------UPDATE CLASS----------------
export const updateClassStart = () => ({
  type: timetableTypes.UPDATE_CLASS_START,
})
export const updateClassSuccess = () => ({
  type: timetableTypes.UPDATE_CLASS_SUCCESS,
})
export const updateClassFailure = errorMessage => ({
  type: timetableTypes.UPDATE_CLASS_FAILURE,
  payload: errorMessage,
})

export const updateClassAsync = (
  requestBody,
  classUuid,
  messages
) => async dispatch => {
  try {
    dispatch(updateClassStart())
    const result = await req.put("/berenice_timetable/class", requestBody, {
      params: { classUuid },
    })
    dispatch(updateClassSuccess(result.data))
    dispatch(getAllClassesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateClassFailure(error.message))
  }
}
//-------------DELETE CLASS----------------
export const deleteClassStart = () => ({
  type: timetableTypes.DELETE_CLASS_START,
})
export const deleteClassSuccess = () => ({
  type: timetableTypes.DELETE_CLASS_SUCCESS,
})
export const deleteClassFailure = errorMessage => ({
  type: timetableTypes.DELETE_CLASS_FAILURE,
  payload: errorMessage,
})

export const deleteClassAsync = (classUuid, messages) => async dispatch => {
  try {
    dispatch(deleteClassStart())
    const result = await req.delete("/berenice_timetable/class", {
      params: { classUuid },
    })
    dispatch(deleteClassSuccess(result.data))
    dispatch(getAllClassesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteClassFailure(error.message))
  }
}
//-------------CREATE ATTENDANCE SHEET----------------
export const createAttendanceSheetStart = () => ({
  type: timetableTypes.CREATE_ATTENDANCE_SHEET_START,
})
export const createAttendanceSheetSuccess = () => ({
  type: timetableTypes.CREATE_ATTENDANCE_SHEET_SUCCESS,
})
export const createAttendanceSheetFailure = errorMessage => ({
  type: timetableTypes.CREATE_ATTENDANCE_SHEET_FAILURE,
  payload: errorMessage,
})

export const createAttendanceSheetAsync = (
  requestBody,
  info,
  history
) => async dispatch => {
  try {
    dispatch(createAttendanceSheetStart())
    const uuid = await req.post(
      `/berenice_timetable/${
        requestBody.classUuid ? "attendance_sheet" : "extra_class"
      }`,
      requestBody
    )
    dispatch(
      setSelectedAttendanceSheet({
        ...info,
        uuid: uuid.data.attendanceUuid,
      })
    )
    dispatch(getAllAttendanceSheetsInClassAsync(info.classUuid))
    dispatch(createAttendanceSheetSuccess())
    const subjects = await req.get(
      "/berenice_enrollment/get_all_subjects_of_lecturer",
      { params: { lecturerUuid: info.lecturerUuid } }
    )
    let theSubject = ""
    subjects.data.map(subject => {
      if (subject.lecturerSubjectUuid === info.classUuid) theSubject = subject
    })
    dispatch(setSelectedSubject(theSubject))
    history.push("/attendanceSheet")
  } catch (error) {
    dispatch(createAttendanceSheetFailure(error.message))
  }
}
//-------------DELETE ATTENDANCE SHEET----------------
export const deleteAttendanceSheetStart = () => ({
  type: timetableTypes.DELETE_ATTENDANCE_SHEET_START,
})
export const deleteAttendanceSheetSuccess = () => ({
  type: timetableTypes.DELETE_ATTENDANCE_SHEET_SUCCESS,
})
export const deleteAttendanceSheetFailure = errorMessage => ({
  type: timetableTypes.DELETE_ATTENDANCE_SHEET_FAILURE,
  payload: errorMessage,
})

export const deleteAttendanceSheetAsync = (
  attendanceSheetUuid,
  classUuid,
  messages
) => async dispatch => {
  try {
    dispatch(deleteAttendanceSheetStart())
    await req.delete("/berenice_timetable/attendance_sheet", {
      params: { attendanceUuid: attendanceSheetUuid },
    })
    dispatch(deleteAttendanceSheetSuccess())
    dispatch(getAllAttendanceSheetsInClassAsync(classUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteAttendanceSheetFailure(error.message))
  }
}
//-------------GET ALL ATTENDANCE SHEETS IN CLASS----------------
export const getAllAttendanceSheetsInClassStart = () => ({
  type: timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_START,
})
export const getAllAttendanceSheetsInClassSuccess = attendanceSheetsAndClassUuid => ({
  type: timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_SUCCESS,
  payload: attendanceSheetsAndClassUuid,
})
export const getAllAttendanceSheetsInClassFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_ATTENDANCE_SHEETS_IN_CLASS_FAILURE,
  payload: errorMessage,
})

export const getAllAttendanceSheetsInClassAsync = classUuid => async dispatch => {
  try {
    dispatch(getAllAttendanceSheetsInClassStart())
    const result = await req.get(
      "/berenice_timetable/lecturer_attendance_sheets_single_subject",
      { params: { lecturerSubjectUuid: classUuid } }
    )
    dispatch(
      getAllAttendanceSheetsInClassSuccess({
        attendanceSheets: result.data,
        classUuid,
      })
    )
  } catch (error) {
    dispatch(getAllAttendanceSheetsInClassFailure(error.message))
  }
}
//-------------GET ALL STUDENTS IN CLASS----------------
export const getAllStudentsInClassStart = () => ({
  type: timetableTypes.GET_ALL_STUDENTS_IN_CLASS_START,
})
export const getAllStudentsInClassSuccess = studentsAndClassUuid => ({
  type: timetableTypes.GET_ALL_STUDENTS_IN_CLASS_SUCCESS,
  payload: studentsAndClassUuid,
})
export const getAllStudentsInClassFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_STUDENTS_IN_CLASS_FAILURE,
  payload: errorMessage,
})

export const getAllStudentsInClassAsync = classUuid => async dispatch => {
  try {
    dispatch(getAllStudentsInClassStart())
    const result = await req.get(
      "/berenice_enrollment/get_all_students_of_lecturer_subject",
      { params: { lecturerSubjectUuid: classUuid } }
    )
    dispatch(getAllStudentsInClassSuccess({ students: result.data, classUuid }))
  } catch (error) {
    dispatch(getAllStudentsInClassFailure(error.message))
  }
}
//-------------UPDATE STUDENTS ATTENDANCES IN ATTENDANCE SHEET----------------
export const updateStudentsAttendancesInAttendanceSheetStart = () => ({
  type: timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_START,
})
export const updateStudentsAttendancesInAttendanceSheetSuccess = () => ({
  type: timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_SUCCESS,
})
export const updateStudentsAttendancesInAttendanceSheetFailure = errorMessage => ({
  type: timetableTypes.UPDATE_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_FAILURE,
  payload: errorMessage,
})

export const updateStudentsAttendancesInAttendanceSheetAsync = (
  attendanceUuid,
  date,
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(updateStudentsAttendancesInAttendanceSheetStart())
    const result = await req.put(
      "/berenice_timetable/mark_attendance",
      { students: requestBody },
      { params: { attendanceUuid } }
    )
    dispatch(updateStudentsAttendancesInAttendanceSheetSuccess(result.data))
    dispatch(
      getAllStudentsAttendancesInAttendanceSheetAsync(attendanceUuid, date)
    )
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateStudentsAttendancesInAttendanceSheetFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//-------------GET ALL STUDENTS ATTENDANCES IN ATTENDANCE SHEET----------------
export const getAllStudentsAttendancesInAttendanceSheetStart = () => ({
  type: timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_START,
})
export const getAllStudentsAttendancesInAttendanceSheetSuccess = students => ({
  type: timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_SUCCESS,
  payload: students,
})
export const getAllStudentsAttendancesInAttendanceSheetFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_STUDENTS_ATTENDANCES_IN_ATTENDANCE_SHEET_FAILURE,
  payload: errorMessage,
})

export const getAllStudentsAttendancesInAttendanceSheetAsync = (
  attendanceUuid,
  classDate
) => async dispatch => {
  try {
    dispatch(getAllStudentsAttendancesInAttendanceSheetStart())
    const result = await req.get(
      "/berenice_timetable/students_attendance_date",
      { params: { attendanceUuid, classDate } }
    )
    dispatch(getAllStudentsAttendancesInAttendanceSheetSuccess(result.data))
  } catch (error) {
    dispatch(getAllStudentsAttendancesInAttendanceSheetFailure(error.message))
  }
}
//------------GET ALL STUDENTS MARKS IN SUBJECT-------------
export const getAllStudentsMarksInSubjectStart = () => ({
  type: timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_START,
})
export const getAllStudentsMarksInSubjectSuccess = students => ({
  type: timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_SUCCESS,
  payload: students,
})
export const getAllStudentsMarksInSubjectFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_STUDENTS_MARKS_IN_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const getAllStudentsMarksInSubjectAsync = assessmentUuid => async dispatch => {
  try {
    dispatch(getAllStudentsMarksInSubjectStart())
    const result = await req.get("/berenice_assessment/assessment_results", {
      params: { assessmentUuid },
    })
    dispatch(getAllStudentsMarksInSubjectSuccess(result.data))
  } catch (error) {
    dispatch(getAllStudentsMarksInSubjectFailure(error.message))
  }
}
//------------CREATE ASSESSMENT-------------
export const createAssessmentStart = () => ({
  type: timetableTypes.CREATE_ASSESSMENT_START,
})
export const createAssessmentSuccess = () => ({
  type: timetableTypes.CREATE_ASSESSMENT_SUCCESS,
})
export const createAssessmentFailure = errorMessage => ({
  type: timetableTypes.CREATE_ASSESSMENT_FAILURE,
  payload: errorMessage,
})

export const createAssessmentAsync = (
  requestBody,
  info,
  history
) => async dispatch => {
  try {
    dispatch(createAssessmentStart())
    const result = await req.post(
      "/berenice_assessment/assessment",
      requestBody
    )
    dispatch(createAssessmentSuccess())
    dispatch(setSelectedAssessment({ ...info, uuid: result.data.uuid }))
    history.push("/assessment")
  } catch (error) {
    dispatch(createAssessmentFailure(error.message))
  }
}
//------------DELETE ASSESSMENT-------------
export const deleteAssessmentStart = () => ({
  type: timetableTypes.DELETE_ASSESSMENT_START,
})
export const deleteAssessmentSuccess = () => ({
  type: timetableTypes.DELETE_ASSESSMENT_SUCCESS,
})
export const deleteAssessmentFailure = errorMessage => ({
  type: timetableTypes.DELETE_ASSESSMENT_FAILURE,
  payload: errorMessage,
})

export const deleteAssessmentAsync = (
  assessmentUuid,
  classUuid
) => async dispatch => {
  try {
    dispatch(deleteAssessmentStart())
    await req.delete("/berenice_assessment/assessment", {
      params: { assessmentUuid },
    })
    dispatch(deleteAssessmentSuccess())
    dispatch(getAllAssessmentsOfSubjectForLecturerAsync(classUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteAssessmentFailure(error.message))
  }
}
//------------GET ALL ASSESSMENTS OF SUBJECT FOR LECTURER-------------
export const getAllAssessmentsOfSubjectForLecturerStart = () => ({
  type: timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_START,
})
export const getAllAssessmentsOfSubjectForLecturerSuccess = assessmentsAndClassUuid => ({
  type: timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_SUCCESS,
  payload: assessmentsAndClassUuid,
})
export const getAllAssessmentsOfSubjectForLecturerFailure = errorMessage => ({
  type: timetableTypes.GET_ALL_ASSESSMENTS_OF_SUBJECT_FOR_LECTURER_FAILURE,
  payload: errorMessage,
})

export const getAllAssessmentsOfSubjectForLecturerAsync = classUuid => async dispatch => {
  try {
    dispatch(getAllAssessmentsOfSubjectForLecturerStart())
    const result = await req.get("/berenice_assessment/assessments", {
      params: { lecturerSubjectUuid: classUuid },
    })
    dispatch(
      getAllAssessmentsOfSubjectForLecturerSuccess({
        assessments: result.data,
        classUuid,
      })
    )
  } catch (error) {
    dispatch(getAllAssessmentsOfSubjectForLecturerFailure(error.message))
  }
}
//------------UPDATE STUDENTS MARKS-------------
export const updateStudentsMarksStart = () => ({
  type: timetableTypes.UPDATE_STUDENTS_MARKS_START,
})
export const updateStudentsMarksSuccess = () => ({
  type: timetableTypes.UPDATE_STUDENTS_MARKS_SUCCESS,
})
export const updateStudentsMarksFailure = errorMessage => ({
  type: timetableTypes.UPDATE_STUDENTS_MARKS_FAILURE,
  payload: errorMessage,
})

export const updateStudentsMarksAsync = (
  assessmentUuid,
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(updateStudentsMarksStart())
    await req.put("/berenice_assessment/mark_results", {
      assessmentUuid,
      students: requestBody,
    })
    dispatch(updateStudentsMarksSuccess())
    dispatch(getAllStudentsMarksInSubjectAsync(assessmentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateStudentsMarksFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//------------UPDATE ASSESSMENT VISIBILITY-------------
export const updateAssessmentVisibilityStart = () => ({
  type: timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_START,
})
export const updateAssessmentVisibilitySuccess = () => ({
  type: timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_SUCCESS,
})
export const updateAssessmentVisibilityFailure = errorMessage => ({
  type: timetableTypes.UPDATE_ASSESSMENT_VISIBILITY_FAILURE,
  payload: errorMessage,
})

export const updateAssessmentVisibilityAsync = (
  requestBody,
  assessmentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(updateAssessmentVisibilityStart())
    await req.put(
      "/berenice_assessment/assessment_results_status",
      requestBody,
      { params: { assessmentUuid } }
    )
    dispatch(updateAssessmentVisibilitySuccess())
    dispatch(getAllStudentsMarksInSubjectAsync(assessmentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateAssessmentVisibilityFailure(error.message))
  }
}
//------------GET AVAILABLE LECTURERS FOR CLASS-------------
export const getAvailableLecturersForClassStart = () => ({
  type: timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_START,
})
export const getAvailableLecturersForClassSuccess = lecturers => ({
  type: timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_SUCCESS,
  payload: lecturers,
})
export const getAvailableLecturersForClassFailure = errorMessage => ({
  type: timetableTypes.GET_AVAILABLE_LECTURERS_FOR_CLASS_FAILURE,
  payload: errorMessage,
})

export const getAvailableLecturersForClassAsync = classUuid => async dispatch => {
  try {
    dispatch(getAvailableLecturersForClassStart())
    const result = await req.get("/berenice_timetable/get_lecturers_class", {
      params: { classUuid },
    })
    dispatch(getAvailableLecturersForClassSuccess(result.data))
  } catch (error) {
    dispatch(getAvailableLecturersForClassFailure(error.message))
  }
}
//------------GET STUDENTS ATTENDANCES IN SUBJECT-------------
export const getStudentsAttendancesInSubjectStart = () => ({
  type: timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_START,
})
export const getStudentsAttendancesInSubjectSuccess = attendances => ({
  type: timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_SUCCESS,
  payload: attendances,
})
export const getStudentsAttendancesInSubjectFailure = errorMessage => ({
  type: timetableTypes.GET_STUDENTS_ATTENDANCES_IN_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const getStudentsAttendancesInSubjectAsync = lecturerSubjectUuid => async dispatch => {
  try {
    dispatch(getStudentsAttendancesInSubjectStart())
    const result = await req.get("/berenice_timetable/students_attendance", {
      params: { lecturerSubjectUuid },
    })
    result.data.map(attendance => delete attendance.attendance)
    dispatch(getStudentsAttendancesInSubjectSuccess(result.data))
  } catch (error) {
    dispatch(getStudentsAttendancesInSubjectFailure(error.message))
  }
}
//-------------OTHERS----------------
export const setSelectedAssessment = info => ({
  type: timetableTypes.SET_SELECTED_ASSESSMENT,
  payload: info,
})

export const setSelectedSubject = subject => ({
  type: timetableTypes.SET_SELECTED_SUBJECT,
  payload: subject,
})

export const setSelectedAttendanceSheet = info => ({
  type: timetableTypes.SET_SELECTED_ATTENDANCE_SHEET,
  payload: info,
})

export const clearCreateClassErrorMessage = () => ({
  type: timetableTypes.CLEAR_CREATE_CLASS_ERROR_MESSAGE,
})

export const clearUpdateClassErrorMessage = () => ({
  type: timetableTypes.CLEAR_UPDATE_CLASS_ERROR_MESSAGE,
})

export const clearDeleteClassErrorMessage = () => ({
  type: timetableTypes.CLEAR_DELETE_CLASS_ERROR_MESSAGE,
})

export const clearCreateAttendanceSheetErrorMessage = () => ({
  type: timetableTypes.CLEAR_CREATE_ATTENDANCE_SHEET_ERROR_MESSAGE,
})

export const clearDeleteAttendanceSheetErrorMessage = () => ({
  type: timetableTypes.CLEAR_DELETE_ATTENDANCE_SHEET_ERROR_MESSAGE,
})

export const clearCreateAssessmentErrorMessage = () => ({
  type: timetableTypes.CLEAR_CREATE_ASSESSMENT_ERROR_MESSAGE,
})

export const clearDeleteAssessmentErrorMessage = () => ({
  type: timetableTypes.CLEAR_DELETE_ASSESSMENT_ERROR_MESSAGE,
})

export const clearUpdateAssessmentVisibilityErrorMessage = () => ({
  type: timetableTypes.CLEAR_UPDATE_ASSESSMENT_VISIBILITY_ERROR_MESSAGE,
})
