import React from "react"
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Button,
} from "reactstrap"

const Popover = ({ unique, place, title, content, button }) => (
  <>
    <Button className={button.className} color={button.color} id={unique}>
      {button.title}
    </Button>
    <UncontrolledPopover trigger="focus" placement={place} target={unique}>
      <PopoverHeader>{title}</PopoverHeader>
      <PopoverBody>{content}</PopoverBody>
    </UncontrolledPopover>
  </>
)

export default Popover
