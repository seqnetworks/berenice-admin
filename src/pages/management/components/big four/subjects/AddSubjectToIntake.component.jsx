import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import * as Yup from "yup"
import { useFormik } from "formik"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import Select from "../../../../../custom/select/select.component"
import { useRTL } from "../../../../../utility/hooks/useRTL"
import { addSubjectToIntakeAsync } from "../../../../../redux/index.actions"
import {
  selectAllSubjects,
  selectLecturers,
  selectAllIntakes,
  selectAddSubjectToIntakeIsLoading,
} from "../../../../../redux/index.selectors"

const AddSubjectToIntake = ({
  addSubjectToIntake,
  addSubjectToIntakeIsLoading,
  subjects,
  lecturers,
  intakes,
  activeTab,
  activeCard,
}) => {
  const [subjectCode, setSubjectCode] = useState("")
  const [intake, setIntake] = useState("")
  const [lecturer, setLecturer] = useState("")
  const [assisstantLecturers, setAssisstantLecturers] = useState([])

  const intl = useIntl()
  const [rtl] = useRTL()

  useEffect(() => setAssisstantLecturers(""), [lecturer])

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
        value: {
          code: subject.subjectCode,
          courses: subject.courseCode,
        },
      })
    )

  let lecturersArray = []
  if (lecturers)
    lecturers.map(lecturer =>
      lecturersArray.push({
        label: rtl ? lecturer.fullNameArabic : lecturer.fullName,
        value: lecturer.uuid,
      })
    )

  let assisstantLecturersArray = []
  if (lecturers && lecturer)
    lecturersArray.map(innerLecturer => {
      if (innerLecturer.value !== lecturer.value)
        assisstantLecturersArray.push(innerLecturer)
    })

  let intakesArray = []
  if (intakes)
    intakes.map(intake => {
      if (subjectCode)
        subjectCode.value.courses.map(subject => {
          if (
            subject.courseCode === intake.courseCode &&
            subject.semester === intake.semester
          )
            intakesArray.push({
              label: intake.code,
              value: intake.code,
            })
        })
    })

  const addSubjectToIntakeValidationSchema = Yup.object().shape({
    creditsAndHours: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
    price: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
  })

  const addSubjectToIntakeFormik = useFormik({
    initialValues: {
      creditsAndHours: "",
      price: "",
    },
    enableReinitialize: true,
    validationSchema: addSubjectToIntakeValidationSchema,
    onSubmit: async values => {
      let lecturerAssistantArray = []
      if (assisstantLecturers)
        assisstantLecturers.map(lecturer =>
          lecturerAssistantArray.push(lecturer.value)
        )
      await addSubjectToIntake(
        {
          credits: values.creditsAndHours,
          hours: values.creditsAndHours,
          price: values.price,
          subjectCode: subjectCode.value.code,
          lecturerUuid: lecturer.value,
          intakeCode: intake.value,
          lecturerAssistant: lecturerAssistantArray,
        },
        {
          success: {
            title: intl.formatMessage({
              id: "ADD.SUBJECT.TO.INTAKE.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "ADD.SUBJECT.TO.INTAKE.SUCCESS.CONTENT",
            }),
          },
          error: {
            title: intl.formatMessage({
              id: "ADD.SUBJECT.TO.INTAKE.ERROR.TITLE",
            }),
            content: intl.formatMessage({
              id: "ADD.SUBJECT.TO.INTAKE.ERROR.CONTENT",
            }),
          },
        }
      )
    },
  })

  const addSubjectToCourseFields = [
    {
      title: intl.formatMessage({ id: "CREDITS.AND.HOURS" }),
      value: "creditsAndHours",
    },
    {
      title: intl.formatMessage({ id: "PRICE" }),
      value: "price",
    },
  ]

  const addSubjectToIntakeFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "ADD.SUBJECT.TO.INTAKE" }),
    buttonStatus: !intake || !lecturer || !subjectCode,
    formik: addSubjectToIntakeFormik,
    isLoading: addSubjectToIntakeIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: addSubjectToCourseFields,
    preAdditional: [
      <Select
        height={150}
        value={subjectCode}
        label={intl.formatMessage({ id: "SUBJECT.CODE" })}
        handleChange={e => {
          setSubjectCode(e)
          setIntake("")
        }}
        array={subjectsArray}
        stylesClassnames="z-index-select"
      />,
      <Select
        height={150}
        value={intake}
        label={intl.formatMessage({ id: "INTAKE.CODE" })}
        handleChange={setIntake}
        array={intakesArray}
        disabled={!subjectCode}
        stylesClassnames="z-index-select-800"
      />,
      <Select
        height={150}
        value={lecturer}
        label={intl.formatMessage({ id: "LECTURER" })}
        handleChange={setLecturer}
        array={lecturersArray}
        stylesClassnames="z-index-select-700"
      />,
      <Select
        height={150}
        value={assisstantLecturers}
        label={intl.formatMessage({ id: "ASSISSTANT.LECTURERS" })}
        handleChange={setAssisstantLecturers}
        array={assisstantLecturersArray}
        disabled={!lecturer}
        stylesClassnames="z-index-select-600"
        isMulti={true}
      />,
    ],
  }

  useEffect(() => {
    setLecturer("")
    setIntake("")
    setSubjectCode("")
    setAssisstantLecturers("")
    addSubjectToIntakeFormik.resetForm()
  }, [activeTab, activeCard])

  return <FlexibleCustomForm {...addSubjectToIntakeFormAttributes} />
}

const mapStateToProps = createStructuredSelector({
  subjects: selectAllSubjects,
  lecturers: selectLecturers,
  intakes: selectAllIntakes,
  addSubjectToIntakeIsLoading: selectAddSubjectToIntakeIsLoading,
})

const mapDisptachToProps = dispatch => ({
  addSubjectToIntake: (requestBody, messages) =>
    dispatch(addSubjectToIntakeAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDisptachToProps)(AddSubjectToIntake)
