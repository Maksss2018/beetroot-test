import React from "react"
import {Route} from "react-router-dom"
import TopNavigation from "./TopNavigation"
import HomePage from "./HomePage"
import FilmsPage from "./FilmsPage"

class App extends React.Component {
    render() {
        return (
            <div className="ui container mt-3">
                <TopNavigation/>
                <Route exact path="/" component={HomePage}/>
                <Route path="/films" component={FilmsPage}/>
            </div>
        )
    }
}

export default App
