import React from "react"
import {Route} from "react-router-dom"
import TopNavigation from "./TopNavigation"
import HomePage from "./HomePage"
import FilmsPage from "./FilmsPage"
import SignupPage from "./SignupPage"
import LoginPage from "./LoginPage"
import api from "./../api"

class App extends React.Component {
    state = {
        user: {
            token: "" || localStorage.getItem("token"),
        },
        message: "",
    };

    setMessage = message => this.setState({message});

    logout = () => this.setState({user: {token: null}});
    login = (loginData) => api.login(loginData).then(res => {

        localStorage.setItem("token", res.data.token);
        this.setState({
            user: {
                token: res.data.token,
            },
            message: "",
            loading: false
        });

    });
    render() {
        const {message} = this.state;
        return (
            <div className="ui container mt-3">
                <TopNavigation
                    isAuth={this.state.user.token || ""}
                    logout={this.logout}
                />
                {message && (
                    <div className="ui info message">
                        <i onClick={() => this.setMessage("")} className="close icon"/>
                        {message}
                    </div>
                )}
                <Route exact path="/" render={props => <HomePage
                    role={this.state.user.role}
                    user={this.state.user.email}/>}/>
                <Route path="/films" component={FilmsPage}/>
                <Route
                    path="/signup"
                    render={props => (
                        <SignupPage
                            {...props}
                            setMessage={this.setMessage}/>
                    )}
                />
                <Route path="/login" render={props => <LoginPage
                    {...props}
                    login={this.login}
                    role={this.checkRole}
                />
                }/>
            </div>
        )
    }
}

export default App
