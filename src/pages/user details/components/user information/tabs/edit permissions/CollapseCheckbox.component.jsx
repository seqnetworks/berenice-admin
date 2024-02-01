import React, { useState } from "react"
import classnames from "classnames"
import { Card, CardHeader, CardTitle, CustomInput } from "reactstrap"

const CollapseCheckbox = ({ title, value, section, setSection, disabled }) => {
  const [open, setOpen] = useState(false)

  const includesCheck = (array, sentValue, sentValueType) => {
    let found = false
    array.map(sectionItem => {
      if (sectionItem.value === sentValue && sectionItem.type === sentValueType)
        found = true
    })
    return found
  }
  return (
    <Card
      onClick={() => setOpen(!open)}
      className={classnames("app-collapse mb-0", {
        open: open,
      })}
    >
      <CardHeader
        className={classnames("align-items-center", {
          collapsed: open,
        })}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CardTitle className="collapse-title">
            <CustomInput
              type="checkbox"
              id={value.value + value.type}
              checked={
                section && includesCheck(section, value.value, value.type)
              }
              value={value}
              disabled={disabled}
              onChange={e => {
                if (e.target.checked) {
                  setSection([...section, value])
                } else {
                  let array = []
                  section.map(sectionItem => {
                    if (
                      !(
                        sectionItem.value === value.value &&
                        sectionItem.type === value.type
                      )
                    )
                      array.push(sectionItem)
                  })
                  setSection([...array])
                }
              }}
            />
          </CardTitle>
          <small>{title}</small>
        </div>
      </CardHeader>
    </Card>
  )
}

export default CollapseCheckbox
