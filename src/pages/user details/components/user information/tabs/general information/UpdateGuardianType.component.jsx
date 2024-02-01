import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Edit3 } from "react-feather"
import { guardianTypesArray } from "../../../../../../utility/custom/guardianTypesArray"
import Dialog from "../../../../../../custom/dialog/dialog.component"
import Select from "../../../../../../custom/select/select.component"
import {
  updateGuardianTypeAsync,
  clearUpdateGuardianTypeErrorMessage,
} from "../../../../../../redux/index.actions"
import {
  selectUpdateGuardianTypeErrorMessage,
  selectUpdateGuardianTypeIsLoading,
} from "../../../../../../redux/index.selectors"

const UpdateGuardianType = ({
  updateGuardianType,
  clearUpdateGuardianTypeErrorMessage,
  updateGuardianTypeErrorMessage,
  updateGuardianTypeIsLoading,
  guardianType,
  studentGuardianUuid,
  type,
  id,
}) => {
  const [initialGuardianType, setInitialGuardianType] = useState("")
  const [selectedGuardianType, setSelectedGuardianType] = useState("")

  useEffect(() => {
    setInitialGuardianType(guardianType)
    setSelectedGuardianType(guardianType)
  }, [])
  const intl = useIntl()

  const dialogAttributes = {
    button: {
      className: "mx-50 btn-icon p-25",
      color: "flat-secondary",
      title: <Edit3 size={25} />,
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.GUARDIAN.TYPE" }),
      content: (
        <Select
          height={120}
          handleChange={e => setSelectedGuardianType(e)}
          stylesClassnames="marginBottom-130"
          placeHolder={intl.formatMessage({ id: "GUARDIAN.TYPE" })}
          value={selectedGuardianType}
          array={guardianTypesArray(intl)}
        />
      ),
      actions: [
        {
          color: "primary",
          title: intl.formatMessage({ id: "CHANGE" }),
          disabled: selectedGuardianType
            ? selectedGuardianType.value === initialGuardianType.value
            : true,
          clickHandler: () =>
            updateGuardianType(
              {
                guardianType: selectedGuardianType.value,
                id: id,
                type: type,
                studentGuardianUuid: studentGuardianUuid,
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "UPDATE.GUARDIAN.TYPE.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "UPDATE.STAFF.TYPE.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          color: "secondary",
          title: intl.formatMessage({ id: "CANCEL" }),
        },
      ],
    },
    closingAction: () => {
      clearUpdateGuardianTypeErrorMessage()
      setSelectedGuardianType(initialGuardianType)
    },
    errorMessage: updateGuardianTypeErrorMessage,
    isLoading: updateGuardianTypeIsLoading,
  }
  return <Dialog {...dialogAttributes} />
}

const mapStateToProps = createStructuredSelector({
  updateGuardianTypeErrorMessage: selectUpdateGuardianTypeErrorMessage,
  updateGuardianTypeIsLoading: selectUpdateGuardianTypeIsLoading,
})

const mapDispatchToProps = dispatch => ({
  updateGuardianType: (requestAssets, messages) =>
    dispatch(updateGuardianTypeAsync(requestAssets, messages)),
  clearUpdateGuardianTypeErrorMessage: () =>
    dispatch(clearUpdateGuardianTypeErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGuardianType)
