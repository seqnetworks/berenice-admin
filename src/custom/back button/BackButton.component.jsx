import React from "react"
import { Col, Button } from "reactstrap"
import { ChevronRight, ChevronLeft } from "react-feather"
import { useHistory } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useRTL } from "../../utility/hooks/useRTL"

const BackButton = ({ messageId, route }) => {
  const history = useHistory()

  const [rtl] = useRTL()

  return (
    <Col className="mb-1" xs={12}>
      <Button
        onClick={() => (route ? history.push(route) : history.goBack())}
        color="primary"
        className="btn-icon"
      >
        {rtl ? (
          <ChevronRight size={15} className="ml-25" />
        ) : (
          <ChevronLeft size={15} className="mr-25" />
        )}{" "}
        <FormattedMessage id={messageId} />
      </Button>
    </Col>
  )
}

export default BackButton
