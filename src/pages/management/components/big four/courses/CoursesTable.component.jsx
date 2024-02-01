import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { RefreshCw } from "react-feather"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl, FormattedMessage } from "react-intl"
import { Divider } from "@material-ui/core"
import { AbilityContext } from "../../../../../utility/context/Can"
import Table from "../../../../../custom/table/table.component"
import CoursesTableRow from "./CoursesTableRow.component"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import {
  createCourseAsync,
  getAllCoursesAsync,
} from "../../../../../redux/index.actions"
import {
  selectAllDepartments,
  selectAllCourses,
  selectCreateCourseIsLoading,
} from "../../../../../redux/index.selectors"

const CoursesTable = ({
  departments,
  courses,
  createCourse,
  getAllCourses,
  createCourseIsLoading,
  activeTab,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let departmentsArray = [{ title: "", value: "" }]
  if (departments)
    departments.map(department =>
      departmentsArray.push({ title: department.name, value: department.uuid })
    )

  const createCourseValidationSchema = Yup.object().shape({
    title: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    code: Yup.string()
      .uppercase(intl.formatMessage({ id: "LETTERS.MUST.BE.UPPER.CASED" }))
      .strict()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
    departmentUuid: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createCourseFormik = useFormik({
    initialValues: { title: "", description: "", code: "", departmentUuid: "" },
    enableReinitialize: true,
    validationSchema: createCourseValidationSchema,
    onSubmit: values =>
      createCourse(values, {
        success: {
          title: intl.formatMessage({
            id: "CREATE.COURSE.SUCCESS.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.COURSE.SUCCESS.CONTENT",
          }),
        },
        error: {
          title: intl.formatMessage({
            id: "CREATE.COURSE.ERROR.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.COURSE.ERROR.CONTENT",
          }),
        },
      }),
  })

  useEffect(() => createCourseFormik.resetForm(), [activeTab])

  const createCourseFields = [
    {
      title: intl.formatMessage({ id: "COURSE.CODE" }),
      value: "code",
    },
    {
      title: intl.formatMessage({ id: "COURSE.NAME" }),
      value: "title",
    },
    {
      title: intl.formatMessage({ id: "COURSE.DESCRIPTION" }),
      value: "description",
    },
    {
      title: intl.formatMessage({ id: "DEPARTMENT" }),
      value: "departmentUuid",
      type: "select",
      options: departmentsArray,
    },
  ]

  const tableAttributes = {
    buttons: [
      <Button className="px-1 " color="primary" onClick={() => getAllCourses()}>
        <RefreshCw size={15} />
      </Button>,
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 5,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "COURSE.CODE" }),
        },
        {
          title: intl.formatMessage({ id: "NAME" }),
        },
        {
          title: intl.formatMessage({ id: "DEPARTMENT.NAME" }),
        },
        {
          title: intl.formatMessage({ id: "DESCRIPTION" }),
        },
        {
          title: "",
        },
      ],
      row: course => <CoursesTableRow course={course} />,
    },
    givenArray: courses,
    title: intl.formatMessage({ id: "COURSES" }),
    emptyMessage: intl.formatMessage({ id: "NO.COURSES.YET" }),
  }

  const flexibleCustomFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "CREATE.COURSE" }),
    formik: createCourseFormik,
    isLoading: createCourseIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: createCourseFields,
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {ability.can("manage", "course-POST") && (
        <>
          <h2 style={{ margin: "15px" }}>
            <FormattedMessage id="CREATING.COURSE" />
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
  departments: selectAllDepartments,
  courses: selectAllCourses,
  createCourseIsLoading: selectCreateCourseIsLoading,
})

const mapDisptachToProps = dispatch => ({
  createCourse: (requestBody, messages) =>
    dispatch(createCourseAsync(requestBody, messages)),
  getAllCourses: () => dispatch(getAllCoursesAsync()),
})

export default connect(mapStateToProps, mapDisptachToProps)(CoursesTable)
