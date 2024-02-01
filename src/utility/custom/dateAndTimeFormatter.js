export const dateAndTimeFormatter = date => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()

  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  if (hour < 10) hour = `0${hour}`
  if (minute < 10) minute = `0${minute}`

  return `${hour}:${minute}, ${year}-${month}-${day}`
}

export const dateAndTimeFormatterString = date =>
  date.slice(0, 10) + ", " + date.slice(11, 19)

export const dateFormatterForCalendar = date => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  }
  return `${date.slice(11, 15)}-${months[date.slice(4, 7)]}-${date.slice(
    8,
    10
  )}`
}
