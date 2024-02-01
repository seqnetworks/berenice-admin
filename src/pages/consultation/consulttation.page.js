import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { getCurrentUserConsultationsAsync } from "../../redux/index.actions"
import {
  selectGetCurrentUserConsultationsErrorMessage,
  selectGetCurrentUserConsultationsIsLoading,
} from "../../redux/index.selectors"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import ConsultationCalendar from "./components/consultation calendar/ConsultationCalendar.component"

//--------WITH SPINNER---------
const ConsultationCalendarWithSpinner = WithSpinner(ConsultationCalendar)
//-----------------------------

const ConsultationPage = ({
  getCurrentUserConsultations,
  getCurrentUserConsultationsErrorMessage,
  getCurrentUserConsultationsIsLoading,
}) => {
  return (
    <ConsultationCalendarWithSpinner
      card={true}
      errorMessage={getCurrentUserConsultationsErrorMessage}
      isLoading={getCurrentUserConsultationsIsLoading}
      toBeDispatchedTryAgain={getCurrentUserConsultations}
      toBeDispatchedUseEffect={getCurrentUserConsultations}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  getCurrentUserConsultationsErrorMessage: selectGetCurrentUserConsultationsErrorMessage,
  getCurrentUserConsultationsIsLoading: selectGetCurrentUserConsultationsIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getCurrentUserConsultations: () =>
    dispatch(getCurrentUserConsultationsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationPage)
