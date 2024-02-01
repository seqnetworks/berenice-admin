import React from "react"
import ReactSelect from "react-select"
import { selectThemeColors } from "../../utility/Utils"
import { Label } from "reactstrap"
import classnames from "classnames"
import "./select.styles.scss"
import "../../@core/scss/react/libs/react-select/_react-select.scss"

const Select = ({
  array,
  label,
  disabled,
  name,
  error,
  placeHolder,
  isMulti,
  isGrouped,
  handleChange,
  styles,
  height,
  value,
  stylesClassnames,
  fixed,
  otherProps,
  onClear,
}) => {
  const customStyles = {
    control: base => ({
      ...base,
      minHeight: 32,
    }),
    dropdownIndicator: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      zIndex: 2000,
    }),
    clearIndicator: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: base => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  }

  const formatGroupLabel = data => (
    <div className="d-flex justify-content-between align-center">
      <strong>
        <span>{data.label}</span>
      </strong>
      <span>{data.options.length}</span>
    </div>
  )

  let groupedArray = []
  if (isGrouped)
    array.map(group => {
      groupedArray.push({
        ...group,
        options: group.options.reduce((acc, option) => {
          return [...acc, { ...option, parent: group.label }]
        }, []),
      })
    })

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <ReactSelect
        theme={selectThemeColors}
        className={classnames(`react-select py-0  ${stylesClassnames}`, {
          "is-invalid": error,
        })}
        classNamePrefix="select"
        options={isGrouped ? groupedArray : array}
        isClearable={isMulti ? false : true}
        isMulti={isMulti ? true : false}
        formatGroupLabel={formatGroupLabel}
        isDisabled={disabled}
        name={name}
        placeholder={placeHolder ? placeHolder : ""}
        styles={{ ...customStyles, ...styles }}
        onChange={(e, clear) => {
          handleChange(e)
          if (clear.action === "clear") if (onClear) onClear()
        }}
        maxMenuHeight={height && height}
        value={value}
        // isClearable={!fixed}
        {...otherProps}
      />
    </>
  )
}

export default Select
