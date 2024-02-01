import React from "react"
import { Card, CardBody, Table } from "reactstrap"
import { FormattedMessage } from "react-intl"
import WeeklyTimetableRow from "./WeeklyTimetableRow.component"

const WeeklyTimetable = ({ classes }) => {
  let classesPoints = []
  if (classes)
    classes.map(
      oneClass => (classesPoints = [...classesPoints, ...oneClass.points])
    )

  const weekDays = [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
  ]
  const dayHalfHours = {
    "09:00": 0,
    "09:30": 1,
    "10:00": 2,
    "10:30": 3,
    "11:00": 4,
    "11:30": 5,
    "12:00": 6,
    "12:30": 7,
    "13:00": 8,
    "13:30": 9,
    "14:00": 10,
    "14:30": 11,
    "15:00": 12,
    "15:30": 13,
    "16:00": 14,
    "16:30": 15,
    "17:00": 16,
    "17:30": 17,
    "18:00": 18,
    "18:30": 19,
  }
  return (
    <Card>
      <CardBody>
        <Table
          size="sm"
          bordered
          responsive
          className="custom-table overflow-y-hidden"
          border="10px"
          style={{ overflowX: "hidden" }}
        >
          <thead>
            <tr>
              <th></th>
              {weekDays.map(day => (
                <th style={{ color: "#fff", textAlign: "center" }}>
                  <FormattedMessage id={day} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(dayHalfHours).map(halfHour => (
              <WeeklyTimetableRow
                time={halfHour}
                firstPoint={dayHalfHours[halfHour]}
                points={classesPoints}
              />
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default WeeklyTimetable
