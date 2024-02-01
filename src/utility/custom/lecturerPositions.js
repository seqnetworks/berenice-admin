export const lecturerPositions = intl => [
  { value: "", title: "" },
  {
    value: "senior",
    title: intl.formatMessage({ id: "SENIOR.LECTURER" }),
  },
  {
    value: "junior",
    title: intl.formatMessage({ id: "JUNIOR.LECTURER" }),
  },
]

export const lecturerPositionsEditing = intl => [
  {
    value: "senior",
    title: intl.formatMessage({ id: "SENIOR.LECTURER" }),
  },
  {
    value: "junior",
    title: intl.formatMessage({ id: "JUNIOR.LECTURER" }),
  },
]
