import React from "react"
import PropTypes from "prop-types"

const Message = ({color, children, type}) => (
  <div className={`ui icon  message ${color}`}>
    <i className={`icon ${type}`} />
    <div className="content">
      <div className="header">{children}</div>
    </div>
  </div>
)

Message.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
}

Message.defaultProps = {
  type: "bell",
  color: "orange",
}
export default Message
