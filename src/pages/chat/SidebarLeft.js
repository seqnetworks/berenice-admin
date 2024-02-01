import { useState, useContext } from "react"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { Button } from "reactstrap"
import classnames from "classnames"
import { useHistory } from "react-router-dom"
import { Plus, Search, ChevronLeft, ChevronRight } from "react-feather"
import {
  CardText,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Spinner,
  Badge,
} from "reactstrap"
import { AbilityContext } from "../../utility/context/Can"
import {
  getMessagesOfChatAsync,
  startConversationAsync,
  resetNewMessage,
  clearStartConversationErrorMessage,
} from "../../redux/index.actions"
import {
  selectSelectedUserChats,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
  selectSelectedUserRole,
  selectSelectedUserAvatar,
  selectCurrentUserRole,
  selectCurrentUserFullName,
  selectCurrentUserFullNameArabic,
  selectCurrentUserUuid,
  selectCurrentUserAvatar,
  selectStudents,
  selectStartConversationErrorMessage,
  selectStartConversationIsLoading,
} from "../../redux/index.selectors"
import { useRTL } from "../../utility/hooks/useRTL"
import Avatar from "../../utility/components/avatar/index"
import Dialog from "../../custom/dialog/dialog.component"
import Select from "../../custom/select/select.component"

const SidebarLeft = ({
  getMessagesofChat,
  active,
  setActive,
  chats,
  students,
  sidebar,
  handleSidebar,
  selectedUserFullName,
  selectedUserFullNameArabic,
  selectedUserRole,
  selectedUserAvatar,
  currentUserRole,
  currentUserFullName,
  currentUserFullNameArabic,
  currentUserUuid,
  currentUserAvatar,
  startConversation,
  startConversationErrorMessage,
  startConversationIsLoading,
  resetNewMessage,
  clearStartConversationErrorMessage,
}) => {
  const [searchField, setSearchField] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")

  const intl = useIntl()
  const [rtl] = useRTL()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const handleUserClick = conv => {
    if (active.uuid !== conv.uuid) {
      getMessagesofChat(conv.uuid, {
        error: {
          title: intl.formatMessage({ id: "GET.MESSAGES.OF.CHAT.ERROR.TITLE" }),
          content: intl.formatMessage({
            id: "GET.MESSAGES.OF.CHAT.ERROR.CONTENT",
          }),
        },
      })
      setActive(conv)
      if (sidebar === true) {
        handleSidebar()
      }
    }
  }
  let filteredChat = []
  filteredChat = chats.filter(contact => {
    const contactName =
      selectedUserRole === "student"
        ? rtl
          ? contact.lecturerFullNameArabic
          : contact.lecturerFullName
        : rtl
        ? contact.studentFullNameArabic
        : contact.studentFullName
    return contactName.toLowerCase().includes(searchField.toLowerCase())
  })

  let studentsArray = []
  if (students)
    students.map(student => {
      let found = false
      chats.map(chat => {
        if (chat.studentUuid === student.uuid) found = true
      })
      if (!found)
        studentsArray.push({
          label: rtl
            ? student.fullNameArabic
            : student.fullName + " - " + student.uuid,
          value: student.uuid,
        })
    })

  const sendMessageDialog = {
    button: {
      className: "btn-icon p-50 mr-50",
      color: "flat-primary",
      title: <Plus size={20} />,
    },
    dialog: {
      title: intl.formatMessage({ id: "STARTING.CONVERSATION" }),
      actions: [
        {
          title: startConversationIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "START.CONVERSATION" })
          ),
          color: "primary",
          disabled: startConversationIsLoading || !selectedStudent,
          clickHandler: () =>
            startConversation(
              {
                lecturerUuid: currentUserUuid,
                studentUuid: selectedStudent,
              },
              {
                success: {
                  title: intl.formatMessage({
                    id: "START.CONVERSATION.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "START.CONVERSATION.SUCCESS.CONTENT",
                  }),
                },
                error: {
                  title: intl.formatMessage({
                    id: "START.CONVERSATION.ERROR.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "START.CONVERSATION.ERROR.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: startConversationIsLoading,
        },
      ],
      content: (
        <Select
          height={140}
          stylesClassnames="marginBottom-150"
          array={studentsArray}
          placeHolder={intl.formatMessage({ id: "SELECT.STUDENT" })}
          handleChange={e =>
            e ? setSelectedStudent(e.value) : setSelectedStudent("")
          }
        />
      ),
    },
    errorMessage: startConversationErrorMessage,
    isLoading: startConversationIsLoading,
    closingAction: () => {
      clearStartConversationErrorMessage()
      setSelectedStudent("")
    },
  }

  return (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-content", {
            show: sidebar === true,
          })}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            className="pl-2 pt-1"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {currentUserRole === "staff" ? (
                <Button
                  onClick={() => history.push("/userdetails")}
                  color="primary"
                  className="p-25 h-75 mr-50"
                >
                  {rtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </Button>
              ) : (
                <></>
              )}
              <Avatar
                img={
                  currentUserRole === "lecturer"
                    ? currentUserAvatar
                    : selectedUserAvatar
                }
                className="mr-1"
                imgHeight="42"
                imgWidth="42"
                imgClassName="objectFit"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {currentUserRole === "lecturer" ? (
                  <h3 className="mb-25">
                    {rtl ? currentUserFullNameArabic : currentUserFullName}
                  </h3>
                ) : (
                  <h3 className="mb-25">
                    {rtl ? selectedUserFullNameArabic : selectedUserFullName}
                  </h3>
                )}
              </div>
            </div>
            {currentUserRole === "lecturer" ? (
              <Dialog {...sendMessageDialog} />
            ) : (
              <></>
            )}
          </div>
          <div
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
            style={{ overflowY: "auto" }}
          >
            <InputGroup
              style={{ width: "95%", marginTop: "10px" }}
              className="input-group-merge ml-50 mb-25"
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                value={searchField}
                placeholder={intl.formatMessage({ id: "SEARCH.BY.FULL.NAME" })}
                onChange={e => setSearchField(e.target.value)}
              />
            </InputGroup>
            <ul className="chat-users-list chat-list media-list">
              {!filteredChat.length ? (
                <li
                  style={{
                    textAlign: "center",
                  }}
                  className="no-results show"
                >
                  <h6 className="mb-0">
                    <FormattedMessage id="NO.CHATS" />
                  </h6>
                </li>
              ) : (
                filteredChat.map(conv => (
                  <li
                    className={classnames({
                      active: active.uuid === conv.uuid,
                    })}
                    key={conv.uuid}
                    onClick={() => {
                      if (ability.can("manage", "messages-GET"))
                        handleUserClick(conv)
                      resetNewMessage(conv.uuid)
                    }}
                  >
                    <Avatar
                      img={
                        currentUserRole === "lecturer"
                          ? conv.studentUserAvatar
                          : selectedUserRole === "lecturer"
                          ? conv.studentUserAvatar
                          : conv.lecturerUserAvatar
                      }
                      imgHeight="42"
                      imgWidth="42"
                      imgClassName="objectFit"
                    />
                    <div className="chat-info flex-grow-1">
                      <h5
                        style={conv.unread ? { fontWeight: "bolder" } : {}}
                        className="mb-0"
                      >
                        {selectedUserRole === "student"
                          ? rtl
                            ? conv.lecturerFullNameArabic
                            : conv.lecturerFullName
                          : rtl
                          ? conv.studentFullNameArabic
                          : conv.studentFullName}
                      </h5>
                      {ability.can("manage", "messages-GET") && (
                        <CardText className="text-truncate">
                          <span
                            style={conv.unread ? { fontWeight: "bolder" } : {}}
                          >
                            {conv.lastMessageSent}
                          </span>
                        </CardText>
                      )}
                    </div>
                    <div className="chat-meta text-nowrap">
                      {conv.unread && (
                        <Badge className="mt-1 float-right" color="danger" pill>
                          <FormattedMessage id="NEW" />
                        </Badge>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  chats: selectSelectedUserChats,
  students: selectStudents,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  selectedUserRole: selectSelectedUserRole,
  selectedUserAvatar: selectSelectedUserAvatar,
  currentUserRole: selectCurrentUserRole,
  currentUserFullName: selectCurrentUserFullName,
  currentUserFullNameArabic: selectCurrentUserFullNameArabic,
  currentUserUuid: selectCurrentUserUuid,
  currentUserAvatar: selectCurrentUserAvatar,
  startConversationErrorMessage: selectStartConversationErrorMessage,
  startConversationIsLoading: selectStartConversationIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getMessagesofChat: (chatUuid, messages) =>
    dispatch(getMessagesOfChatAsync(chatUuid, messages)),
  startConversation: (requestBody, messages) =>
    dispatch(startConversationAsync(requestBody, messages)),
  clearStartConversationErrorMessage: () =>
    dispatch(clearStartConversationErrorMessage()),
  resetNewMessage: chatUuid => dispatch(resetNewMessage(chatUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft)
