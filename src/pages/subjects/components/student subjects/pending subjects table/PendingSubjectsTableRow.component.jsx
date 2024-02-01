import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner, Badge } from "reactstrap"
import { Check, X } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { useRTL } from "../../../../../utility/hooks/useRTL"
import Dialog from "../../../../../custom/dialog/dialog.component"
import {
  changeStatusOfStudentSubjectAsync,
  clearChangeStatusOfStudentSubjectErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedUserUuid,
  selectChangeStatusOfStudentSubjectErrorMessage,
  selectChangeStatusOfStudentSubjectIsLoading,
} from "../../../../../redux/index.selectors"

const PendingSubjectsTableRow = ({
  subject,
  selectedUserUuid,
  changeStatusOfStudentSubjectErrorMessage,
  changeStatusOfStudentSubjectIsLoading,
  changeStatusOfStudentSubject,
  clearChangeStatusOfStudentSubjectErrorMessage,
}) => {
  const intl = useIntl()
  const [rtl] = useRTL()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const approvingSubjectDialogAttributes = {
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
          <Check className="mr-50" size={20} />
          <FormattedMessage id="APPROVE" />
        </div>
      ),
      className: "btn-icon p-50 mr-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "APPROVING.SUBJECT" }),
      content: (
        <span>
          <FormattedMessage id="ARE.YOU.SURE.YOU.WANT.TO" />
          <Badge color="light-success">
            <FormattedMessage id="APPROVE" />
          </Badge>
          <FormattedMessage id="THIS.SUBJECT" />
        </span>
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
            intl.formatMessage({ id: "APPROVE" })
          ),
          color: "primary",
          clickHandler: () =>
            changeStatusOfStudentSubject(
              { subjectCode: subject.subjectCode, subjectStatus: "onGoing" },
              selectedUserUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "APPROVING.SUBJECT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "APPROVING.SUBJECT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
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
    closingAction: () => clearChangeStatusOfStudentSubjectErrorMessage(),
  }

  const decliningSubjectDialogAttributes = {
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
          <X className="mr-50" size={20} />
          <FormattedMessage id="DECLINE" />
        </div>
      ),
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DECLINING.SUBJECT" }),
      content: (
        <span>
          <FormattedMessage id="ARE.YOU.SURE.YOU.WANT.TO" />
          <Badge color="light-danger">
            <FormattedMessage id="DECLINE" />
          </Badge>
          <FormattedMessage id="THIS.SUBJECT" />
        </span>
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
            intl.formatMessage({ id: "DECLINE" })
          ),
          color: "primary",
          clickHandler: () =>
            changeStatusOfStudentSubject(
              { subjectCode: subject.subjectCode, subjectStatus: "declined" },
              selectedUserUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "DECLINING.SUBJECT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DECLINING.SUBJECT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
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
    closingAction: () => clearChangeStatusOfStudentSubjectErrorMessage(),
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
          <Dialog {...approvingSubjectDialogAttributes} />
          <Dialog {...decliningSubjectDialogAttributes} />
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
  clearChangeStatusOfStudentSubjectErrorMessage: () =>
    dispatch(clearChangeStatusOfStudentSubjectErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingSubjectsTableRow)
