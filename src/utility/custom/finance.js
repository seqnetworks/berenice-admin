export const paymentTypes = intl => [
  { title: "", value: "" },
  { title: intl.formatMessage({ id: "CASH" }), value: "cash" },
  { title: intl.formatMessage({ id: "CHEQUE" }), value: "cheque" },
]

export const transactionTypes = intl => [
  { title: "", value: "" },
  { title: intl.formatMessage({ id: "DEPOSIT" }), value: "deposit" },
  { title: intl.formatMessage({ id: "WITHDRAW" }), value: "withdraw" },
]
