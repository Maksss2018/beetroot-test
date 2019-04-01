import React from "react"
import {NavLink} from "react-router-dom"

const TopNavigation = () => (
    <div className="ui secondary pointing menu">
        <NavLink exact to="/" className="item">
            Home
        </NavLink>
        <NavLink exact to="/films" className="item">
            Films
        </NavLink>
        <NavLink exact to="/films/new" className="item">
            <i className="icon plus"/>
            Add new film
        </NavLink>
    </div>
)

export default TopNavigation
