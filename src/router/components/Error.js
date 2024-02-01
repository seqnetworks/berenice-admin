import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import errorImg from "../../assets/images/error.svg"


import "../../@core/scss/base/pages/page-misc.scss"

const Error = () => {
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">
            <FormattedMessage id="PAGE.NOT.FOUND" /> 🕵🏻‍♀️
          </h2>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            <FormattedMessage id="BACK.TO.HOME" />
          </Button>
          <img className="img-fluid" src={errorImg} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default Error
