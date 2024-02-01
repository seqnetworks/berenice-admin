import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "../../../../../custom/select/select.component"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import { createSubjectAsync } from "../../../../../redux/index.actions"
import {
  selectAllSubjects,
  selectCreateSubjectIsLoading,
} from "../../../../../redux/index.selectors"

const CreateNewSubject = ({
  subjects,
  createSubjectIsLoading,
  createSubject,
  activeTab,
  activeCard,
}) => {
  const [selectedPrerequisites, setSelectedPrerequisites] = useState([])

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

  const createSubjectValidationSchema = Yup.object().shape({
    subjectCode: Yup.string()
      .uppercase(intl.formatMessage({ id: "LETTERS.MUST.BE.UPPER.CASED" }))
      .strict()
      .matches(
        /^[A-Za-z0-9 ]+$/,
        intl.formatMessage({
          id: "SPECIAL.CHARACTERS.AND.ARABIC.CHARACTERS.ARE.INVALID",
        })
      )
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    titleArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    type: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createSubjectFormik = useFormik({
    initialValues: {
      subjectCode: "",
      title: "",
      titleArabic: "",
      description: "",
      type: "core",
    },
    enableReinitialize: true,
    validationSchema: createSubjectValidationSchema,
    onSubmit: values => {
      let prerequisite = []
      if (selectedPrerequisites.length > 0)
        selectedPrerequisites.map(innerPrerequisite =>
          prerequisite.push(innerPrerequisite.value)
        )
      createSubject(
        { ...values, prerequisite },
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.SUBJECT.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.SUBJECT.SUCCESS.CONTENT",
            }),
          },
          error: {
            title: intl.formatMessage({
              id: "CREATE.SUBJECT.ERROR.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.SUBJECT.ERROR.CONTENT",
            }),
          },
        }
      )
    },
  })

  useEffect(() => createSubjectFormik.resetForm(), [activeTab, activeCard])

  const createSubjectFields = [
    {
      title: intl.formatMessage({ id: "SUBJECT.CODE" }),
      value: "subjectCode",
    },
    {
      title: intl.formatMessage({ id: "SUBJECT.ENGLISH.NAME" }),
      value: "title",
    },
    {
      title: intl.formatMessage({ id: "SUBJECT.ARABIC.NAME" }),
      value: "titleArabic",
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
    },
    {
      title: intl.formatMessage({ id: "TYPE" }),
      value: "type",
      type: "select",
      options: [
        { title: intl.formatMessage({ id: "CORE" }), value: "core" },
        { title: intl.formatMessage({ id: "ELECTIVE" }), value: "elective" },
      ],
    },
  ]

  const flexibleCustomFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "CREATE.SUBJECT" }),
    formik: createSubjectFormik,
    isLoading: createSubjectIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: createSubjectFields,
    additional: [
      <Select
        isMulti={true}
        height={150}
        value={selectedPrerequisites}
        label={intl.formatMessage({ id: "SUBJECT.PREREQUISITES" })}
        handleChange={setSelectedPrerequisites}
        array={subjectsArray}
      />,
    ],
  }
  return <FlexibleCustomForm {...flexibleCustomFormAttributes} />
}

const mapStateToProps = createStructuredSelector({
  subjects: selectAllSubjects,
  createSubjectIsLoading: selectCreateSubjectIsLoading,
})

const mapDisptachToProps = dispatch => ({
  createSubject: (requestBody, messages) =>
    dispatch(createSubjectAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDisptachToProps)(CreateNewSubject)
