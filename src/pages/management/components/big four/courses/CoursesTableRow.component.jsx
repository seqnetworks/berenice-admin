import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Spinner } from "reactstrap"
import { Trash, Edit, Clipboard } from "react-feather"
import { useIntl } from "react-intl"
import IntakesAndSubjectsInCourse from "./IntakesAndSubjectsInCourse.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import {
  editCourseAsync,
  deleteCourseAsync,
  clearDeleteCourseErrorMessage,
  clearEditCourseErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectDeleteCourseErrorMessage,
  selectDeleteCourseIsLoading,
  selectEditCourseErrorMessage,
  selectEditCourseIsLoading,
} from "../../../../../redux/index.selectors"

const CoursesTableRow = ({
  course,
  editCourse,
  deleteCourse,
  clearDeleteCourseErrorMessage,
  clearEditCourseErrorMessage,
  deleteCourseErrorMessage,
  deleteCourseIsLoading,
  editCourseErrorMessage,
  editCourseIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const editCourseValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editCourseFormik = useFormik({
    initialValues: {
      title: course.title,
      description: course.description,
    },
    enableReinitialize: true,
    validationSchema: editCourseValidationSchema,
    onSubmit: values =>
      editCourse(values, course.code, {
        success: {
          title: intl.formatMessage({ id: "EDIT.COURSE.SUCCESS.TITLE" }),
          content: intl.formatMessage({
            id: "EDIT.COURSE.SUCCESS.CONTENT",
          }),
        },
      }),
  })

  const editCourseFields = [
    {
      title: intl.formatMessage({ id: "NAME" }),
      value: "title",
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      type: "textarea",
    },
  ]

  const deleteCourseDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.COURSE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.COURSE",
      }),
      actions: [
        {
          title: deleteCourseIsLoading ? (
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
            deleteCourse(course.code, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.COURSE.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.COURSE.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteCourseIsLoading,
        },
      ],
    },
    errorMessage: deleteCourseErrorMessage,
    isLoading: deleteCourseIsLoading,
    closingAction: () => clearDeleteCourseErrorMessage(),
  }

  const editCourseDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.COURSE" }),
      content: (
        <CustomForm
          formik={editCourseFormik}
          fields={editCourseFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.COURSE" })}
          isLoading={editCourseIsLoading}
        />
      ),
    },
    errorMessage: editCourseErrorMessage,
    isLoading: editCourseIsLoading,
    closingAction: () => {
      clearEditCourseErrorMessage()
      editCourseFormik.resetForm()
    },
  }

  const CourseSubjectsAndIntakesDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Clipboard size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "COURSE.INTAKES.AND.SUBJECTS" }),
      content: <IntakesAndSubjectsInCourse courseCode={course.code} />,
    },
    bigSize: true,
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {course.code ? course.code : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {course.title ? course.title : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {course.departmentName ? course.departmentName : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {course.description ? course.description : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {!ability.can("manage", "subjects_in_course-GET") &&
          !ability.can("manage", "intakes_course-GET") ? (
            <></>
          ) : (
            <Dialog {...CourseSubjectsAndIntakesDialogAttributes} />
          )}
          {ability.can("manage", "department-PUT") && (
            <Dialog {...editCourseDialogAttributes} />
          )}
          {ability.can("manage", "department-DELETE") && (
            <Dialog {...deleteCourseDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteCourseErrorMessage: selectDeleteCourseErrorMessage,
  deleteCourseIsLoading: selectDeleteCourseIsLoading,
  editCourseErrorMessage: selectEditCourseErrorMessage,
  editCourseIsLoading: selectEditCourseIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editCourse: (requestBody, courseCode, messages) =>
    dispatch(editCourseAsync(requestBody, courseCode, messages)),
  deleteCourse: (courseCode, messages) =>
    dispatch(deleteCourseAsync(courseCode, messages)),
  clearDeleteCourseErrorMessage: () =>
    dispatch(clearDeleteCourseErrorMessage()),
  clearEditCourseErrorMessage: () => dispatch(clearEditCourseErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesTableRow)
