export const timeChecker = (timeRange, selectedDayBookedConsultations) => {
  let found = false
  let startTimeHours = parseInt(timeRange.start.slice(0, 2))
  let startTimeMinutes = parseInt(timeRange.start.slice(3))
  let endTimeHours = parseInt(timeRange.end.slice(0, 2))
  let endTimeMinutes = parseInt(timeRange.end.slice(3))
  selectedDayBookedConsultations.map(consultation => {
    let consultationStartTimeHours = parseInt(
      consultation.startTime.slice(0, 2)
    )
    let consultationStartTimeMinutes = parseInt(consultation.startTime.slice(3))
    let consultationEndTimeHours = parseInt(consultation.endTime.slice(0, 2))
    let consultationEndTimeMinutes = parseInt(consultation.endTime.slice(3))
    if (
      (parseInt(startTimeHours * 60 + startTimeMinutes) >=
        parseInt(
          consultationStartTimeHours * 60 + consultationStartTimeMinutes
        ) &&
        parseInt(startTimeHours * 60 + startTimeMinutes) <=
          parseInt(
            consultationEndTimeHours * 60 + consultationEndTimeMinutes
          )) ||
      (parseInt(endTimeHours * 60 + endTimeMinutes) >=
        parseInt(
          consultationStartTimeHours * 60 + consultationStartTimeMinutes
        ) &&
        parseInt(endTimeHours * 60 + endTimeMinutes) <=
          parseInt(
            consultationEndTimeHours * 60 + consultationEndTimeMinutes
          )) ||
      (parseInt(startTimeHours * 60 + startTimeMinutes) <=
        parseInt(
          consultationStartTimeHours * 60 + consultationStartTimeMinutes
        ) &&
        parseInt(endTimeHours * 60 + endTimeMinutes) >=
          parseInt(
            consultationEndTimeHours * 60 + consultationEndTimeMinutes
          )) ||
      parseInt(endTimeHours * 60 + endTimeMinutes) <=
        parseInt(startTimeHours * 60 + startTimeMinutes)
    )
      found = true
  })
  return found
}

export const timeFormatter = time => time.toString().slice(16, 21)
