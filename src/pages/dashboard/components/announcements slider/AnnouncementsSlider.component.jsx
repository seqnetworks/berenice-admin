import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap"
import { ChevronLeft, ChevronRight } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import ErrorCard from "../../../../custom/errorcard/ErrorCard.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import Post from "../../../../custom/post/Post.component"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { dateAndTimeFormatterString } from "../../../../utility/custom/dateAndTimeFormatter"
import { selectAllAnnouncements } from "../../../../redux/index.selectors"

const AnnouncementsSlider = ({ announcements }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [rtl] = useRTL()

  const announcementsDialogAttributes = {
    button: {},
    dialog: {
      title: "Announcements",
      content: (
        <PerfectScrollbar>
          <div
            className="px-2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {announcements &&
              announcements.map(announcement => (
                <Post
                  important={announcement.type === "important"}
                  content={announcement.description}
                  date={dateAndTimeFormatterString(announcement.createdAt)}
                  title={announcement.title}
                  userAvatar={announcement.userAvatar}
                  writer={
                    rtl
                      ? announcement.senderFullNameArabic
                      : announcement.senderFullName
                  }
                />
              ))}
          </div>
        </PerfectScrollbar>
      ),
    },
    externalOpenSource: dialogIsOpen,
    setExternalOpenSource: setDialogIsOpen,
    bigSize: true,
  }

  return (
    <Card>
      <CardHeader>
        {" "}
        <h3>Latest Announcements</h3>{" "}
        <Dialog {...announcementsDialogAttributes} />
      </CardHeader>
      <CardBody>
        {" "}
        {announcements.length > 0 ? (
          <Post
            important={announcements[0].type === "important"}
            content={announcements[0].description}
            date={dateAndTimeFormatterString(announcements[0].createdAt)}
            title={announcements[0].title}
            userAvatar={announcements[0].userAvatar}
            writer={
              rtl
                ? announcements[0].senderFullNameArabic
                : announcements[0].senderFullName
            }
          />
        ) : (
          <ErrorCard info={true} content="No Announcements Available" />
        )}{" "}
        <div
          className="px-50"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div />
          <a onClick={() => setDialogIsOpen(true)} className="text-primary">
            See All
            {rtl ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
          </a>
        </div>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  announcements: selectAllAnnouncements,
})

export default connect(mapStateToProps)(AnnouncementsSlider)
