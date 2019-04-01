import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

const TopNavigation = ({showAddForm}) => (
    <div
        className="ui secondary pointing menu">
        <NavLink
            to="/"
            className="item">
            Home
        </NavLink>
        < NavLink
            to="/form"
            className="item"
            onClick={showAddForm}>
            < i
                className="icon plus"/>
            Add new film
        </NavLink>
    </div>
);

TopNavigation.propTypes = {
    showAddForm: PropTypes.func.isRequired,
};

export default TopNavigation
