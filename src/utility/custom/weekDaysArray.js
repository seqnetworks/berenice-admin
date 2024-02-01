const weekDaysArray = intl => [
  { title: "", value: "" },
  { title: intl.formatMessage({ id: "SATURDAY" }), value: "saturday" },
  { title: intl.formatMessage({ id: "SUNDAY" }), value: "sunday" },
  { title: intl.formatMessage({ id: "MONDAY" }), value: "monday" },
  { title: intl.formatMessage({ id: "TUESDAY" }), value: "tuesday" },
  { title: intl.formatMessage({ id: "WEDNESDAY" }), value: "wednesday" },
  { title: intl.formatMessage({ id: "THURSDAY" }), value: "thursday" },
  { title: intl.formatMessage({ id: "FRIDAY" }), value: "friday" },
]

export default weekDaysArray
