import React, { useState } from "react"
import { connect } from "react-redux"
import { Button, Card, CardBody } from "reactstrap"
import { RefreshCw } from "react-feather"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import Table from "../../../../custom/table/table.component"
import UserConsultationsTableRow from "./UserConsultationsTableRow.component"
import { dateFiltering } from "../../../../utility/custom/dateFiltering"
import { getSelectedUserConsultationsAsync } from "../../../../redux/index.actions"
import { selectSelectedUserConsultations } from "../../../../redux/index.selectors"

const ConsultationsTable = ({
  consultations,
  requestBody,
  getSelectedUserConsultations,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedRange, setSelectedRange] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const intl = useIntl()

  let filteredConsultations = []
  if (consultations)
    filteredConsultations = consultations.filter(
      consultation =>
        (dateFiltering(selectedRange, consultation.reservedDate) ||
          !selectedRange) &&
        consultation.status.includes(selectedStatus ? selectedStatus.value : "")
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getSelectedUserConsultations(requestBody)}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    select: [
      {
        placeHolder: intl.formatMessage({ id: "CHOOSE.CONSULTATION.STATUS" }),
        handleChange: e => setSelectedStatus(e),
        array: [
          {
            label: intl.formatMessage({ id: "STATUS" }),
            options: [
              {
                value: "booked",
                label: intl.formatMessage({ id: "BOOKED" }),
              },
              {
                value: "unbooked",
                label: intl.formatMessage({ id: "UNBOOKED" }),
              },
              {
                value: "cancelled",
                label: intl.formatMessage({ id: "CANCELLED" }),
              },
            ],
          },
        ],
      },
    ],
    date: {
      value: selectedRange,
      placeHolder: intl.formatMessage({ id: "SELECT.DATE.RANGE" }),
      onChange: e => setSelectedRange(e),
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: requestBody.lecturerUuid
            ? intl.formatMessage({ id: "STUDENT" })
            : intl.formatMessage({ id: "LECTURER" }),
        },
        {
          title: intl.formatMessage({ id: "STATUS" }),
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        {
          title: intl.formatMessage({ id: "TIME.RANGE" }),
          styles: { minWidth: "150px" },
        },
      ],
      row: consultation => (
        <UserConsultationsTableRow
          consultation={consultation}
          requestBody={requestBody}
        />
      ),
    },
    givenArray: filteredConsultations,
    title: intl.formatMessage({ id: "CONSULTATIONS" }),
    emptyMessage: intl.formatMessage({ id: "NO.CONSULTATIONS.YET" }),
  }
  return (
    <Card>
      <CardBody>
        <Table {...tableAttributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  consultations: selectSelectedUserConsultations,
})

const mapDispatchToProps = dispatch => ({
  getSelectedUserConsultations: requestBody =>
    dispatch(getSelectedUserConsultationsAsync(requestBody)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationsTable)
