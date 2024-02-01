import React from "react"
import { useIntl } from "react-intl"
import { useRTL } from "../../../../utility/hooks/useRTL"

const ConsultationsTableRow = ({ consultation, requestBody }) => {
  const intl = useIntl()
  const [rtl] = useRTL()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {requestBody.lecturerUuid
            ? rtl
              ? consultation.studentFullNameArabic
                ? consultation.studentFullNameArabic
                : renderEmpty()
              : consultation.studentFullName
              ? consultation.studentFullName
              : renderEmpty()
            : rtl
            ? consultation.lecturerFullNameArabic
              ? consultation.lecturerFullNameArabic
              : renderEmpty()
            : consultation.lecturerFullName
            ? consultation.lecturerFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {consultation.status
            ? intl.formatMessage({ id: consultation.status.toUpperCase() })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {consultation.reservedDate
            ? consultation.reservedDate
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {consultation.startTime && consultation.endTime
            ? consultation.startTime.slice(0, 5) +
              " - " +
              consultation.endTime.slice(0, 5)
            : renderEmpty()}
        </div>
      </td>
    </tr>
  )
}

export default ConsultationsTableRow
