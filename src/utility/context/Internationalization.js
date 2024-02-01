import { useState, createContext } from "react"
import { IntlProvider } from "react-intl"
import messagesEn from "../../assets/data/locales/en.json"
import messagesAr from "../../assets/data/locales/ar.json"
import userMessagesEn from "../../assets/data/locales/en.json"
import userMessagesAr from "../../assets/data/locales/ar.json"

const menuMessages = {
  ar: { ...messagesAr, ...userMessagesAr },
  en: { ...messagesEn, ...userMessagesEn },
}

const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  const [locale, setLocale] = useState("ar")
  const [messages, setMessages] = useState(menuMessages["ar"])

  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale="ar"
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
