import React, { useState, useEffect, useContext } from "react"
import { Col, Button, Spinner } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import NumberInput from "react-numeric-input"
import { AbilityContext } from "../../../../../../../utility/context/Can"
import { editStudentCgpaAsync } from "../../../../../../../redux/index.actions"
import {
  selectSelectedStudentCgpa,
  selectSelectedUserUuid,
  selectEditStudentCgpaIsLoading,
} from "../../../../../../../redux/index.selectors"

const ChangeStudentCGPA = ({
  studentCgpa,
  editStudentCgpa,
  studentUuid,
  editStudentCgpaIsLoading,
}) => {
  const [cgpa, setCgpa] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  useEffect(() => setCgpa(studentCgpa), [])

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
      <NumberInput
        value={cgpa}
        onChange={setCgpa}
        mobile={true}
        step={0.01}
        min={0.0}
        max={4.0}
        className="no-outline w-100"
        size={150}
        disabled={!ability.can("manage", "cgpa-PUT")}
      />
      <Button
        className="p-50 ml-50 input-custom-animation-2"
        onClick={() =>
          editStudentCgpa(
            { studentUuid, cgpa },
            {
              success: {
                title: intl.formatMessage({
                  id: "EDIT.STUDENT.CGPA.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "EDIT.STUDENT.CGPA.SUCCESS.CONTENT",
                }),
              },
              error: {
                title: intl.formatMessage({
                  id: "EDIT.STUDENT.CGPA.ERROR.TITLE",
                }),
                content: intl.formatMessage({
                  id: "EDIT.STUDENT.CGPA.ERROR.CONTENT",
                }),
              },
            }
          )
        }
        color="primary"
        disabled={
          !ability.can("manage", "cgpa-PUT") ||
          cgpa === studentCgpa ||
          editStudentCgpaIsLoading
        }
      >
        {editStudentCgpaIsLoading ? (
          <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
        ) : (
          <FormattedMessage id="CHANGE" />
        )}
      </Button>
    </Col>
  )
}

const mapStateToProps = createStructuredSelector({
  studentCgpa: selectSelectedStudentCgpa,
  studentUuid: selectSelectedUserUuid,
  editStudentCgpaIsLoading: selectEditStudentCgpaIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editStudentCgpa: (requestBody, messages) =>
    dispatch(editStudentCgpaAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStudentCGPA)
