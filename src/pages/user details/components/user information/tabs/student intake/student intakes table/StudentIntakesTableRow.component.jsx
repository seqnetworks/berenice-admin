import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Badge, Label, Spinner } from "reactstrap"
import { FormattedMessage, useIntl } from "react-intl"
import { Edit } from "react-feather"
import NumberInput from "react-numeric-input"
import { AbilityContext } from "../../../../../../../utility/context/Can"
import Dialog from "../../../../../../../custom/dialog/dialog.component"
import {
  editStudentGpaAsync,
  clearEditStudentGpaErrorMessage,
} from "../../../../../../../redux/index.actions"
import {
  selectSelectedUserUuid,
  selectEditStudentGpaErrorMessage,
  selectEditStudentGpaIsLoading,
} from "../../../../../../../redux/index.selectors"

const IntakesTableRow = ({
  intake,
  editStudentGpa,
  studentUuid,
  clearEditStudentGpaErrorMessage,
  editStudentGpaErrorMessage,
  editStudentGpaIsLoading,
}) => {
  const [gpa, setGpa] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  useEffect(() => setGpa(intake.gpa), [])

  const color = {
    passed: "success",
    failed: "danger",
    cancelled: "danger",
    onGoing: "info",
    onHold: "info",
  }
  const editStudentGpaDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.STUDENT.GPA" }),
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "5px",
            paddingBottom: "10px",
          }}
        >
          <Label>
            <FormattedMessage id="GPA" />
          </Label>
          <NumberInput
            value={gpa}
            onChange={setGpa}
            mobile={true}
            step={0.01}
            min={0.0}
            max={4.0}
            className="no-outline w-100"
          />
        </div>
      ),
      actions: [
        {
          title: editStudentGpaIsLoading ? (
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
          disabled: editStudentGpaIsLoading || gpa == intake.gpa,
          clickHandler: () =>
            editStudentGpa(
              { studentIntakeUuid: intake.studentIntakeUuid, gpa },
              studentUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "EDIT.STUDENT.GPA.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "EDIT.STUDENT.GPA.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: editStudentGpaIsLoading,
        },
      ],
    },
    errorMessage: editStudentGpaErrorMessage,
    isLoading: editStudentGpaIsLoading,
    closingAction: () => {
      clearEditStudentGpaErrorMessage()
      setGpa(intake.gpa)
    },
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {intake.intakeCode ? intake.intakeCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.status ? (
            <Badge color={`light-${color[intake.status]}`}>
              <FormattedMessage
                id={
                  intake.status === "onHold"
                    ? "ON.HOLD"
                    : intake.status.toUpperCase()
                }
              />
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {intake.gpa || intake.gpa === 0 ? intake.gpa : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {ability.can("manage", "gpa-PUT") && (
            <Dialog {...editStudentGpaDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  studentUuid: selectSelectedUserUuid,
  editStudentGpaErrorMessage: selectEditStudentGpaErrorMessage,
  editStudentGpaIsLoading: selectEditStudentGpaIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editStudentGpa: (requestBody, studentUuid, messages) =>
    dispatch(editStudentGpaAsync(requestBody, studentUuid, messages)),
  clearEditStudentGpaErrorMessage: () =>
    dispatch(clearEditStudentGpaErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IntakesTableRow)
