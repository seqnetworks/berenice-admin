import React, { useState } from "react"
import { useIntl } from "react-intl"
import Table from "../../../../../../../custom/table/table.component"
import IntakesInCourseTableRow from "./IntakesInCourseTableRow.component"

const IntakesInCourseTable = ({ intakes, courseCode }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const intl = useIntl()

  let filteredIntakes = []
  if (intakes)
    filteredIntakes = intakes.filter(
      intake =>
        intake.code.toLowerCase().includes(searchField.toLowerCase()) &&
        (selectedStatus
          ? intake.enrollmentStatus === selectedStatus.value
          : true)
    )

  const tableAttributes = {
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 5,
      currentPage: currentPage,
    },
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.INTAKE.CODE" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    select: [
      {
        placeHolder: intl.formatMessage({ id: "CHOOSE.ENROLLMENT.STATUS" }),
        handleChange: e => setSelectedStatus(e),
        array: [
          {
            label: intl.formatMessage({ id: "STATUS" }),
            options: [
              {
                value: "open",
                label: intl.formatMessage({ id: "OPEN" }),
              },
              {
                value: "closed",
                label: intl.formatMessage({ id: "CLOSED" }),
              },
            ],
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
          title: intl.formatMessage({ id: "MIN.HOURS" }),
        },
        {
          title: intl.formatMessage({ id: "MAX.HOURS" }),
        },
        {
          title: intl.formatMessage({ id: "ENROLLMENT.STATUS" }),
        },
        {
          title: "",
        },
      ],
      row: intake => <IntakesInCourseTableRow intake={intake} />,
    },
    givenArray: filteredIntakes,
    title: (
      <>
        {intl.formatMessage({ id: "INTAKES.IN" })}
        <span className="">{courseCode}</span>
      </>
    ),
    emptyMessage: intl.formatMessage({ id: "NO.INTAKES.YET" }),
  }
  return <Table {...tableAttributes} />
}

export default IntakesInCourseTable
