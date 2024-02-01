import { useContext } from "react"
import ReactCountryFlag from "react-country-flag"
import { FormattedMessage, useIntl } from "react-intl"
import {
	UncontrolledDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle
} from "reactstrap"
import { setLanguage } from "../../../../i18n"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { IntlContext } from "../../../../utility/context/Internationalization"

const IntlDropdown = () => {
	const intl = useIntl()

	const [isRtl, setIsRtl] = useRTL()
	const intlContext = useContext(IntlContext)

	const langObj = {
		en: intl.formatMessage({ id: "ENGLISH" }),
		ar: intl.formatMessage({ id: "ARABIC" })
	}

	const langCode = {
		en: "us",
		ar: "ly"
	}

	const handleLangUpdate = (e, lang) => {
		e.preventDefault()
		intlContext.switchLanguage(lang)
	}

	return (
		<UncontrolledDropdown href="/" tag="li" className="dropdown-language nav-item">
			<DropdownToggle
				href="/"
				tag="a"
				className="nav-link"
				onClick={e => e.preventDefault()}
			>
				<ReactCountryFlag
					className="country-flag flag-icon"
					countryCode={langCode[intlContext.locale]}
					svg
				/>
				<span className="selected-language">{langObj[intlContext.locale]}</span>
			</DropdownToggle>
			<DropdownMenu className="mt-0" right>
				<DropdownItem
					href="/"
					tag="a"
					onClick={e => {
						handleLangUpdate(e, "en")
						setLanguage("en")
						setIsRtl(false)
						document.getElementById("body").style.fontFamily =
							"Montserrat,Helvetica,Arial,serif"
					}}
				>
					<ReactCountryFlag className="country-flag" countryCode="us" svg />
					<span className="ml-1">
						<FormattedMessage id="ENGLISH" />
					</span>
				</DropdownItem>
				<DropdownItem
					href="/"
					tag="a"
					onClick={e => {
						handleLangUpdate(e, "ar")
						setLanguage("ar")
						setIsRtl(true)
						document.getElementById("body").style.fontFamily = "Cairo,sans-serif"
					}}
				>
					<ReactCountryFlag className="country-flag" countryCode="ly" svg />
					<span className="ml-1">
						<FormattedMessage id="ARABIC" />
					</span>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	)
}

export default IntlDropdown
