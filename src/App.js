import React, { useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import Router from "./router/Router"
import { I18nProvider, useLang } from "./i18n"
import { IntlContext } from "./utility/context/Internationalization"
import { useRTL } from "./utility/hooks/useRTL"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import RelativeTimeFormat from "relative-time-format"
import en from "relative-time-format/locale/en.json"
import ar from "relative-time-format/locale/ar.json"
import { AbilityContext } from "./utility/context/Can"
import { userLoggedIn, logOut } from "./redux/index.actions"
import {
  selectCurrentUser,
  selectCurrentUserRole,
  selectAuthAbility,
  selectAuthUserLoggedIn,
} from "./redux/index.selectors"
import { acl, defaultRoute } from "./redux/auth/auth.ability"
import "./custom/styles/customStyles.scss"

const App = ({
  currentUser,
  currentUserRole,
  authAbility,
  loggedIn,
  loginUser,
  logOut,
}) => {
  const currentLanguage = useLang()
  const [isRtl, setIsRtl] = useRTL()
  const history = useHistory()
  const intlContext = useContext(IntlContext)
  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (currentLanguage === "ar") {
      setIsRtl(true)
      document.getElementById("body").style.fontFamily = "Cairo"
    } else {
      setIsRtl(false)
      document.getElementById("body").style.fontFamily =
        "Montserrat,Helvetica,Arial,serif"
    }
    intlContext.switchLanguage(currentLanguage)
    if (currentUser && authAbility.length === 0) logOut()
    else if (currentUser) {
      loginUser()
      ability.update([...authAbility, ...acl[currentUserRole]])
      if (!loggedIn) history.push(defaultRoute[currentUserRole])
    }
  }, [])

  RelativeTimeFormat.addLocale(en)

  new RelativeTimeFormat("en", {
    style: "long",
  }).format(-2, "day")

  RelativeTimeFormat.addLocale(ar)

  new RelativeTimeFormat("ar", {
    style: "long",
  }).format(-2, "day")

  return (
    <I18nProvider>
      <Router />
    </I18nProvider>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserRole: selectCurrentUserRole,
  authAbility: selectAuthAbility,
  loggedIn: selectAuthUserLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(userLoggedIn()),
  logOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
