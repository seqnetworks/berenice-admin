import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner, Badge, CardBody, Card } from "reactstrap"
import { Trash, Activity, Info, Clipboard, Edit } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import Popover from "../../../../../custom/popover/Popover.component"
import WithSpinner from "../../../../../custom/with spinner/WithSpinner.component"
import SubjectsInIntakeTable from "./subjects in intake table/SubjectsInIntakeTable.component"
import {
  editIntakeEnrollmentStatusAsync,
  editIntakeAsync,
  deleteIntakeAsync,
  getAllSubjectsInSingleIntakeAsync,
  clearDeleteIntakeErrorMessage,
  clearEditIntakeEnrollmentStatusErrorMessage,
  clearEditIntakeErrorMessage,
  getLecturersAsync,
} from "../../../../../redux/index.actions"
import {
  selectAllCourses,
  selectSelectedIntakeSubjects,
  selectDeleteIntakeErrorMessage,
  selectDeleteIntakeIsLoading,
  selectEditIntakeEnrollmentStatusErrorMessage,
  selectEditIntakeEnrollmentStatusIsLoading,
  selectEditIntakeErrorMessage,
  selectEditIntakeIsLoading,
  selectGetAllSubjectsInSingleIntakeErrorMessage,
  selectGetAllSubjectsInSingleIntakeIsLoading,
} from "../../../../../redux/index.selectors"
//------WITH SPINNER------
const SubjectsInIntakeTableWithSpinner = WithSpinner(SubjectsInIntakeTable)
//------------------------

const IntakesTableRow = ({
  intake,
  courses,
  editIntakeEnrollmentStatus,
  editIntake,
  deleteIntake,
  getAllSubjectsInSingleIntake,
  getLecturers,
  selectedIntakeSubjects,
  clearDeleteIntakeErrorMessage,
  clearEditIntakeEnrollmentStatusErrorMessage,
  clearEditIntakeErrorMessage,
  deleteIntakeErrorMessage,
  deleteIntakeIsLoading,
  editIntakeEnrollmentStatusErrorMessage,
  editIntakeEnrollmentStatusIsLoading,
  editIntakeErrorMessage,
  editIntakeIsLoading,
  getAllSubjectsInSingleIntakeErrorMessage,
  getAllSubjectsInSingleIntakeIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  let coursesArray = []
  if (courses)
    courses.map(course =>
      coursesArray.push({
        title: course.code + " - " + course.title,
        value: course.code,
      })
    )

  const helper = {
    row: {
      open: "success",
      closed: "danger",
    },
    action: {
      open: "closed",
      closed: "open",
    },
    dialog: {
      open: {
        color: "danger",
        content: "CLOSE",
      },
      closed: {
        color: "success",
        content: "OPEN.VERB",
      },
    },
  }

  const editIntakeValidationSchema = Yup.object().shape({
    courseCode: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    semester: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
    intakeYearMonth: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editIntakeFormik = useFormik({
    initialValues: {
      courseCode: intake.courseCode,
      semester: intake.semester,
      intakeYearMonth: intake.intakeYearMonth,
    },
    enableReinitialize: true,
    validationSchema: editIntakeValidationSchema,
    onSubmit: values =>
      editIntake(
        { ...values, intakeCode: intake.code },
        {
          success: {
            title: intl.formatMessage({ id: "EDIT.INTAKE.SUCCESS.TITLE" }),
            content: intl.formatMessage({ id: "EDIT.INTAKE.SUCCESS.CONTENT" }),
          },
        }
      ),
  })

  const editIntakeFields = [
    {
      title: intl.formatMessage({ id: "COURSE.CODE" }),
      value: "courseCode",
      type: "select",
      options: coursesArray,
    },
    {
      title: intl.formatMessage({ id: "SEMESTER" }),
      value: "semester",
    },
    {
      title: intl.formatMessage({ id: "INTAKE.DATE" }),
      value: "intakeYearMonth",
      type: "date",
    },
  ]

  const editIntakeDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.INTAKE" }),
      content: (
        <CustomForm
          formik={editIntakeFormik}
          fields={editIntakeFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.INTAKE" })}
          isLoading={editIntakeIsLoading}
        />
      ),
    },
    errorMessage: editIntakeErrorMessage,
    isLoading: editIntakeIsLoading,
    closingAction: () => {
      clearEditIntakeErrorMessage()
      editIntakeFormik.resetForm()
    },
  }

  const deleteIntakeDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.INTAKE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.INTAKE",
      }),
      actions: [
        {
          title: deleteIntakeIsLoading ? (
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
            deleteIntake(intake.code, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.INTAKE.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.INTAKE.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteIntakeIsLoading,
        },
      ],
    },
    errorMessage: deleteIntakeErrorMessage,
    isLoading: deleteIntakeIsLoading,
    closingAction: () => clearDeleteIntakeErrorMessage(),
  }

  const editIntakeEnrollmentStatusDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Activity size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "CHANGING.INTAKE.ENROLLMENT.STATUS" }),
      content: (
        <span>
          <FormattedMessage id="YOU.ARE.ABOUT.TO" />
          <Badge
            color={`light-${helper.dialog[intake.enrollmentStatus].color}`}
          >
            <FormattedMessage
              id={helper.dialog[intake.enrollmentStatus].content}
            />
          </Badge>
          <FormattedMessage id="THE.ENROLLMENT.OF.THIS.INTAKE" />
        </span>
      ),
      actions: [
        {
          title: editIntakeEnrollmentStatusIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "CHANGE" })
          ),
          color: "primary",
          clickHandler: () =>
            editIntakeEnrollmentStatus(
              intake.code,
              helper.action[intake.enrollmentStatus],
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.INTAKE.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.INTAKE.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: editIntakeEnrollmentStatusIsLoading,
        },
      ],
    },
    errorMessage: editIntakeEnrollmentStatusErrorMessage,
    isLoading: editIntakeEnrollmentStatusIsLoading,
    closingAction: () => {
      clearEditIntakeEnrollmentStatusErrorMessage()
    },
  }

  const moreIntakeDetailsPopoverAttributes = {
    button: {
      color: "flat-primary",
      title: <Info size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    unique: intake.code,
    place: "top",
    title: intl.formatMessage({ id: "MORE.INTAKE.DETAILS" }),
    content: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "INTAKE.DATE" }) + " :"}</b>
          <span className="ml-25">{intake.intakeYearMonth}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "SEMESTER" }) + " :"}</b>
          <span className="ml-25">{intake.semester}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "COURSE.CODE" }) + " :"}</b>
          <span className="ml-25">{intake.courseCode}</span>
        </div>
      </div>
    ),
  }

  const intakesSubjectsDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Clipboard size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "INTAKE.SUBJECTS" }),
      content: (
        <Card>
          <CardBody>
            <SubjectsInIntakeTableWithSpinner
              subjects={selectedIntakeSubjects}
              intakeCode={intake.code}
              errorMessage={getAllSubjectsInSingleIntakeErrorMessage}
              isLoading={getAllSubjectsInSingleIntakeIsLoading}
              toBeDispatchedUseEffect={intakeCode => {
                getAllSubjectsInSingleIntake(intakeCode)
                getLecturers()
              }}
              toBeDispatchedTryAgain={intakeCode => {
                getAllSubjectsInSingleIntake(intakeCode)
                getLecturers()
              }}
              toBeDispatchedPropsUseEffect={intake.code}
              toBeDispatchedPropsTryAgain={intake.code}
            />
          </CardBody>
        </Card>
      ),
    },
    bigSize: true,
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {intake.code ? intake.code : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.minHours ? intake.minHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.maxHours ? intake.maxHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.enrollmentStatus ? (
            <Badge color={`light-${helper.row[intake.enrollmentStatus]}`}>
              <FormattedMessage id={intake.enrollmentStatus.toUpperCase()} />
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "intake-PUT") && (
            <Dialog {...editIntakeDialogAttributes} />
          )}
          {ability.can("manage", "subjects_in_intake-GET") && (
            <Dialog {...intakesSubjectsDialogAttributes} />
          )}
          <Popover {...moreIntakeDetailsPopoverAttributes} />
          {ability.can("manage", "enrollment_status-PUT") && (
            <Dialog {...editIntakeEnrollmentStatusDialogAttributes} />
          )}
          {/* <Dialog {...deleteIntakeDialogAttributes} /> */}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  courses: selectAllCourses,
  selectedIntakeSubjects: selectSelectedIntakeSubjects,
  deleteIntakeErrorMessage: selectDeleteIntakeErrorMessage,
  deleteIntakeIsLoading: selectDeleteIntakeIsLoading,
  editIntakeEnrollmentStatusErrorMessage: selectEditIntakeEnrollmentStatusErrorMessage,
  editIntakeEnrollmentStatusIsLoading: selectEditIntakeEnrollmentStatusIsLoading,
  editIntakeErrorMessage: selectEditIntakeErrorMessage,
  editIntakeIsLoading: selectEditIntakeIsLoading,
  getAllSubjectsInSingleIntakeErrorMessage: selectGetAllSubjectsInSingleIntakeErrorMessage,
  getAllSubjectsInSingleIntakeIsLoading: selectGetAllSubjectsInSingleIntakeIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editIntakeEnrollmentStatus: (intakeCode, status, messages) =>
    dispatch(editIntakeEnrollmentStatusAsync(intakeCode, status, messages)),
  editIntake: (requestBody, messages) =>
    dispatch(editIntakeAsync(requestBody, messages)),
  deleteIntake: (intakeCode, messages) =>
    dispatch(deleteIntakeAsync(intakeCode, messages)),
  getAllSubjectsInSingleIntake: intakeCode =>
    dispatch(getAllSubjectsInSingleIntakeAsync(intakeCode)),
  getLecturers: () => dispatch(getLecturersAsync()),
  clearDeleteIntakeErrorMessage: () =>
    dispatch(clearDeleteIntakeErrorMessage()),
  clearEditIntakeEnrollmentStatusErrorMessage: () =>
    dispatch(clearEditIntakeEnrollmentStatusErrorMessage()),
  clearEditIntakeErrorMessage: () => dispatch(clearEditIntakeErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IntakesTableRow)
