import React from "react"
import PropTypes from "prop-types"

const FormMessage = ({type, children}) => (
  <div style={{color: type === "success" ? "#6597a7" : "#9a3f38"}}>
    {children}
  </div>
)

FormMessage.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
}

FormMessage.defaultProps = {
  type: "error",
}
export default FormMessage
