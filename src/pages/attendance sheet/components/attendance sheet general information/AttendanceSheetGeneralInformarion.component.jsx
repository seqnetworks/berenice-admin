import React from "react"
import { useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"
import { Card, CardHeader, CardBody } from "reactstrap"
import { selectSelectedAttendanceSheetInfo } from "../../../../redux/index.selectors"
import "../../../subject details/components/subject general information/SubjectGeneralInformation.styles.scss"

const AttendanceSheetGeneralInformarion = () => {
  const info = useSelector(selectSelectedAttendanceSheetInfo)

  const subHeader = [
    {
      title: <FormattedMessage id="SUBJECT.CODE" />,
      content: info.subjectCode,
    },
    {
      title: <FormattedMessage id="DAY" />,
      content: (
        <FormattedMessage
          id={info.day.toUpperCase() ? info.day.toUpperCase() : "D"}
        />
      ),
    },
    { title: <FormattedMessage id="TIME.RANGE" />, content: info.timeRange },
    { title: <FormattedMessage id="ROOM" />, content: info.room },
  ]

  return (
    <Card className="attendance-sheet-card">
      <CardHeader>
        <span className="attendance-sheet-card-header">
          <span className="mr-50">
            <FormattedMessage id="ATTENDANCE.SHEETS.OF" />
          </span>
          {info.classDate}
        </span>
      </CardHeader>

      <CardBody className="attendance-sheet-card-sub-header">
        {subHeader.map(item => (
          <div className="attendance-sheet-card-sub-header-block">
            <span className="mr-50 text-primary attendance-sheet-card-sub-header-block-title">
              {item.title}
            </span>
            {item.content}
          </div>
        ))}
      </CardBody>
      <div />
    </Card>
  )
}

export default AttendanceSheetGeneralInformarion
