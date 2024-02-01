import React, { useState, useEffect } from "react"
import { Col, Input, Button, Spinner } from "reactstrap"
import { X, Check, Award } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { editLecturerPositionAsync } from "../../../../../../redux/index.actions"
import { selectEditLecturerPositionIsLoading } from "../../../../../../redux/index.selectors"
import { lecturerPositionsEditing } from "../../../../../../utility/custom/lecturerPositions"

const EditLecturerPosition = ({
  lecturerUuid,
  lecturerPosition,
  editLecturerPosition,
  editLecturerPositionIsLoading,
}) => {
  const [initialLecturerPosition, setInitialLecturerPosition] = useState("")
  const [selectedLecturerPosition, setSelectedLecturerPosition] = useState("")
  const [isEditingLecturerPosition, setIsEditingLecturerPosition] = useState(
    false
  )

  const intl = useIntl()

  useEffect(() => {
    setInitialLecturerPosition(lecturerPosition)
    setSelectedLecturerPosition(lecturerPosition)
  }, [])

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
        <Award size={18} />
        <h4 className="mb-0 ml-75">
          <FormattedMessage id="LECTURER.POSITION" />
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
          disabled={!isEditingLecturerPosition || editLecturerPositionIsLoading}
          readOnly={!isEditingLecturerPosition || editLecturerPositionIsLoading}
          value={selectedLecturerPosition}
          onChange={e => setSelectedLecturerPosition(e.target.value)}
        >
          {lecturerPositionsEditing(intl).map(position => (
            <option style={{ margin: "8px" }} value={position.value}>
              {position.title}
            </option>
          ))}
        </Input>
        {isEditingLecturerPosition ? (
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
                initialLecturerPosition === selectedLecturerPosition ||
                editLecturerPositionIsLoading
              }
              type="button"
              color="success"
              onClick={() =>
                editLecturerPosition(
                  {
                    lecturerUuid: lecturerUuid,
                    position: selectedLecturerPosition,
                  },
                  {
                    success: {
                      title: intl.formatMessage({
                        id: "EDIT.LECTURER.POSITION.SUCCESS.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "EDIT.LECTURER.POSITION.SUCCESS.CONTENT",
                      }),
                    },
                    error: {
                      title: intl.formatMessage({
                        id: "EDIT.LECTURER.POSITION.ERROR.TITLE",
                      }),
                      content: intl.formatMessage({
                        id: "EDIT.LECTURER.POSITION.ERROR.CONTENT",
                      }),
                    },
                  }
                )
              }
            >
              {editLecturerPositionIsLoading ? (
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
              disabled={editLecturerPositionIsLoading}
              onClick={() => {
                setIsEditingLecturerPosition(false)
                setSelectedLecturerPosition(initialLecturerPosition)
              }}
              color="danger"
            >
              <X size={18} />
            </Button>
          </div>
        ) : (
          <Button
            className="p-50 ml-50 input-custom-animation-2"
            onClick={() => setIsEditingLecturerPosition(true)}
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
  editLecturerPositionIsLoading: selectEditLecturerPositionIsLoading,
})

const mapDispatchToProps = dispatch => ({
  editLecturerPosition: (requestBody, messages) =>
    dispatch(editLecturerPositionAsync(requestBody, messages)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLecturerPosition)
