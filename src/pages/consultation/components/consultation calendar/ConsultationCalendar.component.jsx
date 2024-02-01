import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, Button, ButtonGroup } from "reactstrap"
import { Book, Check, X } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import SelectedDayConsultations from "../selected day consultations/SelectedDayConsultations.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import { selectAllConsultations } from "../../../../redux/index.selectors"
import { dateFormatterForCalendar } from "../../../../utility/custom/dateAndTimeFormatter"
import { useRTL } from "../../../../utility/hooks/useRTL"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./ConsultationCalendar.styles.scss"

const CustomToolbar = ({ label, onNavigate }) => {
  const [rtl] = useRTL()
  const buttons = [
    { nav: "PREV", translation: "PREVIOUS.MONTH" },
    { nav: "TODAY", translation: "TODAY" },
    { nav: "NEXT", translation: "NEXT.MONTH" },
  ]
  return (
    <ButtonGroup className="rbc-toolbar">
      {buttons.map(button => (
        <Button
          color="primary"
          type="button"
          onClick={() => onNavigate(button.nav)}
          style={
            rtl
              ? button.nav === "PREV"
                ? {
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }
                : button.nav === "NEXT"
                ? {
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }
                : {}
              : button.nav === "NEXT"
              ? {
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                }
              : {}
          }
        >
          <FormattedMessage id={button.translation} />
        </Button>
      ))}
      <span className="rbc-toolbar-label">{label}</span>
    </ButtonGroup>
  )
}

const ConsultationCalendar = ({ consultations }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedDayConsultations, setSelectedDayConsultations] = useState([])

  const [rtl] = useRTL()
  const intl = useIntl()

  const localizer = momentLocalizer(moment)
  let events = []
  if (consultations) {
    let booked = [],
      others = []
    consultations.map(consultation =>
      consultation.status === "booked"
        ? booked.push(consultation)
        : others.push(consultation)
    )
    consultations = [...booked, ...others]
    consultations.map(consultation => {
      let notFound = true
      events.map(event => {
        if (event.date === consultation.reservedDate) notFound = false
      })
      if (notFound)
        events.push({
          title:
            consultation.status === "booked" ? (
              <Check size={20} />
            ) : (
              <Book size={20} />
            ),
          start: new Date(consultation.reservedDate),
          end: new Date(consultation.reservedDate),
          date: consultation.reservedDate,
        })
    })
  }

  useEffect(() => {
    if (consultations) {
      const innerConsultations = []
      consultations.map(consultation => {
        if (consultation.reservedDate === selectedDay)
          innerConsultations.push(consultation)
      })
      setSelectedDayConsultations(innerConsultations)
    }
  }, [selectedDay])

  const selectedDayConsultationsDialogAttributes = {
    button: {},
    dialog: {
      title: intl.formatMessage({ id: "CONSULTATIONS IN" }) + " " + selectedDay,
      content: (
        <SelectedDayConsultations
          selectedDay={selectedDay}
          selectedDayConsultations={selectedDayConsultations}
        />
      ),
    },
    externalOpenSource: dialogIsOpen,
    setExternalOpenSource: setDialogIsOpen,
  }

  return (
    <Card className="w-100">
      <CardBody style={{ direction: "ltr" }}>
        <>
          <Dialog {...selectedDayConsultationsDialogAttributes} />
          <Calendar
            events={events}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={e => {
              setSelectedDay(dateFormatterForCalendar(e.start.toString()))
              setDialogIsOpen(true)
            }}
            components={{
              toolbar: CustomToolbar,
            }}
            longPressThreshold={10}
          />
        </>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  consultations: selectAllConsultations,
})

export default connect(mapStateToProps)(ConsultationCalendar)
