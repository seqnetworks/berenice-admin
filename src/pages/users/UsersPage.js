import React from "react"
import { Col, Row } from "reactstrap"
import UsersContainer from "./components/users container/UsersContainer.component"

const UsersPage = () => (
  <Row className="match-height">
    <Col xs={12}>
      <UsersContainer />
    </Col>
  </Row>
)

export default UsersPage
