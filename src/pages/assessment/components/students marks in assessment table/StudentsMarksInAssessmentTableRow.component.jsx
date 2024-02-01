import React, { useContext } from "react"
import { Input } from "reactstrap"
import NumericInput from "react-numeric-input"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import "./StudentsMarksInAssessmentTableRow.styles.scss"

const StudentsMarksInAssessmentTableRow = ({
  student,
  marks,
  setMarks,
  overallMark,
}) => {
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const grades = [
    { title: "AA", value: "AA" },
    { title: "A", value: "A" },
    { title: "BB", value: "BB" },
    { title: "B", value: "B" },
    { title: "CC", value: "CC" },
    { title: "C", value: "C" },
    { title: "DD", value: "DD" },
    { title: "D", value: "D" },
    { title: "F", value: "F" },
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
            ? student.studentFullNameArabic
              ? student.studentFullNameArabic
              : renderEmpty()
            : student.studentFullName
            ? student.studentFullName
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.mark || student.mark === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <NumericInput
                onChange={e =>
                  setMarks({
                    ...marks,
                    [student.studentUuid]: {
                      ...marks[student.studentUuid],
                      mark: e,
                    },
                  })
                }
                value={marks[student.studentUuid]?.mark}
                mobile={true}
                max={overallMark}
                min={0}
                style={{ outline: "none" }}
                className="no-outline"
                step={0.25}
                size={5}
                disabled={!ability.can("manage", "mark_results-PUT")}
              />
              <span style={{ marginLeft: "5px" }}>/{overallMark}</span>
            </div>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          <Input
            value={marks[student.studentUuid]?.grade}
            onChange={e => {
              setMarks({
                ...marks,
                [student.studentUuid]: {
                  ...marks[student.studentUuid],
                  grade: e.target.value,
                },
              })
            }}
            style={{ minWidth: "150px" }}
            size="sm"
            type="select"
          >
            {grades.map(grade => (
              <option value={grade.value}>{grade.title}</option>
            ))}
          </Input>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          <Input
            value={marks[student.studentUuid]?.note}
            onChange={e => {
              setMarks({
                ...marks,
                [student.studentUuid]: {
                  ...marks[student.studentUuid],
                  note: e.target.value,
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

export default StudentsMarksInAssessmentTableRow
