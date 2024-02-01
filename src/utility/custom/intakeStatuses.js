const intakeStatuses = intl => [
  { label: intl.formatMessage({ id: "ONGOING" }), value: "onGoing" },
  { label: intl.formatMessage({ id: "PASSED" }), value: "passed" },
  { label: intl.formatMessage({ id: "FAILED" }), value: "failed" },
  { label: intl.formatMessage({ id: "CANCELLED" }), value: "cancelled" },
  { label: intl.formatMessage({ id: "ON.HOLD" }), value: "onHold" },
]

export default intakeStatuses
