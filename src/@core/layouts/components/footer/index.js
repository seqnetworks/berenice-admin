import React from "react"
import { FormattedMessage } from "react-intl"

const Footer = () => (
  <p className="clearfix mb-0">
    <span className="float-md-left d-block d-md-inline-block mt-25">
      © {new Date().getFullYear()}{" "}
      <a href="https://ctr.ly" target="_blank">
        CTR
      </a>
      <span className="d-none d-sm-inline-block">
        , <FormattedMessage id="ALL.RIGHTS.RESERVED" />
      </span>
    </span>
  </p>
)

export default Footer
