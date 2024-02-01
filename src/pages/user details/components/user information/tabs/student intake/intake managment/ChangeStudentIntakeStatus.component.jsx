import React, { useState, useEffect, useContext } from "react"
import { Col, Button, Spinner } from "reactstrap"
import { X, Check } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { AbilityContext } from "../../../../../../../utility/context/Can"
import Select from "../../../../../../../custom/select/select.component"
import intakeStatuses from "../../../../../../../utility/custom/intakeStatuses"
import NumberInput from "react-numeric-input"
import "../../../../../../assessment/components/students marks in assessment table/StudentsMarksInAssessmentTableRow.styles.scss"
import { updateStudentIntakeStatusAsync } from "../../../../../../../redux/index.actions"
import {
  selectSelectedUserCurrentIntakeCode,
  selectSelectedUserCurrentIntakeStatus,
  selectSelectedUserUuid,
  selectAddStudentToIntakeIsLoading,
  selectUpdateStudentIntakeStatusIsLoading,
} from "../../../../../../../redux/index.selectors"

const ChangeStudentIntakeStatus = ({
  updateStudentIntakeStatus,
  studentIntakeCode,
  studentIntakeStatus,
  studentUuid,
  addStudentToIntakeIsLoading,
  updateStudentIntakeStatusIsLoading,
}) => {
  const [selectedIntakeStatus, setSelectedIntakeStatus] = useState("")
  const [gpa, setGpa] = useState(0.0)
  const [isUpdatingIntakeStatus, setIsUpdatingIntakeStatus] = useState(false)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  useEffect(
    () =>
      setSelectedIntakeStatus({
        label: studentIntakeStatus
          ? intl.formatMessage({ id: studentIntakeStatus.toUpperCase() })
          : "",
        value: studentIntakeStatus,
      }),
    []
  )

  useEffect(() => setGpa(0.0), [selectedIntakeStatus])

  return (
    <>
      <Col
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isUpdatingIntakeStatus
            ? selectedIntakeStatus.value === "passed" ||
              selectedIntakeStatus.value === "failed"
              ? "5px"
              : "105px"
            : "0px",
        }}
      >
        <Select
          type="select"
          fixed={true}
          height={110}
          style={{ width: "85%" }}
          disabled={
            !isUpdatingIntakeStatus || updateStudentIntakeStatusIsLoading
          }
          value={selectedIntakeStatus}
          handleChange={e => setSelectedIntakeStatus(e)}
          array={intakeStatuses(intl)}
          stylesClassnames="w-100 "
        />
        {isUpdatingIntakeStatus ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
            }}
          >
            <Button
              className="mx-50 p-50 input-custom-animation-2"
              disabled={
                selectedIntakeStatus.value === studentIntakeStatus ||
                updateStudentIntakeStatusIsLoading ||
                ((selectedIntakeStatus.value === "passed" ||
                  selectedIntakeStatus.value === "failed") &&
                  gpa === 0)
              }
              type="button"
              color="success"
              onClick={() =>
                updateStudentIntakeStatus(
                  studentUuid,
                  studentIntakeCode,
                  selectedIntakeStatus.value,
                  gpa,
                  {
                    success: {
                      title: intl.formatMessage({
                        id: "UPDATE.STUDENT.INTAKE.STATUS.SUCCESS.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "UPDATE.STUDENT.INTAKE.STATUS.SUCCESS.CONTENT",
                      }),
                    },
                    error: {
                      title: intl.formatMessage({
                        id: "UPDATE.STUDENT.INTAKE.STATUS.ERROR.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "UPDATE.STUDENT.INTAKE.STATUS.ERROR.CONTENT",
                      }),
                    },
                  }
                )
              }
            >
              {updateStudentIntakeStatusIsLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  aria-hidden="true"
                />
              ) : (
                <Check size={18} />
              )}
            </Button>
            <Button
              className="p-50 input-custom-animation-2"
              disabled={updateStudentIntakeStatusIsLoading}
              onClick={() => {
                setIsUpdatingIntakeStatus(false)
                setSelectedIntakeStatus({
                  label: intl.formatMessage({
                    id: studentIntakeStatus.toUpperCase(),
                  }),
                  value: studentIntakeStatus,
                })
                setGpa(0.0)
              }}
              color="danger"
            >
              <X size={18} />
            </Button>
          </div>
        ) : (
          <Button
            className="p-50 ml-50 input-custom-animation-2"
            onClick={() => setIsUpdatingIntakeStatus(true)}
            color="primary"
            disabled={!ability.can("manage", "student_intake_pass_fail-PUT")}
          >
            <FormattedMessage id="CHANGE" />
          </Button>
        )}
      </Col>
      {(selectedIntakeStatus.value === "passed" ||
        selectedIntakeStatus.value === "failed") &&
      isUpdatingIntakeStatus ? (
        <Col className="marginBottom-105" xs={12}>
          <span className="mr-25">
            <FormattedMessage id="GPA" /> :
          </span>
          <NumberInput
            value={gpa}
            onChange={setGpa}
            mobile={true}
            step={0.01}
            min={0.0}
            max={4.0}
            className="no-outline"
          />
        </Col>
      ) : (
        <></>
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  studentIntakeCode: selectSelectedUserCurrentIntakeCode,
  studentIntakeStatus: selectSelectedUserCurrentIntakeStatus,
  studentUuid: selectSelectedUserUuid,
  addStudentToIntakeIsLoading: selectAddStudentToIntakeIsLoading,
  updateStudentIntakeStatusIsLoading: selectUpdateStudentIntakeStatusIsLoading,
})

const mapDispatchToProps = dispatch => ({
  updateStudentIntakeStatus: (studentUuid, intakeCode, status, gpa, messages) =>
    dispatch(
      updateStudentIntakeStatusAsync(
        studentUuid,
        intakeCode,
        status,
        gpa,
        messages
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeStudentIntakeStatus)
