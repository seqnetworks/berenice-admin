import React from "react"
import { Fragment } from "react"
import { toast } from "react-toastify"
import Avatar from "../../utility/components/avatar"
import { Check, X, Info } from "react-feather"

const toastAttributes = {
  color: {
    success: "success",
    info: "info",
    error: "danger",
  },
  icon: {
    success: () => <Check size={12} />,
    info: () => <Info size={12} />,
    error: () => <X size={12} />,
  },
}

const Toast = ({ content, title, type }) => {
  return (
    <Fragment>
      <div style={{ fontFamily: "Cairo" }} className="toastify-header">
        <div className="title-wrapper">
          <Avatar
            size="sm"
            color={toastAttributes.color[type]}
            icon={toastAttributes.icon[type]()}
          />
          <h6 className="toast-title">{title}</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span
          style={{ fontFamily: "Cairo" }}
          role="img"
          aria-label="toast-text"
        >
          {content}
        </span>
      </div>
    </Fragment>
  )
}

export const noti = ({ content, title, type }) => {
  const toastComponent = <Toast content={content} title={title} type={type} />
  const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2500,
  }
  const toastType = {
    success: () => toast.success(toastComponent, toastConfig),
    info: () => toast.info(toastComponent, toastConfig),
    error: () => toast.error(toastComponent, toastConfig),
  }

  return toastType[type]()
}
