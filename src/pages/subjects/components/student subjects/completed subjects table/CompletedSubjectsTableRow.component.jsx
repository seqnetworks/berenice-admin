import React from "react"
import { Badge } from "reactstrap"
import { FormattedMessage } from "react-intl"
import { useRTL } from "../../../../../utility/hooks/useRTL"

const CompletedSubjectsTableRow = ({ subject }) => {
  const [rtl] = useRTL()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const color = {
    passed: "success",
    failed: "danger",
  }

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
        <div className="d-flex align-items-center ">
          {subject.subjectStatus ? (
            <Badge color={`light-${color[subject.subjectStatus]}`}>
              <FormattedMessage id={subject.subjectStatus.toUpperCase()} />
            </Badge>
          ) : (
            renderEmpty()
          )}
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

export default CompletedSubjectsTableRow
