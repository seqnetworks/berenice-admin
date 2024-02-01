import layoutTypes from "./layout.types"

export const handleContentWidth = value => ({
	type: layoutTypes.HANDLE_CONTENT_WIDTH,
	payload: value
})

export const handleMenuCollapsed = value => ({
	type: layoutTypes.HANDLE_MENU_COLLAPSED,
	payload: value
})

export const handleMenuHidden = value => ({
	type: layoutTypes.HANDLE_MENU_HIDDEN,
	payload: value
})

export const handleRTL = value => ({
	type: layoutTypes.HANDLE_RTL,
	payload: value
})
