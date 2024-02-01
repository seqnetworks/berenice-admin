export const studentTypesArray = intl => [
  {
    value: "",
    title: "",
  },
  {
    value: "full-time",
    title: intl.formatMessage({ id: "FULL.TIME" }),
  },
  {
    value: "part-time",
    title: intl.formatMessage({ id: "PART.TIME" }),
  },
]

export const studentStatusArray = intl => [
  {
    value: "",
    title: "",
  },
  {
    value: "enrolled",
    title: intl.formatMessage({ id: "ENROLLED" }),
  },
  {
    value: "dismissed",
    title: intl.formatMessage({ id: "DISMISSED" }),
  },
  {
    value: "on hold",
    title: intl.formatMessage({ id: "ON.HOLD" }),
  },
]
