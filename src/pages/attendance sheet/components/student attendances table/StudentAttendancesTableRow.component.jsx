import React, { useContext } from "react"
import { Input } from "reactstrap"
import { useIntl } from "react-intl"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"

const SubjectStudentsTableRow = ({ student, statuses, setStatuses }) => {
  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const innerStatuses = [
    { title: intl.formatMessage({ id: "ABSENT" }), value: "absent" },
    { title: intl.formatMessage({ id: "PRESENT" }), value: "present" },
    { title: intl.formatMessage({ id: "LATE" }), value: "late" },
    {
      title: intl.formatMessage({ id: "ABSENT.WITH.REASON" }),
      value: "absent with reason",
    },
  ]

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {student.studentUuid ? student.studentUuid : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {rtl
            ? student.fullNameArabic
              ? student.fullNameArabic
              : renderEmpty()
            : student.fullName
            ? student.fullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.status ? (
            <Input
              onChange={e => {
                setStatuses({
                  ...statuses,
                  [student.studentUuid]: {
                    ...statuses[student.studentUuid],
                    status: e.target.value,
                  },
                })
              }}
              type="select"
              style={{ minWidth: "170px" }}
              size="sm"
              value={statuses[student.studentUuid]?.status}
              disabled={!ability.can("manage", "mark_attendance-PUT")}
            >
              {innerStatuses.map(status => (
                <option value={status.value}>{status.title}</option>
              ))}
            </Input>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          <Input
            disabled={
              statuses[student.studentUuid]?.status !== "absent with reason" ||
              !ability.can("manage", "mark_attendance-PUT")
            }
            value={statuses[student.studentUuid]?.absenceReason}
            onChange={e => {
              setStatuses({
                ...statuses,
                [student.studentUuid]: {
                  ...statuses[student.studentUuid],
                  absenceReason: e.target.value,
                },
              })
            }}
            style={{ minWidth: "200px" }}
            size="sm"
          />
        </div>
      </td>
    </tr>
  )
}

export default SubjectStudentsTableRow
