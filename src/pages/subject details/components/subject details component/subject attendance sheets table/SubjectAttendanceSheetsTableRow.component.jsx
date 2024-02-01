import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button, Spinner } from "reactstrap"
import { Eye, Trash } from "react-feather"
import { FormattedMessage, useIntl } from "react-intl"
import { useHistory } from "react-router-dom"
import Dialog from "../../../../../custom/dialog/dialog.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import {
  setSelectedAttendanceSheet,
  deleteAttendanceSheetAsync,
  clearDeleteAttendanceSheetErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedSubject,
  selectDeleteAttendanceSheetErrorMessage,
  selectDeleteAttendanceSheetIsLoading,
} from "../../../../../redux/index.selectors"

const SubjectAttendanceSheetsTableRow = ({
  deleteAttendanceSheet,
  attendanceSheet,
  selectedSubject,
  clearDeleteAttendanceSheetErrorMessage,
  setSelectedAttendanceSheet,
  deleteAttendanceSheetErrorMessage,
  deleteAttendanceSheetIsLoading,
}) => {
  const history = useHistory()
  const ability = useContext(AbilityContext)
  const intl = useIntl()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const deleteAttendanceSheetDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.ATTENDANCE.SHEET" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.ATTENDANCE.SHEET",
      }),
      actions: [
        {
          title: deleteAttendanceSheetIsLoading ? (
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
            deleteAttendanceSheet(
              attendanceSheet.uuid,
              selectedSubject.lecturerSubjectUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.ATTENDANCE.SHEET.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.ATTENDANCE.SHEET.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteAttendanceSheetIsLoading,
        },
      ],
    },
    errorMessage: deleteAttendanceSheetErrorMessage,
    isLoading: deleteAttendanceSheetIsLoading,
    closingAction: () => clearDeleteAttendanceSheetErrorMessage(),
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {attendanceSheet.date ? attendanceSheet.date : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {attendanceSheet.classDay ? (
            <FormattedMessage id={attendanceSheet.classDay.toUpperCase()} />
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {attendanceSheet.classRoom
            ? attendanceSheet.classRoom
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {attendanceSheet.classStartTime
            ? attendanceSheet.classStartTime.slice(0, 5) +
              " - " +
              attendanceSheet.classEndTime.slice(0, 5)
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "students_attendance_date-GET") && (
            <Button
              onClick={() => {
                setSelectedAttendanceSheet({
                  lecturerSubjectUuid: selectedSubject.lecturerSubjectUuid,
                  subjectCode: selectedSubject.subjectCode,
                  intakeCode: selectedSubject.intakeCode,
                  uuid: attendanceSheet.uuid,
                  classDate: attendanceSheet.date,
                  timeRange:
                    attendanceSheet.classStartTime.slice(0, 5) +
                    " - " +
                    attendanceSheet.classEndTime.slice(0, 5),
                  day: attendanceSheet.classDay,
                  room: attendanceSheet.classRoom,
                })
                history.push("attendanceSheet")
              }}
              style={{ padding: "5px" }}
              color="flat-primary"
              className="btn-icon"
            >
              <Eye size={20} />
            </Button>
          )}
          {ability.can("manage", "attendance_sheet-DELETE") && (
            <Dialog {...deleteAttendanceSheetDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedSubject: selectSelectedSubject,
  deleteAttendanceSheetErrorMessage: selectDeleteAttendanceSheetErrorMessage,
  deleteAttendanceSheetIsLoading: selectDeleteAttendanceSheetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  setSelectedAttendanceSheet: attendanceSheetInfo =>
    dispatch(setSelectedAttendanceSheet(attendanceSheetInfo)),
  deleteAttendanceSheet: (attendanceSheetUuid, classUuid, messages) =>
    dispatch(
      deleteAttendanceSheetAsync(attendanceSheetUuid, classUuid, messages)
    ),
  clearDeleteAttendanceSheetErrorMessage: () =>
    dispatch(clearDeleteAttendanceSheetErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectAttendanceSheetsTableRow)
