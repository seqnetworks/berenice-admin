import React, { useState } from "react"
import { ChevronUp } from "react-feather"
import classnames from "classnames"
import {
  Media,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Collapse,
} from "reactstrap"
import Avatar from "../../utility/components/avatar/index"
import avatar from "../../assets/images/avatar-blank.png"

const FollowUp = ({ description }) => {
  const [open, setOpen] = useState(false)
  return (
    <Card
      onClick={() => setOpen(!open)}
      className={classnames("app-collapse mb-1 w-100", {
        open: open,
      })}
    >
      <CardHeader
        className={classnames("align-items-center w-100", {
          collapsed: open,
        })}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CardTitle className="collapse-title">
            <Media
              style={{
                alignItems: "center",
              }}
            >
              <Avatar
                className="mr-1"
                img={avatar}
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
                <h6 className="mb-0" style={{ minWidth: "100px" }}>
                  Mittie Evans
                </h6>
                <small className="text-muted">10-09-2021, 12:30</small>
              </Media>
            </Media>
          </CardTitle>
        </div>
        <ChevronUp size={14} />
      </CardHeader>
      <Collapse isOpen={open}>
        <CardBody className="p-0 pl-1 pb-1">
          <p>{description}</p>
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default FollowUp
