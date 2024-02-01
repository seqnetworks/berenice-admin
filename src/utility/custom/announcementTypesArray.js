export const announcementTypesArray = intl => [
  {
    value: "default",
    label: intl.formatMessage({ id: "DEFAULT" }),
  },
  {
    value: "important",
    label: intl.formatMessage({ id: "IMPORTANT" }),
  },
]

export const announcementTypesArrayWithTitle = intl => [
  {
    value: "normal",
    title: intl.formatMessage({ id: "DEFAULT" }),
  },
  {
    value: "important",
    title: intl.formatMessage({ id: "IMPORTANT" }),
  },
]
