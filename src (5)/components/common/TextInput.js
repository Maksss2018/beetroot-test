import React from "react"
import PropTypes from "prop-types"

const TextInput = ({name, label, onChange, value, error}) => {
  let wrapClass = "form-group"
  if (error) {
    wrapClass += " has-error"
  }
  return (
    <div className={wrapClass}>
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        placeholder={label}
        onChange={onChange}
        value={value}
      />
      {error && <div className="error text-danger">{error}</div>}
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export default TextInput
