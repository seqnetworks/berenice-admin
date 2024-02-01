import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { Activity } from "react-feather"
import { Badge, Spinner } from "reactstrap"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  editSubjectStatusAsync,
  clearEditSubjectStatusErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectEditSubjectStatusErrorMessage,
  selectEditSubjectStatusIsLoading,
} from "../../../../redux/index.selectors"

const SubjectLecturerTableRow = ({
  subject,
  editSubjectStatus,
  clearEditSubjectStatusErrorMessage,
  editSubjectStatusErrorMessage,
  editSubjectStatusIsLoading,
}) => {
  const [status, setStatus] = useState("")
  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (subject)
      setStatus({
        value: subject.status,
        label: intl.formatMessage({ id: subject.status.toUpperCase() }),
      })
  }, [])

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const color = {
    onGoing: "success",
    finished: "info",
    cancelled: "danger",
  }

  const editSubjectStatusDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Activity size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.SUBJECT.STATUS" }),
      content: (
        <Select
          array={[
            {
              value: "onGoing",
              label: intl.formatMessage({ id: "ONGOING" }),
            },
            {
              value: "finished",
              label: intl.formatMessage({ id: "FINISHED" }),
            },
            {
              value: "cancelled",
              label: intl.formatMessage({ id: "CANCELLED" }),
            },
          ]}
          fixed={true}
          value={status}
          handleChange={setStatus}
          stylesClassnames="marginBottom-130"
        />
      ),
      actions: [
        {
          title: editSubjectStatusIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "EDIT" })
          ),
          color: "primary",
          disabled:
            editSubjectStatusIsLoading || subject.status === status.value,
          clickHandler: () =>
            editSubjectStatus(subject.lecturerSubjectUuid, status.value, {
              success: {
                title: intl.formatMessage({
                  id: "EDIT.SUBJECT.STATUS.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "EDIT.SUBJECT.STATUS.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: editSubjectStatusIsLoading,
        },
      ],
    },
    errorMessage: editSubjectStatusErrorMessage,
    isLoading: editSubjectStatusIsLoading,
    closingAction: () => {
      setStatus({
        value: subject.status,
        label: intl.formatMessage({ id: subject.status.toUpperCase() }),
      })
      clearEditSubjectStatusErrorMessage()
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
        <div className="d-flex align-items-center ">
          {rtl
            ? subject.lecturerFullNameArabic
              ? subject.lecturerFullNameArabic
              : renderEmpty()
            : subject.lecturerFullName
            ? subject.lecturerFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {subject.intakeCode ? subject.intakeCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.status ? (
            <Badge color={`light-${color[subject.status]}`}>
              <FormattedMessage id={subject.status.toUpperCase()} />
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "edit_lecturer_subject_status-PUT") && (
            <Dialog {...editSubjectStatusDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  editSubjectStatusErrorMessage: selectEditSubjectStatusErrorMessage,
  editSubjectStatusIsLoading: selectEditSubjectStatusIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editSubjectStatus: (lecturerSubjectUuid, status, messages) =>
    dispatch(editSubjectStatusAsync(lecturerSubjectUuid, status, messages)),
  clearEditSubjectStatusErrorMessage: () =>
    dispatch(clearEditSubjectStatusErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectLecturerTableRow)
