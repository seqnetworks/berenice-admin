export const bannedRules = {
  GET: {
    "/berenice_assets": ["/files"],
    "/berenice_enrollment": [
      "/subject_student_enroll",
      "/get_all_subjects_of_lecturer_onGoing",
      "/intakes_subjects",
    ],
    "/berenice_timetable": [
      "/class_lecturer",
      "/students_attendance",
      "/get_lecturers_class",
    ],
    "/berenice_assessment": ["/cgpa"],
    "/berenice_user": ["/user_details", "/users"],
  },
  POST: {
    "/berenice_notifications": [
      "/user_notification_filters",
      "/user_notification",
    ],
    "/berenice_enrollment": ["/add_subject_student_no_prereq"],
  },
  PUT: {
    "/berenice_enrollment": [
      "/student_intake_cancelled",
      "/student_intake_onGoing",
      "/student_intake_onHold",
      "/status_subject_onGoing_declined",
      "/status_subject_dropped",
    ],
  },
  DELETE: {
    "/berenice_enrollment": [
      "/remove_subject_student",
      "/remove_subject_lecturer",
    ],
  },
}

export const includesChecker = (array, sentValue) => {
  let found = false
  if (array)
    array.map(sectionItem => {
      if (sectionItem == sentValue) found = true
    })
  return found
}
