import React from "react"
import {NavLink} from "react-router-dom"
/* TODO:
  *  Make request to check admin Password or Token if true return here
  *  flag to open extra options
  *  */
const TopNavigation = ({isAuth, logout, checkToken}) => (
    <div className="ui secondary pointing menu">
        <NavLink exact to="/" className="item">
            Home
        </NavLink>
        <NavLink exact to="/films" className="item">
            Films
        </NavLink>
        <NavLink exact to="/list" className="item">
            User`s List
        </NavLink>

        <NavLink exact to="/films/new" className="item">
            <i className="icon plus"/>
            Add new film
        </NavLink>
        {isAuth.length !== 0 ? (
            <div className="right menu">
        <span onClick={logout} className="item">
          Logout
        </span>
            </div>
        ) : (
            <div className="right menu">
                <NavLink to="/signup" className="item">
                    Signup
                </NavLink>
                <NavLink to="/login" className="item">
                    Login
                </NavLink>
            </div>
        )}
    </div>
)

export default TopNavigation
