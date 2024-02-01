import React from "react"
import { useRTL } from "../../../../../utility/hooks/useRTL"

const StudentDetailedPaymentsTableRow = ({ subject }) => {
  const [rtl] = useRTL()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectCode ? subject.subjectCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {rtl
            ? subject.subjectTitleArabic
              ? subject.subjectTitleArabic
              : renderEmpty()
            : subject.subjectTitle
            ? subject.subjectTitle
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectHours ? subject.subjectHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectPrice ? subject.subjectPrice : renderEmpty()}
        </div>
      </td>
    </tr>
  )
}

export default StudentDetailedPaymentsTableRow
