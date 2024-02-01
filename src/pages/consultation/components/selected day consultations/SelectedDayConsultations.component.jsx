import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Bookmark } from "react-feather"
import { Spinner, Row, Col } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { Divider } from "@material-ui/core"
import Dialog from "../../../../custom/dialog/dialog.component"
import ErrorCard from "../../../../custom/errorcard/ErrorCard.component"
import TimePicker from "../../../../custom/time picker/TimePicker.component"
import ConsultationCard from "../consultation card/ConsultationCard.component"
import {
  timeChecker,
  timeFormatter,
} from "../../../../utility/custom/timeChecker"
import {
  createConsultationAsync,
  clearCreateConsultationErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectCreateConsultationErrorMessage,
  selectCreateConsultationIsLoading,
} from "../../../../redux/index.selectors"

const SelectedDayConsultations = ({
  selectedDayConsultations,
  selectedDay,
  createConsultation,
  createConsultationErrorMessage,
  createConsultationIsLoading,
}) => {
  const [selectedStartTime, setSelectedStartTime] = useState(
    new Date("1999-10-10,00:00")
  )
  const [selectedEndTime, setSelectedEndTime] = useState(
    new Date("1999-10-10,00:00")
  )

  const intl = useIntl()

  let selectedDayBookedConsultations = []
  if (selectedDayConsultations.length > 0)
    selectedDayConsultations.map(consultation => {
      if (consultation.status == "booked")
        selectedDayBookedConsultations.push(consultation)
    })

  const createConsultationDialogAttributes = {
    button: {
      color: "primary",
      title: (
        <span>
          <Bookmark size={18} className="mr-50" />
          <FormattedMessage id="CREATE.CONSULTATION" />
        </span>
      ),
      className: "w-100",
    },
    dialog: {
      title:
        intl.formatMessage({ id: "CREATING.CONSULTATION.IN" }) +
        " " +
        selectedDay,
      content: (
        <Row>
          <Col md={6}>
            <TimePicker
              classNames="marginBottom-20"
              label={intl.formatMessage({ id: "START.DATE" })}
              value={selectedStartTime}
              onChange={setSelectedStartTime}
            />
          </Col>
          <Col md={6}>
            <TimePicker
              classNames="marginBottom-20"
              label={intl.formatMessage({ id: "END.DATE" })}
              value={selectedEndTime}
              onChange={setSelectedEndTime}
            />
          </Col>
        </Row>
      ),
      actions: [
        {
          title: createConsultationIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "CREATE" })
          ),
          color: "primary",
          disabled: timeChecker(
            {
              start: timeFormatter(selectedStartTime),
              end: timeFormatter(selectedEndTime),
            },
            selectedDayBookedConsultations
          ),
          clickHandler: () =>
            createConsultation(
              {
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                reservedDate: selectedDay,
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "CREATE.CONSULTATION.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "CREATE.CONSULTATION.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: createConsultationIsLoading,
        },
      ],
    },
    isLoading: createConsultationIsLoading,
    errorMessage: createConsultationErrorMessage,
    closingAction: () => clearCreateConsultationErrorMessage(),
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Dialog {...createConsultationDialogAttributes} />
      <Divider variant="middle" />
      {selectedDayConsultations.length === 0 ? (
        <ErrorCard info={true} content="No Consultations For Today" />
      ) : (
        selectedDayConsultations.map(consultation => (
          <ConsultationCard consultation={consultation} />
        ))
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  createConsultationErrorMessage: selectCreateConsultationErrorMessage,
  createConsultationIsLoading: selectCreateConsultationIsLoading,
})

const mapDispatchToProps = dispatch => ({
  createConsultation: (requestBody, messages) =>
    dispatch(createConsultationAsync(requestBody, messages)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedDayConsultations)
