import React, { Fragment } from "react"
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
} from "reactstrap"

const CardViewerVerticalNav = ({
  activeTab,
  setActiveTab,
  cards,
  tabsDisabled,
}) => {
  const putComponent = item => item

  let tabs = []
  let contents = []
  cards.map(item => {
    tabs.push(item["tab"])
    contents.push(item["content"])
  })

  return (
    <Fragment>
      <Row>
        <Col className="mb-2 mb-md-0" md="4">
          <Card>
            <CardBody className="p-1">
              <Nav className="nav-left mb-0" pills vertical>
                {tabs.map((tab, index) => (
                  <NavItem>
                    <NavLink
                      disabled={tabsDisabled}
                      active={activeTab === index}
                      onClick={() => setActiveTab(index)}
                    >
                      {putComponent(tab.icon)}
                      <span className="font-weight-bold ml-1">{tab.title}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardBody
              style={{
                maxHeight: "450px",
                overflowY: "auto",
              }}
            >
              <TabContent activeTab={activeTab}>
                {contents.map((content, index) => (
                  <TabPane tabId={index}>{putComponent(content)}</TabPane>
                ))}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CardViewerVerticalNav
