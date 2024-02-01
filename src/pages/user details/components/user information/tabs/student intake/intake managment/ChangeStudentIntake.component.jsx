import React, { useState, useEffect, useContext } from "react"
import { Col, Button, Spinner } from "reactstrap"
import { X, Check, Award } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { AbilityContext } from "../../../../../../../utility/context/Can"
import Select from "../../../../../../../custom/select/select.component"
import { addStudentToIntakeAsync } from "../../../../../../../redux/index.actions"
import {
  selectAllIntakes,
  selectSelectedUserCurrentIntakeCode,
  selectSelectedUserCurrentIntakeStatus,
  selectSelectedUserUuid,
  selectAddStudentToIntakeIsLoading,
} from "../../../../../../../redux/index.selectors"

const ChangeStudentIntake = ({
  studentUuid,
  studentIntakeCode,
  studentIntakeStatus,
  addStudentToIntake,
  intakes,
  addStudentToIntakeIsLoading,
}) => {
  const [selectedIntake, setSelectedIntake] = useState("")
  const [isEditingIntake, setIsEditingIntake] = useState(false)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let intakesArray = [{ label: "", value: "" }]
  if (intakes)
    intakes.map(intake =>
      intakesArray.push({ label: intake.code, value: intake.code })
    )

  useEffect(
    () =>
      setSelectedIntake({ label: studentIntakeCode, value: studentIntakeCode }),
    []
  )

  return (
    <Col
      xs={12}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Select
        type="select"
        fixed={true}
        height={100}
        style={{ width: "85%" }}
        disabled={!isEditingIntake || addStudentToIntakeIsLoading}
        value={selectedIntake}
        handleChange={e => setSelectedIntake(e)}
        array={intakesArray}
        stylesClassnames="w-100"
      />
      {isEditingIntake ? (
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
              selectedIntake.value === "" ||
              selectedIntake.value === studentIntakeCode ||
              addStudentToIntakeIsLoading
            }
            type="button"
            color="success"
            onClick={() =>
              addStudentToIntake(
                {
                  studentUuid,
                  intakeCode: selectedIntake.value,
                },
                {
                  success: {
                    title: intl.formatMessage({
                      id: "CHANGE.STUDENT.INTAKE.SUCCESS.TITLE",
                    }),
                    content: intl.formatMessage({
                      id: "CHANGE.STUDENT.INTAKE.SUCCESS.CONTENT",
                    }),
                  },
                  error: {
                    title: intl.formatMessage({
                      id: "CHANGE.STUDENT.INTAKE.ERROR.TITLE",
                    }),
                    content: intl.formatMessage({
                      id: "CHANGE.STUDENT.INTAKE.ERROR.CONTENT",
                    }),
                  },
                }
              )
            }
          >
            {addStudentToIntakeIsLoading ? (
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
            disabled={addStudentToIntakeIsLoading}
            onClick={() => {
              setIsEditingIntake(false)
              setSelectedIntake({
                label: studentIntakeCode,
                value: studentIntakeCode,
              })
            }}
            color="danger"
          >
            <X size={18} />
          </Button>
        </div>
      ) : (
        <Button
          className="p-50 ml-50 input-custom-animation-2"
          onClick={() => setIsEditingIntake(true)}
          color="primary"
          disabled={
            !ability.can("manage", "student_intake_add-POST") ||
            studentIntakeStatus === "onGoing" ||
            studentIntakeStatus === "onHold"
          }
        >
          <FormattedMessage id="CHANGE" />
        </Button>
      )}
    </Col>
  )
}

const mapStateToProps = createStructuredSelector({
  intakes: selectAllIntakes,
  studentUuid: selectSelectedUserUuid,
  studentIntakeCode: selectSelectedUserCurrentIntakeCode,
  studentIntakeStatus: selectSelectedUserCurrentIntakeStatus,
  addStudentToIntakeIsLoading: selectAddStudentToIntakeIsLoading,
})

const mapDispatchToProps = dispatch => ({
  addStudentToIntake: (requestBody, messages) =>
    dispatch(addStudentToIntakeAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStudentIntake)
