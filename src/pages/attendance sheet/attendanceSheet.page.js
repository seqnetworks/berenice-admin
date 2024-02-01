import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col } from "reactstrap"
import StudentAttendancesTable from "./components/student attendances table/StudentAttendancesTable.component"
import AttendanceSheetGeneralInformarion from "./components/attendance sheet general information/AttendanceSheetGeneralInformarion.component"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import BackButton from "../../custom/back button/BackButton.component"
import { getAllStudentsAttendancesInAttendanceSheetAsync } from "../../redux/index.actions"
import {
  selectSelectedAttendanceSheetInfo,
  selectGetAllStudentsAttendancesInAttendanceSheetErrorMessage,
  selectGetAllStudentsAttendancesInAttendanceSheetIsLoading,
} from "../../redux/index.selectors"
//--------WITH SPIINNERS--------
const StudentAttendancesTableWithSpinner = WithSpinner(StudentAttendancesTable)
//------------------------------

const AttendanceSheetPage = ({
  getAllStudentsAttendancesInAttendanceSheet,
  info,
  getAllStudentsAttendancesInAttendanceSheetErrorMessage,
  getAllStudentsAttendancesInAttendanceSheetIsLoading,
}) => (
  <Row>
    <BackButton messageId="BACK.TO.SUBJECT" />
    <Col xs={12}>
      <AttendanceSheetGeneralInformarion />
    </Col>
    <Col xs={12}>
      <StudentAttendancesTableWithSpinner
        card={true}
        errorMessage={getAllStudentsAttendancesInAttendanceSheetErrorMessage}
        isLoading={getAllStudentsAttendancesInAttendanceSheetIsLoading}
        toBeDispatchedUseEffect={getAllStudentsAttendancesInAttendanceSheet}
        toBeDispatchedTryAgain={getAllStudentsAttendancesInAttendanceSheet}
        toBeDispatchedPropsTryAgain={{
          attendanceUuid: info.uuid,
          classDate: info.classDate,
        }}
        toBeDispatchedPropsUseEffect={{
          attendanceUuid: info.uuid,
          classDate: info.classDate,
        }}
      />
    </Col>
  </Row>
)

const mapStateToProps = createStructuredSelector({
  info: selectSelectedAttendanceSheetInfo,
  getAllStudentsAttendancesInAttendanceSheetErrorMessage: selectGetAllStudentsAttendancesInAttendanceSheetErrorMessage,
  getAllStudentsAttendancesInAttendanceSheetIsLoading: selectGetAllStudentsAttendancesInAttendanceSheetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsAttendancesInAttendanceSheet: ({ attendanceUuid, classDate }) =>
    dispatch(
      getAllStudentsAttendancesInAttendanceSheetAsync(attendanceUuid, classDate)
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceSheetPage)
