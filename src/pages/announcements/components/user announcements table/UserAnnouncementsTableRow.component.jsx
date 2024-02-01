import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { CardBody, Spinner } from "reactstrap"
import { Eye, Edit, Trash, Edit3, AlignCenter } from "react-feather"
import { useIntl } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import Dialog from "../../../../custom/dialog/dialog.component"
import CustomForm from "../../../../custom/customform/customform.component"
import Post from "../../../../custom/post/Post.component"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { dateAndTimeFormatterString } from "../../../../utility/custom/dateAndTimeFormatter"
import {
  deleteAnnouncementAsync,
  editAnnouncementAsync,
  clearEditAnnouncementErrorMessage,
  clearDeleteAnnouncementErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectDeleteAnnouncementErrorMessage,
  selectDeleteAnnouncementIsLoading,
  selectEditAnnouncementErrorMessage,
  selectEditAnnouncementIsLoading,
} from "../../../../redux/index.selectors"

const UserAnnouncementsTableRow = ({
  announcement,
  userUuid,
  deleteAnnouncement,
  editAnnouncement,
  clearDeleteAnnouncementErrorMessage,
  clearEditAnnouncementErrorMessage,
  deleteAnnouncementErrorMessage,
  deleteAnnouncementIsLoading,
  editAnnouncementErrorMessage,
  editAnnouncementIsLoading,
}) => {
  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const editAnnouncementValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const editAnnouncementFormik = useFormik({
    initialValues: {
      title: announcement.title,
      description: announcement.description,
    },
    enableReinitialize: true,
    validationSchema: editAnnouncementValidationSchema,
    onSubmit: values =>
      editAnnouncement(
        { ...values, type: announcement.type },
        announcement.uuid,
        userUuid,
        {
          success: {
            title: intl.formatMessage({
              id: "EDIT.ANNOUNCEMENT.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "EDIT.ANNOUNCEMENT.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const editAnnouncementFields = [
    {
      title: intl.formatMessage({ id: "TITLE" }),
      value: "title",
      icon: <Edit3 size={17} />,
    },
    {
      title: intl.formatMessage({ id: "DESCRIPTION" }),
      value: "description",
      icon: <AlignCenter size={17} />,
      type: "textarea",
    },
  ]

  const reviewDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Eye size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "ANNOUNCEMENT.PREVIEW" }),
      content: (
        <CardBody>
          <Post
            userAvatar={announcement.userAvatar}
            title={announcement.title}
            content={announcement.description}
            writer={
              rtl
                ? announcement.senderFullNameArabic
                : announcement.senderFullName
            }
            date={dateAndTimeFormatterString(announcement.createdAt)}
            important={announcement.type === "important"}
            announcement={true}
          />
        </CardBody>
      ),
    },
    bigSize: true,
  }

  const deleteAnnouncementDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.ANNOUNCEMENT" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.ANNOUNCEMENT",
      }),
      actions: [
        {
          title: deleteAnnouncementIsLoading ? (
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
            deleteAnnouncement(announcement.uuid, userUuid, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.ANNOUNCEMENT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.ANNOUNCEMENT.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteAnnouncementIsLoading,
        },
      ],
    },
    errorMessage: deleteAnnouncementErrorMessage,
    isLoading: deleteAnnouncementIsLoading,
    closingAction: () => clearDeleteAnnouncementErrorMessage(),
  }

  const editAnnouncementDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDIT.ANNOUNCEMENT" }),
      content: (
        <CustomForm
          formik={editAnnouncementFormik}
          fields={editAnnouncementFields}
          buttonTitle={intl.formatMessage({ id: "EDIT.ANNOUNCEMENT" })}
          isLoading={editAnnouncementIsLoading}
        />
      ),
    },
    errorMessage: editAnnouncementErrorMessage,
    isLoading: editAnnouncementIsLoading,
    closingAction: () => {
      clearEditAnnouncementErrorMessage()
      editAnnouncementFormik.resetForm()
    },
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {announcement.title ? announcement.title : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {announcement.type
            ? intl.formatMessage({
                id: announcement.type.toUpperCase(),
              })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {announcement.targetUsers
            ? announcement.targetUsers === "intake"
              ? announcement.intakeCodes?.map(intake => <span>{intake}</span>)
              : intl.formatMessage({
                  id: announcement.targetUsers.toUpperCase(),
                })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {announcement.createdAt
            ? dateAndTimeFormatterString(announcement.createdAt)
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Dialog {...reviewDialogAttributes} />
          {ability.can("manage", "announcement-PUT") && (
            <Dialog {...editAnnouncementDialogAttributes} />
          )}
          {ability.can("manage", "announcement-DELETE") && (
            <Dialog {...deleteAnnouncementDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteAnnouncementErrorMessage: selectDeleteAnnouncementErrorMessage,
  deleteAnnouncementIsLoading: selectDeleteAnnouncementIsLoading,
  editAnnouncementErrorMessage: selectEditAnnouncementErrorMessage,
  editAnnouncementIsLoading: selectEditAnnouncementIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteAnnouncement: (announcementUuid, userUuid, messages) =>
    dispatch(deleteAnnouncementAsync(announcementUuid, userUuid, messages)),
  editAnnouncement: (requestBody, announcementUuid, userUuid, messages) =>
    dispatch(
      editAnnouncementAsync(requestBody, announcementUuid, userUuid, messages)
    ),
  clearDeleteAnnouncementErrorMessage: () =>
    dispatch(clearDeleteAnnouncementErrorMessage()),
  clearEditAnnouncementErrorMessage: () =>
    dispatch(clearEditAnnouncementErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAnnouncementsTableRow)
