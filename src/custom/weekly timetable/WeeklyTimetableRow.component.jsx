import { range } from "lodash"
import React from "react"
import "./WeeklyTimetableRow.styles.scss"

const WeeklyTimetableRow = ({ time, firstPoint, points }) => {
  return (
    <tr>
      <td className="first-col">{time}</td>
      {range(6).map(day => {
        let found = false,
          unique = false
        points.map(point => {
          if (point.split(".")[0] == firstPoint && point.split(".")[1] == day) {
            found = true
            if (point.split(".")[2])
              point.split(".")[2] === "0"
                ? (unique = "last")
                : (unique = point.split(".")[2])
          }
        })
        return (
          <td
            className={`px-50 other-col${
              found
                ? unique
                  ? unique === "last"
                    ? "-triggered-last"
                    : "-triggered-first"
                  : "-triggered"
                : ""
            }`}
          >
            <div
              className={
                found
                  ? unique
                    ? unique === "last"
                      ? "unique-last"
                      : "unique-first"
                    : "not-unique"
                  : ""
              }
            >
              <h4 className="py-50" style={{ color: "white", margin: "0" }}>
                {found ? (unique ? (unique === "last" ? "" : unique) : "") : ""}
              </h4>
            </div>
          </td>
        )
      })}
    </tr>
  )
}

export default WeeklyTimetableRow
