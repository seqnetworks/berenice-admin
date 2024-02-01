import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import { useIntl } from "react-intl"
import StudentIntakesTableRow from "./StudentIntakesTableRow.component"
import intakeStatuses from "../../../../../../../utility/custom/intakeStatuses"
import Table from "../../../../../../../custom/table/table.component"
import {
  selectSelectedUserIntakes,
  selectSelectedUserUuid,
} from "../../../../../../../redux/index.selectors"
import { getSelectedUserIntakesAsync } from "../../../../../../../redux/index.actions"

const IntakesTable = ({
  intakes,
  getSelectedUserIntakes,
  selectedUserUuid,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState("")
  const intl = useIntl()

  let filteredIntakes = []
  if (intakes)
    filteredIntakes = intakes.filter(intake =>
      selectedStatus ? intake.status === selectedStatus.value : true
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 "
        color="primary"
        onClick={() => getSelectedUserIntakes(selectedUserUuid)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 5,
      currentPage: currentPage,
    },
    select: [
      {
        placeHolder: intl.formatMessage({ id: "CHOOSE.ENROLLMENT.STATUS" }),
        handleChange: e => setSelectedStatus(e),
        array: [
          {
            label: intl.formatMessage({ id: "STATUS" }),
            options: intakeStatuses(intl),
          },
        ],
      },
    ],
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "INTAKE.CODE" }),
        },
        {
          title: intl.formatMessage({ id: "STATUS" }),
        },
        {
          title: intl.formatMessage({ id: "GPA" }),
        },
        {
          title: "",
        },
      ],
      row: intake => <StudentIntakesTableRow intake={intake} />,
    },
    givenArray: filteredIntakes,
    title: intl.formatMessage({ id: "STUDENT.INTAKES" }),
    emptyMessage: intl.formatMessage({ id: "NO.INTAKES.YET" }),
  }
  return <Table {...tableAttributes} />
}
const mapStateToProps = createStructuredSelector({
  intakes: selectSelectedUserIntakes,
  selectedUserUuid: selectSelectedUserUuid,
})

const mapDispatchToProps = dispatch => ({
  getSelectedUserIntakes: studentUuid =>
    dispatch(getSelectedUserIntakesAsync(studentUuid)),
})
export default connect(mapStateToProps, mapDispatchToProps)(IntakesTable)
