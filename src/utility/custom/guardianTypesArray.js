export const guardianTypesArray = intl => [
  { value: "mother", label: intl.formatMessage({ id: "MOTHER" }) },
  { value: "father", label: intl.formatMessage({ id: "FATHER" }) },
  {
    value: "grand mother",
    label: intl.formatMessage({ id: "GRAND.MOTHER" }),
  },
  {
    value: "grand father",
    label: intl.formatMessage({ id: "GRAND.FATHER" }),
  },
  { value: "cousin", label: intl.formatMessage({ id: "COUSIN" }) },
  { value: "sister", label: intl.formatMessage({ id: "SISTER" }) },
  {
    value: "brother",
    label: intl.formatMessage({ id: "BROTHER" }),
  },
  { value: "wife", label: intl.formatMessage({ id: "WIFE" }) },
  {
    value: "husband",
    label: intl.formatMessage({ id: "HUSBAND" }),
  },
  { value: "other", label: intl.formatMessage({ id: "OTHER" }) },
]
