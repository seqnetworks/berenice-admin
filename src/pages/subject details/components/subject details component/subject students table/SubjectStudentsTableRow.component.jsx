import React from "react"
import Avatar from "../../../../../utility/components/avatar"

const SubjectStudentsTableRow = ({ student }) => {
  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {student.studentUuid ? (
            <Avatar
              img={`${
                student.studentUserAvatar
              }?random=${Math.random().toString(36).substring(7)}`}
              imgClassName="objectFit"
              imgHeight="40"
              imgWidth="40"
            />
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.studentUuid ? student.studentUuid : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.studentFullNameArabic
            ? student.studentFullNameArabic
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {student.studentFullName ? student.studentFullName : renderEmpty()}
        </div>
      </td>
    </tr>
  )
}

export default SubjectStudentsTableRow
