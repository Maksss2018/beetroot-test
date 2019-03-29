import React from "react"
import PropTypes from "prop-types"

const TopNavigation = ({
                           showAddForm,
                           showLoginForm,
                           showRegistrationForm
                       }) => (
    <div className="ui secondary pointing menu">
        <a href="/" className="item">
            Home
        </a>
        <span className="item" onClick={showAddForm}>
      <i className="icon plus" />
      Add new film
    </span>
        <span
            style={{
                marginLeft:"auto"
            }}
            className="  item" onClick={showRegistrationForm}>
      <i className={`icon sign-${1!==1?"out":"in"}`} />
            {`${1===1?"log-in":"log-out"}`}
    </span>
        <span className="item" onClick={showLoginForm}>
      <i style={{
          fontSize:"0.7em",
          margin:"0.2rem"
      }}
         className="icon plus" />
      <i className="icon user" />
    </span>
    </div>
);
TopNavigation.propTypes = {
    showAddForm: PropTypes.func.isRequired,
    showLoginForm:PropTypes.func.isRequired,
    showRegistrationForm:PropTypes.func.isRequired
};

export default TopNavigation
