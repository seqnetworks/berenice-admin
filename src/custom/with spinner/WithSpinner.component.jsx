import React, { useEffect } from "react"
import TryAgain from "../try again/TryAgain.component"
import { Card, CardBody, Spinner } from "reactstrap"

const WithSpinner = WrappedComponent => ({
  card,
  noCardBody,
  isLoading,
  errorMessage,
  toBeDispatchedUseEffect,
  toBeDispatchedPropsUseEffect,
  toBeDispatchedTryAgain,
  toBeDispatchedPropsTryAgain,
  ...otherProps
}) => {
  useEffect(() => {
    if (toBeDispatchedUseEffect)
      toBeDispatchedUseEffect(toBeDispatchedPropsUseEffect)
  }, [])

  return isLoading ? (
    card ? (
      <Card className="w-100">
        <CardBody>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner
              as="span"
              animation="border"
              size="lg"
              aria-hidden="true"
              color="primary"
            />
          </div>
        </CardBody>
      </Card>
    ) : noCardBody ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner
          color="primary"
          as="span"
          animation="border"
          size="lg"
          aria-hidden="true"
        />
      </div>
    ) : (
      <CardBody>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner
            color="primary"
            as="span"
            animation="border"
            size="lg"
            aria-hidden="true"
          />
        </div>
      </CardBody>
    )
  ) : errorMessage ? (
    card ? (
      <Card className="w-100">
        <CardBody>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto 0",
            }}
          >
            <TryAgain
              toBeDispatchedProps={toBeDispatchedPropsTryAgain}
              toBeDispatched={toBeDispatchedTryAgain}
            />
          </div>
        </CardBody>{" "}
      </Card>
    ) : noCardBody ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto 0",
        }}
      >
        <TryAgain
          toBeDispatchedProps={toBeDispatchedPropsTryAgain}
          toBeDispatched={toBeDispatchedTryAgain}
        />
      </div>
    ) : (
      <CardBody>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto 0",
          }}
        >
          <TryAgain
            toBeDispatchedProps={toBeDispatchedPropsTryAgain}
            toBeDispatched={toBeDispatchedTryAgain}
          />
        </div>
      </CardBody>
    )
  ) : (
    <WrappedComponent {...otherProps} />
  )
}
export default WithSpinner
