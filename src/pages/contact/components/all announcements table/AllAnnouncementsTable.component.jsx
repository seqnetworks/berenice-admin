import React, { useState } from "react"
import { connect } from "react-redux"
import { Card, CardBody } from "reactstrap"
import { createStructuredSelector } from "reselect"
import { RefreshCw } from "react-feather"
import { Button } from "reactstrap"
import { useIntl } from "react-intl"
import AllAnnouncementsTableRow from "./AllAnnouncementsTableRow.component"
import Table from "../../../../custom/table/table.component"
import { getAllAnnouncementsAsync } from "../../../../redux/index.actions"
import { selectAllAnnouncements } from "../../../../redux/index.selectors"
import { dateFiltering } from "../../../../utility/custom/dateFiltering"

const AllAnnouncementsTable = ({ announcements, getAllAnnouncements }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedRange, setSelectedRange] = useState("")

  const intl = useIntl()

  let filteredAnnouncements = []
  if (announcements)
    filteredAnnouncements = announcements.filter(
      announcement =>
        (announcement.senderFullName
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          announcement.senderFullNameArabic
            .toLowerCase()
            .includes(searchField.toLowerCase())) &&
        (dateFiltering(selectedRange, announcement.createdAt) || !selectedRange)
    )

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getAllAnnouncements()}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.SENDER.NAME" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
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
          title: intl.formatMessage({ id: "WRITER" }),
        },
        {
          title: intl.formatMessage({ id: "TITLE" }),
        },
        {
          title: intl.formatMessage({ id: "TYPE" }),
        },
        {
          title: intl.formatMessage({ id: "TARGETS" }),
        },
        {
          title: intl.formatMessage({ id: "DATE" }),
          styles: { minWidth: "150px" },
        },
        { title: intl.formatMessage({ id: "PREVIEW" }) },
      ],
      row: announcement => (
        <AllAnnouncementsTableRow announcement={announcement} />
      ),
    },
    givenArray: filteredAnnouncements,
    title: intl.formatMessage({ id: "ANNOUNCEMENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.ANNOUNCEMENTS.YET" }),
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
  announcements: selectAllAnnouncements,
})

const mapDispatchToProps = dispatch => ({
  getAllAnnouncements: () => dispatch(getAllAnnouncementsAsync()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllAnnouncementsTable)
