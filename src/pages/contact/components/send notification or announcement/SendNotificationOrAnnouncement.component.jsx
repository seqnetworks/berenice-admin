import React, { useState, useEffect } from "react"
import { Edit, Users, Bell } from "react-feather"
import { useIntl } from "react-intl"
import Wizard from "../../../../custom/wizard/wizard.component"
import Who from "./tabs/who/Who.component"
import What from "./tabs/what/What.component"
import Preview from "./tabs/preview/Preview.component"
import everyoneIcon from "../../../../assets/images/email.svg"
import userIcon from "../../../../assets/images/api.svg"
import targetsIcon from "../../../../assets/images/personalization.svg"

const SendNotificationOrAnnouncement = () => {
  const intl = useIntl()

  const [activeTab, setActiveTab] = useState(0)
  const [disabledNext, setDisabledNext] = useState(false)
  const [disabledPrev, setDisabledPrev] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedTargets, setSelectedTargets] = useState([""])
  const [selectedIntakes, setSelectedIntakes] = useState([])
  const [selectedSubject, setSelectedSubject] = useState("")
  const [checkedTemplate, setCheckedTemplate] = useState(0)
  const [studentsGroup, setStudentsGroup] = useState({
    intake: false,
    subject: false,
    all: false,
  })
  const [contactType, setContactType] = useState({
    label: "",
    value: "",
  })
  const [notificationTitle, setNotificationTitle] = useState({
    text: "",
    touched: false,
  })
  const [notificationContent, setNotificationContent] = useState({
    text: "",
    touched: false,
  })
  const [announcementType, setAnnouncementType] = useState({
    value: "normal",
    label: intl.formatMessage({ id: "DEFAULT" }),
  })

  const resetState = () => {
    setActiveTab(0)
    setSelectedCategory(0)
    setSelectedTargets([""])
    setSelectedIntakes([])
    setSelectedUser("")
    setCheckedTemplate(0)
    setNotificationTitle({ text: "", touched: false })
    setNotificationContent({ text: "", touched: false })
  }

  useEffect(() => {
    setSelectedIntakes([])
    setSelectedSubject("")
    setStudentsGroup({
      intake: false,
      subject: false,
      all: false,
    })
  }, [selectedTargets, selectedCategory])

  const activeTabToChangeStatus = {
    0: () => setDisabledNext(nextStatus[activeTab][selectedCategory]()),
    1: () => setDisabledNext(nextStatus[activeTab]()),
    2: () => {},
  }

  const nextStatus = {
    0: {
      0: () => false,
      1: () => !selectedUser,
      2: () =>
        selectedTargets.includes("") ||
        (selectedTargets.includes("student") &&
          !studentsGroup.all &&
          selectedIntakes.length === 0 &&
          !selectedSubject),
    },
    1: () => !(notificationTitle.text && notificationContent.text),
  }

  const slides = [
    {
      name: intl.formatMessage({ id: "EVERYONE" }),
      img: everyoneIcon,
    },
    {
      name: intl.formatMessage({ id: "USER" }),
      img: userIcon,
    },
    {
      name: intl.formatMessage({ id: "TARGETS" }),
      img: targetsIcon,
    },
  ]

  useEffect(() => {
    activeTabToChangeStatus[activeTab]()
  }, [
    selectedCategory,
    selectedUser,
    notificationTitle,
    notificationContent,
    activeTab,
    selectedTargets,
    studentsGroup,
    selectedIntakes,
    selectedSubject,
  ])

  useEffect(() => {
    if (activeTab === 0)
      setContactType({
        label: "",
        value: "",
      })
  }, [activeTab])

  const steps = [
    {
      id: "who",
      title: intl.formatMessage({ id: "WHO" }),
      subtitle: intl.formatMessage({ id: "TO.WHOM.YOU'RE.SENDING" }),
      icon: <Users size={18} />,
      content: (
        <Who
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTargets={selectedTargets}
          setSelectedTargets={setSelectedTargets}
          selectedIntakes={selectedIntakes}
          setSelectedIntakes={setSelectedIntakes}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          studentsGroup={studentsGroup}
          setStudentsGroup={setStudentsGroup}
          slides={slides}
        />
      ),
    },
    {
      id: "what",
      title: intl.formatMessage({ id: "WHAT" }),
      subtitle: intl.formatMessage({ id: "WHAT.ARE.YOU.SENDING" }),
      icon: <Edit size={18} />,
      content: (
        <What
          notificationTitle={notificationTitle}
          setNotificationTitle={setNotificationTitle}
          notificationContent={notificationContent}
          setNotificationContent={setNotificationContent}
          checkedTemplate={checkedTemplate}
          setCheckedTemplate={setCheckedTemplate}
          contactType={contactType}
          slides={slides}
          setContactType={setContactType}
          selectedCategory={selectedCategory}
          announcementType={announcementType}
          setAnnouncementType={setAnnouncementType}
          selectedTargets={selectedTargets}
        />
      ),
    },
    {
      id: "preview",
      title: intl.formatMessage({ id: "PREVIEW" }),
      subtitle: intl.formatMessage({ id: "MAKE.SURE.WHAT.YOU'RE.SENDING" }),
      icon: <Bell size={18} />,
      content: (
        <Preview
          selectedCategory={selectedCategory}
          slides={slides}
          selectedUser={selectedUser}
          selectedTargets={selectedTargets}
          selectedIntakes={selectedIntakes}
          notificationTitle={notificationTitle}
          notificationContent={notificationContent}
          setDisabledPrev={setDisabledPrev}
          resetState={resetState}
          contactType={contactType}
          announcementType={announcementType}
          selectedTargets={selectedTargets}
          selectedSubject={selectedSubject}
          studentsGroup={studentsGroup}
        />
      ),
    },
  ]
  return (
    <Wizard
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      disabledNext={disabledNext}
      disabledPrev={disabledPrev}
      steps={steps}
      title={intl.formatMessage({
        id: "SEND.NOTIFICATION.OR.POST.ANNOUNCEMENT",
      })}
    />
  )
}

export default SendNotificationOrAnnouncement
