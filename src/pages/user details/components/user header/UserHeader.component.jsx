import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Col, Row, Spinner } from "reactstrap"
import { FormattedMessage, useIntl } from "react-intl"
import { Edit } from "react-feather"
import Dialog from "../../../../custom/dialog/dialog.component"
import blankAvatar from "../../../../assets/images/avatar-blank.png"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  clearEditUserAvatarErrorMessage,
  editUserAvatarAsync,
} from "../../../../redux/index.actions"
import {
  selectEditUserAvatarErrorMessage,
  selectEditUserAvatarIsLoading,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
  selectSelectedUserUserUuid,
  selectSelectedUserRole,
  selectCurrentUserRole,
} from "../../../../redux/index.selectors"
import "./UserHeader.styles.scss"

const UserHeader = ({
  editUserAvatar,
  clearEditUserAvatarErrorMessage,
  editUserAvatarErrorMessage,
  editUserAvatarIsLoading,
  selectedUserFullName,
  selectedUserFullNameArabic,
  selectedUserUserUuid,
  selectedUserRole,
  currentUserRole,
  role,
  avatar,
}) => {
  const [image, setImage] = useState()

  const intl = useIntl()
  const [rtl] = useRTL()

  const dialogAttributes = {
    button: {
      color: "primary",
      title: <Edit size={20} />,
      className: "edit-button btn-icon",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.USER.AVATAR" }),
      content: (
        <input
          onChange={e => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-100"
        />
      ),
      actions: [
        {
          title: editUserAvatarIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "UPDATE" })
          ),
          color: "primary",
          clickHandler: async () =>
            await editUserAvatar(
              {
                base64: image,
                fileType: "jpg",
                fileName: selectedUserUserUuid,
                folderName: "userAvatars",
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "EDIT.USER.AVATAR.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "EDIT.USER.AVATAR.SUCCESS.CONTENT",
                  }),
                },
              },
              selectedUserRole
            ),
          disabled: editUserAvatarIsLoading || !image,
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: editUserAvatarIsLoading,
        },
      ],
    },
    errorMessage: editUserAvatarErrorMessage,
    isLoading: editUserAvatarIsLoading,
    closingAction: () => {
      setImage()
      clearEditUserAvatarErrorMessage()
    },
  }
  return (
    <Row className="header-container ml-2 mb-1">
      <div className="image-container">
        <img
          src={
            avatar !== "false"
              ? `${avatar}?random=${Math.random().toString(36).substring(7)}`
              : blankAvatar
          }
        />
        {currentUserRole === "lecturer" ? (
          <></>
        ) : (
          <Dialog {...dialogAttributes} />
        )}
      </div>
      <div className="info-container">
        <div className="name">
          {rtl ? selectedUserFullNameArabic : selectedUserFullName}
        </div>
        <div className="role">
          {role ? <FormattedMessage id={role.toUpperCase()} /> : <></>}
        </div>
      </div>
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  editUserAvatarErrorMessage: selectEditUserAvatarErrorMessage,
  editUserAvatarIsLoading: selectEditUserAvatarIsLoading,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  selectedUserUserUuid: selectSelectedUserUserUuid,
  selectedUserRole: selectSelectedUserRole,
  currentUserRole: selectCurrentUserRole,
})

const mapDispatchToProps = dispatch => ({
  editUserAvatar: (requestBody, messages, role) =>
    dispatch(editUserAvatarAsync(requestBody, messages, role)),
  clearEditUserAvatarErrorMessage: () =>
    dispatch(clearEditUserAvatarErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader)
