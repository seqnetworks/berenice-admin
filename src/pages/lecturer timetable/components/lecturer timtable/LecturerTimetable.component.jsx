import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import WeeklyTimetable from "../../../../custom/weekly timetable/WeeklyTimetable.component"
import { selectSelectedLecturerClasses } from "../../../../redux/index.selectors"

const LecturerTimetable = ({ classes }) => {
  return <WeeklyTimetable classes={classes} />
}

const mapStateToProps = createStructuredSelector({
  classes: selectSelectedLecturerClasses,
})

export default connect(mapStateToProps)(LecturerTimetable)
