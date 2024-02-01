import { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { NavLink, useLocation, matchPath } from "react-router-dom"
import { Badge } from "reactstrap"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"
import { useLang } from "../../../../../i18n"
import navigation from "../../../../../navigation/vertical/index"
import { search, getAllParents } from "../../../../../@core/layouts/utils"
import {
  resetConsultationBadge,
  resetChatBadge,
  getCurrentUserConsultationsAsync,
  getChatsOfUserAsync,
} from "../../../../../redux/index.actions"
import {
  selectConsultationBadge,
  selectChatBadge,
  selectCurrentUserRole,
} from "../../../../../redux/index.selectors"

const VerticalNavMenuLink = ({
  item,
  setGroupActive,
  activeItem,
  setActiveItem,
  setGroupOpen,
  toggleActiveGroup,
  parentItem,
  routerProps,
  currentActiveItem,
  resetConsultationBadge,
  resetChatBadge,
  getCurrentUserConsultations,
  getCurrentUserChats,
  consultationBadge,
  chatBadge,
  currentUserRole,
}) => {
  const LinkTag = item.externalLink ? "a" : NavLink
  const currentLanguage = useLang()

  const location = useLocation()
  const currentURL = location.pathname

  const match = matchPath(currentURL, {
    path: `${item.navLink}/:param`,
    exact: true,
    strict: false,
  })

  const searchParents = (navigation, currentURL) => {
    const parents = search(navigation, currentURL, routerProps)
    const allParents = getAllParents(parents, "id")
    return allParents
  }

  const resetActiveGroup = navLink => {
    const parents = search(navigation, navLink, match)
    toggleActiveGroup(item.id, parents)
  }
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(navigation, currentURL)
      setGroupActive([...arr])
    }
  }, [location])

  return (
    <li
      className={classnames({
        "nav-item": !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? "_blank" : undefined}
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              isActive: match => {
                if (!match) {
                  return false
                }
                if (
                  match.url &&
                  match.url !== "" &&
                  match.url === item.navLink
                ) {
                  currentActiveItem = item.navLink
                }
              },
            })}
        onClick={e => {
          if (!item.navLink.length) {
            e.preventDefault()
          }
          if (parentItem) {
            resetActiveGroup(item.navLink)
          } else {
            resetActiveAndOpenGroups()
          }
          if (item.title === "consultation") resetConsultationBadge()
          if (item.title === "chat") resetChatBadge()
          if (
            item.title !== "dashboard" &&
            item.title !== "consultation" &&
            currentUserRole === "lecturer"
          )
            getCurrentUserConsultations()
          if (
            item.title !== "dashboard" &&
            item.title !== "consultation" &&
            currentUserRole === "lecturer"
          )
            getCurrentUserChats()
        }}
      >
        {item.icon}
        <span
          style={
            currentLanguage === "ar"
              ? { fontFamily: "Cairo, self-serif" }
              : { fontFamily: "Montserrat, Helvetica, Arial, serif" }
          }
          className="menu-item text-truncate"
        >
          <FormattedMessage
            id={item.title.split(" ").join(".").toUpperCase()}
          />
        </span>

        {consultationBadge &&
        item.title === "consultation" &&
        currentURL !== "/consultation" ? (
          <Badge className="ml-auto mr-1" color="light-primary" pill>
            New
          </Badge>
        ) : null}

        {chatBadge && item.title === "chat" && currentURL !== "/chat" ? (
          <Badge className="ml-auto mr-1" color="light-primary" pill>
            <FormattedMessage id="NEW" />
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

const mapStateToProps = createStructuredSelector({
  consultationBadge: selectConsultationBadge,
  chatBadge: selectChatBadge,
  currentUserRole: selectCurrentUserRole,
})

const mapDispatchToProps = dispatch => ({
  resetConsultationBadge: () => dispatch(resetConsultationBadge()),
  resetChatBadge: () => dispatch(resetChatBadge()),
  getCurrentUserChats: () => dispatch(getChatsOfUserAsync({})),
  getCurrentUserConsultations: () =>
    dispatch(getCurrentUserConsultationsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VerticalNavMenuLink)
