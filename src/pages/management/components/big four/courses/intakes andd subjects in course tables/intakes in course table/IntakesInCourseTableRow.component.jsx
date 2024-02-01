import React from "react"
import { Badge } from "reactstrap"
import { Info } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import Popover from "../../../../../../../custom/popover/Popover.component"

const IntakesTableRow = ({ intake }) => {
  const intl = useIntl()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const helper = {
    row: {
      open: "success",
      closed: "danger",
    },
  }

  const moreIntakeDetailsPopoverAttributes = {
    button: {
      color: "flat-primary",
      title: <Info size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    unique: intake.code,
    place: "top",
    title: intl.formatMessage({ id: "MORE.INTAKE.DETAILS" }),
    content: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "INTAKE.DATE" }) + " :"}</b>
          <span className="ml-25">{intake.intakeYearMonth.slice(0, 10)}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "SEMESTER" }) + " :"}</b>
          <span className="ml-25">{intake.semester}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <b>{intl.formatMessage({ id: "COURSE.CODE" }) + " :"}</b>
          <span className="ml-25">{intake.courseCode}</span>
        </div>
      </div>
    ),
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {intake.code ? intake.code : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.minHours ? intake.minHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.maxHours ? intake.maxHours : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {intake.enrollmentStatus ? (
            <Badge color={`light-${helper.row[intake.enrollmentStatus]}`}>
              <FormattedMessage id={intake.enrollmentStatus.toUpperCase()} />
            </Badge>
          ) : (
            renderEmpty()
          )}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Popover {...moreIntakeDetailsPopoverAttributes} />
        </div>
      </td>
    </tr>
  )
}

export default IntakesTableRow
