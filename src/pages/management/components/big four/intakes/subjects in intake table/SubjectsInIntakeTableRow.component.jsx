import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { Spinner } from "reactstrap"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Edit, Trash } from "react-feather"
import { useRTL } from "../../../../../../utility/hooks/useRTL"
import { AbilityContext } from "../../../../../../utility/context/Can"
import Dialog from "../../../../../../custom/dialog/dialog.component"
import Select from "../../../../../../custom/select/select.component"
import CustomForm from "../../../../../../custom/customform/customform.component"
import {
  editIntakeSubjectAsync,
  clearEditIntakeSubjectErrorMessage,
  deleteIntakeSubjectAsync,
  clearDeleteIntakeSubjectErrorMessage,
} from "../../../../../../redux/index.actions"
import {
  selectLecturers,
  selectEditIntakeSubjectErrorMessage,
  selectEditIntakeSubjectIsLoading,
  selectDeleteIntakeSubjectErrorMessage,
  selectDeleteIntakeSubjectIsLoading,
} from "../../../../../../redux/index.selectors"

const SubjectsInIntakeTableRow = ({
  subject,
  lecturers,
  intakeCode,
  editIntakeSubject,
  clearEditIntakeSubjectErrorMessage,
  deleteIntakeSubject,
  clearDeleteIntakeSubjectErrorMessage,
  editIntakeSubjectErrorMessage,
  editIntakeSubjectIsLoading,
  deleteIntakeSubjectErrorMessage,
  deleteIntakeSubjectIsLoading,
}) => {
  const [lecturer, setLecturer] = useState("")

  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  let lecturersArray = []
  if (lecturers)
    lecturers.map(lecturer =>
      lecturersArray.push({
        value: lecturer.uuid,
        label: rtl ? lecturer.fullNameArabic : lecturer.fullName,
      })
    )

  useEffect(
    () =>
      setLecturer({
        value: subject.lecturerUuid,
        label: rtl ? subject.lecturerFullNameArabic : subject.lecturerFullName,
      }),
    []
  )

  const deleteIntakeSubjectDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "REMOVING.SUBJECT.FROM.INTAKE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.REMOVE.THIS.SUBJECT.FROM.THE.INTAKE",
      }),
      actions: [
        {
          title: deleteIntakeSubjectIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "DELETE" })
          ),
          color: "primary",
          clickHandler: () =>
            deleteIntakeSubject(subject.uuid, intakeCode, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.SUBJECT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.SUBJECT.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteIntakeSubjectIsLoading,
        },
      ],
    },
    errorMessage: deleteIntakeSubjectErrorMessage,
    isLoading: deleteIntakeSubjectIsLoading,
    closingAction: () => clearDeleteIntakeSubjectErrorMessage(),
  }

  const editIntakeSubjectValidationSchema = Yup.object().shape({
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

  const editIntakeSubjectFormik = useFormik({
    initialValues: {
      creditsAndHours: subject.subjectCredits,
      price: subject.subjectPrice,
    },
    enableReinitialize: true,
    validationSchema: editIntakeSubjectValidationSchema,
    onSubmit: values =>
      editIntakeSubject(
        {
          hours: parseInt(values.creditsAndHours),
          credits: parseInt(values.creditsAndHours),
          price: parseInt(values.price),
          lecturerSubjectUuid: subject.lecturerSubjectUuid,
          lecturerUuid: lecturer.value,
        },
        subject.uuid,
        intakeCode,
        {
          success: {
            title: intl.formatMessage({
              id: "EDIT.INTAKE.SUBJECT.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "EDIT.INTAKE.SUBJECT.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const editIntakeSubjectFields = [
    {
      title: intl.formatMessage({ id: "CREDITS.AND.HOURS" }),
      value: "creditsAndHours",
    },
    {
      title: intl.formatMessage({ id: "PRICE" }),
      value: "price",
    },
  ]

  const editIntakeSubjectDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.SUBJECT" }),
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Select
            handleChange={e => setLecturer(e)}
            height={200}
            label={intl.formatMessage({ id: "LECTURER" })}
            value={lecturer}
            fixed={true}
            stylesClassnames="mb-50"
            array={[
              {
                label: intl.formatMessage({ id: "LECTURERS" }),
                options: lecturersArray,
              },
            ]}
          />
          <CustomForm
            formik={editIntakeSubjectFormik}
            fields={editIntakeSubjectFields}
            buttonTitle={intl.formatMessage({ id: "EDIT.SUBJECT" })}
            isLoading={editIntakeSubjectIsLoading}
            fullControl={true}
          />
        </div>
      ),
    },
    errorMessage: editIntakeSubjectErrorMessage,
    isLoading: editIntakeSubjectIsLoading,
    closingAction: () => {
      clearEditIntakeSubjectErrorMessage()
      setLecturer({
        value: subject.lecturerUuid,
        label: rtl ? subject.lecturerFullNameArabic : subject.lecturerFullName,
      })
      editIntakeSubjectFormik.resetForm()
    },
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectCode ? subject.subjectCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {rtl
            ? subject.subjectTitleArabic
              ? subject.subjectTitleArabic
              : renderEmpty()
            : subject.subjectTitle
            ? subject.subjectTitle
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {rtl
            ? subject.lecturerFullNameArabic
              ? subject.lecturerFullNameArabic
              : renderEmpty()
            : subject.lecturerFullName
            ? subject.lecturerFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectHours ? subject.subjectHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectCredits ? subject.subjectCredits : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectPrice ? subject.subjectPrice : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {ability.can("manage", "update_subject_intake-PUT") && (
            <Dialog {...editIntakeSubjectDialogAttributes} />
          )}
          {ability.can("manage", "remove_subject_intake-DELETE") && (
            <Dialog {...deleteIntakeSubjectDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  lecturers: selectLecturers,
  editIntakeSubjectErrorMessage: selectEditIntakeSubjectErrorMessage,
  editIntakeSubjectIsLoading: selectEditIntakeSubjectIsLoading,
  deleteIntakeSubjectErrorMessage: selectDeleteIntakeSubjectErrorMessage,
  deleteIntakeSubjectIsLoading: selectDeleteIntakeSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editIntakeSubject: (requestBody, intakeSubjectCode, intakeCode, messages) =>
    dispatch(
      editIntakeSubjectAsync(
        requestBody,
        intakeSubjectCode,
        intakeCode,
        messages
      )
    ),
  deleteIntakeSubject: (intakeSubjectCode, intakeCode, messages) =>
    dispatch(deleteIntakeSubjectAsync(intakeSubjectCode, intakeCode, messages)),
  clearEditIntakeSubjectErrorMessage: () =>
    dispatch(clearEditIntakeSubjectErrorMessage()),
  clearDeleteIntakeSubjectErrorMessage: () =>
    dispatch(clearDeleteIntakeSubjectErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsInIntakeTableRow)
