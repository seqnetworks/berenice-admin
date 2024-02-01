import chatTypes from "./chat.types"
import { req } from "../../axios/axios"
import { noti } from "../../custom/push notification/noti"
import { sendNotificationToUserAsync } from "../notifications/notifications.actions"

//------------GET MESSAGES OF CHAT---------------
export const getMessagesOfChatStart = () => ({
  type: chatTypes.GET_MESSAGES_OF_CHAT_START,
})
export const getMessagesOfChatSuccess = messages => ({
  type: chatTypes.GET_MESSAGES_OF_CHAT_SUCCESS,
  payload: messages,
})
export const getMessagesOfChatFailure = errorMessage => ({
  type: chatTypes.GET_MESSAGES_OF_CHAT_FAILURE,
  payload: errorMessage,
})

export const getMessagesOfChatAsync = (
  chatUuid,
  messages,
  postSending
) => async dispatch => {
  try {
    if (!postSending) dispatch(getMessagesOfChatStart())
    const result = await req.get("/berenice_chat/messages", {
      params: { chatRoomUuid: chatUuid },
    })
    dispatch(getMessagesOfChatSuccess(result.data))
  } catch (error) {
    dispatch(getMessagesOfChatFailure(error.messages))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//------------GET CHATS OF USER---------------
export const getChatsOfUserStart = () => ({
  type: chatTypes.GET_CHATS_OF_USER_START,
})
export const getChatsOfUserSuccess = chats => ({
  type: chatTypes.GET_CHATS_OF_USER_SUCCESS,
  payload: chats,
})
export const getChatsOfUserFailure = errorMessage => ({
  type: chatTypes.GET_CHATS_OF_USER_FAILURE,
  payload: errorMessage,
})

export const getChatsOfUserAsync = (
  requestBody,
  postSend
) => async dispatch => {
  try {
    if (!postSend) dispatch(getChatsOfUserStart())
    let result = ""
    requestBody.userId
      ? (result = await req.get("/berenice_chat/chat_rooms_single_user_admin", {
          params: { userId: requestBody.userId },
        }))
      : (result = await req.get(`/berenice_chat/chat_rooms_single_user`))
    dispatch(getChatsOfUserSuccess(result.data))
  } catch (error) {
    dispatch(getChatsOfUserFailure(error.message))
  }
}
//------------START CONVERSATION---------------
export const startConversationStart = () => ({
  type: chatTypes.START_CONVERSATION_START,
})
export const startConversationSuccess = () => ({
  type: chatTypes.START_CONVERSATION_SUCCESS,
})
export const startConversationFailure = errorMessage => ({
  type: chatTypes.START_CONVERSATION_FAILURE,
  payload: errorMessage,
})

export const startConversationAsync = (
  requestBody,
  messages
) => async dispatch => {
  try {
    dispatch(startConversationStart())
    await req.post("/berenice_chat/chat_room", {
      studentUuid: requestBody.studentUuid,
    })
    dispatch(getChatsOfUserAsync(requestBody.lecturerUuid, true))
    dispatch(startConversationSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(startConversationFailure(error.message))
  }
}
//------------SEND MESSAGE---------------
export const sendMessageStart = () => ({
  type: chatTypes.SEND_MESSAGE_START,
})
export const sendMessageSuccess = () => ({
  type: chatTypes.SEND_MESSAGE_SUCCESS,
})
export const sendMessageFailure = errorMessage => ({
  type: chatTypes.SEND_MESSAGE_FAILURE,
  payload: errorMessage,
})

export const sendMessageAsync = (
  requestBody,
  studentUserUuid,
  lecturerFullNameArabic,
  messages
) => async dispatch => {
  try {
    dispatch(sendMessageStart())
    await req.post("/berenice_chat/message", requestBody)
    await dispatch(
      getMessagesOfChatAsync(requestBody.chatRoomUuid, messages, true)
    )
    dispatch(sendMessageSuccess())
    dispatch(getChatsOfUserAsync(requestBody.senderUuid, true))
    dispatch(
      sendNotificationToUserAsync({
        uuid: studentUserUuid,
        title: lecturerFullNameArabic,
        description: requestBody.message,
      })
    )
  } catch (error) {
    dispatch(sendMessageFailure(error.message))
    noti({
      type: "error",
      title: messages.error.title,
      content: messages.error.content,
    })
  }
}
//------------DELETE CHAT---------------
export const deleteChatStart = () => ({
  type: chatTypes.DELETE_CHAT_START,
})
export const deleteChatSuccess = () => ({
  type: chatTypes.DELETE_CHAT_SUCCESS,
})
export const deleteChatFailure = errorMessage => ({
  type: chatTypes.DELETE_CHAT_FAILURE,
  payload: errorMessage,
})

export const deleteChatAsync = (requestBody, messages) => async dispatch => {
  try {
    dispatch(deleteChatStart())
    await req.delete("/berenice_chat/chat_room", {
      params: { chatRoomUuid: requestBody.chatUuid },
    })
    dispatch(getChatsOfUserAsync({ userId: requestBody.userUuid }))
    dispatch(deleteChatSuccess())
    noti({
      type: "success",
      title: messages.success.title,
      content: messages.success.content,
    })
  } catch (error) {
    dispatch(deleteChatFailure(error.message))
  }
}
//------------OTHER---------------
export const resetChatBadge = () => ({
  type: chatTypes.RESET_CHAT_BADGE,
})

export const resetNewMessage = chatUuid => ({
  type: chatTypes.RESET_NEW_MESSAGE,
  payload: chatUuid,
})

export const clearStartConversationErrorMessage = () => ({
  type: chatTypes.CLEAR_START_CONVERSATION_ERROR_MESSAGE,
})

export const clearDeleteChatErrorMessage = () => ({
  type: chatTypes.CLEAR_DELETE_CHAT_ERROR_MESSAGE,
})
