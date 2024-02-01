import React, { Fragment, useState } from "react"
import ReactPaginate from "react-paginate"
import { FormattedMessage } from "react-intl"

const Pagination = ({ pageCount, handlePageChange, currentPage }) => {
 const Previous = () => {
  return (
   <Fragment>
    <span className="align-middle d-none d-md-inline-block">
     <FormattedMessage id="PREV" />
    </span>
   </Fragment>
  )
 }

 const Next = () => {
  return (
   <Fragment>
    <span className="align-middle d-none d-md-inline-block">
     <FormattedMessage id="NEXT" />
    </span>
   </Fragment>
  )
 }
 return (
  <ReactPaginate
   previousLabel={<Previous size={15} />}
   nextLabel={<Next size={15} />}
   forcePage={currentPage}
   initialPage={currentPage}
   onPageChange={(page) => handlePageChange(page.selected)}
   pageCount={pageCount}
   breakLabel={"..."}
   pageRangeDisplayed={2}
   marginPagesDisplayed={2}
   activeClassName={"active"}
   pageClassName={"page-item"}
   nextLinkClassName={"page-link"}
   nextClassName={"page-item next"}
   previousClassName={"page-item prev"}
   previousLinkClassName={"page-link"}
   pageLinkClassName={"page-link"}
   breakClassName="page-item"
   breakLinkClassName="page-link"
   containerClassName={
    "pagination react-paginate pagination-sm justify-content-center mb-0"
   }
   style={{ zIndex: "-1" }}
  />
 )
}
export default Pagination
