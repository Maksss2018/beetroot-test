import React from "react"
import PropTypes from "prop-types"

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  options,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          className="form-control"
        >
          <option value="-1">{defaultOption}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="error text-danger">{error}</div>}
    </div>
  )
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  error: PropTypes.string,
}

export default SelectInput
