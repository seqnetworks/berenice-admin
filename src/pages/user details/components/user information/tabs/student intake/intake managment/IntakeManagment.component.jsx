import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Activity, Award, Hash } from "react-feather"
import { Divider } from "@material-ui/core"
import { FormattedMessage } from "react-intl"
import ChangeStudentIntake from "./ChangeStudentIntake.component"
import ChangeStudentIntakeStatus from "./ChangeStudentIntakeStatus.component"
import ChangeStudentCGPA from "./ChangeStudentCGPA.component"
import { selectSelectedUserCurrentIntakeCode } from "../../../../../../../redux/index.selectors"

const IntakeManagment = ({ studentIntakeCode }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <h3 className="m-0">
        <FormattedMessage id="CURRENT.STUDENT.INTAKE" />
      </h3>
      <h4 className="m-0 ml-50 mt-25">{studentIntakeCode}</h4>
    </div>
    <Divider className="mb-50" />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "12px 0",
      }}
    >
      <Award size={18} />
      <h4 className="mb-0 ml-75">
        <FormattedMessage id="CHANGE.INTAKE" />
      </h4>
    </div>
    <ChangeStudentIntake />
    <Divider className="mb-50" />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "12px 0",
      }}
    >
      <Activity size={18} />
      <h4 className="mb-0 ml-75">
        <FormattedMessage id="CHANGE.INTAKE.STATUS" />
      </h4>
    </div>
    <ChangeStudentIntakeStatus />
    <Divider className="mb-50" />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "12px 0",
      }}
    >
      <Hash size={18} />
      <h4 className="mb-0 ml-75">
        <FormattedMessage id="STUDENT.CGPA" />
      </h4>
    </div>
    <ChangeStudentCGPA />
  </div>
)

const mapStateToProps = createStructuredSelector({
  studentIntakeCode: selectSelectedUserCurrentIntakeCode,
})

export default connect(mapStateToProps)(IntakeManagment)
