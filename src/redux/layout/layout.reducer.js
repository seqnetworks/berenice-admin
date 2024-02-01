import themeConfig from "../../configs/themeConfig"
import layoutTypes from "./layout.types"

const INITIAL_STATE = {
	isRTL: themeConfig.layout.isRTL,
	menuCollapsed: themeConfig.layout.menu.isCollapsed,
	menuHidden: themeConfig.layout.menu.isHidden,
	contentWidth: themeConfig.layout.contentWidth
}

const layoutReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case layoutTypes.HANDLE_CONTENT_WIDTH:
			return { ...state, contentWidth: action.payload }
		case layoutTypes.HANDLE_MENU_COLLAPSED:
			return { ...state, menuCollapsed: action.payload }
		case layoutTypes.HANDLE_MENU_HIDDEN:
			return { ...state, menuHidden: action.payload }
		case layoutTypes.HANDLE_RTL:
			return { ...state, isRTL: action.payload }
		default:
			return state
	}
}

export default layoutReducer
