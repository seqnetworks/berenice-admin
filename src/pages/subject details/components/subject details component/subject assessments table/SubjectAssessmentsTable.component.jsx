import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  RefreshCw,
  Calendar,
  Edit,
  Plus,
  AlignCenter,
  Award,
  Check,
} from "react-feather"
import {
  Button,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl, FormattedMessage } from "react-intl"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import SubjectAssessmentsTableRow from "./SubjectAssessmentsTableRow.component"
import Table from "../../../../../custom/table/table.component"
import {
  getAllAssessmentsOfSubjectForLecturerAsync,
  createAssessmentAsync,
  clearCreateAssessmentErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedSubject,
  selectSelectedClassAssessments,
  selectSelectedClassAssessmentsClassUuid,
  selectCreateAssessmentErrorMessage,
  selectCreateAssessmentIsLoading,
} from "../../../../../redux/index.selectors"
import { dateFiltering } from "../../../../../utility/custom/dateFiltering"

const SubjectAssessmentsTable = ({
  subject,
  getAllAssessmentsOfSubjectForLecturer,
  createAssessment,
  clearCreateAssessmentErrorMessage,
  assessments,
  selectedClassAssessmentsClassUuid,
  createAssessmentErrorMessage,
  createAssessmentIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRange, setSelectedRange] = useState("")
  const [selectedAssessmentType, setSelectedAssessmentType] = useState("")
  const [type, setType] = useState("")
  const [otherType, setOtherType] = useState("")

  const intl = useIntl()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const createAssessmentValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    type: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    overallMark: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
    date: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createAssessmentFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      overallMark: "",
      date: "",
    },
    enableReinitialize: true,
    validationSchema: createAssessmentValidationSchema,
    onSubmit: values => {
      let info = {
        subjectCode: subject.subjectCode,
        intakeCode: subject.intakeCode,
        title: values.title,
        description: values.description,
        type: type === "other" ? otherType : values.type,
        overallMark: values.overallMark,
        date: values.date,
      }
      createAssessment(
        {
          ...values,
          lecturerSubjectUuid: subject.lecturerSubjectUuid,
          type: type === "other" ? otherType : values.type,
        },
        info,
        history
      )
    },
  })

  const createAssessmentFields = [
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "title",
      icon: <Edit size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      icon: <AlignCenter size={17} />,
    },
    {
      title: intl.formatMessage({ id: "OVERALL.MARK" }),
      value: "overallMark",
      icon: <Check size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DATE" }),
      value: "date",
      icon: <Calendar size={17} />,
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "ASSESSMENT.TYPE" }),
      value: "type",
      icon: <Award size={17} />,
      type: "select",
      setState: setType,
      options: [
        { title: "", value: "" },
        { title: intl.formatMessage({ id: "EXAM" }), value: "exam" },
        { title: intl.formatMessage({ id: "QUIZ" }), value: "quiz" },
        {
          title: intl.formatMessage({ id: "ASSIGNMENT" }),
          value: "assignment",
        },
        { title: intl.formatMessage({ id: "HOMEWORK" }), value: "homework" },
        { title: intl.formatMessage({ id: "OTHER" }), value: "other" },
      ],
    },
  ]

  const createAssessmentDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.ASSESSMENT" }),
      content: (
        <>
          <CustomForm
            formik={createAssessmentFormik}
            fields={createAssessmentFields}
            buttonTitle={intl.formatMessage({ id: "CREATE.ASSESSMENT" })}
            isLoading={createAssessmentIsLoading}
            buttonStatus={type === "other" && !otherType}
            additional={
              type === "other" ? (
                <FormGroup style={{ marginBottom: "5px" }}>
                  <Label>
                    <FormattedMessage id="ENTER.ASSESSMENT.TYPE" />
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Award size={17} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={otherType}
                      onChange={e => setOtherType(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
              ) : (
                <></>
              )
            }
          />
        </>
      ),
    },
    errorMessage: createAssessmentErrorMessage,
    isLoading: createAssessmentIsLoading,
    closingAction: () => {
      createAssessmentFormik.resetForm()
      clearCreateAssessmentErrorMessage()
    },
  }

  let assessmentsArray = []
  if (assessments)
    assessmentsArray = assessments.filter(assessment =>
      selectedAssessmentType
        ? assessment.type === selectedAssessmentType.value
        : true &&
          (dateFiltering(selectedRange, assessment.date) || !selectedRange)
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() =>
          getAllAssessmentsOfSubjectForLecturer(
            selectedClassAssessmentsClassUuid
          )
        }
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    date: {
      value: selectedRange,
      placeHolder: intl.formatMessage({ id: "SELECT.DATE.RANGE" }),
      onChange: e => setSelectedRange(e),
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    select: [
      {
        placeHolder: intl.formatMessage({ id: "SELECT.SUBJECT.STATUS" }),
        handleChange: e => setSelectedAssessmentType(e),
        array: [
          {
            label: intl.formatMessage({ id: "TYPES" }),
            options: [
              { title: intl.formatMessage({ id: "EXAM" }), label: "exam" },
              { title: intl.formatMessage({ id: "QUIZ" }), label: "quiz" },
              {
                title: intl.formatMessage({ id: "ASSIGNMENT" }),
                label: "assignment",
              },
              {
                title: intl.formatMessage({ id: "HOMEWORK" }),
                label: "homework",
              },
            ],
          },
        ],
      },
    ],
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "ASSESSMENT.TYPE" }),
        },
        {
          title: intl.formatMessage({ id: "OVERALL.MARK" }),
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
        },
        { title: "" },
      ],
      row: assessment => <SubjectAssessmentsTableRow assessment={assessment} />,
    },
    givenArray: assessmentsArray,
    title: intl.formatMessage({ id: "ASSESSMENTS.FOR.THIS.SUBJECT" }),
    emptyMessage: intl.formatMessage({ id: "NO.ASSESSMENTS.YET" }),
  }

  if (ability.can("manage", "assessment-POST"))
    tableAttributes.buttons = [
      <Dialog {...createAssessmentDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  subject: selectSelectedSubject,
  assessments: selectSelectedClassAssessments,
  selectedClassAssessmentsClassUuid: selectSelectedClassAssessmentsClassUuid,
  createAssessmentErrorMessage: selectCreateAssessmentErrorMessage,
  createAssessmentIsLoading: selectCreateAssessmentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllAssessmentsOfSubjectForLecturer: classUuid =>
    dispatch(getAllAssessmentsOfSubjectForLecturerAsync(classUuid)),
  createAssessment: (requestBody, info, history) =>
    dispatch(createAssessmentAsync(requestBody, info, history)),
  clearCreateAssessmentErrorMessage: () =>
    dispatch(clearCreateAssessmentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectAssessmentsTable)
