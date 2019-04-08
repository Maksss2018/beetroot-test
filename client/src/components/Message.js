import React from "react"
import PropTypes from "prop-types"

const Message = ({msg, icon, color}) => (
    <div className={`ui icon ${color} message`}>
        <i className={`icon ${icon}`}/>
        <div className="content">
            <div className="header">{msg}</div>
        </div>
    </div>
);

Message.defaultProps = {
    type: "info",
    color: "olive",
};
Message.propTypes = {
    msg: PropTypes.string.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
};

export default Message
