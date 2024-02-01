import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { CardBody, Spinner } from "reactstrap"
import { Eye, Trash, Edit, Edit3, AlignCenter } from "react-feather"
import { useIntl } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import Post from "../../../../custom/post/Post.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../custom/customform/customform.component"
import { dateAndTimeFormatterString } from "../../../../utility/custom/dateAndTimeFormatter"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  deleteFollowUpAsync,
  editFollowUpAsync,
  clearDeleteFollowUpErrorMessage,
  clearEditFollowUpErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectDeleteFollowUpErrorMessage,
  selectDeleteFollowUpIsLoading,
  selectEditFollowUpErrorMessage,
  selectEditFollowUpIsLoading,
} from "../../../../redux/index.selectors"

const AllFollowUpsTableRow = ({
  followUp,
  deleteFollowUp,
  editFollowUp,
  clearDeleteFollowUpErrorMessage,
  clearEditFollowUpErrorMessage,
  deleteFollowUpErrorMessage,
  deleteFollowUpIsLoading,
  editFollowUpErrorMessage,
  editFollowUpIsLoading,
}) => {
  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const editFollowUpValidationSchema = Yup.object().shape({
    subjectMessage: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    message: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editFollowUpFormik = useFormik({
    initialValues: {
      subjectMessage: followUp.subjectMessage,
      message: followUp.message,
    },
    enableReinitialize: true,
    validationSchema: editFollowUpValidationSchema,
    onSubmit: values =>
      editFollowUp(values, followUp.uuid, {
        success: {
          title: intl.formatMessage({ id: "EDIT.FOLLOWUP.SUCCESS.TITLE" }),
          content: intl.formatMessage({ id: "EDIT.FOLLOWUP.SUCCESS.CONTENT" }),
        },
      }),
  })

  const editFollowUpFields = [
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "subjectMessage",
      icon: <Edit3 size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "message",
      icon: <AlignCenter size={17} />,
      type: "textarea",
    },
  ]

  const reviewDialogAttributes = {
    dialog: {
      title: intl.formatMessage({ id: "FOLLOW.UP.PREVIEW" }),
      content: (
        <CardBody className="py-0">
          <Post
            userAvatar={followUp.senderUserAvatar}
            title={followUp.subjectMessage}
            content={followUp.message}
            writer={
              rtl ? followUp.senderFullNameArabic : followUp.senderFullName
            }
            date={dateAndTimeFormatterString(followUp.createdAt)}
          />
        </CardBody>
      ),
    },

    button: {
      color: "flat-primary",
      className: "btn-icon p-50 mr-25",
      title: <Eye size={20} />,
    },
    bigSize: true,
  }
  const deleteFollowUpDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.FOLLOW.UP" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.FOLLOW.UP",
      }),
      actions: [
        {
          title: deleteFollowUpIsLoading ? (
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
            deleteFollowUp(followUp.uuid, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.FOLLOWUP.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.FOLLOWUP.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteFollowUpIsLoading,
        },
      ],
    },
    errorMessage: deleteFollowUpErrorMessage,
    isLoading: deleteFollowUpIsLoading,
    closingAction: () => clearDeleteFollowUpErrorMessage(),
  }

  const editFollowUpDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 ",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.FOLLOW.UP" }),
      content: (
        <CustomForm
          formik={editFollowUpFormik}
          fields={editFollowUpFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.FOLLOW.UP" })}
          isLoading={editFollowUpIsLoading}
        />
      ),
    },
    errorMessage: editFollowUpErrorMessage,
    isLoading: editFollowUpIsLoading,
    closingAction: () => {
      clearEditFollowUpErrorMessage()
      editFollowUpFormik.resetForm()
    },
  }
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {followUp.subjectMessage ? followUp.subjectMessage : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {rtl
            ? followUp.senderFullNameArabic
              ? followUp.senderFullNameArabic
              : renderEmpty()
            : followUp.senderFullName
            ? followUp.senderFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {rtl
            ? followUp.receiverFullNameArabic
              ? followUp.receiverFullNameArabic
              : renderEmpty()
            : followUp.receiverFullName
            ? followUp.receiverFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {followUp.createdAt
            ? dateAndTimeFormatterString(followUp.createdAt)
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Dialog {...reviewDialogAttributes} />
          {ability.can("manage", "follow_up-PUT") && (
            <Dialog {...editFollowUpDialogAttributes} />
          )}
          {ability.can("manage", "follow_up-DELETE") && (
            <Dialog {...deleteFollowUpDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteFollowUpErrorMessage: selectDeleteFollowUpErrorMessage,
  deleteFollowUpIsLoading: selectDeleteFollowUpIsLoading,
  editFollowUpErrorMessage: selectEditFollowUpErrorMessage,
  editFollowUpIsLoading: selectEditFollowUpIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteFollowUp: (followUpUuid, messages) =>
    dispatch(deleteFollowUpAsync(followUpUuid, false, messages)),
  editFollowUp: (requestBody, followUpUuid, messages) =>
    dispatch(editFollowUpAsync(requestBody, followUpUuid, false, messages)),
  clearDeleteFollowUpErrorMessage: () =>
    dispatch(clearDeleteFollowUpErrorMessage()),
  clearEditFollowUpErrorMessage: () =>
    dispatch(clearEditFollowUpErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllFollowUpsTableRow)
