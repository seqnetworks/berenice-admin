import React, { useState, useEffect } from "react"
import ErrorCard from "../errorcard/ErrorCard.component"
import { useIntl } from "react-intl"
import { X } from "react-feather"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import "../../@core/scss/react/libs/flatpickr/flatpickr.scss"

const Dialog = ({
  button,
  dialog,
  closingAction,
  openingAction,
  isLoading,
  errorMessage,
  clickHandlerProps,
  externalOpenSource,
  setExternalOpenSource,
  bigSize,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [actionDone, setActionDone] = useState(false)

  const nothing = () => {}
  const intl = useIntl()

  const handleClose = () => {
    setExternalOpenSource ? setExternalOpenSource(false) : setIsOpen(false)
    isLoading ? nothing() : setActionDone(false)
    closingAction ? closingAction() : nothing()
  }

  useEffect(() => {
    if (actionDone && !errorMessage) {
      handleClose()
    }
  }, [actionDone])

  const CloseBtn = (
    <X
      className="cursor-pointer"
      size={15}
      onClick={handleClose}
      style={{ margin: "auto 0" }}
    />
  )

  return (
    <>
      <Button
        className={button.className}
        style={setExternalOpenSource ? { display: "none" } : button.styles}
        color={button.color}
        onClick={() =>
          setExternalOpenSource ? setExternalOpenSource(true) : setIsOpen(true)
        }
      >
        {button.title}
      </Button>
      <Modal
        style={bigSize ? { maxWidth: "950px" } : {}}
        isOpen={externalOpenSource ? externalOpenSource : isOpen}
        toggle={handleClose}
        className="sidebar-sm"
        contentClassName="pt-0"
        centered={true}
        onOpened={openingAction ? openingAction() : nothing()}
        scrollable={true}
        fade={true}
        modalTransition={{ timeout: 150 }}
      >
        <ModalHeader toggle={handleClose} close={CloseBtn} tag="div">
          <h4 className="modal-title">{dialog.title}</h4>
        </ModalHeader>
        <ModalBody
          style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
          className={`flex-grow-1 ${bigSize ? "p-0" : ""}`}
        >
          {errorMessage && (
            <ErrorCard
              style={{ marginBottom: "10px" }}
              content={intl.formatMessage({
                id: "SOMETHING.WENT.WRONG.,.PLEASE.TRY.AGAIN",
              })}
              scrollable={true}
            />
          )}
          {dialog.content}
        </ModalBody>
        {dialog.actions && (
          <ModalFooter style={{ alignItems: "end", marginTop: "1rem" }}>
            {dialog.actions.map(action => (
              <Button
                className={action.className}
                style={action.style}
                disabled={action.disabled}
                onClick={
                  action.clickHandler
                    ? async () => {
                        await action.clickHandler(
                          clickHandlerProps ? clickHandlerProps : null
                        )
                        setActionDone(true)
                      }
                    : handleClose
                }
                color={action.color}
              >
                {action.title}
              </Button>
            ))}
          </ModalFooter>
        )}
      </Modal>
    </>
  )
}

export default Dialog
