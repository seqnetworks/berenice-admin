import chatTypes from "./chat.types"

const INITIAL_STATE = {
  selectedUserChats: [],
  selectedChat: [],
  badge: false,
  isLoading: {
    sendMessage: false,
    startConversation: false,
    getChatsOfUser: false,
    getMessagesOfChat: false,
    deleteChat: false,
  },
  errorMessages: {
    sendMessage: "",
    startConversation: "",
    getChatsOfUser: "",
    getMessagesOfChat: "",
    deleteChat: "",
  },
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //-----------START----------
    case chatTypes.SEND_MESSAGE_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendMessage: true,
        },
      }
    case chatTypes.START_CONVERSATION_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          startConversation: true,
        },
      }
    case chatTypes.GET_CHATS_OF_USER_START:
      return {
        ...state,
        selectedChat: "",
        isLoading: {
          ...state.isLoading,
          getChatsOfUser: true,
        },
      }
    case chatTypes.GET_MESSAGES_OF_CHAT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getMessagesOfChat: true,
        },
      }
    case chatTypes.DELETE_CHAT_START:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteChat: true,
        },
      }
    //-----------SUCCESS----------
    case chatTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendMessage: false,
        },
        errorMessages: {
          ...state.errorMessages,
          sendMessage: "",
        },
      }
    case chatTypes.START_CONVERSATION_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          startConversation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          startConversation: "",
        },
      }
    case chatTypes.GET_CHATS_OF_USER_SUCCESS: {
      let badge = state.badge ? true : false
      if (state.selectedUserChats.length > 0 && !state.badge) {
        if (state.selectedUserChats.length !== action.payload.length) {
          badge = true
          action.payload = action.payload.map(chat => {
            let found = false
            let unread = false
            state.selectedUserChats.map(stateChat => {
              if (stateChat.uuid === chat.uuid) {
                found = true
                if (stateChat.unread) unread = true
              }
            })
            return !found || unread ? (chat = { ...chat, unread: true }) : chat
          })
        } else
          action.payload = action.payload.map(chat => {
            let newMsg = false
            let unread = false
            state.selectedUserChats.map(stateChat => {
              if (stateChat.uuid === chat.uuid) {
                if (stateChat.lastMessageSent !== chat.lastMessageSent) {
                  newMsg = true
                  badge = true
                }
                if (stateChat.unread) unread = true
              }
            })
            return newMsg || unread ? (chat = { ...chat, unread: true }) : chat
          })
      }
      return {
        ...state,
        badge,
        selectedUserChats: action.payload,
        isLoading: {
          ...state.isLoading,
          getChatsOfUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getChatsOfUser: "",
        },
      }
    }
    case chatTypes.GET_MESSAGES_OF_CHAT_SUCCESS:
      return {
        ...state,
        selectedChat: action.payload,
        isLoading: {
          ...state.isLoading,
          getMessagesOfChat: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getMessagesOfChat: "",
        },
      }

    case chatTypes.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteChat: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteChat: "",
        },
      }
    //-----------FAILURE----------
    case chatTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          sendMessage: false,
        },
        errorMessages: {
          ...state.errorMessages,
          sendMessage: action.payload,
        },
      }
    case chatTypes.START_CONVERSATION_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          startConversation: false,
        },
        errorMessages: {
          ...state.errorMessages,
          startConversation: action.payload,
        },
      }
    case chatTypes.GET_CHATS_OF_USER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getChatsOfUser: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getChatsOfUser: action.payload,
        },
      }
    case chatTypes.GET_MESSAGES_OF_CHAT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getMessagesOfChat: false,
        },
        errorMessages: {
          ...state.errorMessages,
          getMessagesOfChat: action.payload,
        },
      }
    case chatTypes.DELETE_CHAT_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          deleteChat: false,
        },
        errorMessages: {
          ...state.errorMessages,
          deleteChat: action.payload,
        },
      }
    //-----------OTHER----------
    case chatTypes.RESET_NEW_MESSAGE: {
      let chats = ""
      chats = state.selectedUserChats.map(stateChat =>
        stateChat.uuid === action.payload
          ? (stateChat = { ...stateChat, unread: false })
          : stateChat
      )
      return {
        ...state,
        selectedUserChats: chats,
      }
    }
    case chatTypes.RESET_CHAT_BADGE:
      return {
        ...state,
        badge: false,
      }
    case chatTypes.CLEAR_START_CONVERSATION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          startConversation: "",
        },
      }
    case chatTypes.CLEAR_DELETE_CHAT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          deleteChat: "",
        },
      }
    default:
      return state
  }
}

export default chatReducer
