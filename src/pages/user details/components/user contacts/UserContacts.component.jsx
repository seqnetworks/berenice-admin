import React, { Fragment, useContext } from "react"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import { createStructuredSelector } from "reselect"
import { MessageCircle, FileText, Edit, BookOpen } from "react-feather"
import { useIntl } from "react-intl"
import { useHistory } from "react-router-dom"
import { AbilityContext } from "../../../../utility/context/Can"
import chatSvg from "../../../../assets/images/sales.svg"
import announcementSvg from "../../../../assets/images/demand.svg"
import followUpSvg from "../../../../assets/images/marketing.svg"
import subjectSvg from "../../../../assets/images/email.svg"
import { selectSelectedUserRole } from "../../../../redux/index.selectors"
import "./UserContacts.styles.scss"
import "../../../../@core/scss/react/libs/swiper/swiper.scss"

const UserContacts = ({ selectedUserRole }) => {
  const intl = useIntl()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const slides = [
    {
      title: intl.formatMessage({ id: "CHATS" }),
      svg: chatSvg,
      Icon: MessageCircle,
      ability:
        selectedUserRole !== "guardian" &&
        selectedUserRole !== "staff" &&
        ability.can("manage", "chat_rooms_single_user_admin-GET"),
      clickHandler: () => history.push("/chat"),
    },
    {
      title: intl.formatMessage({ id: "ANNOUNCEMENTS" }),
      svg: announcementSvg,
      Icon: FileText,
      ability:
        selectedUserRole !== "guardian" &&
        selectedUserRole !== "student" &&
        ability.can("manage", "announcements_user_sender-GET"),
      clickHandler: () => history.push("/announcements"),
    },
    {
      title: intl.formatMessage({ id: "FOLLOW.UPS" }),
      svg: followUpSvg,
      Icon: Edit,
      ability:
        selectedUserRole !== "guardian" &&
        (selectedUserRole === "student"
          ? ability.can("manage", "follow_ups_user_sender_single_student-GET")
          : ability.can("manage", "follow_ups_user-GET")),
      clickHandler: () => history.push("/followups"),
    },
    {
      title: intl.formatMessage({ id: "SUBJECTS" }),
      svg: subjectSvg,
      Icon: BookOpen,
      ability:
        (selectedUserRole === "student" &&
          ability.can("manage", "get_all_subjects_of_student-GET")) ||
        (selectedUserRole === "lecturer" &&
          ability.can("manage", "get_all_subjects_of_lecturer-GET")),
      clickHandler: () => {
        if (selectedUserRole === "student") history.push("/subjects")
        else if (selectedUserRole === "lecturer")
          history.push("/lecturerSubjects")
      },
    },
  ]

  const domSlides = []
  slides.map(slide => {
    if (slide.ability) domSlides.push(slide)
  })

  return (
    <Fragment>
      <Row className="mb-1">
        {domSlides.map(
          slide =>
            slide.ability && (
              <Col lg={4} md={6} key={slide.name}>
                <a
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className="user-contacts-slide mt-2"
                  href="/"
                  onClick={e => {
                    e.preventDefault()
                    slide.clickHandler()
                  }}
                >
                  <h2
                    className="m-0 text-primary"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <slide.Icon size={22} className="mr-1" />
                    <h3 className="m-0 text-primary">{slide.title}</h3>
                  </h2>
                  <div className="img-container">
                    <img
                      src={slide.svg}
                      alt={slide.title}
                      style={{ maxWidth: "180%" }}
                    />
                  </div>
                </a>
              </Col>
            )
        )}
      </Row>
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserRole: selectSelectedUserRole,
})

export default connect(mapStateToProps)(UserContacts)
