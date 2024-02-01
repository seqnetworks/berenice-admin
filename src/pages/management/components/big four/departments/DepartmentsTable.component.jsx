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
import DepartmentsTableRow from "./DepartmentsTableRow.component"
import FlexibleCustomForm from "../../../../../custom/flexible custom form/FlexibleCustomForm.component"
import {
  createDepartmentAsync,
  getAllDepartmentsAsync,
} from "../../../../../redux/index.actions"
import {
  selectAllDepartments,
  selectCreateDepartmentIsLoading,
} from "../../../../../redux/index.selectors"

const DepartmentsTable = ({
  createDepartment,
  getAllDepartments,
  departments,
  createDepartmentIsLoading,
  activeTab,
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const createDepartmentValidationSchema = Yup.object().shape({
    name: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    description: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createDepartmentFormik = useFormik({
    initialValues: { name: "", description: "" },
    enableReinitialize: true,
    validationSchema: createDepartmentValidationSchema,
    onSubmit: values =>
      createDepartment(values, {
        success: {
          title: intl.formatMessage({
            id: "CREATE.DEPARTMENT.SUCCESS.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.DEPARTMENT.SUCCESS.CONTENT",
          }),
        },
        error: {
          title: intl.formatMessage({
            id: "CREATE.DEPARTMENT.ERROR.TITLE",
          }),
          content: intl.formatMessage({
            id: "CREATE.DEPARTMENT.ERROR.CONTENT",
          }),
        },
      }),
  })

  useEffect(() => createDepartmentFormik.resetForm(), [activeTab])

  const createDepartmentFields = [
    {
      title: intl.formatMessage({ id: "DEPARTMENT.NAME" }),
      value: "name",
    },
    {
      title: intl.formatMessage({ id: "DEPARTMENT.DESCRIPTION" }),
      value: "description",
    },
  ]

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1"
        color="primary"
        onClick={() => getAllDepartments()}
      >
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
          title: intl.formatMessage({ id: "NAME" }),
        },
        {
          title: intl.formatMessage({ id: "DESCRIPTION" }),
        },
        {
          title: "",
        },
      ],
      row: department => <DepartmentsTableRow department={department} />,
    },
    givenArray: departments,
    title: intl.formatMessage({ id: "DEPARTMENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.DEPARTMENTS.YET" }),
  }

  const flexibleCustomFormAttributes = {
    buttonTitle: intl.formatMessage({ id: "CREATE.DEPARTMENT" }),
    formik: createDepartmentFormik,
    isLoading: createDepartmentIsLoading,
    style: { paddingLeft: "20px", paddingRight: "20px" },
    fields: createDepartmentFields,
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {ability.can("manage", "department-POST") && (
        <>
          <h2 style={{ margin: "15px" }}>
            <FormattedMessage id="CREATING.DEPARTMENT" />
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
  createDepartmentIsLoading: selectCreateDepartmentIsLoading,
})

const mapDisptachToProps = dispatch => ({
  createDepartment: (requestBody, messages) =>
    dispatch(createDepartmentAsync(requestBody, messages)),
  getAllDepartments: () => dispatch(getAllDepartmentsAsync()),
})

export default connect(mapStateToProps, mapDisptachToProps)(DepartmentsTable)
