import React, { useState, useEffect } from "react"
import "lodash"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Edit, Check, X } from "react-feather"
import { Row, Col, CustomInput, Button, Spinner } from "reactstrap"
import { bannedRules } from "../../../../../../utility/custom/banned rules"
import {
  selectSelectedUserRules,
  selectUpdateUserAclIsLoading,
} from "../../../../../../redux/index.selectors"
import { updateUserAclAsync } from "../../../../../../redux/index.actions"
import CollapseCheckbox from "./CollapseCheckbox.component"

const EditPermissions = ({
  rules,
  uuid,
  updateUserAcl,
  updateUserAclIsLoading,
  setTabsDisabled,
}) => {
  const intl = useIntl()
  const nothing = () => {}

  const [selectedRules, setSelectedRules] = useState({
    auth: [],
    user: [],
    announcement: [],
    chat: [],
    notifications: [],
    finance: [],
    timetable: [],
    consultation: [],
    assets: [],
    enrollment: [],
    assessment: [],
  })
  const [initialSelectedRules, setInitialSelectedRules] = useState({
    auth: [],
    user: [],
    announcement: [],
    chat: [],
    notifications: [],
    finance: [],
    timetable: [],
    consultation: [],
    assets: [],
    enrollment: [],
    assessment: [],
  })
  const [isEditing, setIsEditing] = useState(false)

  const includesCheck = (array, sentValue, sentValueType) => {
    let found = false
    array.map(sectionItem => {
      if (sectionItem.value === sentValue && sectionItem.type === sentValueType)
        found = true
    })
    return found
  }

  const reversedUpperKeys = {
    "/berenice_auth": "auth",
    "/berenice_user": "user",
    "/berenice_announcement": "announcement",
    "/berenice_chat": "chat",
    "/berenice_notifications": "notifications",
    "/berenice_finance": "finance",
    "/berenice_timetable": "timetable",
    "/berenice_consultation": "consultation",
    "/berenice_assets": "assets",
    "/berenice_enrollment": "enrollment",
    "/berenice_assessment": "assessment",
  }

  useEffect(() => {
    Object.keys(rules).map(key =>
      rules[key].map(rule => {
        if (
          !includesCheck(
            selectedRules[reversedUpperKeys[key]],
            rule.value,
            rule.type
          )
        ) {
          setSelectedRules({
            ...selectedRules,
            [reversedUpperKeys[key]]: [
              ...selectedRules[reversedUpperKeys[key]],
              rule,
            ],
          })
          setInitialSelectedRules({
            ...initialSelectedRules,
            [reversedUpperKeys[key]]: [
              ...initialSelectedRules[reversedUpperKeys[key]],
              rule,
            ],
          })
        }
      })
    )
  }, [initialSelectedRules])
  useEffect(() => setTabsDisabled(isEditing), [isEditing])
  let status = _.isEqual(initialSelectedRules, selectedRules)

  const data = [
    {
      title: intl.formatMessage({ id: "AUTHENTICATION" }),
      url: "/berenice_auth",
      section: selectedRules.auth,
      setSection: values =>
        setSelectedRules({ ...selectedRules, auth: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SIGNUP" }),
          value: { value: "/signup", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "LOGIN" }),
          value: { value: "/login", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "CHANGE.PASSWORD" }),
          value: { value: "/change_password", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "UPDATE.ACL" }),
          value: { value: "/acl", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "CHANGE.STATUS" }),
          value: { value: "/change_status", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "RESET.PASSWORD" }),
          value: { value: "/reset_password", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.USER" }),
          value: { value: "/user", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "THE.USER" }),
      url: "/berenice_user",
      section: selectedRules.user,
      setSection: values =>
        setSelectedRules({ ...selectedRules, user: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SEE.GUARDIAN'S.CHILDREN" }),
          value: { value: "/guardian_sutdents", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.STUDENT'S.GUARDIANS" }),
          value: { value: "/student_guardians", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.LECTURERS" }),
          value: { value: "/lecturers", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.GUARDIANS" }),
          value: { value: "/guardians", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.STAFF" }),
          value: { value: "/all_staff", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.STUDENTS" }),
          value: { value: "/students", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "SEE.STUDENT'S.PROFILE",
          }),
          value: { value: "/student", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "SEE.GUARDIAN'S.PROFILE",
          }),
          value: { value: "/guardian", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "SEE.LECTURER'S.PROFILE",
          }),
          value: { value: "/lecturer", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.STAFF'S.PROFILE" }),
          value: { value: "/staff", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STAFF'S.TYPE" }),
          value: { value: "/staff", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.GUARDIAN'S.TYPE" }),
          value: { value: "/guardian", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.LECTURER'S.POSITION" }),
          value: { value: "/lecturer", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "ADD.GUARDIAN.TO.STUDENT" }),
          value: { value: "/add_guardian_to_student", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "REMOVE.GUARDIAN.FROM.STUDENT" }),
          value: { value: "/delete_guardian_of_student", type: "DELETE" },
        },

        {
          title: intl.formatMessage({ id: "EDIT.USER.GENERAL.INFORMATION" }),
          value: { value: "/user", type: "PUT" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "ANNOUNCEMENTS.AND.FOLLOW.UPS" }),
      url: "/berenice_announcement",
      section: selectedRules.announcement,
      setSection: values =>
        setSelectedRules({ ...selectedRules, announcement: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SEE.FOLLOW.UPS.SENT.TO.STUDENT" }),
          value: {
            value: "/follow_ups_user_sender_single_student",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({ id: "SEE.FOLLOW.UPS.SENT.BY.USER" }),
          value: { value: "/follow_ups_user", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.FOLLOW.UPS" }),
          value: { value: "/follow_ups", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ANNOUNCEMENTS.SENT.BY.USER" }),
          value: { value: "/announcements_user_sender", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.ANNOUNCEMENTS" }),
          value: { value: "/announcements", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SENDING.FOLLOW.UP" }),
          value: { value: "/follow_up", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "EDITING.FOLLOW.UP" }),
          value: { value: "/follow_up", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.FOLLOW.UP" }),
          value: { value: "/follow_up", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "SENDING.ANNOUNCEMENT" }),
          value: { value: "/announcement", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "EDITING.ANNOUNCEMENT" }),
          value: { value: "/announcement", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.ANNOUNCEMENT" }),
          value: { value: "/announcement", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "THE.TIMETABLE" }),
      url: "/berenice_timetable",
      section: selectedRules.timetable,
      setSection: values =>
        setSelectedRules({ ...selectedRules, timetable: values }),
      options: [
        {
          title: intl.formatMessage({
            id: "SEE.STUDENTS.ATTENDANCES.IN.ATTENDANCE.SHEET",
          }),
          value: { value: "/students_attendance_date", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "SEE.ALL.ATTENDANCE.SHEETS.IN.CLASS",
          }),
          value: {
            value: "/lecturer_attendance_sheets_single_subject",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.CLASSES" }),
          value: { value: "/classes", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "MARK.STUDENTS.ATTENDANCES.IN.ATTENDANCE.SHEET",
          }),
          value: { value: "/mark_attendance", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.CLASS" }),
          value: { value: "/class", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "CREATE.CLASS" }),
          value: { value: "/class", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.CLASS" }),
          value: { value: "/class", type: "DELETE" },
        },
        {
          title: intl.formatMessage({
            id: "CREATE.ATTENDANCE.SHEET.FOR.EXTRA.CLASS",
          }),
          value: { value: "/extra_class", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.ATTENDANCE.SHEET" }),
          value: { value: "/attendance_sheet", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.ATTENDANCE.SHEET" }),
          value: { value: "/attendance_sheet", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "ASSESSMENTS" }),
      url: "/berenice_assessment",
      section: selectedRules.assessment,
      setSection: values =>
        setSelectedRules({ ...selectedRules, assessment: values }),
      options: [
        {
          title: intl.formatMessage({
            id: "SEE.ALL.ASSESSMENTS.IN.CLASS",
          }),
          value: { value: "/assessments", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "SEE.STUDENTS.MARKS.IN.ASSESSMENT",
          }),
          value: {
            value: "/assessment_results",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STUDENT.CGPA" }),
          value: { value: "/cgpa", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STUDENT.GPA" }),
          value: { value: "/gpa", type: "PUT" },
        },
        {
          title: intl.formatMessage({
            id: "EDIT.ASSESSMENT'S.VISIBILITY",
          }),
          value: { value: "/assessment_results_status", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STUDENTS.MARKS" }),
          value: { value: "/mark_results", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "CREATE.ASSESSMENT" }),
          value: { value: "/assessment", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.ASSESSMENT" }),
          value: { value: "/assessment", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "ASSETS" }),
      url: "/berenice_assets",
      section: selectedRules.assets,
      setSection: values =>
        setSelectedRules({ ...selectedRules, assets: values }),
      options: [
        {
          title: intl.formatMessage({ id: "GET.COURSE.MATERIALS" }),
          value: { value: "/courseMaterialFolders", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.COURSE.MATERIAL" }),
          value: { value: "/courseMaterial", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.COURSE.MATERIAL" }),
          value: { value: "/courseMaterial", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "SEE.HOME.ASSETS" }),
          value: {
            value: "/home_asset",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({ id: "CREATE.HOME.ASSET" }),
          value: {
            value: "/home_asset",
            type: "POST",
          },
        },
        {
          title: intl.formatMessage({ id: "DELETE.HOME.ASSET" }),
          value: {
            value: "/home_asset",
            type: "DELETE",
          },
        },
        {
          title: intl.formatMessage({ id: "SEE.EFORMS" }),
          value: { value: "/eForms", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "CREATE.EFORM" }),
          value: { value: "/eForm", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.EFORM" }),
          value: { value: "/eForm", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "ADD.IMAGE.TO.NEWS.CAROUSEL" }),
          value: { value: "/file", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.IMAGE.FROM.NEWS.CAROUSEL" }),
          value: { value: "/file", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "CHAT" }),
      url: "/berenice_chat",
      section: selectedRules.chat,
      setSection: values =>
        setSelectedRules({ ...selectedRules, chat: values }),
      options: [
        {
          title: intl.formatMessage({ id: "DELETING.CHAT" }),
          value: { value: "/chat_room", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "SEE.CHAT.MESSAGES" }),
          value: { value: "/messages", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.USER'S.CHATS" }),
          value: {
            value: "/chat_rooms_single_user_admin",
            type: "GET",
          },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "CONSULTATION" }),
      url: "/berenice_consultation",
      section: selectedRules.consultation,
      setSection: values =>
        setSelectedRules({ ...selectedRules, consultation: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SEE.STUDENT'S.CONSULTATIONS" }),
          value: {
            value: "/consultations_single_student_uuid",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({ id: "SEE.LECTURER'S.CONSULTATIONS" }),
          value: { value: "/consultations_single_lecturer_uuid", type: "GET" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "ENROLLMENT" }),
      url: "/berenice_enrollment",
      section: selectedRules.enrollment,
      setSection: values =>
        setSelectedRules({ ...selectedRules, enrollment: values }),
      options: [
        {
          title: intl.formatMessage({
            id: "SEE.LECTURER'S.SUBJECT.INFORMATION",
          }),
          value: { value: "/get_single_subject_of_lecturer", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.STUDENTS.IN.CLASS" }),
          value: {
            value: "/get_all_students_of_lecturer_subject",
            type: "GET",
          },
        },
        {
          title: intl.formatMessage({
            id: "SEE.SUBJECT.LECTURER.INTAKE.TABLE",
          }),
          value: { value: "/get_all_subjects_of_lecturers", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.STUDENT'S.INTAKES" }),
          value: { value: "/student_intakes", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.INTAKES" }),
          value: { value: "/intakes", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.COURSES" }),
          value: { value: "/courses", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.DEPARTMENTS" }),
          value: { value: "/departments", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.STUDENT'S.SUBJECTS" }),
          value: { value: "/get_all_subjects_of_student", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.INTAKES.IN.COURSE" }),
          value: { value: "/intakes_course", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.SUBJECTS.IN.COURSE" }),
          value: { value: "/subjects_in_course", type: "GET" },
        },
        {
          title: intl.formatMessage({
            id: "CHANGING.INTAKE.ENROLLMENT.STATUS",
          }),
          value: { value: "/enrollment_status", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "SEE.SUBJECTS.IN.INTAKE" }),
          value: { value: "/subjects_in_intake", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.LECTURER'S.SUBJECTS" }),
          value: { value: "/get_all_subjects_of_lecturer", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "SEE.ALL.SUBJECTS" }),
          value: { value: "/subjects", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "REMOVE.LECTURER.ASSISSTANT" }),
          value: { value: "/remove_lecturer_assistant", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "ADD.LECTURER.ASSISSTANT" }),
          value: { value: "/add_lecturer_assistant", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.SUBJECT'S.STATUS" }),
          value: { value: "/edit_lecturer_subject_status", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STUDENT'S.INTAKE.STATUS" }),
          value: { value: "/student_intake_pass_fail", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.COURSE" }),
          value: { value: "/course", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.DEPARTMENT" }),
          value: { value: "/department", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDITING.SUBJECT" }),
          value: { value: "/subject", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDITING.INTAKE" }),
          value: { value: "/intake", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "EDITING.SUBJECT.IN.INTAKE" }),
          value: { value: "/update_subject_intake", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "REMOVING.SUBJECT.FROM.INTAKE" }),
          value: { value: "/remove_subject_intake", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "REMOVING.SUBJECT.FROM.COURSE" }),
          value: { value: "/remove_subject_course", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.STUDENT'S.SUBJECT.STATUS" }),
          value: { value: "/status_subject_passed_failed", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "CHANGE.STUDENT'S.INTAKE" }),
          value: { value: "/student_intake_add", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "ADD.SUBJECT.TO.STUDENT" }),
          value: { value: "/add_subject_student", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.SUBJECT" }),
          value: { value: "/subject", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "ADD.SUBJECT.TO.COURSE" }),
          value: { value: "/add_subject_course", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "ADD.SUBJECT.TO.INTAKE" }),
          value: { value: "/add_subject_intake", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.SUBJECT" }),
          value: { value: "/subject", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.DEPARTMENT" }),
          value: { value: "/department", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.DEPARTMENT" }),
          value: { value: "/department", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.COURSE" }),
          value: { value: "/course", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.COURSE" }),
          value: { value: "/course", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETING.INTAKE" }),
          value: { value: "/intake", type: "DELETE" },
        },
        {
          title: intl.formatMessage({ id: "CREATING.INTAKE" }),
          value: { value: "/intake", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "REMOVE.SUBJECT.FROM.INTAKE" }),
          value: { value: "/remove_subject_Intake", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "FINANCE" }),
      url: "/berenice_finance",
      section: selectedRules.finance,
      setSection: values =>
        setSelectedRules({ ...selectedRules, finance: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SEE.STUDENT'S.PAYMENTS" }),
          value: { value: "/payment", type: "GET" },
        },
        {
          title: intl.formatMessage({ id: "EDIT.PAYMENT" }),
          value: { value: "/payment", type: "PUT" },
        },
        {
          title: intl.formatMessage({ id: "CREATE.PAYMENT" }),
          value: { value: "/payment", type: "POST" },
        },
        {
          title: intl.formatMessage({ id: "DELETE.PAYMENT" }),
          value: { value: "/payment", type: "DELETE" },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: "NOTIFICATIONS" }),
      url: "/berenice_notifications",
      section: selectedRules.notifications,
      setSection: values =>
        setSelectedRules({ ...selectedRules, notifications: values }),
      options: [
        {
          title: intl.formatMessage({ id: "SEND.NOTIFICATION" }),
          value: { value: "/notification", type: "POST" },
        },
      ],
    },
  ]
  return (
    <>
      {data.map((section, index) => (
        <Row className="mb-2">
          <Col
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            xs={12}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomInput
                type="checkbox"
                id={section.title}
                disabled={!isEditing || updateUserAclIsLoading}
                checked={section.options.length === section.section.length}
                value={section.value}
                onClick={e => {
                  if (e.target.checked) {
                    let allOptions = []
                    section.options.map(option => allOptions.push(option.value))
                    section.setSection(allOptions)
                  } else section.setSection([])
                }}
              />
              <h4 className="mb-0">{section.title}</h4>
            </div>
            {index === 0 ? (
              isEditing ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                  }}
                >
                  <Button
                    className="mr-75 p-50 input-custom-animation-2"
                    color="success"
                    disabled={updateUserAclIsLoading || status}
                    onClick={async () => {
                      const requestBody = {
                        userUuid: uuid,
                        rules: { ...bannedRules },
                      }
                      const upperKeys = {
                        auth: "/berenice_auth",
                        user: "/berenice_user",
                        announcement: "/berenice_announcement",
                        chat: "/berenice_chat",
                        notifications: "/berenice_notifications",
                        finance: "/berenice_finance",
                        timetable: "/berenice_timetable",
                        consultation: "/berenice_consultation",
                        assets: "/berenice_assets",
                        enrollment: "/berenice_enrollment",
                        assessment: "/berenice_assessment",
                      }
                      Object.keys(selectedRules).map(upperKey => {
                        selectedRules[upperKey].map(
                          rule =>
                            (requestBody.rules[rule.type] = {
                              ...requestBody.rules[rule.type],
                              [upperKeys[upperKey]]: requestBody.rules[
                                rule.type
                              ][upperKeys[upperKey]]
                                ? [
                                    ...requestBody.rules[rule.type][
                                      upperKeys[upperKey]
                                    ],
                                    rule.value,
                                  ]
                                : [rule.value],
                            })
                        )
                      })
                      await updateUserAcl(requestBody, {
                        success: {
                          title: intl.formatMessage({
                            id: "UPDATE.USER.ACL.SUCCESS.TITLE",
                          }),
                          content: intl.formatMessage({
                            id: "UPDATE.USER.ACL.SUCCESS.CONTENT",
                          }),
                        },
                        error: {
                          title: intl.formatMessage({
                            id: "UPDATE.USER.ACL.ERROR.TITLE",
                          }),
                          content: intl.formatMessage({
                            id: "UPDATE.USER.ACL.ERROR.CONTENT",
                          }),
                        },
                      })
                    }}
                  >
                    {updateUserAclIsLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        aria-hidden="true"
                      />
                    ) : (
                      <Check size={18} />
                    )}
                  </Button>
                  <Button
                    className="p-50 input-custom-animation-2"
                    disabled={updateUserAclIsLoading}
                    onClick={() => {
                      setIsEditing(false)
                      setSelectedRules(initialSelectedRules)
                    }}
                    color="danger"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ) : (
                <Button
                  className="p-50 input-custom-animation-2"
                  onClick={() => setIsEditing(true)}
                  color="primary"
                >
                  <Edit size={18} />
                </Button>
              )
            ) : (
              <div />
            )}
            {document.getElementById(section.title)
              ? section.section.length !== 0 &&
                section.section.length !== section.options.length
                ? (document.getElementById(section.title).indeterminate = true)
                : (document.getElementById(section.title).indeterminate = false)
              : nothing()}
          </Col>
          {section.options.map(option => (
            <Col className="collapse-margin" xs={12} md={6} lg={4}>
              <CollapseCheckbox
                {...option}
                disabled={!isEditing || updateUserAclIsLoading}
                section={section.section}
                setSection={section.setSection}
              />
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  rules: selectSelectedUserRules,
  updateUserAclIsLoading: selectUpdateUserAclIsLoading,
})

const mapDispatchToProps = dispatch => ({
  updateUserAcl: (requestBody, messages) =>
    dispatch(updateUserAclAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPermissions)
