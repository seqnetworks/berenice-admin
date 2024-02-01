import React from "react"
import { X } from "react-feather"
import { Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import classnames from "classnames"
import { Button } from "reactstrap"

const DatePicker = ({
  value,
  onChange,
  placeHolder,
  style,
  error,
  disabled,
  name,
  notRange,
  label,
  height,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Label>{label}</Label>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Flatpickr
        name={name}
        style={{
          ...style,
          width: value ? "95%" : "100%",
          maxHeight: height ? "" : "30px",
        }}
        placeholder={placeHolder}
        className={classnames({
          "form-control": true,
          "is-invalid": error,
        })}
        value={value}
        onChange={(e, str) => onChange(str)}
        disabled={disabled}
        options={{
          mode: notRange ? "single" : "range",
          minDate: "2021-01",
        }}
      />
      {value ? (
        <Button
          onClick={() => onChange("")}
          className="p-25 ml-25 btn-icon"
          color="flat-primary"
        >
          <X size={18} />
        </Button>
      ) : (
        <></>
      )}
    </div>
  </div>
)

export default DatePicker
