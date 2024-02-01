import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Spinner } from "reactstrap"
import { Trash, Edit } from "react-feather"
import { useIntl } from "react-intl"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import {
  editDepartmentAsync,
  deleteDepartmentAsync,
  clearDeleteDepartmentErrorMessage,
  clearEditDepartmentErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectDeleteDepartmentErrorMessage,
  selectDeleteDepartmentIsLoading,
  selectEditDepartmentErrorMessage,
  selectEditDepartmentIsLoading,
} from "../../../../../redux/index.selectors"

const DepartmentsTableRow = ({
  department,
  editDepartment,
  deleteDepartment,
  clearDeleteDepartmentErrorMessage,
  clearEditDepartmentErrorMessage,
  deleteDepartmentErrorMessage,
  deleteDepartmentIsLoading,
  editDepartmentErrorMessage,
  editDepartmentIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const editDepartmentValidationSchema = Yup.object().shape({
    name: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editDepartmentFormik = useFormik({
    initialValues: {
      name: department.name,
      description: department.description,
    },
    enableReinitialize: true,
    validationSchema: editDepartmentValidationSchema,
    onSubmit: values =>
      editDepartment(values, department.uuid, {
        success: {
          title: intl.formatMessage({ id: "EDIT.DEPARTMENT.SUCCESS.TITLE" }),
          content: intl.formatMessage({
            id: "EDIT.DEPARTMENT.SUCCESS.CONTENT",
          }),
        },
      }),
  })

  const editDepartmentFields = [
    {
      title: intl.formatMessage({ id: "NAME" }),
      value: "name",
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      type: "textarea",
    },
  ]

  const editDepartmentDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.DEPARTMENT" }),
      content: (
        <CustomForm
          formik={editDepartmentFormik}
          fields={editDepartmentFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.DEPARTMENT" })}
          isLoading={editDepartmentIsLoading}
        />
      ),
    },
    errorMessage: editDepartmentErrorMessage,
    isLoading: editDepartmentIsLoading,
    closingAction: () => {
      clearEditDepartmentErrorMessage()
      editDepartmentFormik.resetForm()
    },
  }

  const deleteDepartmentDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.DEPARTMENT" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.DEPARTMENT",
      }),
      actions: [
        {
          title: deleteDepartmentIsLoading ? (
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
            deleteDepartment(department.uuid, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.DEPARTMENT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.DEPARTMENT.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteDepartmentIsLoading,
        },
      ],
    },
    errorMessage: deleteDepartmentErrorMessage,
    isLoading: deleteDepartmentIsLoading,
    closingAction: () => clearDeleteDepartmentErrorMessage(),
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {department.name ? department.name : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {department.description ? department.description : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "department-PUT") && (
            <Dialog {...editDepartmentDialogAttributes} />
          )}
          {ability.can("manage", "department-DELETE") && (
            <Dialog {...deleteDepartmentDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteDepartmentErrorMessage: selectDeleteDepartmentErrorMessage,
  deleteDepartmentIsLoading: selectDeleteDepartmentIsLoading,
  editDepartmentErrorMessage: selectEditDepartmentErrorMessage,
  editDepartmentIsLoading: selectEditDepartmentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editDepartment: (requestBody, departmentUuid, messages) =>
    dispatch(editDepartmentAsync(requestBody, departmentUuid, messages)),
  deleteDepartment: (departmentUuid, messages) =>
    dispatch(deleteDepartmentAsync(departmentUuid, messages)),
  clearDeleteDepartmentErrorMessage: () =>
    dispatch(clearDeleteDepartmentErrorMessage()),
  clearEditDepartmentErrorMessage: () =>
    dispatch(clearEditDepartmentErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsTableRow)
