import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner } from "reactstrap"
import { useIntl } from "react-intl"
import { X } from "react-feather"
import Dialog from "../../../../../../custom/dialog/dialog.component"
import {
  deleteGuardianAndStudentAsync,
  clearDeleteGuardianAndStudentErrorMessage,
} from "../../../../../../redux/index.actions"
import {
  selectDeleteGuardianAndStudentErrorMessage,
  selectDeleteGuardianAndStudentIsLoading,
} from "../../../../../../redux/index.selectors"

const DeleteGuardianAndStudent = ({
  type,
  id,
  studentGuardianUuid,
  deleteGuardianAndStudent,
  clearDeleteGuardianAndStudentErrorMessage,
  deleteGuardianAndStudentErrorMessage,
  deleteGuardianAndStudentIsLoading,
}) => {
  const intl = useIntl()

  const dialogAttributes = {
    dialog: {
      actions: [
        {
          color: "danger",
          title: deleteGuardianAndStudentIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "REMOVE" })
          ),
          disabled: deleteGuardianAndStudentIsLoading,
          clickHandler: () =>
            deleteGuardianAndStudent(
              {
                id: id,
                type: type,
                studentGuardianUuid: studentGuardianUuid,
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.GUARDIAN.AND.STUDENT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.GUARDIAN.AND.STUDENT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          color: "secondary",
          title: intl.formatMessage({ id: "CANCEL" }),
          disabled: deleteGuardianAndStudentIsLoading,
        },
      ],
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.REMOVE.THIS.GUARDIAN",
      }),
      title: intl.formatMessage({ id: "REMOVE.GUARDIAN" }),
    },
    button: {
      className: "p-0 p-25 btn-icon",
      color: "flat-danger",
      title: <X size={25} />,
    },
    errorMessage: deleteGuardianAndStudentErrorMessage,
    isLoading: deleteGuardianAndStudentIsLoading,
    closingAction: () => clearDeleteGuardianAndStudentErrorMessage(),
  }
  return <Dialog {...dialogAttributes} />
}

const mapStateToProps = createStructuredSelector({
  deleteGuardianAndStudentErrorMessage: selectDeleteGuardianAndStudentErrorMessage,
  deleteGuardianAndStudentIsLoading: selectDeleteGuardianAndStudentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteGuardianAndStudent: (requestBody, messages) =>
    dispatch(deleteGuardianAndStudentAsync(requestBody, messages)),
  clearDeleteGuardianAndStudentErrorMessage: () =>
    dispatch(clearDeleteGuardianAndStudentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteGuardianAndStudent)
