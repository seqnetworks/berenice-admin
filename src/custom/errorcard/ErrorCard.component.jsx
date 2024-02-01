import React, { useEffect, useRef } from "react"
import { Alert } from "reactstrap"
import { FormattedMessage } from "react-intl"
import "./ErrorCard.styles.scss"

const ErrorCard = ({ style, content, scrollable, info }) => {
  const scroll = useRef()

  const scrollToError = () => {
    scroll.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  useEffect(() => {
    if (scrollable) scrollToError()
  }, [])
  return (
    <Alert style={style} color={info ? "secondary" : "danger"}>
      <div ref={scroll} className="alert-body">
        <div style={{ textAlign: "center", lineHeight: "2" }}>
          <span style={{ fontWeight: "700", fontSize: "12px" }}>
            {content ? (
              content
            ) : (
              <FormattedMessage id="SOMETHING.WENT.WRONG.,.PLEASE.TRY.AGAIN" />
            )}
          </span>
        </div>
      </div>
    </Alert>
  )
}

export default ErrorCard
