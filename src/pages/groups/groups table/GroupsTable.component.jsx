import React, { useState } from "react"
import { Button } from "reactstrap"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { RefreshCw, Plus } from "react-feather"
import { useFormik } from "formik"
import { useIntl } from "react-intl"
import GroupsTableRow from "./GroupsTableRow.component"
import Dialog from "../../../custom/dialog/dialog.component"
import Table from "../../../custom/table/table.component"
import CreatingGroupValidationSchema from "../../../custom/validation schemas/creating group/CreatingGroupValidationSchema.component"
import CustomForm from "../../../custom/customform/customform.component"
import {
  getAllGroupsAsync,
  createGroupAsync,
  clearCreateGroupErrorMessage,
} from "../../../redux/index.actions"
import {
  selectCreateGroupErrorMessage,
  selectCreateGroupIsLoading,
} from "../../../redux/index.selectors"

const GroupsTable = ({
  groups,
  clearCreateGroupErrorMessage,
  creatingGroupValidationSchema,
  creatingGroupInitialValues,
  creatingGroupFields,
  createGroupErrorMessage,
  createGroupIsLoading,
  createGroup,
  getAllGroups,
}) => {
  const intl = useIntl()

  const [currentPage, setCurrentPage] = useState(0)
  const [searchField, setSearchField] = useState("")

  const createGroupFormik = useFormik({
    initialValues: creatingGroupInitialValues,
    validationSchema: creatingGroupValidationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      const requestBody = {
        title: values.name,
        description: values.description,
      }
      createGroup(requestBody, {
        success: {
          title: intl.formatMessage({ id: "CREATE.GROUP.SUCCESS.TITLE" }),
          content: intl.formatMessage({ id: "CREATE.GROUP.SUCCESS.CONTENT" }),
        },
      })
    },
  })
  let filteredArray = []
  if (groups)
    filteredArray = groups.filter(group =>
      group.title.toLowerCase().includes(searchField.toLowerCase())
    )

  const tableAttributes = {
    buttons: [
      <Dialog
        button={{
          color: "primary",
          styles: { paddingRight: "1rem", paddingLeft: "1rem" },
          title: <Plus size={15} />,
        }}
        dialog={{
          title: intl.formatMessage({ id: "CREATE.GROUP.NOUN" }),
          content: (
            <CustomForm
              buttonTitle={intl.formatMessage({ id: "CREATE.GROUP.VERB" })}
              isLoading={createGroupIsLoading}
              fields={creatingGroupFields}
              formik={createGroupFormik}
            />
          ),
        }}
        errorMessage={createGroupErrorMessage}
        isLoading={createGroupIsLoading}
        closingAction={() => {
          createGroupFormik.resetForm()
          clearCreateGroupErrorMessage()
        }}
      />,
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => getAllGroups()}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({ id: "NAME" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 5,
      currentPage: currentPage,
    },
    table: {
      columns: [
        { title: intl.formatMessage({ id: "NAME" }) },
        {
          title: intl.formatMessage({ id: "DESCRIPTION" }),
          styles: { minWidth: "200px" },
        },
        {
          title: intl.formatMessage({ id: "CREATED.AT" }),
          styles: { minWidth: "180px" },
        },
        {
          title: intl.formatMessage({ id: "UPDATED.AT" }),
          styles: { minWidth: "180px" },
        },
        { title: intl.formatMessage({ id: "ACTIONS" }) },
      ],
      row: group => <GroupsTableRow group={group} />,
    },
    givenArray: filteredArray,
    title: intl.formatMessage({ id: "GROUPS" }),
    emptyMessage: intl.formatMessage({ id: "NO.GROUPS.AVAILABLE" }),
  }
  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  createGroupErrorMessage: selectCreateGroupErrorMessage,
  createGroupIsLoading: selectCreateGroupIsLoading,
})

const mapDispatchToProps = dispatch => ({
  createGroup: (requestBody, messages) =>
    dispatch(createGroupAsync(requestBody, messages)),
  getAllGroups: () => dispatch(getAllGroupsAsync()),
  clearCreateGroupErrorMessage: () => dispatch(clearCreateGroupErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatingGroupValidationSchema(GroupsTable))
