import React, { Fragment } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"

const CardViewerHorizontalNav = ({
  activeTab,
  setActiveTab,
  cards,
  style,
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
    <div style={style}>
      <Nav style={{ marginBottom: "10px" }} tabs fill>
        {tabs.map((tab, index) => (
          <NavItem>
            <NavLink
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab.icon && putComponent(tab.icon)}
              <span className="align-middle">{tab.title}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent className="py-50" activeTab={activeTab}>
        {contents.map((content, index) => (
          <TabPane tabId={index}>{putComponent(content)}</TabPane>
        ))}
      </TabContent>
    </div>
  )
}

export default CardViewerHorizontalNav
