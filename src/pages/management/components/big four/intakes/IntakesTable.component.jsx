import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl, FormattedMessage } from "react-intl"
import { Divider } from "@material-ui/core"
import IntakesTableRow from "./IntakesTableRow.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import Table from "../../../../../custom/table/table.component"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import {
  createIntakeAsync,
  getAllIntakesAsync,
} from "../../../../../redux/index.actions"
import {
  selectAllIntakes,
  selectAllCourses,
  selectCreateIntakeIsLoading,
} from "../../../../../redux/index.selectors"

const IntakesTable = ({
  intakes,
  courses,
  createIntake,
  getAllIntakes,
  createIntakeIsLoading,
  activeTab,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let coursesArray = [{ title: "", value: "" }]
  if (courses)
    courses.map(course =>
      coursesArray.push({
        title: course.title + " - " + course.code,
        value: course.code,
      })
    )

  let filteredIntakes = []
  if (intakes)
    filteredIntakes = intakes.filter(
      intake =>
        intake.code.toLowerCase().includes(searchField.toLowerCase()) &&
        (selectedStatus
          ? intake.enrollmentStatus === selectedStatus.value
          : true)
    )

  const createIntakeValidationSchema = Yup.object().shape({
    courseCode: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    intakeYearMonth: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    semester: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .test(
        "len",
        intl.formatMessage({ id: "THE.DIGITS.MUST.BE.TWO.OR.LESS" }),
        value => (value ? value.length < 3 : null)
      ),
    minHours: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .test(
        "len",
        intl.formatMessage({ id: "THE.DIGITS.MUST.BE.TWO.OR.LESS" }),
        value => (value ? value.length < 3 : null)
      ),
    maxHours: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .test(
        "len",
        intl.formatMessage({ id: "THE.DIGITS.MUST.BE.TWO.OR.LESS" }),
        value => (value ? value.length < 3 : null)
      ),
  })

  const createIntakeFormik = useFormik({
    initialValues: {
      courseCode: "",
      intakeYearMonth: "",
      semester: "",
      minHours: "",
      maxHours: "",
    },
    enableReinitialize: true,
    validationSchema: createIntakeValidationSchema,
    onSubmit: values =>
      createIntake(values, {
        success: {
          title: intl.formatMessage({
            id: "CREATE.INTAKE.SUCCESS.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.INTAKE.SUCCESS.CONTENT",
          }),
        },
        error: {
          title: intl.formatMessage({
            id: "CREATE.INTAKE.ERROR.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.INTAKE.ERROR.CONTENT",
          }),
        },
      }),
  })

  useEffect(() => createIntakeFormik.resetForm(), [activeTab])

  const createIntakeFields = [
    {
      title: intl.formatMessage({ id: "COURSE.CODE" }),
      value: "courseCode",
      type: "select",
      options: coursesArray,
    },
    {
      title: intl.formatMessage({ id: "SEMESTER" }),
      value: "semester",
    },
    {
      title: intl.formatMessage({ id: "INTAKE.DATE" }),
      value: "intakeYearMonth",
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "MIN.HOURS" }),
      value: "minHours",
    },
    {
      title: intl.formatMessage({ id: "MAX.HOURS" }),
      value: "maxHours",
    },
  ]

  const tableAttributes = {
    buttons: [
      <Button className="px-1 " color="primary" onClick={() => getAllIntakes()}>
        <RefreshCw size={15} />
      </Button>,
    ],
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
      row: intake => <IntakesTableRow intake={intake} />,
    },
    givenArray: filteredIntakes,
    title: intl.formatMessage({ id: "INTAKES" }),
    emptyMessage: intl.formatMessage({ id: "NO.INTAKES.YET" }),
  }

  const flexibleCustomFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "CREATE.INTAKE" }),
    formik: createIntakeFormik,
    isLoading: createIntakeIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: createIntakeFields,
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {ability.can("manage", "intake-POST") && (
        <>
          <h2 style={{ margin: "15px" }}>
            <FormattedMessage id="CREATING.INTAKE" />
          </h2>
          <FlexibleCustomForm {...flexibleCustomFormAttributes} />
          <Divider variant="middle" className="my-50" />
        </>
      )}
      <Table {...tableAttributes} />
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  intakes: selectAllIntakes,
  courses: selectAllCourses,
  createIntakeIsLoading: selectCreateIntakeIsLoading,
})

const mapDisptachToProps = dispatch => ({
  createIntake: (requestBody, messages) =>
    dispatch(createIntakeAsync(requestBody, messages)),
  getAllIntakes: () => dispatch(getAllIntakesAsync()),
})

export default connect(mapStateToProps, mapDisptachToProps)(IntakesTable)
