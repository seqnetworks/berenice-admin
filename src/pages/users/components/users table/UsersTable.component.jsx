import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import { RefreshCw, Plus } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import Table from "../../../../custom/table/table.component"
import CustomForm from "../../../../custom/customform/customform.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import { advancedFilteringAND } from "../../../../utility/custom/advancedFilteringAND"
import { clearAddUserErrorMessage } from "../../../../redux/users/users.actions"
const UsersTable = ({
  users,
  dialogAttributes,
  select,
  columns,
  Row,
  getUsers,
  search,
  title,
  emptyMessage,
  customFormAttributes,
  clearAddUserErrorMessage,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectState, setSelectState] = useState([])
  const [searchField, setSearchField] = useState("")

  const ability = useContext(AbilityContext)

  let filteredArray = []
  if (users)
    filteredArray = advancedFilteringAND({
      state: selectState,
      givenArray: users ? users : [],
      filteringObject: select.filteringObject,
    })
  if (filteredArray) {
    filteredArray = search.filterArray(filteredArray, searchField)
  }

  const addUserDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: dialogAttributes.dialogTitle,
      content: <CustomForm {...customFormAttributes} />,
    },
    isLoading: dialogAttributes.isLoading,
    errorMessage: dialogAttributes.errorMessage,
    closingAction: () => {
      clearAddUserErrorMessage()
      customFormAttributes.formik.resetForm()
      dialogAttributes.closingAction()
    },
  }

  const tableAttributes = {
    select: [
      {
        array: select.array,
        handleChange: e => setSelectState(e),
        placeHolder: select.placeHolder,
        isGrouped: true,
        isMulti: true,
      },
    ],
    buttons: [
      <Button className="px-1 ml-50" color="primary" onClick={() => getUsers()}>
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: search.title,
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: columns,
      row: user => <Row user={user} />,
    },
    givenArray: filteredArray,
    title: title,
    emptyMessage: emptyMessage,
  }

  if (ability.can("manage", "signup-POST"))
    tableAttributes.buttons = [
      <Dialog {...addUserDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return <Table {...tableAttributes} />
}
const mapDispatchToProps = dispatch => ({
  clearAddUserErrorMessage: () => dispatch(clearAddUserErrorMessage()),
})

export default connect(null, mapDispatchToProps)(UsersTable)
