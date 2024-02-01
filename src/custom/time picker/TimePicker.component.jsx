import React, { Fragment, useState } from "react"
import { Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import { timeFormatter } from "../../utility/custom/timeChecker"

const TimePicker = ({ label, value, onChange, classNames, name }) => (
  <Fragment>
    <Label>{label}</Label>
    <Flatpickr
      className={`form-control ${classNames}`}
      value={value}
      options={{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
      }}
      onChange={e => onChange(timeFormatter(e))}
      name={name}
    />
  </Fragment>
)

export default TimePicker
