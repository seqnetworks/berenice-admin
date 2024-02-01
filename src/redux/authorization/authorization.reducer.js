import { bindActionCreators } from "redux"
import authorizationTypes from "./authorization.types"

const INITIAL_STATE = {
	allGroups: "",
	selectedGroup: "",
	selectedGroupUsers: "",
	isLoading: {
		addUserToGroup: false,
		removeUserFromGroup: false,
		getGroup: false,
		getAllGroups: false,
		getGroupUsers: false,
		createGroup: false,
		deleteGroup: false
	},
	errorMessages: {
		addUserToGroup: "",
		removeUserFromGroup: "",
		getGroup: "",
		getAllGroups: "",
		getGroupUsers: "",
		createGroup: "",
		deleteGroup: ""
	}
}

const authorizationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		//---------START----------
		case authorizationTypes.ADD_USER_TO_GROUP_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addUserToGroup: true
				}
			}
		case authorizationTypes.REMOVE_USER_FROM_GROUP_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					removeUserFromGroup: true
				}
			}
		case authorizationTypes.GET_GROUP_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getGroup: true
				}
			}
		case authorizationTypes.GET_ALL_GROUPS_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getAllGroups: true
				}
			}
		case authorizationTypes.GET_GROUP_USERS_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getGroupUsers: true
				}
			}
		case authorizationTypes.CREATE_GROUP_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					createGroup: true
				}
			}
		case authorizationTypes.DELETE_GROUP_START:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteGroup: true
				}
			}
		//---------SUCCESS----------
		case authorizationTypes.ADD_USER_TO_GROUP_SUCCESS:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addUserToGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					addUserToGroup: ""
				}
			}
		case authorizationTypes.REMOVE_USER_FROM_GROUP_SUCCESS:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					removeUserFromGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					removeUserFromGroup: ""
				}
			}
		case authorizationTypes.GET_GROUP_SUCCESS:
			return {
				...state,
				selectedGroup: action.payload,
				isLoading: {
					...state.isLoading,
					getGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					getGroup: ""
				}
			}
		case authorizationTypes.GET_ALL_GROUPS_SUCCESS:
			return {
				...state,
				allGroups: action.payload,
				isLoading: {
					...state.isLoading,
					getAllGroups: false
				},
				errorMessages: {
					...state.errorMessages,
					getAllGroups: ""
				}
			}
		case authorizationTypes.GET_GROUP_USERS_SUCCESS:
			return {
				...state,
				selectedGroupUsers: action.payload,
				isLoading: {
					...state.isLoading,
					getGroupUsers: false
				},
				errorMessages: {
					...state.errorMessages,
					getGroupUsers: ""
				}
			}
		case authorizationTypes.CREATE_GROUP_SUCCESS:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					createGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					createGroup: ""
				}
			}
		case authorizationTypes.DELETE_GROUP_SUCCESS:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					deleteGroup: ""
				}
			}
		//---------FAILURE----------
		case authorizationTypes.ADD_USER_TO_GROUP_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addUserToGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					addUserToGroup: action.payload
				}
			}
		case authorizationTypes.REMOVE_USER_FROM_GROUP_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					removeUserFromGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					removeUserFromGroup: action.payload
				}
			}
		case authorizationTypes.GET_GROUP_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					getGroup: action.payload
				}
			}
		case authorizationTypes.GET_ALL_GROUPS_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getAllGroups: false
				},
				errorMessages: {
					...state.errorMessages,
					getAllGroups: action.payload
				}
			}
		case authorizationTypes.GET_GROUP_USERS_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					getGroupUsers: false
				},
				errorMessages: {
					...state.errorMessages,
					getGroupUsers: action.payload
				}
			}
		case authorizationTypes.CREATE_GROUP_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					createGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					createGroup: action.payload
				}
			}
		case authorizationTypes.DELETE_GROUP_FAILURE:
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteGroup: false
				},
				errorMessages: {
					...state.errorMessages,
					deleteGroup: action.payload
				}
			}
		//---------OTHERS----------
		case authorizationTypes.CLEAR_CREATE_GROUP_ERROR_MESSAGE:
			return {
				...state,
				errorMessages: {
					...state.errorMessages,
					createGroup: ""
				}
			}
		case authorizationTypes.CLEAR_DELETE_GROUP_ERROR_MESSAGE:
			return {
				...state,
				errorMessages: {
					...state.errorMessages,
					deleteGroup: ""
				}
			}
		case authorizationTypes.CLEAR_ADD_USER_TO_GROUP_ERROR_MESSAGE:
			return {
				...state,
				errorMessages: {
					...state.errorMessages,
					addUserToGroup: ""
				}
			}
		case authorizationTypes.CLEAR_REMOVE_USER_FROM_GROUP_ERROR_MESSAGE:
			return {
				...state,
				errorMessages: {
					...state.errorMessages,
					removeUserFromGroup: ""
				}
			}
		case authorizationTypes.CLEAR_SELECTED_GROUP:
			return {
				...state,
				selectedGroup: "",
				selectedGroupUsers: ""
			}
		default:
			return state
	}
}

export default authorizationReducer
