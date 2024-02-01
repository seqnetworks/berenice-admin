import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  Spinner,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText,
  Input,
} from "reactstrap"
import { Edit } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { Percent } from "react-feather"
import { useRTL } from "../../../../../utility/hooks/useRTL"
import Dialog from "../../../../../custom/dialog/dialog.component"
import Select from "../../../../../custom/select/select.component"
import {
  changeStatusOfStudentSubjectAsync,
  droppingSubjectAsync,
  clearChangeStatusOfStudentSubjectErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedUserUuid,
  selectChangeStatusOfStudentSubjectErrorMessage,
  selectChangeStatusOfStudentSubjectIsLoading,
} from "../../../../../redux/index.selectors"

const OngoingSubjectsTableRow = ({
  subject,
  selectedUserUuid,
  changeStatusOfStudentSubjectErrorMessage,
  changeStatusOfStudentSubjectIsLoading,
  changeStatusOfStudentSubject,
  droppingSubject,
  clearChangeStatusOfStudentSubjectErrorMessage,
}) => {
  const [subjectStatus, setSubjectStatus] = useState("")
  const [chargePercentage, setChargePercentage] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const subjectStatuses = [
    { label: "", value: "" },
    { label: intl.formatMessage({ id: "PASSED" }), value: "passed" },
    { label: intl.formatMessage({ id: "FAILED" }), value: "failed" },
    { label: intl.formatMessage({ id: "DROPPED" }), value: "dropped" },
    // { label: intl.formatMessage({ id: "ON.HOLD" }), value: "onHold" },
  ]
  let tester = new RegExp(/^[0-9]*$/)

  const changeSubjectStatusDialogAttributes = {
    button: {
      color: "primary",
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Edit className="mr-50" size={20} />
          <FormattedMessage id="CHANGE.SUBJECT.STATUS" />
        </div>
      ),
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "CHANGE.SUBJECT.STATUS" }),
      content: (
        <>
          <Select
            array={subjectStatuses}
            handleChange={e => setSubjectStatus(e)}
            height={120}
            fixed={true}
            value={subjectStatus}
            label={intl.formatMessage({ id: "SELECT.SUBJECT.STATUS" })}
            stylesClassnames={
              subjectStatus
                ? subjectStatus.value !== "dropped"
                  ? "marginBottom-130"
                  : "mb-75"
                : "marginBottom-130"
            }
          />
          {subjectStatus.value === "dropped" ? (
            <FormGroup style={{ marginBottom: "50px" }}>
              <Label>
                <FormattedMessage id="CHARGE.PERCENTAGE" />
              </Label>
              <InputGroup className="input-group-merge">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Percent size={17} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={chargePercentage}
                  onChange={e => setChargePercentage(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
          ) : (
            <></>
          )}
        </>
      ),
      actions: [
        {
          title: changeStatusOfStudentSubjectIsLoading ? (
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
          disabled:
            !subjectStatus ||
            (subjectStatus &&
              subjectStatus.value === "dropped" &&
              !chargePercentage) ||
            !tester.test(chargePercentage),
          clickHandler: async () => {
            let messages = {
              success: {
                title: intl.formatMessage({
                  id: "CHANGE.SUBJECT.STATUS.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "CHANGE.SUBJECT.STATUS.SUCCESS.CONTENT",
                }),
              },
            }
            let studentUuid = selectedUserUuid
            subjectStatus.value === "dropped"
              ? await droppingSubject(
                  {
                    studentSubjectUuid: subject.studentSubjectUuid,
                    chargePercentage,
                  },
                  studentUuid,
                  messages
                )
              : await changeStatusOfStudentSubject(
                  {
                    subjectCode: subject.subjectCode,
                    subjectStatus: subjectStatus.value,
                  },
                  studentUuid,
                  messages
                )
          },
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: changeStatusOfStudentSubjectIsLoading,
        },
      ],
    },
    errorMessage: changeStatusOfStudentSubjectErrorMessage,
    isLoading: changeStatusOfStudentSubjectIsLoading,
    closingAction: () => {
      setSubjectStatus("")
      clearChangeStatusOfStudentSubjectErrorMessage()
      setChargePercentage("")
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
          <Dialog {...changeSubjectStatusDialogAttributes} />
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserUuid: selectSelectedUserUuid,
  changeStatusOfStudentSubjectErrorMessage: selectChangeStatusOfStudentSubjectErrorMessage,
  changeStatusOfStudentSubjectIsLoading: selectChangeStatusOfStudentSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  changeStatusOfStudentSubject: (requestBody, studentUuid, messages) =>
    dispatch(
      changeStatusOfStudentSubjectAsync(requestBody, studentUuid, messages)
    ),
  droppingSubject: (requestBody, studentUuid, messages) =>
    dispatch(droppingSubjectAsync(requestBody, studentUuid, messages)),
  clearChangeStatusOfStudentSubjectErrorMessage: () =>
    dispatch(clearChangeStatusOfStudentSubjectErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OngoingSubjectsTableRow)
