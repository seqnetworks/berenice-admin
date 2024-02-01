import { Fragment, useState } from "react"
import Chat from "./Chat"
import Sidebar from "./SidebarLeft"
import classnames from "classnames"
import "../../@core/scss/base/pages/app-chat.scss"
import "../../@core/scss/base/pages/app-chat-list.scss"

const AppChat = () => {
  const [sidebar, setSidebar] = useState(false)
  const [active, setActive] = useState("")
  const handleSidebar = () => setSidebar(!sidebar)

  return (
    <Fragment>
      <Sidebar
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        active={active}
        setActive={setActive}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames("body-content-overlay", {
                show: sidebar === true,
              })}
              onClick={() => setSidebar(false)}
            ></div>
            <Chat
              handleSidebar={handleSidebar}
              active={active}
              setActive={setActive}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AppChat
