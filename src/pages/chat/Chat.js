import { useState, useEffect, useRef, useContext } from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { createStructuredSelector } from "reselect"
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { MessageSquare, Menu, X, Send, RefreshCw } from "react-feather"
import { Spinner, Form, InputGroup, Input, Button } from "reactstrap"
import { AbilityContext } from "../../utility/context/Can"
import {
  selectSelectedChat,
  selectSelectedUserUsername,
  selectSelectedUserUuid,
  selectSelectedUserRole,
  selectGetMessagesOfChatIsLoading,
  selectCurrentUserRole,
  selectCurrentUserUsername,
  selectCurrentUserUuid,
  selectSendMessageIsLoading,
  selectDeleteChatErrorMessage,
  selectDeleteChatIsLoading,
} from "../../redux/index.selectors"
import {
  sendMessageAsync,
  deleteChatAsync,
  getMessagesOfChatAsync,
  clearDeleteChatErrorMessage,
} from "../../redux/index.actions"
import { useRTL } from "../../utility/hooks/useRTL"
import Dialog from "../../custom/dialog/dialog.component"
import Avatar from "../../utility/components/avatar/index"
import avatar from "../../assets/images/avatar-blank.png"
import "./chat.styles.scss"

const ChatLog = ({
  sendMessage,
  deleteChat,
  getMessagesOfChat,
  handleSidebar,
  active,
  setActive,
  chat,
  selectedUserUsername,
  selectedUserUuid,
  selectedUserRole,
  GetMessagesOfChatIsLoading,
  currentUserRole,
  currentUserUsername,
  currentUserUuid,
  sendMessageIsLoading,
  deleteChatErrorMessage,
  deleteChatIsLoading,
  clearDeleteChatErrorMessage,
}) => {
  const chatArea = useRef(null)
  const [msg, setMsg] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(() => {
    const selectedUserLen = Object.keys(chat).length

    if (selectedUserLen) {
      scrollToBottom()
    }
  }, [chat])

  const formattedChatData = () => {
    let chatLog = []
    if (chat) {
      chatLog = chat
    }

    const formattedChatLog = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].author : undefined
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: [],
    }
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.author) {
        msgGroup.messages.push({
          msg: msg.message,
        })
      } else {
        chatMessageSenderId = msg.author
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.author,
          messages: [
            {
              msg: msg.message,
            },
          ],
        }
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })
    return formattedChatLog
  }

  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames("chat", {
            "chat-left":
              currentUserRole === "lecturer"
                ? item.senderId !== currentUserUsername
                : item.senderId !== selectedUserUsername,
          })}
        >
          <div className="chat-body">
            {item.messages.map((chat, index) => (
              <div key={index} className="chat-content">
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  const handleStartConversation = () => {
    if (!Object.keys(chat).length && window.innerWidth <= 1200) {
      handleSidebar()
    }
  }

  const handleSendMsg = async e => {
    e.preventDefault()
    if (msg.length) {
      await sendMessage(
        {
          chatRoomUuid: active.uuid,
          message: msg,
          senderUuid: currentUserUuid,
        },
        active.studentUserUuid,
        active.lecturerFullNameArabic,
        {
          error: {
            title: intl.formatMessage({ id: "SEND.MESSAGE.ERROR.TITLE" }),
            content: intl.formatMessage({ id: "SEND.MESSAGE.ERROR.CONTENT" }),
          },
        }
      )
      setMsg("")
    }
  }

  const ChatWrapper = chat.length && chat ? PerfectScrollbar : "div"

  const deleteChatDialogAttributes = {
    dialog: {
      actions: [
        {
          color: "danger",
          title: deleteChatIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "DELETE" })
          ),
          disabled: deleteChatIsLoading,
          clickHandler: async () => {
            await deleteChat(
              {
                userUuid: selectedUserUuid,
                role: selectedUserRole,
                chatUuid: active.uuid,
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.CHAT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.CHAT.SUCCESS.CONTENT",
                  }),
                },
              }
            )
            setActive("")
          },
        },
        {
          color: "secondary",
          title: intl.formatMessage({ id: "CANCEL" }),
          disabled: deleteChatIsLoading,
        },
      ],
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.REMOVE.THIS.CHAT",
      }),
      title: intl.formatMessage({ id: "REMOVE.CHAT" }),
    },
    button: {
      className: "p-25 mr-50 btn-icon",
      color: "flat-primary",
      title: <X size={25} />,
    },
    errorMessage: deleteChatErrorMessage,
    isLoading: deleteChatIsLoading,
    closingAction: () => clearDeleteChatErrorMessage(),
  }

  return (
    <div className="chat-app-window">
      <div
        className={classnames("start-chat-area", {
          "d-none": active || GetMessagesOfChatIsLoading,
        })}
      >
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4
          className="sidebar-toggle start-chat-text"
          onClick={handleStartConversation}
        >
          <FormattedMessage id="START.CONVERSATION" />
        </h4>
      </div>
      {GetMessagesOfChatIsLoading ? (
        <div className="start-chat-area">
          <div className="start-chat-icon mb-1">
            <Spinner
              as="span"
              animation="border"
              size="xl"
              aria-hidden="true"
              color="primary"
            />
          </div>
        </div>
      ) : (
        <div className={classnames("active-chat")}>
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div
                  className="sidebar-toggle d-block d-lg-none mr-1"
                  onClick={handleSidebar}
                >
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="40"
                  imgWidth="40"
                  img={
                    selectedUserRole === "student"
                      ? active.lecturerUserAvatar
                      : active.studentUserAvatar
                  }
                  className="avatar-border user-profile-toggle m-0 mr-1"
                  imgClassName="objectFit"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4 className=" mb-0">
                    {selectedUserRole === "student"
                      ? rtl
                        ? active.lecturerFullNameArabic
                        : active.lecturerFullName
                      : rtl
                      ? active.studentFullNameArabic
                      : active.studentFullName}
                  </h4>
                  <span className="text-muted">
                    {selectedUserRole !== "student" && active.studentUuid}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                {currentUserRole === "lecturer"
                  ? null
                  : ability.can("manage", "chat_room-DELETE") && (
                      <Dialog {...deleteChatDialogAttributes} />
                    )}
                <Button
                  onClick={() =>
                    getMessagesOfChat(active.uuid, {
                      error: {
                        title: intl.formatMessage({
                          id: "GET.MESSAGES.OF.CHAT.ERROR.TITLE",
                        }),
                        content: intl.formatMessage({
                          id: "GET.MESSAGES.OF.CHAT.ERROR.CONTENT",
                        }),
                      },
                    })
                  }
                  className="btn-icon p-25"
                  color="flat-secondary"
                >
                  <RefreshCw size={22} />
                </Button>
              </div>
            </header>
          </div>

          <ChatWrapper
            ref={chatArea}
            className={`user-chats ${
              currentUserRole === "lecturer" ? "" : "user-chats-staff"
            }`}
            options={{ wheelPropagation: false }}
          >
            {chat ? <div className="chats">{renderChats()}</div> : null}
          </ChatWrapper>

          {currentUserRole === "lecturer" ? (
            <Form className="chat-app-form" onSubmit={e => handleSendMsg(e)}>
              <InputGroup className="mr-1">
                <Input
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Type a message"
                  readOnly={sendMessageIsLoading ? true : false}
                />
              </InputGroup>
              <Button className="send " color="primary">
                {sendMessageIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                    color="white"
                    className="m-25"
                  />
                ) : (
                  <Send size={20} className="send-icon mr-25" />
                )}
              </Button>
            </Form>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  chat: selectSelectedChat,
  selectedUserUsername: selectSelectedUserUsername,
  selectedUserRole: selectSelectedUserRole,
  GetMessagesOfChatIsLoading: selectGetMessagesOfChatIsLoading,
  currentUserRole: selectCurrentUserRole,
  currentUserUsername: selectCurrentUserUsername,
  currentUserUuid: selectCurrentUserUuid,
  sendMessageIsLoading: selectSendMessageIsLoading,
  deleteChatErrorMessage: selectDeleteChatErrorMessage,
  deleteChatIsLoading: selectDeleteChatIsLoading,
  selectedUserUuid: selectSelectedUserUuid,
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (
    requestBody,
    studentUserUuid,
    lecturerFullNameArabic,
    messages
  ) =>
    dispatch(
      sendMessageAsync(
        requestBody,
        studentUserUuid,
        lecturerFullNameArabic,
        messages
      )
    ),
  deleteChat: (requestBody, messages) =>
    dispatch(deleteChatAsync(requestBody, messages)),
  getMessagesOfChat: (chatUuid, messages) =>
    dispatch(getMessagesOfChatAsync(chatUuid, messages)),
  clearDeleteChatErrorMessage: () => dispatch(clearDeleteChatErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog)
