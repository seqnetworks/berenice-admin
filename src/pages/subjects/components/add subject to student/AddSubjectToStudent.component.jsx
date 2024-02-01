import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Spinner, CustomInput, Label } from "reactstrap"
import { createStructuredSelector } from "reselect"
import { FormattedMessage, useIntl } from "react-intl"
import { Plus } from "react-feather"
import { Divider } from "@material-ui/core"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import {
  addSubjectToStudentAsync,
  clearAddSubjectToStudentErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSelectedUserUuid,
  selectAllSubjectsWithIntakes,
  selectSelectedUserSubjects,
  selectSelectedUserEnrollableSubjects,
  selectAddSubjectToStudentErrorMessage,
  selectAddSubjectToStudentIsLoading,
} from "../../../../redux/index.selectors"
import "./AddSubjectToStudent.styles.scss"

const AddSubjectToStudent = ({
  enrollableSubjects,
  allSubjects,
  studentSubjects,
  addSubjectToStudent,
  clearAddSubjectToStudentErrorMessage,
  addSubjectToStudentErrorMessage,
  addSubjectToStudentIsLoading,
  selectedUserUuid,
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState("")
  const [intake, setIntake] = useState("")
  const [allSubjectsAlert, setAllSubjectsAlert] = useState(false)
  const [subjectType, setSubjectType] = useState({
    all: false,
    enrollable: false,
  })

  const intl = useIntl()

  const includesCheck = (subjects, sentValue) => {
    let found = false
    if (subjects)
      subjects.map(subject => {
        if (
          subject.subjectCode === sentValue &&
          subject.subjectStatus !== "cancelled" &&
          subject.subjectStatus !== "dropped" &&
          subject.subjectStatus !== "failed"
        )
          found = true
      })
    return found
  }

  useEffect(() => {
    setSelectedSubjects("")
    setAllSubjectsAlert(false)
    setIntake("")
  }, [subjectType])

  useEffect(() => setIntake(""), [selectedSubjects])

  let enrollableSubjectsArray = []
  if (enrollableSubjects)
    enrollableSubjects.map(subject =>
      enrollableSubjectsArray.push({
        label:
          subject.subjectCode +
          " - " +
          subject.subjectTitle +
          " - " +
          subject.subjectArabicTitle,
        value: subject.subjectCode,
      })
    )

  let allSubjectsArray = []
  if (allSubjects)
    allSubjects.map(subject => {
      /* this condition comment because we need to show all subject for student want to repeat class for better grade */
      // if (!includesCheck(studentSubjects, subject.subjectCode))
        allSubjectsArray.push({
          label: subject.subjectCode,
          value: subject.intakes,
        })
    })

  let selectedSubjectIntakesArray = []
  if (selectedSubjects && subjectType.all)
    selectedSubjects.value?.map(intake =>
      selectedSubjectIntakesArray.push({
        label: intake.intakeCode,
        value: intake.intakeSubjectUuid,
      })
    )

  const addSubjectToStudentDialogAttributes = {
    button: {
      color: "primary",
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Plus className="mr-50" size={20} />
          <FormattedMessage id="ADD.SUBJECT" />
        </div>
      ),
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "ADDING.SUBJECT" }),
      content: (
        <div className="adding-subject">
          <div className="adding-subject-radio">
            <CustomInput
              checked={subjectType.enrollable}
              onChange={e => {
                if (e.target.checked)
                  setSubjectType({
                    all: false,
                    enrollable: true,
                  })
              }}
              type="radio"
              id="enrollable"
            />
            <FormattedMessage id="SUBJECTS.STUDENT.CAN.ENROLL.TO" />
          </div>
          <div className="adding-subject-radio">
            <CustomInput
              onChange={e => {
                if (e.target.checked)
                  setSubjectType({
                    all: true,
                    enrollable: false,
                  })
              }}
              checked={subjectType.all}
              type="radio"
              id="all"
            />
            <FormattedMessage id="ALL.SUBJECTS" />
          </div>
          <Divider variant="middle" />
          <Select
            array={
              subjectType.all
                ? [
                    {
                      label: intl.formatMessage({
                        id: "ALL.SUBJECTS",
                      }),
                      options: allSubjectsArray,
                    },
                  ]
                : [
                    {
                      label: intl.formatMessage({
                        id: "SUBJECTS.STUDENT.CAN.ENROLL.TO",
                      }),
                      options: enrollableSubjectsArray,
                    },
                  ]
            }
            value={selectedSubjects}
            isMulti={subjectType.all ? false : true}
            handleChange={e => setSelectedSubjects(e)}
            height={190}
            label={intl.formatMessage({ id: "SELECT.SUBJECT" })}
            stylesClassnames={
              subjectType.all ? "marginBottom-10" : "marginBottom-200"
            }
            disabled={!subjectType.all && !subjectType.enrollable}
            onClear={() => setSelectedSubjects("")}
          />
          {subjectType.all && (
            <>
              <Label>
                <FormattedMessage id="SUBJECT'S.INTAKE" />
              </Label>
              <Select
                value={intake}
                handleChange={e => setIntake(e)}
                disabled={!selectedSubjects}
                array={selectedSubjectIntakesArray}
                stylesClassnames="marginBottom-130"
              />
              <div className="adding-subject-checkbox">
                <CustomInput
                  onChange={e => {
                    if (e.target.checked) setAllSubjectsAlert(true)
                    else setAllSubjectsAlert(false)
                  }}
                  checked={allSubjectsAlert}
                  type="checkbox"
                  id="alert"
                />
                <FormattedMessage id="ADDING.SUBJECT.ALERT" />
              </div>
            </>
          )}
        </div>
      ),
      actions: [
        {
          title: addSubjectToStudentIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "ADD" })
          ),
          color: "primary",
          disabled:
            !selectedSubjects ||
            addSubjectToStudentIsLoading ||
            (subjectType.all && (!allSubjectsAlert || !intake)),
          clickHandler: () =>
            addSubjectToStudent(
              selectedUserUuid,
              subjectType.all ? selectedSubjects.value : selectedSubjects,
              {
                success: {
                  title: intl.formatMessage({
                    id: "ADD.SUBJECT.TO.STUDENT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "ADD.SUBJECT.TO.STUDENT.SUCCESS.CONTENT",
                  }),
                },
              },
              subjectType.all ? intake.value : false
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: addSubjectToStudentIsLoading,
        },
      ],
    },
    errorMessage: addSubjectToStudentErrorMessage,
    isLoading: addSubjectToStudentIsLoading,
    closingAction: () => {
      clearAddSubjectToStudentErrorMessage()
      setSelectedSubjects("")
      setAllSubjectsAlert(false)
      setSubjectType({
        all: false,
        enrollable: false,
      })
      setIntake("")
    },
  }

  return <Dialog {...addSubjectToStudentDialogAttributes} />
}

const mapStateToProps = createStructuredSelector({
  allSubjects: selectAllSubjectsWithIntakes,
  studentSubjects: selectSelectedUserSubjects,
  enrollableSubjects: selectSelectedUserEnrollableSubjects,
  addSubjectToStudentErrorMessage: selectAddSubjectToStudentErrorMessage,
  addSubjectToStudentIsLoading: selectAddSubjectToStudentIsLoading,
  selectedUserUuid: selectSelectedUserUuid,
})

const mapDispatchToProps = dispatch => ({
  addSubjectToStudent: (
    studentUuid,
    subjectCode,
    messages,
    intakeSubjectUuid
  ) =>
    dispatch(
      addSubjectToStudentAsync(
        studentUuid,
        subjectCode,
        messages,
        intakeSubjectUuid
      )
    ),
  clearAddSubjectToStudentErrorMessage: () =>
    dispatch(clearAddSubjectToStudentErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjectToStudent)
