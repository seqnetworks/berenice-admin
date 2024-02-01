import enrollmentTypes from "./enrollment.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { setSelectedSubject } from "../timetable/timetable.actions"

//--------GET ALL SUBJECTS--------
export const getAllSubjectsStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_START,
})
export const getAllSubjectsSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsAsync = () => async dispatch => {
  try {
    dispatch(getAllSubjectsStart())
    const result = await req.get("/berenice_enrollment/subjects")
    dispatch(getAllSubjectsSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsFailure(error.message))
  }
}
//--------GET ALL SUBJECTS WITH INTAKES--------
export const getAllSubjectsWithIntakesStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_START,
})
export const getAllSubjectsWithIntakesSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsWithIntakesFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_INTAKES_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsWithIntakesAsync = () => async dispatch => {
  try {
    dispatch(getAllSubjectsWithIntakesStart())
    const result = await req.get("/berenice_enrollment/intakes_subjects")
    dispatch(getAllSubjectsWithIntakesSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsWithIntakesFailure(error.message))
  }
}
//--------CREATE SUBJECT--------
export const createSubjectStart = () => ({
  type: enrollmentTypes.CREATE_SUBJECT_START,
})
export const createSubjectSuccess = () => ({
  type: enrollmentTypes.CREATE_SUBJECT_SUCCESS,
})
export const createSubjectFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const createSubjectAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createSubjectStart())
    await req.post("/berenice_enrollment/subject", requestBody)
    dispatch(createSubjectSuccess())
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createSubjectFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------CREATE ENROLLMENT SUBJECT--------
export const createEnrollmentSubjectStart = () => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_START,
})
export const createEnrollmentSubjectSuccess = () => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_SUCCESS,
})
export const createEnrollmentSubjectFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const createEnrollmentSubjectAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(createEnrollmentSubjectStart())
    await req.post(
      "/berenice_enrollment/add_lecturer_course_intake",
      requestBody
    )
    dispatch(createEnrollmentSubjectSuccess())
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createEnrollmentSubjectFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------CREATE ENROLLMENT SUBJECT WITH SUBJECT DETAILS--------
export const createEnrollmentSubjectWithSubjectDetailsStart = () => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_WITH_SUBJECT_DETAILS_START,
})
export const createEnrollmentSubjectWithSubjectDetailsSuccess = () => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_WITH_SUBJECT_DETAILS_SUCCESS,
})
export const createEnrollmentSubjectWithSubjectDetailsFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_ENROLLMENT_SUBJECT_WITH_SUBJECT_DETAILS_FAILURE,
  payload: errorMessage,
})

export const createEnrollmentSubjectWithSubjectDetailsAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(createEnrollmentSubjectWithSubjectDetailsStart())
    await req.post(
      "/berenice_enrollment/add_subject_lecturer_course_intake",
      requestBody
    )
    dispatch(createEnrollmentSubjectWithSubjectDetailsSuccess())
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createEnrollmentSubjectWithSubjectDetailsFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------EDIT SUBJECT--------
export const editSubjectStart = () => ({
  type: enrollmentTypes.EDIT_SUBJECT_START,
})
export const editSubjectSuccess = () => ({
  type: enrollmentTypes.EDIT_SUBJECT_SUCCESS,
})
export const editSubjectFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const editSubjectAsync = (
  requestBody,
  subjectCode,
  messages
) => async dispatch => {
  try {
    dispatch(editSubjectStart())
    await req.put("/berenice_enrollment/subject", requestBody, {
      params: { subjectCode },
    })
    dispatch(editSubjectSuccess())
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editSubjectFailure(error.message))
  }
}
//--------EDIT INTAKE SUBJECT--------
export const editIntakeSubjectStart = () => ({
  type: enrollmentTypes.EDIT_INTAKE_SUBJECT_START,
})
export const editIntakeSubjectSuccess = () => ({
  type: enrollmentTypes.EDIT_INTAKE_SUBJECT_SUCCESS,
})
export const editIntakeSubjectFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_INTAKE_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const editIntakeSubjectAsync = (
  requestBody,
  subjectIntakeUuid,
  intakeCode,
  messages
) => async dispatch => {
  try {
    dispatch(editIntakeSubjectStart())
    await req.put("/berenice_enrollment/update_subject_intake", requestBody, {
      params: { subjectIntakeUuid },
    })
    dispatch(editIntakeSubjectSuccess())
    dispatch(getAllSubjectsInSingleIntakeAsync(intakeCode))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editIntakeSubjectFailure(error.message))
  }
}
//--------DELETE INTAKE SUBJECT--------
export const deleteIntakeSubjectStart = () => ({
  type: enrollmentTypes.DELETE_INTAKE_SUBJECT_START,
})
export const deleteIntakeSubjectSuccess = () => ({
  type: enrollmentTypes.DELETE_INTAKE_SUBJECT_SUCCESS,
})
export const deleteIntakeSubjectFailure = errorMessage => ({
  type: enrollmentTypes.DELETE_INTAKE_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const deleteIntakeSubjectAsync = (
  intakeSubjectUuid,
  intakeCode,
  messages
) => async dispatch => {
  try {
    dispatch(deleteIntakeSubjectStart())
    await req.delete("/berenice_enrollment/remove_subject_intake", {
      params: { intakeSubjectUuid },
    })
    dispatch(deleteIntakeSubjectSuccess())
    dispatch(getAllSubjectsInSingleIntakeAsync(intakeCode))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteIntakeSubjectFailure(error.message))
  }
}
//--------DELETE SUBJECT--------
export const deleteSubjectStart = () => ({
  type: enrollmentTypes.DELETE_SUBJECT_START,
})
export const deleteSubjectSuccess = () => ({
  type: enrollmentTypes.DELETE_SUBJECT_SUCCESS,
})
export const deleteSubjectFailure = errorMessage => ({
  type: enrollmentTypes.DELETE_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const deleteSubjectAsync = (subjectCode, messages) => async dispatch => {
  try {
    dispatch(deleteSubjectStart())
    await req.delete("/berenice_enrollment/subject", {
      params: { subjectCode },
    })
    dispatch(deleteSubjectSuccess())
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteSubjectFailure(error.message))
  }
}
//--------GET ALL SUBJECTS OF SINGLE LECTURER--------
export const getAllSubjectsOfSingleLecturerStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_START,
})
export const getAllSubjectsOfSingleLecturerSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsOfSingleLecturerFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_LECTURER_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsOfSingleLecturerAsync = lecturerUuid => async dispatch => {
  try {
    dispatch(getAllSubjectsOfSingleLecturerStart())
    const result = await req.get(
      "/berenice_enrollment/get_all_subjects_of_lecturer",
      { params: { lecturerUuid } }
    )
    result.data = result.data.map(
      subject => (subject = { ...subject, lecturerUuid })
    )
    dispatch(getAllSubjectsOfSingleLecturerSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsOfSingleLecturerFailure(error.message))
  }
}
//--------ADD SUBJECT TO LECTURER--------
export const addSubjectToLecturerStart = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_LECTURER_START,
})
export const addSubjectToLecturerSuccess = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_LECTURER_SUCCESS,
})
export const addSubjectToLecturerFailure = errorMessage => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_LECTURER_FAILURE,
  payload: errorMessage,
})

export const addSubjectToLecturerAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(addSubjectToLecturerStart())
    await req.post("/berenice_enrollment/add_subject_lecturer", requestBody)
    dispatch(addSubjectToLecturerSuccess())
    dispatch(getAllSubjectsOfSingleLecturerAsync(requestBody.lecturerUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addSubjectToLecturerFailure(error.message))
  }
}
//--------REMOVE SUBJECT FROM LECTURER--------
export const removeSubjectFromLecturerStart = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_START,
})
export const removeSubjectFromLecturerSuccess = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_SUCCESS,
})
export const removeSubjectFromLecturerFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_LECTURER_FAILURE,
  payload: errorMessage,
})

export const removeSubjectFromLecturerAsync = (
  lecturerSubjectUuid,
  lecturerUuid
) => async dispatch => {
  try {
    dispatch(removeSubjectFromLecturerStart())
    await req.delete("/berenice_enrollment/remove_subject_lecturer", {
      params: { lecturerSubjectUuid },
    })
    dispatch(removeSubjectFromLecturerSuccess())
    dispatch(getAllSubjectsOfSingleLecturerAsync(lecturerUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeSubjectFromLecturerFailure(error.message))
  }
}
//--------GET ALL SUBJECTS IN SINGLE INTAKE--------
export const getAllSubjectsInSingleIntakeStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_START,
})
export const getAllSubjectsInSingleIntakeSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsInSingleIntakeFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_SINGLE_INTAKE_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsInSingleIntakeAsync = intakeCode => async dispatch => {
  try {
    dispatch(getAllSubjectsInSingleIntakeStart())
    const result = await req.get("/berenice_enrollment/subjects_in_intake", {
      params: { intakeCode },
    })
    dispatch(getAllSubjectsInSingleIntakeSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsInSingleIntakeFailure(error.message))
  }
}
//--------ADD SUBJECT TO INTAKE--------
export const addSubjectToIntakeStart = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_INTAKE_START,
})
export const addSubjectToIntakeSuccess = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_INTAKE_SUCCESS,
})
export const addSubjectToIntakeFailure = errorMessage => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_INTAKE_FAILURE,
  payload: errorMessage,
})

export const addSubjectToIntakeAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(addSubjectToIntakeStart())
    await req.post("/berenice_enrollment/add_subject_intake", requestBody)
    dispatch(addSubjectToIntakeSuccess())
    dispatch(getAllSubjectsInSingleIntakeAsync(requestBody.intakeCode))
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addSubjectToIntakeFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------REMOVE SUBJECT FROM INTAKE--------
export const removeSubjectFromIntakeStart = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_START,
})
export const removeSubjectFromIntakeSuccess = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_SUCCESS,
})
export const removeSubjectFromIntakeFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_INTAKE_FAILURE,
  payload: errorMessage,
})

export const removeSubjectFromIntakeAsync = intakeSubjectUuid => async dispatch => {
  try {
    dispatch(removeSubjectFromIntakeStart())
    await req.delete("/berenice_enrollment/remove_subject_Intake", {
      params: { intakeSubjectUuid },
    })
    dispatch(removeSubjectFromIntakeSuccess())
    dispatch(getAllSubjectsInSingleIntakeAsync(IntakeCode))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeSubjectFromIntakeFailure(error.message))
  }
}
//--------GET ALL SUBJECTS IN COURSE--------
export const getAllSubjectsInCourseStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_START,
})
export const getAllSubjectsInCourseSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsInCourseFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsInCourseAsync = courseCode => async dispatch => {
  try {
    dispatch(getAllSubjectsInCourseStart())
    const result = await req.get("/berenice_enrollment/subjects_in_course", {
      params: { courseCode },
    })
    dispatch(
      getAllSubjectsInCourseSuccess({ subjects: result.data, courseCode })
    )
  } catch (error) {
    dispatch(getAllSubjectsInCourseFailure(error.message))
  }
}
//--------GET ALL INTAKES IN COURSE--------
export const getAllIntakesInCourseStart = () => ({
  type: enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_START,
})
export const getAllIntakesInCourseSuccess = intakes => ({
  type: enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_SUCCESS,
  payload: intakes,
})
export const getAllIntakesInCourseFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_INTAKES_IN_COURSE_FAILURE,
  payload: errorMessage,
})

export const getAllIntakesInCourseAsync = courseCode => async dispatch => {
  try {
    dispatch(getAllIntakesInCourseStart())
    const result = await req.get("/berenice_enrollment/intakes_course", {
      params: { courseCode },
    })
    dispatch(getAllIntakesInCourseSuccess({ intakes: result.data, courseCode }))
  } catch (error) {
    dispatch(getAllIntakesInCourseFailure(error.message))
  }
}
//--------GET ALL SUBJECTS IN COURSE SEMESTER--------
export const getAllSubjectsInCourseSemesterStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_START,
})
export const getAllSubjectsInCourseSemesterSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsInCourseSemesterFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_IN_COURSE_SEMESTER_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsInCourseSemesterAsync = (
  courseCode,
  semester
) => async dispatch => {
  try {
    dispatch(getAllSubjectsInCourseSemesterStart())
    const result = await req.get(
      "/berenice_enrollment/subjects_in_course_semester",
      { params: { courseCode, semester } }
    )
    dispatch(getAllSubjectsInCourseSemesterSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsInCourseSemesterFailure(error.message))
  }
}
//--------ADD SUBJECT TO COURSE SEMESTER--------
export const addSubjectToCourseSemesterStart = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_START,
})
export const addSubjectToCourseSemesterSuccess = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_SUCCESS,
})
export const addSubjectToCourseSemesterFailure = errorMessage => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_COURSE_SEMESTER_FAILURE,
  payload: errorMessage,
})

export const addSubjectToCourseSemesterAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(addSubjectToCourseSemesterStart())
    await req.post("/berenice_enrollment/add_subject_course", requestBody)
    dispatch(addSubjectToCourseSemesterSuccess())
    dispatch(getAllSubjectsInCourseAsync(requestBody.courseCode))
    dispatch(getAllSubjectsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addSubjectToCourseSemesterFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------REMOVE SUBJECT FROM COURSE--------
export const removeSubjectFromCourseStart = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_START,
})
export const removeSubjectFromCourseSuccess = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_SUCCESS,
})
export const removeSubjectFromCourseFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_COURSE_FAILURE,
  payload: errorMessage,
})

export const removeSubjectFromCourseAsync = (
  courseSubjectUuid,
  courseCode,
  messages
) => async dispatch => {
  try {
    dispatch(removeSubjectFromCourseStart())
    await req.delete("/berenice_enrollment/remove_subject_course", {
      params: { courseSubjectUuid },
    })
    dispatch(removeSubjectFromCourseSuccess())
    dispatch(getAllSubjectsInCourseAsync(courseCode))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeSubjectFromCourseFailure(error.message))
  }
}
//--------GET ALL SUBJECTS OF SINGLE STUDENT--------
export const getAllSubjectsOfSingleStudentStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_START,
})
export const getAllSubjectsOfSingleStudentSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsOfSingleStudentFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_OF_SINGLE_STUDENT_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsOfSingleStudentAsync = studentUuid => async dispatch => {
  try {
    dispatch(getAllSubjectsOfSingleStudentStart())
    const result = await req.get(
      "/berenice_enrollment/get_all_subjects_of_student",
      { params: { studentUuid } }
    )
    dispatch(getAllSubjectsOfSingleStudentSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsOfSingleStudentFailure(error.message))
  }
}
//--------GET ALL ACTIVE SUBJECTS OF SINGLE STUDENT--------
export const getAllActiveSubjectsOfSingleStudentStart = () => ({
  type: enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_START,
})
export const getAllActiveSubjectsOfSingleStudentSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_SUCCESS,
  payload: subjects,
})
export const getAllActiveSubjectsOfSingleStudentFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_ACTIVE_SUBJECTS_OF_SINGLE_STUDENT_FAILURE,
  payload: errorMessage,
})

export const getAllActiveSubjectsOfSingleStudentAsync = studentUuid => async dispatch => {
  try {
    dispatch(getAllActiveSubjectsOfSingleStudentStart())
    const result = await req.get(
      "/berenice_enrollment/get_all_subjects_of_student",
      { params: { studentUuid } }
    )
    dispatch(getAllActiveSubjectsOfSingleStudentSuccess(result.data))
  } catch (error) {
    dispatch(getAllActiveSubjectsOfSingleStudentFailure(error.message))
  }
}
//--------CHANGE STATUS OF STUDENT SUBJECT--------
export const changeStatusOfStudentSubjectStart = () => ({
  type: enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_START,
})
export const changeStatusOfStudentSubjectSuccess = () => ({
  type: enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_SUCCESS,
})
export const changeStatusOfStudentSubjectFailure = errorMessage => ({
  type: enrollmentTypes.CHANGE_STATUS_OF_STUDENT_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const changeStatusOfStudentSubjectAsync = (
  requestBody,
  studentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(changeStatusOfStudentSubjectStart())
    await req.put(
      `/berenice_enrollment/status_subject${
        requestBody.subjectStatus === "passed" ||
        requestBody.subjectStatus === "failed"
          ? "_passed_failed"
          : "_onGoing_declined"
      }`,
      {
        subjects: [requestBody],
      },
      { params: { studentUuid } }
    )
    dispatch(changeStatusOfStudentSubjectSuccess())
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(changeStatusOfStudentSubjectFailure(error.message))
  }
}
export const droppingSubjectAsync = (
  requestBody,
  studentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(changeStatusOfStudentSubjectStart())
    await req.put("/berenice_enrollment/status_subject_dropped", requestBody, {
      params: { studentUuid },
    })
    dispatch(changeStatusOfStudentSubjectSuccess())
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(changeStatusOfStudentSubjectFailure(error.message))
  }
}
//--------GET ALL SUBJECTS THAT STUDENT CAN ENROLL TO--------
export const getAllSubjectsThatStudentCanEnrollToStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_START,
})
export const getAllSubjectsThatStudentCanEnrollToSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsThatStudentCanEnrollToFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_THAT_STUDENT_CAN_ENROLL_TO_FAILURE,
  payload: errorMessage,
})

export const getAllSubjectsThatStudentCanEnrollToAsync = studentUuid => async dispatch => {
  try {
    dispatch(getAllSubjectsThatStudentCanEnrollToStart())
    const result = await req.get(
      "/berenice_enrollment/subject_student_enroll",
      { params: { studentUuid } }
    )
    dispatch(getAllSubjectsThatStudentCanEnrollToSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsThatStudentCanEnrollToFailure(error.message))
  }
}
//--------ADD SUBJECT TO STUDENT--------
export const addSubjectToStudentStart = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_STUDENT_START,
})
export const addSubjectToStudentSuccess = () => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_STUDENT_SUCCESS,
})
export const addSubjectToStudentFailure = errorMessage => ({
  type: enrollmentTypes.ADD_SUBJECT_TO_STUDENT_FAILURE,
  payload: errorMessage,
})

export const addSubjectToStudentAsync = (
  studentUuid,
  subjects,
  messages,
  intakeSubjectUuid
) => async dispatch => {
  let subjectsArray = []
  if (subjects && !intakeSubjectUuid)
    subjects.map(subject => subjectsArray.push(subject.value))
  try {
    dispatch(addSubjectToStudentStart())
    await req.post(
      `/berenice_enrollment/add_subject_student${
        intakeSubjectUuid ? "_no_prereq" : ""
      }`,
      intakeSubjectUuid
        ? {
            studentUuid,
            intakeSubjectUuid,
          }
        : {
            studentUuid,
            subjectCode: subjectsArray,
          }
    )
    dispatch(addSubjectToStudentSuccess())
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addSubjectToStudentFailure(error.message))
  }
}
//--------REMOVE SUBJECT FROM STUDENT--------
export const removeSubjectFromStudentStart = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_START,
})
export const removeSubjectFromStudentSuccess = () => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_SUCCESS,
})
export const removeSubjectFromStudentFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_SUBJECT_FROM_STUDENT_FAILURE,
  payload: errorMessage,
})

export const removeSubjectFromStudentAsync = studentSubjectUuid => async dispatch => {
  try {
    dispatch(removeSubjectFromStudentStart())
    await req.delete("/berenice_enrollment/remove_subject_student", {
      params: { studentSubjectUuid },
    })
    dispatch(removeSubjectFromStudentSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeSubjectFromStudentFailure(error.message))
  }
}
//--------GET ALL DEPARTMENTS--------
export const getAllDepartmentsStart = () => ({
  type: enrollmentTypes.GET_ALL_DEPARTMENTS_START,
})
export const getAllDepartmentsSuccess = departments => ({
  type: enrollmentTypes.GET_ALL_DEPARTMENTS_SUCCESS,
  payload: departments,
})
export const getAllDepartmentsFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_DEPARTMENTS_FAILURE,
  payload: errorMessage,
})

export const getAllDepartmentsAsync = () => async dispatch => {
  try {
    dispatch(getAllDepartmentsStart())
    const result = await req.get("/berenice_enrollment/departments")
    dispatch(getAllDepartmentsSuccess(result.data))
  } catch (error) {
    dispatch(getAllDepartmentsFailure(error.message))
  }
}
//--------CREATE DEPARTMENT--------
export const createDepartmentStart = () => ({
  type: enrollmentTypes.CREATE_DEPARTMENT_START,
})
export const createDepartmentSuccess = () => ({
  type: enrollmentTypes.CREATE_DEPARTMENT_SUCCESS,
})
export const createDepartmentFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_DEPARTMENT_FAILURE,
  payload: errorMessage,
})

export const createDepartmentAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(createDepartmentStart())
    await req.post("/berenice_enrollment/department", requestBody)
    dispatch(createDepartmentSuccess())
    dispatch(getAllDepartmentsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createDepartmentFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------EDIT DEPARTMENT--------
export const editDepartmentStart = () => ({
  type: enrollmentTypes.EDIT_DEPARTMENT_START,
})
export const editDepartmentSuccess = () => ({
  type: enrollmentTypes.EDIT_DEPARTMENT_SUCCESS,
})
export const editDepartmentFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_DEPARTMENT_FAILURE,
  payload: errorMessage,
})

export const editDepartmentAsync = (
  requestBody,
  departmentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(editDepartmentStart())
    await req.put("/berenice_enrollment/department", requestBody, {
      params: { departmentUuid },
    })
    dispatch(editDepartmentSuccess())
    dispatch(getAllDepartmentsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editDepartmentFailure(error.message))
  }
}
//--------DELETE DEPARTMENT--------
export const deleteDepartmentStart = () => ({
  type: enrollmentTypes.DELETE_DEPARTMENT_START,
})
export const deleteDepartmentSuccess = () => ({
  type: enrollmentTypes.DELETE_DEPARTMENT_SUCCESS,
})
export const deleteDepartmentFailure = errorMessage => ({
  type: enrollmentTypes.DELETE_DEPARTMENT_FAILURE,
  payload: errorMessage,
})

export const deleteDepartmentAsync = (
  departmentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(deleteDepartmentStart())
    await req.delete("/berenice_enrollment/department", {
      params: { departmentUuid },
    })
    dispatch(deleteDepartmentSuccess())
    dispatch(getAllDepartmentsAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteDepartmentFailure(error.message))
  }
}
//--------GET ALL COURSES--------
export const getAllCoursesStart = () => ({
  type: enrollmentTypes.GET_ALL_COURSES_START,
})
export const getAllCoursesSuccess = courses => ({
  type: enrollmentTypes.GET_ALL_COURSES_SUCCESS,
  payload: courses,
})
export const getAllCoursesFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_COURSES_FAILURE,
  payload: errorMessage,
})

export const getAllCoursesAsync = () => async dispatch => {
  try {
    dispatch(getAllCoursesStart())
    const result = await req.get("/berenice_enrollment/courses")
    dispatch(getAllCoursesSuccess(result.data))
  } catch (error) {
    dispatch(getAllCoursesFailure(error.message))
  }
}
//--------GET ALL COURSES IN SINGLE DEPARTMENT--------
export const getAllCoursesInSingleDepartmentStart = () => ({
  type: enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_START,
})
export const getAllCoursesInSingleDepartmentSuccess = courses => ({
  type: enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_SUCCESS,
  payload: courses,
})
export const getAllCoursesInSingleDepartmentFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_COURSES_IN_SINGLE_DEPARTMENT_FAILURE,
  payload: errorMessage,
})

export const getAllCoursesInSingleDepartmentAsync = departmentUuid => async dispatch => {
  try {
    dispatch(getAllCoursesInSingleDepartmentStart())
    const result = await req.get(
      "/berenice_enrollment/courses_single_department",
      { params: { departmentUuid } }
    )
    dispatch(getAllCoursesInSingleDepartmentSuccess(result.data))
  } catch (error) {
    dispatch(getAllCoursesInSingleDepartmentFailure(error.message))
  }
}
//--------CREATE COURSE--------
export const createCourseStart = () => ({
  type: enrollmentTypes.CREATE_COURSE_START,
})
export const createCourseSuccess = () => ({
  type: enrollmentTypes.CREATE_COURSE_SUCCESS,
})
export const createCourseFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_COURSE_FAILURE,
  payload: errorMessage,
})

export const createCourseAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createCourseStart())
    await req.post("/berenice_enrollment/course", requestBody)
    dispatch(createCourseSuccess())
    dispatch(getAllCoursesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createCourseFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------EDIT COURSE--------
export const editCourseStart = () => ({
  type: enrollmentTypes.EDIT_COURSE_START,
})
export const editCourseSuccess = () => ({
  type: enrollmentTypes.EDIT_COURSE_SUCCESS,
})
export const editCourseFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_COURSE_FAILURE,
  payload: errorMessage,
})

export const editCourseAsync = (
  requestBody,
  courseCode,
  messages
) => async dispatch => {
  try {
    dispatch(editCourseStart())
    await req.put("/berenice_enrollment/course", requestBody, {
      params: { courseCode },
    })
    dispatch(editCourseSuccess())
    dispatch(getAllCoursesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editCourseFailure(error.message))
  }
}
//--------DELETE COURSE--------
export const deleteCourseStart = () => ({
  type: enrollmentTypes.DELETE_COURSE_START,
})
export const deleteCourseSuccess = () => ({
  type: enrollmentTypes.DELETE_COURSE_SUCCESS,
})
export const deleteCourseFailure = errorMessage => ({
  type: enrollmentTypes.DELETE_COURSE_FAILURE,
  payload: errorMessage,
})

export const deleteCourseAsync = (courseCode, messages) => async dispatch => {
  try {
    dispatch(deleteCourseStart())
    await req.delete("/berenice_enrollment/course", {
      params: { courseCode },
    })
    dispatch(deleteCourseSuccess())
    dispatch(getAllCoursesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteCourseFailure(error.message))
  }
}
//--------GET ALL INTAKES--------
export const getAllIntakesStart = () => ({
  type: enrollmentTypes.GET_ALL_INTAKES_START,
})
export const getAllIntakesSuccess = intakes => ({
  type: enrollmentTypes.GET_ALL_INTAKES_SUCCESS,
  payload: intakes,
})
export const getAllIntakesFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_INTAKES_FAILURE,
  payload: errorMessage,
})

export const getAllIntakesAsync = () => async dispatch => {
  try {
    dispatch(getAllIntakesStart())
    const result = await req.get("/berenice_enrollment/intakes")
    result.data = result.data.map(
      intake =>
        (intake = {
          ...intake,
          intakeYearMonth: intake.intakeYearMonth.slice(0, 10),
        })
    )
    dispatch(getAllIntakesSuccess(result.data))
  } catch (error) {
    dispatch(getAllIntakesFailure(error.message))
  }
}
//--------CREATE INTAKE--------
export const createIntakeStart = () => ({
  type: enrollmentTypes.CREATE_INTAKE_START,
})
export const createIntakeSuccess = () => ({
  type: enrollmentTypes.CREATE_INTAKE_SUCCESS,
})
export const createIntakeFailure = errorMessage => ({
  type: enrollmentTypes.CREATE_INTAKE_FAILURE,
  payload: errorMessage,
})

export const createIntakeAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(createIntakeStart())
    await req.post("/berenice_enrollment/intake", requestBody)
    dispatch(createIntakeSuccess())
    dispatch(getAllIntakesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(createIntakeFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------ADD STUDENT TO INTAKE--------
export const addStudentToIntakeStart = () => ({
  type: enrollmentTypes.ADD_STUDENT_TO_INTAKE_START,
})
export const addStudentToIntakeSuccess = () => ({
  type: enrollmentTypes.ADD_STUDENT_TO_INTAKE_SUCCESS,
})
export const addStudentToIntakeFailure = errorMessage => ({
  type: enrollmentTypes.ADD_STUDENT_TO_INTAKE_FAILURE,
  payload: errorMessage,
})

export const addStudentToIntakeAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(addStudentToIntakeStart())
    await req.post("/berenice_enrollment/student_intake_add", requestBody)
    dispatch(addStudentToIntakeSuccess())
    dispatch(getSelectedUserIntakesAsync(requestBody.studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addStudentToIntakeFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------DELETE INTAKE--------
export const deleteIntakeStart = () => ({
  type: enrollmentTypes.DELETE_INTAKE_START,
})
export const deleteIntakeSuccess = () => ({
  type: enrollmentTypes.DELETE_INTAKE_SUCCESS,
})
export const deleteIntakeFailure = errorMessage => ({
  type: enrollmentTypes.DELETE_INTAKE_FAILURE,
  payload: errorMessage,
})

export const deleteIntakeAsync = (intakeCode, messages) => async dispatch => {
  try {
    dispatch(deleteIntakeStart())
    await req.delete("/berenice_enrollment/intake", {
      params: { intakeCode },
    })
    dispatch(deleteIntakeSuccess())
    dispatch(getAllIntakesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteIntakeFailure(error.message))
  }
}
//--------REMOVE STUDENT FROM INTAKE--------
export const removeStudentFromIntakeStart = () => ({
  type: enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_START,
})
export const removeStudentFromIntakeSuccess = () => ({
  type: enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_SUCCESS,
})
export const removeStudentFromIntakeFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_STUDENT_FROM_INTAKE_FAILURE,
  payload: errorMessage,
})

export const removeStudentFromIntakeAsync = (
  studentUuid,
  intakeCode
) => async dispatch => {
  try {
    dispatch(removeStudentFromIntakeStart())
    await req.delete("/berenice_enrollment/remove_student_intake", {
      params: { studentUuid, intakeCode },
    })
    dispatch(removeStudentFromIntakeSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeStudentFromIntakeFailure(error.message))
  }
}
//--------GET INTAKE ENROLLMENT STATUS--------
export const getIntakeEnrollmentStatusStart = () => ({
  type: enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_START,
})
export const getIntakeEnrollmentStatusSuccess = () => ({
  type: enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_SUCCESS,
})
export const getIntakeEnrollmentStatusFailure = errorMessage => ({
  type: enrollmentTypes.GET_INTAKE_ENROLLMENT_STATUS_FAILURE,
  payload: errorMessage,
})

export const getIntakeEnrollmentStatusStartAsync = intakeCode => async dispatch => {
  try {
    dispatch(getIntakeEnrollmentStatusStart())
    const result = await req.get("/berenice_enrollment/enrollment_status", {
      params: { intakeCode },
    })
    dispatch(getIntakeEnrollmentStatusSuccess(result.data))
  } catch (error) {
    dispatch(getIntakeEnrollmentStatusFailure(error.message))
  }
}
//--------GET SELECTED USER INTAKES --------
export const getSelectedUserIntakesStart = () => ({
  type: enrollmentTypes.GET_SELECTED_USER_INTAKES_START,
})
export const getSelectedUserIntakesSuccess = status => ({
  type: enrollmentTypes.GET_SELECTED_USER_INTAKES_SUCCESS,
  payload: status,
})
export const getSelectedUserIntakesFailure = errorMessage => ({
  type: enrollmentTypes.GET_SELECTED_USER_INTAKES_FAILURE,
  payload: errorMessage,
})

export const getSelectedUserIntakesAsync = studentUuid => async dispatch => {
  try {
    dispatch(getSelectedUserIntakesStart())
    const result = await req.get("/berenice_enrollment/student_intakes", {
      params: { studentUuid },
    })
    dispatch(getSelectedUserIntakesSuccess(result.data))
  } catch (error) {
    dispatch(getSelectedUserIntakesFailure(error.message))
  }
}
//--------UPDATE STUDENT INTAKE STATUS--------
export const updateStudentIntakeStatusStart = () => ({
  type: enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_START,
})
export const updateStudentIntakeStatusSuccess = () => ({
  type: enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_SUCCESS,
})
export const updateStudentIntakeStatusFailure = errorMessage => ({
  type: enrollmentTypes.UPDATE_STUDENT_INTAKE_STATUS_FAILURE,
  payload: errorMessage,
})

export const updateStudentIntakeStatusAsync = (
  studentUuid,
  intakeCode,
  status,
  gpa,
  messages
) => async dispatch => {
  const url = {
    passed: "pass_fail",
    failed: "pass_fail",
    cancelled: "cancelled",
    onGoing: "onGoing",
    onHold: "onHold",
  }
  try {
    dispatch(updateStudentIntakeStatusStart())
    const result = await req.put(
      `/berenice_enrollment/student_intake_${url[status]}`,
      status === "passed" || status === "failed"
        ? {
            studentIntakeStatus: status,
            gpa,
          }
        : {},
      {
        params: { studentUuid, intakeCode },
      }
    )
    dispatch(updateStudentIntakeStatusSuccess(result.data))
    dispatch(getSelectedUserIntakesAsync(studentUuid))
    dispatch(getStudentCgpaAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(updateStudentIntakeStatusFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------EDIT INTAKE ENROLLMENT STATUS--------
export const editIntakeEnrollmentStatusStart = () => ({
  type: enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_START,
})
export const editIntakeEnrollmentStatusSuccess = () => ({
  type: enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_SUCCESS,
})
export const editIntakeEnrollmentStatusFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_INTAKE_ENROLLMENT_STATUS_FAILURE,
  payload: errorMessage,
})

export const editIntakeEnrollmentStatusAsync = (
  intakeCode,
  status,
  messages
) => async dispatch => {
  try {
    dispatch(editIntakeEnrollmentStatusStart())
    await req.put(
      "/berenice_enrollment/enrollment_status",
      { enrollmentStatus: status },
      { params: { intakeCode } }
    )
    dispatch(editIntakeEnrollmentStatusSuccess())
    dispatch(getAllIntakesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editIntakeEnrollmentStatusFailure(error.message))
  }
}
//--------EDIT INTAKE--------
export const editIntakeStart = () => ({
  type: enrollmentTypes.EDIT_INTAKE_START,
})
export const editIntakeSuccess = () => ({
  type: enrollmentTypes.EDIT_INTAKE_SUCCESS,
})
export const editIntakeFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_INTAKE_FAILURE,
  payload: errorMessage,
})

export const editIntakeAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(editIntakeStart())
    await req.put("/berenice_enrollment/intake", requestBody)
    dispatch(editIntakeSuccess())
    dispatch(getAllIntakesAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editIntakeFailure(error.message))
  }
}
//-------------GET ALL SUBJECTS WITH LECTURER----------------
export const getAllSubjectsWithLecturerStart = () => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_START,
})
export const getAllSubjectsWithLecturerSuccess = subjects => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_SUCCESS,
  payload: subjects,
})
export const getAllSubjectsWithLecturerFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_SUBJECTS_WITH_LECTURER_FAILRE,
  payload: errorMessage,
})

export const getAllSubjectsWithLecturerAsync = () => async dispatch => {
  try {
    dispatch(getAllSubjectsWithLecturerStart())
    const result = await req.get(
      "/berenice_enrollment/get_all_subjects_of_lecturers"
    )
    dispatch(getAllSubjectsWithLecturerSuccess(result.data))
  } catch (error) {
    dispatch(getAllSubjectsWithLecturerFailure(error.message))
  }
}
//-------------EDIT SUBJECT STATUS----------------
export const editSubjectStatusStart = () => ({
  type: enrollmentTypes.EDIT_SUBJECT_STATUS_START,
})
export const editSubjectStatusSuccess = () => ({
  type: enrollmentTypes.EDIT_SUBJECT_STATUS_SUCCESS,
})
export const editSubjectStatusFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_SUBJECT_STATUS_FAILURE,
  payload: errorMessage,
})

export const editSubjectStatusAsync = (
  lecturerSubjectUuid,
  status,
  messages
) => async dispatch => {
  try {
    dispatch(editSubjectStatusStart())
    const result = await req.put(
      "/berenice_enrollment/edit_lecturer_subject_status",
      { lecturerSubjectStatus: status },
      { params: { lecturerSubjectUuid } }
    )
    dispatch(editSubjectStatusSuccess(result.data))
    dispatch(getAllSubjectsWithLecturerAsync())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editSubjectStatusFailure(error.message))
  }
}
//-------------GET LECTURER SUBJECT----------------
export const getLecturerSubjectStart = () => ({
  type: enrollmentTypes.GET_LECTURER_SUBJECT_START,
})
export const getLecturerSubjectSuccess = () => ({
  type: enrollmentTypes.GET_LECTURER_SUBJECT_SUCCESS,
})
export const getLecturerSubjectFailure = errorMessage => ({
  type: enrollmentTypes.GET_LECTURER_SUBJECT_FAILURE,
  payload: errorMessage,
})

export const getLecturerSubjectAsync = subject => async dispatch => {
  try {
    dispatch(getLecturerSubjectStart())
    const result = await req.get(
      "/berenice_enrollment/get_single_subject_of_lecturer",
      {
        params: {
          lecturerSubjectUuid: subject.lecturerSubjectUuid,
        },
      }
    )
    dispatch(
      setSelectedSubject({
        ...subject,
        lecturerAssistant: result.data.lecturerAssistant,
      })
    )
    dispatch(getLecturerSubjectSuccess())
  } catch (error) {
    dispatch(getLecturerSubjectFailure(error.message))
  }
}
//-------------ADD LECTURER ASSISSTANT----------------
export const addLecturerAssisstantStart = () => ({
  type: enrollmentTypes.ADD_LECTURER_ASSISSTANT_START,
})
export const addLecturerAssisstantSuccess = () => ({
  type: enrollmentTypes.ADD_LECTURER_ASSISSTANT_SUCCESS,
})
export const addLecturerAssisstantFailure = errorMessage => ({
  type: enrollmentTypes.ADD_LECTURER_ASSISSTANT_FAILURE,
  payload: errorMessage,
})

export const addLecturerAssisstantAsync = (
  lecturerUuid,
  subject,
  messages
) => async dispatch => {
  try {
    dispatch(addLecturerAssisstantStart())
    await req.put(
      "/berenice_enrollment/add_lecturer_assistant",
      {},
      {
        params: {
          lecturerSubjectUuid: subject.lecturerSubjectUuid,
          lecturerUuid,
        },
      }
    )
    dispatch(getLecturerSubjectAsync(subject))
    dispatch(addLecturerAssisstantSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(addLecturerAssisstantFailure(error.message))
  }
}
//-------------REMOVE LECTURER ASSISSTANT----------------
export const removeLecturerAssisstantStart = () => ({
  type: enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_START,
})
export const removeLecturerAssisstantSuccess = () => ({
  type: enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_SUCCESS,
})
export const removeLecturerAssisstantFailure = errorMessage => ({
  type: enrollmentTypes.REMOVE_LECTURER_ASSISSTANT_FAILURE,
  payload: errorMessage,
})

export const removeLecturerAssisstantAsync = (
  lecturerUuid,
  subject,
  messages
) => async dispatch => {
  try {
    dispatch(removeLecturerAssisstantStart())
    await req.put(
      "/berenice_enrollment/remove_lecturer_assistant",
      {},
      {
        params: {
          lecturerSubjectUuid: subject.lecturerSubjectUuid,
          lecturerUuid: lecturerUuid,
        },
      }
    )
    dispatch(getLecturerSubjectAsync(subject))
    dispatch(removeLecturerAssisstantSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(removeLecturerAssisstantFailure(error.message))
  }
}
//-------------GET ALL INTAKES OF CURRENT USER----------------
export const getAllIntakesOfCurrentUserStart = () => ({
  type: enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_START,
})
export const getAllIntakesOfCurrentUserSuccess = intakes => ({
  type: enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_SUCCESS,
  payload: intakes,
})
export const getAllIntakesOfCurrentUserFailure = errorMessage => ({
  type: enrollmentTypes.GET_ALL_INTAKES_OF_CURRENT_USER_FAILURE,
  payload: errorMessage,
})

export const getAllIntakesOfCurrentUserAsync = () => async dispatch => {
  try {
    dispatch(getAllIntakesOfCurrentUserStart())
    const result = await req.get("/berenice_enrollment/lecturer_intakes")
    dispatch(getAllIntakesOfCurrentUserSuccess(result.data))
  } catch (error) {
    dispatch(getAllIntakesOfCurrentUserFailure(error.message))
  }
}
//------------EDIT STUDENT GPA-------------
export const editStudentGpaStart = () => ({
  type: enrollmentTypes.EDIT_STUDENT_GPA_START,
})
export const editStudentGpaSuccess = () => ({
  type: enrollmentTypes.EDIT_STUDENT_GPA_SUCCESS,
})
export const editStudentGpaFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_STUDENT_GPA_FAILURE,
  payload: errorMessage,
})

export const editStudentGpaAsync = (
  requestBody,
  studentUuid,
  messages
) => async dispatch => {
  try {
    dispatch(editStudentGpaStart())
    await req.put("/berenice_assessment/gpa", requestBody)
    dispatch(editStudentGpaSuccess())
    dispatch(getSelectedUserIntakesAsync(studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editStudentGpaFailure(error.message))
  }
}
//------------GET STUDENT CGPA-------------
export const getStudentCgpaStart = () => ({
  type: enrollmentTypes.GET_STUDENT_CGPA_START,
})
export const getStudentCgpaSuccess = cgpa => ({
  type: enrollmentTypes.GET_STUDENT_CGPA_SUCCESS,
  payload: cgpa,
})
export const getStudentCgpaFailure = errorMessage => ({
  type: enrollmentTypes.GET_STUDENT_CGPA_FAILURE,
  payload: errorMessage,
})

export const getStudentCgpaAsync = studentUuid => async dispatch => {
  try {
    dispatch(getStudentCgpaStart())
    const res = await req.get("/berenice_assessment/cgpa", {
      params: { studentUuid },
    })
    dispatch(getStudentCgpaSuccess(res.data))
  } catch (error) {
    dispatch(getStudentCgpaFailure(error.message))
  }
}
//------------GET CURRENT LECTURER ONGOING SUBJECTS-------------
export const getCurrentLecturerOngoingSubjectsStart = () => ({
  type: enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_START,
})
export const getCurrentLecturerOngoingSubjectsSuccess = subjects => ({
  type: enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_SUCCESS,
  payload: subjects,
})
export const getCurrentLecturerOngoingSubjectsFailure = errorMessage => ({
  type: enrollmentTypes.GET_CURRENT_LECTURER_ONGOING_SUBJECTS_FAILURE,
  payload: errorMessage,
})

export const getCurrentLecturerOngoingSubjectsAsync = () => async dispatch => {
  try {
    dispatch(getCurrentLecturerOngoingSubjectsStart())
    const res = await req.get(
      "/berenice_enrollment/get_all_subjects_of_lecturer_onGoing"
    )
    dispatch(getCurrentLecturerOngoingSubjectsSuccess(res.data))
  } catch (error) {
    dispatch(getCurrentLecturerOngoingSubjectsFailure(error.message))
  }
}
//------------EDIT STUDENT CGPA-------------
export const editStudentCgpaStart = () => ({
  type: enrollmentTypes.EDIT_STUDENT_CGPA_START,
})
export const editStudentCgpaSuccess = () => ({
  type: enrollmentTypes.EDIT_STUDENT_CGPA_SUCCESS,
})
export const editStudentCgpaFailure = errorMessage => ({
  type: enrollmentTypes.EDIT_STUDENT_CGPA_FAILURE,
  payload: errorMessage,
})

export const editStudentCgpaAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(editStudentCgpaStart())
    await req.put("/berenice_assessment/cgpa", requestBody)
    dispatch(editStudentCgpaSuccess())
    dispatch(getStudentCgpaAsync(requestBody.studentUuid))
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(editStudentCgpaFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//--------OTHERS--------
export const clearDeleteDepartmentErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_DELETE_DEPARTMENT_ERROR_MESSAGE,
})

export const clearEditDepartmentErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_DEPARTMENT_ERROR_MESSAGE,
})

export const clearDeleteCourseErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_DELETE_COURSE_ERROR_MESSAGE,
})

export const clearEditCourseErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_COURSE_ERROR_MESSAGE,
})

export const clearDeleteIntakeErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_DELETE_INTAKE_ERROR_MESSAGE,
})

export const clearEditIntakeEnrollmentStatusErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_INTAKE_ENROLLMENT_STATUS_ERROR_MESSAGE,
})

export const clearEditIntakeSubjectErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_INTAKE_SUBJECT_ERROR_MESSAGE,
})

export const clearDeleteIntakeSubjectErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_DELETE_INTAKE_SUBJECT_ERROR_MESSAGE,
})

export const clearDeleteSubjectErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_DELETE_SUBJECT_ERROR_MESSAGE,
})

export const clearEditSubjectErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_SUBJECT_ERROR_MESSAGE,
})

export const clearChangeStatusOfStudentSubjectErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_CHANGE_STATUS_OF_STUDENT_SUBJECT_ERROR_MESSAGE,
})

export const clearAddSubjectToStudentErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_ADD_SUBJECT_TO_STUDENT_ERROR_MESSAGE,
})

export const clearEditSubjectStatusErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_SUBJECT_STATUS_ERROR_MESSAGE,
})

export const clearEditIntakeErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_INTAKE_ERROR_MESSAGE,
})

export const clearEditStudentGpaErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_STUDENT_GPA_ERROR_MESSAGE,
})

export const clearEditStudentCgpaErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_EDIT_STUDENT_CGPA_ERROR_MESSAGE,
})

export const clearAddLecturerAssisstantErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_ADD_LECTURER_ASSISSTANT_ERROR_MESSAGE,
})

export const clearRemoveLecturerAssisstantErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_REMOVE_LECTURER_ASSISSTANT_ERROR_MESSAGE,
})

export const clearRemoveSubjectFromCourseErrorMessage = () => ({
  type: enrollmentTypes.CLEAR_REMOVE_SUBJECT_FROM_COURSE_ERROR_MESSAGE,
})
