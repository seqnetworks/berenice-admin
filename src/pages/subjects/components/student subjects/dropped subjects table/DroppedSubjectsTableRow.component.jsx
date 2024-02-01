import React from "react"
import { FormattedMessage } from "react-intl"
import { useRTL } from "../../../../../utility/hooks/useRTL"

const DroppedSubjectsTableRow = ({ subject }) => {
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
        <div className="d-flex align-items-center">
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
          {subject.subjectSemester ? subject.subjectSemester : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {subject.subjectType ? (
            <FormattedMessage id={subject.subjectType.toUpperCase()} />
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
    </tr>
  )
}

export default DroppedSubjectsTableRow
