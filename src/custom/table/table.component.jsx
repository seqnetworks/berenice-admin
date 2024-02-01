import React from "react"
import {
  CardHeader,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table as ReactstrapTable,
  Alert,
  CardFooter,
} from "reactstrap"
import { Search } from "react-feather"
import Select from "../select/select.component"
import DatePicker from "../date picker/DatePicker.component"
import Pagination from "../../custom/table/pagination.component"

const Table = ({
  search,
  select,
  title,
  buttons,
  table,
  date,
  givenArray,
  emptyMessage,
  pagination,
  additionalButtons,
}) => {
  const styles = {
    control: base => ({
      ...base,
      minHeight: 32,
    }),
    dropdownIndicator: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  }

  return (
    <>
      <CardHeader style={{ padding: "15px", overFlowX: "auto" }}>
        {(title || buttons) && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              overFlowX: "auto",
              marginBottom: ".5rem",
            }}
          >
            <h2
              style={{ margin: "auto 0", fontWeight: "500", overFlowX: "auto" }}
            >
              {title ? title : null}
            </h2>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {buttons ? buttons.map(button => <div>{button}</div>) : <div />}
            </div>
          </div>
        )}
        <Row
          className={`${title && buttons ? "px-1" : ""}`}
          style={{ width: "100%", alignItems: "center" }}
        >
          {additionalButtons}
          {search ? (
            <Col md={6} xs={12}>
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Search size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={search.placeHolder}
                  onChange={search.handleChange}
                  value={search.value}
                />
              </InputGroup>
            </Col>
          ) : null}
          {select
            ? select.map(oneSelect => (
                <Col md={6} xs={12}>
                  <Select
                    array={oneSelect.array}
                    value={oneSelect.value}
                    handleChange={oneSelect.handleChange}
                    error={oneSelect.error}
                    placeHolder={oneSelect.placeHolder}
                    isClearable={oneSelect.isClearable}
                    isGrouped={oneSelect.isGrouped}
                    isMulti={oneSelect.isMulti}
                    height={180}
                    style={styles}
                    stylesClassnames="z-index-select"
                  />
                </Col>
              ))
            : null}
          {date ? (
            <Col md={6} xs={12}>
              <DatePicker
                disabled={date.disabled}
                error={date.error}
                onChange={date.onChange}
                placeHolder={date.placeHolder}
                title={date.title}
                value={date.value}
              />
            </Col>
          ) : null}
        </Row>
      </CardHeader>
      {givenArray.length === 0 ? (
        <Alert color="secondary">
          <div className="alert-body">
            <p style={{ textAlign: "center", fontWeight: "500" }}>
              <big className="">{emptyMessage}</big>
            </p>
          </div>
        </Alert>
      ) : (
        <ReactstrapTable
          striped
          responsive
          className="table-hover-animation custom-table overflow-y-hidden"
        >
          <thead>
            <tr>
              {table.columns.map(column => (
                <th style={{ ...column.styles, color: "#fff" }}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {givenArray
              .filter(
                (element, index) =>
                  index >= pagination.currentPage * pagination.rowsPerPage &&
                  index < pagination.rowsPerPage * (pagination.currentPage + 1)
              )
              .map(item => table.row(item))}
          </tbody>
        </ReactstrapTable>
      )}
      <CardFooter style={{ padding: "1rem 1rem" }}>
        <Pagination
          handlePageChange={pagination.handleChange}
          currentPage={pagination.currentPage}
          pageCount={Math.ceil(givenArray.length / pagination.rowsPerPage)}
        />
      </CardFooter>
    </>
  )
}

export default Table
