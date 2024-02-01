import React, { useState } from "react"
import { FormattedMessage } from "react-intl"
import { CardBody, CardText, Badge, Media } from "reactstrap"
import Avatar from "../../utility/components/avatar/index"
import avatar from "../../assets/images/avatar-blank.png"
import "./Post.styles.scss"

const Post = ({ writer, date, title, content, important, userAvatar }) => {
  const [isFull, setIsFull] = useState(false)

  const FullContent = () => (
    <span style={{ fontSize: "1.3rem" }}>
      {content}
      <a className="text-primary" onClick={() => setIsFull(false)}>
        . <FormattedMessage id="SHOW.LESS" />
      </a>
    </span>
  )
  const SubContent = () => (
    <span style={{ fontSize: "1.3rem" }}>
      {content.substring(0, 100)}
      <a className="text-primary" onClick={() => setIsFull(true)}>
        ...
        <FormattedMessage id="SHOW.MORE" />
      </a>
    </span>
  )

  return (
    <div className="post-slide">
      <CardBody>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="mb-1"
        >
          <Media
            style={{
              alignItems: "center",
            }}
          >
            <Avatar
              className="mr-1"
              imgClassName="objectFit"
              img={userAvatar ? userAvatar : avatar}
              imgHeight="42"
              imgWidth="42"
            />
            <Media
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
              body
            >
              <h6 className="mb-0">{writer}</h6>
              <small className="text-muted">{date}</small>
            </Media>
          </Media>
          {important ? (
            <Badge color="light-primary" pill>
              <FormattedMessage id="IMPORTANT" />
            </Badge>
          ) : (
            <></>
          )}
        </div>
        <h2 className="apply-job-title mb-1">{title}</h2>
        <CardText className="mb-1">
          {content.length > 100 ? (
            isFull ? (
              <FullContent />
            ) : (
              <SubContent />
            )
          ) : (
            <span style={{ fontSize: "1.3rem" }}>{content}</span>
          )}
        </CardText>
      </CardBody>
    </div>
  )
}

export default Post
