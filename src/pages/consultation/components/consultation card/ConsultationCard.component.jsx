import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Activity, Watch, Calendar } from "react-feather"
import { Spinner } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import Dialog from "../../../../custom/dialog/dialog.component"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  deleteConsultationAsync,
  clearDeleteConsultationErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectDeleteConsultationErrorMessage,
  selectDeleteConsultationIsLoading,
} from "../../../../redux/index.selectors"
import "./ConsultationCard.styles.scss"

const ConsultationCard = ({
  consultation,
  deleteConsultation,
  clearDeleteConsultationErrorMessage,
  deleteConsultationErrorMessage,
  deleteConsultationIsLoading,
}) => {
  const intl = useIntl()
  const [rtl] = useRTL()

  const deleteConsultationDialogAttributes = {
    button: {
      color: "primary",
      title: intl.formatMessage({ id: "CANCEL" }),
      className: "p-75",
    },
    dialog: {
      title: intl.formatMessage({ id: "CANCELING.CONSULTATION" }),
      content: (
        <h5>
          <FormattedMessage id="ARE.YOU.SURE.YOU.WANT.TO.CANCEL.THIS.CONSULTATION" />
        </h5>
      ),
      actions: [
        {
          title: deleteConsultationIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "CANCEL" })
          ),
          color: "primary",
          clickHandler: () =>
            deleteConsultation(
              consultation.uuid,
              consultation.status === "unbooked",
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.CONSULTATION.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.CONSULTATION.SUCCESS.CONTENT",
                  }),
                },
              },
              consultation.status === "booked"
                ? consultation.studentUserUuid
                : false,
              consultation.status === "booked"
                ? consultation.lecturerFullNameArabic
                : false
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteConsultationIsLoading,
        },
      ],
    },
    isLoading: deleteConsultationIsLoading,
    errorMessage: deleteConsultationErrorMessage,
    closingAction: () => clearDeleteConsultationErrorMessage(),
  }
  return (
    <div
      className={`consultation-card consultation-card-${consultation.status}`}
    >
      {consultation.studentFullName && (
        <h2 className="mb-75">
          {rtl
            ? consultation.studentFullNameArabic
            : consultation.studentFullName}
        </h2>
      )}
      <div className="consultation-activity">
        <div className="consultation-info ml-50">
          <span className="info">
            <Calendar className="mr-50" size={15} />
            {consultation.reservedDate}
          </span>
          <span className="info">
            <Watch className="mr-50" size={15} />
            {consultation.startTime.slice(0, 5)} -{" "}
            {consultation.endTime.slice(0, 5)}
          </span>
          <span className="info">
            <Activity className="mr-50" size={15} />
            <FormattedMessage id={consultation.status.toUpperCase()} />
          </span>
        </div>
        {consultation.status !== "cancelled" ? (
          <Dialog {...deleteConsultationDialogAttributes} />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteConsultationErrorMessage: selectDeleteConsultationErrorMessage,
  deleteConsultationIsLoading: selectDeleteConsultationIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteConsultation: (
    consultationUuid,
    unbooked,
    messages,
    studentUserUuid,
    lecturerFullNameArabic
  ) =>
    dispatch(
      deleteConsultationAsync(
        consultationUuid,
        unbooked,
        messages,
        studentUserUuid,
        lecturerFullNameArabic
      )
    ),
  clearDeleteConsultationErrorMessage: () =>
    dispatch(clearDeleteConsultationErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationCard)
