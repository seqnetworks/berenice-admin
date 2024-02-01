import { Fragment } from "react"
import NavbarUser from "./NavbarUser"
import NavbarBookmarks from "./NavbarBookmarks"

const ThemeNavbar = ({ skin, setSkin, setMenuVisibility }) => {
	return (
		<Fragment>
			<div className="bookmark-wrapper d-flex align-items-center">
				<NavbarBookmarks setMenuVisibility={setMenuVisibility} />
			</div>
			<NavbarUser skin={skin} setSkin={setSkin} />
		</Fragment>
	)
}

export default ThemeNavbar
