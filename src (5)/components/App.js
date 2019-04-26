import React from "react"
import {Route, Switch} from "react-router-dom"
import CoursesPage from "./courses/CoursesPage"
import HomePage from "./home/HomePage"
import AboutPage from "./about/AboutPage"
import PageNotFound from "./common/PageNotFound"
import Nav from "./common/Nav"
import ManageCoursesPage from "./courses/ManageCoursesPage"

const App = props => (
  <div className="container">
    <Nav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/course/:slug" component={ManageCoursesPage} />
      <Route path="/course" component={ManageCoursesPage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
)

export default App
