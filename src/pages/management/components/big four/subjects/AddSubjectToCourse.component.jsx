import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Row, Col } from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "../../../../../custom/select/select.component"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import { addSubjectToCourseSemesterAsync } from "../../../../../redux/index.actions"
import {
  selectAllSubjects,
  selectAllCourses,
  selectAddSubjectToCourseSemesterIsLoading,
} from "../../../../../redux/index.selectors"

const AddSubjectToIntake = ({
  addSubjectToCourseSemester,
  addSubjectToCourseSemesterIsLoading,
  subjects,
  courses,
  activeTab,
  activeCard,
}) => {
  const [subjectCode, setSubjectCode] = useState("")
  const [course, setCourse] = useState("")

  const intl = useIntl()

  let subjectsArray = []
  if (subjects)
    subjects.map(subject =>
      subjectsArray.push({
        label:
          subject.subjectTitle +
          " - " +
          subject.subjectTitleArabic +
          " - " +
          subject.subjectCode,
        value: subject.subjectCode,
      })
    )

  let coursesArray = []
  if (courses)
    courses.map(course =>
      coursesArray.push({
        label: course.code + " - " + course.title,
        value: course.code,
      })
    )

  const addSubjectToCourseValidationSchema = Yup.object().shape({
    semester: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
  })

  const addSubjectToCourseFormik = useFormik({
    initialValues: {
      semester: "",
    },
    enableReinitialize: true,
    validationSchema: addSubjectToCourseValidationSchema,
    onSubmit: values =>
      addSubjectToCourseSemester(
        { ...values, subjectCode: subjectCode.value, courseCode: course.value },
        {
          success: {
            title: intl.formatMessage({
              id: "ADD.SUBJECT.TO.COURSE.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "ADD.SUBJECT.TO.COURSE.SUCCESS.CONTENT",
            }),
          },
          error: {
            title: intl.formatMessage({
              id: "ADD.SUBJECT.TO.COURSE.ERROR.TITLE",
            }),
            content: intl.formatMessage({
              id: "ADD.SUBJECT.TO.COURSE.ERROR.CONTENT",
            }),
          },
        }
      ),
  })

  const addSubjectToCourseFields = [
    {
      title: intl.formatMessage({ id: "SEMESTER" }),
      value: "semester",
    },
  ]

  const addSubjectToCourseFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "ADD.SUBJECT.TO.COURSE" }),
    buttonStatus: !subjectCode || !course,
    formik: addSubjectToCourseFormik,
    isLoading: addSubjectToCourseSemesterIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: addSubjectToCourseFields,
  }

  useEffect(() => {
    setSubjectCode("")
    setCourse("")
    addSubjectToCourseFormik.resetForm()
  }, [activeTab, activeCard])

  return (
    <>
      <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Col sm="6">
          <Select
            height={150}
            value={subjectCode}
            label={intl.formatMessage({ id: "SUBJECT.CODE" })}
            handleChange={setSubjectCode}
            array={subjectsArray}
            fixed={true}
            stylesClassnames="z-index-select"
          />
        </Col>
        <Col sm="6">
          <Select
            height={150}
            value={course}
            label={intl.formatMessage({ id: "COURSE" })}
            handleChange={setCourse}
            array={coursesArray}
            stylesClassnames="z-index-select-lower"
          />
        </Col>
      </Row>
      <FlexibleCustomForm {...addSubjectToCourseFormAttributes} />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  subjects: selectAllSubjects,
  courses: selectAllCourses,
  addSubjectToCourseSemesterIsLoading: selectAddSubjectToCourseSemesterIsLoading,
})

const mapDisptachToProps = dispatch => ({
  addSubjectToCourseSemester: (requestBody, messages) =>
    dispatch(addSubjectToCourseSemesterAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDisptachToProps)(AddSubjectToIntake)
