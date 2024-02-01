import React, { useState, useEffect } from "react"
import { Col, Input, Button, Spinner } from "reactstrap"
import { X, Check, Filter } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { updateStaffTypeAsync } from "../../../../../../redux/index.actions"
import { selectUpdateStaffTypeIsLoading } from "../../../../../../redux/index.selectors"
import { staffTypesArray } from "../../../../../../utility/custom/staffTypesArray"

const ChangeStaffType = ({
  staffId,
  staffType,
  updateStaffType,
  updateStaffTypeIsLoading,
}) => {
  const [initialStaffType, setInitialStaffType] = useState("")
  const [selectedStaffType, setSelectedStaffType] = useState("")
  const [isEditingStaffType, setIsEditingStaffType] = useState(false)

  useEffect(() => {
    setInitialStaffType(staffType)
    setSelectedStaffType(staffType)
  }, [])

  const intl = useIntl()
  return (
    <Col
      xs={12}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "12px 0",
        }}
      >
        <Filter size={18} />
        <h4 className="mb-0 ml-75">
          <FormattedMessage id="STAFF.TYPE" />
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          type="select"
          style={{ width: "85%" }}
          disabled={!isEditingStaffType || updateStaffTypeIsLoading}
          readOnly={!isEditingStaffType || updateStaffTypeIsLoading}
          value={selectedStaffType}
          onChange={e => setSelectedStaffType(e.target.value)}
        >
          {staffTypesArray(intl).map(type => (
            <option style={{ margin: "8px" }} value={type.value}>
              {type.title}
            </option>
          ))}
        </Input>
        {isEditingStaffType ? (
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
                initialStaffType === selectedStaffType ||
                updateStaffTypeIsLoading
              }
              type="button"
              color="success"
              onClick={() =>
                updateStaffType(
                  {
                    staffId: staffId,
                    staffType: selectedStaffType,
                  },
                  {
                    success: {
                      title: intl.formatMessage({
                        id: "UPDATE.STAFF.TYPE.SUCCESS.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "UPDATE.STAFF.TYPE.SUCCESS.CONTENT",
                      }),
                    },
                    error: {
                      title: intl.formatMessage({
                        id: "UPDATE.STAFF.TYPE.ERROR.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "UPDATE.STAFF.TYPE.ERROR.CONTENT",
                      }),
                    },
                  }
                )
              }
            >
              {updateStaffTypeIsLoading ? (
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
              disabled={updateStaffTypeIsLoading}
              onClick={() => {
                setIsEditingStaffType(false)
                setSelectedStaffType(initialStaffType)
              }}
              color="danger"
            >
              <X size={18} />
            </Button>
          </div>
        ) : (
          <Button
            className="p-50 ml-50 input-custom-animation-2"
            onClick={() => setIsEditingStaffType(true)}
            color="primary"
          >
            <FormattedMessage id="CHANGE" />
          </Button>
        )}
      </div>
    </Col>
  )
}

const mapStateToProps = createStructuredSelector({
  updateStaffTypeIsLoading: selectUpdateStaffTypeIsLoading,
})

const mapDispatchToProps = dispatch => ({
  updateStaffType: (requestBody, messages) =>
    dispatch(updateStaffTypeAsync(requestBody, messages)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStaffType)
