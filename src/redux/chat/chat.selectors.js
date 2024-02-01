import { createSelector } from "reselect"

const selectChat = state => state.chat

//----------------1ST LEVEL SELECTORS--------------
export const selectSelectedUserChats = createSelector(
  [selectChat],
  chat => chat.selectedUserChats
)

export const selectSelectedChat = createSelector(
  [selectChat],
  chat => chat.selectedChat
)

export const selectChatBadge = createSelector([selectChat], chat => chat.badge)

export const selectChatErrorMessages = createSelector(
  [selectChat],
  chat => chat.errorMessages
)

export const selectChatIsLoading = createSelector(
  [selectChat],
  chat => chat.isLoading
)
//----------------2ND LEVEL SELECTORS--------------
export const selectSendMessageErrorMessage = createSelector(
  [selectChatErrorMessages],
  errorMessages => errorMessages.sendMessage
)
export const selectSendMessageIsLoading = createSelector(
  [selectChatIsLoading],
  isLoading => isLoading.sendMessage
)

export const selectStartConversationErrorMessage = createSelector(
  [selectChatErrorMessages],
  errorMessages => errorMessages.startConversation
)
export const selectStartConversationIsLoading = createSelector(
  [selectChatIsLoading],
  isLoading => isLoading.startConversation
)

export const selectGetMessagesOfChatErrorMessage = createSelector(
  [selectChatErrorMessages],
  errorMessages => errorMessages.getMessagesOfChat
)
export const selectGetMessagesOfChatIsLoading = createSelector(
  [selectChatIsLoading],
  isLoading => isLoading.getMessagesOfChat
)

export const selectGetChatsOfUserErrorMessage = createSelector(
  [selectChatErrorMessages],
  errorMessages => errorMessages.getChatsOfUser
)
export const selectGetChatsOfUserIsLoading = createSelector(
  [selectChatIsLoading],
  isLoading => isLoading.getChatsOfUser
)

export const selectDeleteChatErrorMessage = createSelector(
  [selectChatErrorMessages],
  errorMessages => errorMessages.deleteChat
)
export const selectDeleteChatIsLoading = createSelector(
  [selectChatIsLoading],
  isLoading => isLoading.deleteChat
)
