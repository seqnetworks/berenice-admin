import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner } from "reactstrap"
import { Trash, Edit } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRTL } from "../../../../../utility/hooks/useRTL"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import {
  deleteSubjectAsync,
  editSubjectAsync,
  clearDeleteSubjectErrorMessage,
  clearEditSubjectErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectDeleteSubjectErrorMessage,
  selectDeleteSubjectIsLoading,
  selectEditSubjectErrorMessage,
  selectEditSubjectIsLoading,
} from "../../../../../redux/index.selectors"

const SubjectsTableRow = ({
  subject,
  deleteSubject,
  editSubject,
  clearDeleteSubjectErrorMessage,
  clearEditSubjectErrorMessage,
  editSubjectErrorMessage,
  editSubjectIsLoading,
  deleteSubjectErrorMessage,
  deleteSubjectIsLoading,
}) => {
  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const editSubjectValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    titleArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editSubjectFormik = useFormik({
    initialValues: {
      title: subject.subjectTitle,
      titleArabic: subject.subjectTitleArabic,
      description: subject.subjectDescription,
    },
    enableReinitialize: true,
    validationSchema: editSubjectValidationSchema,
    onSubmit: values =>
      editSubject(values, subject.subjectCode, {
        success: {
          title: intl.formatMessage({ id: "EDIT.SUBJECT.SUCCESS.TITLE" }),
          content: intl.formatMessage({
            id: "EDIT.SUBJECT.SUCCESS.CONTENT",
          }),
        },
      }),
  })

  const editSubjectFields = [
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
      type: "textarea",
    },
  ]

  const editSubjectDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.SUBJECT" }),
      content: (
        <CustomForm
          formik={editSubjectFormik}
          fields={editSubjectFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.SUBJECT" })}
          isLoading={editSubjectIsLoading}
        />
      ),
    },
    errorMessage: editSubjectErrorMessage,
    isLoading: editSubjectIsLoading,
    closingAction: () => {
      clearEditSubjectErrorMessage()
      editSubjectFormik.resetForm()
    },
  }

  const deleteSubjectDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.SUBJECT" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.SUBJECT",
      }),
      actions: [
        {
          title: deleteSubjectIsLoading ? (
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
            deleteSubject(subject.subjectCode, {
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
          disabled: deleteSubjectIsLoading,
        },
      ],
    },
    errorMessage: deleteSubjectErrorMessage,
    isLoading: deleteSubjectIsLoading,
    closingAction: () => clearDeleteSubjectErrorMessage(),
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
        <div className="d-flex align-items-center">
          {subject.subjectDescription
            ? subject.subjectDescription
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {subject.subjectType ? (
            <FormattedMessage id={subject.subjectType.toUpperCase()} />
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {subject.subjectPrerequisite
            ? subject.subjectPrerequisite.length > 0
              ? subject.subjectPrerequisite.map((prerequisite, index) =>
                  index !== 0 ? (
                    <span>,{prerequisite}</span>
                  ) : (
                    <span>{prerequisite}</span>
                  )
                )
              : renderEmpty()
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "department-PUT") && (
            <Dialog {...editSubjectDialogAttributes} />
          )}
          {ability.can("manage", "department-DELETE") && (
            <Dialog {...deleteSubjectDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteSubjectErrorMessage: selectDeleteSubjectErrorMessage,
  deleteSubjectIsLoading: selectDeleteSubjectIsLoading,
  editSubjectErrorMessage: selectEditSubjectErrorMessage,
  editSubjectIsLoading: selectEditSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteSubject: (subjectCode, messages) =>
    dispatch(deleteSubjectAsync(subjectCode, messages)),
  editSubject: (requestBody, subjectCode, messages) =>
    dispatch(editSubjectAsync(requestBody, subjectCode, messages)),
  clearDeleteSubjectErrorMessage: () =>
    dispatch(clearDeleteSubjectErrorMessage()),
  clearEditSubjectErrorMessage: () => dispatch(clearEditSubjectErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsTableRow)
