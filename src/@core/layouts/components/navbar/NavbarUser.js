import IntlDropdown from "./IntlDropdown"
import UserDropdown from "./UserDropdown"
import { Sun, Moon } from "react-feather"
import { NavItem, NavLink } from "reactstrap"

const NavbarUser = props => {
	const { skin, setSkin } = props

	const ThemeToggler = () => {
		if (skin === "dark") {
			return <Sun className="ficon" onClick={() => setSkin("light")} />
		} else {
			return <Moon className="ficon" onClick={() => setSkin("dark")} />
		}
	}

	return (
		<ul className="nav navbar-nav align-items-center ml-auto">
			<IntlDropdown />
			<NavItem className=" d-lg-block">
				<NavLink className="nav-link-style">
					<ThemeToggler />
				</NavLink>
			</NavItem>
			<UserDropdown />
		</ul>
	)
}
export default NavbarUser
