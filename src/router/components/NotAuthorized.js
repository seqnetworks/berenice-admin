import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import notAuthImg from "../../assets/images/not-authorized.svg"

import "../../@core/scss/base/pages/page-misc.scss"

const NotAuthorized = () => {
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="w-100 text-center"
        >
          <h2 className="mb-1">
            <FormattedMessage id="YOU.ARE.NOT.AUTHORIZED" /> 🔐
          </h2>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-1 w-50"
          >
            <FormattedMessage id="BACK" />
          </Button>
          <img
            className="img-fluid"
            src={notAuthImg}
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
