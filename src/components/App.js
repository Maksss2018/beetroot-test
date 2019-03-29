import React, {Component} from "react"
import _orderBy from "lodash/orderBy"
import FilmsList from "./films"
import {films} from "../data"
import FilmForm from "./forms/FilmForm"
import LoginForm from "./forms/LoginForm"
import RegistrationForm from "./forms/RegistrationForm"
import TopNavigation from "./TopNavigation"


export const AppContext = React.createContext({});

class App extends Component {
    state = {
        items: [],
        showAddForm: false,
        showLoginForm:false,
        showRegistrationForm:false
    };

    componentDidMount() {
        this.setState({items: this.sortFilms(films)})
    }
    sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"]);

    toggleFeatured = id =>
        this.setState(({items}) => ({
            items: this.sortFilms(
                items.map(item =>
                    item._id === id ? {...item, featured: !item.featured} : item,
                ),
            ),
        }));

    handleShowAddForm = () => this.setState({showAddForm: true});

    handleHideAddForm = () => this.setState({showAddForm: false});

    render() {
        const {
            items,
            showAddForm,
            showLoginForm,
            showRegistrationForm
        } = this.state;
        const cls = showAddForm ? "ten" : "sixteen";
        return (
            <AppContext.Provider
                value={{
                    toggledFeatured: this.toggleFeatured
                }}
            >
                <div className="ui container pt-3">
                    <TopNavigation
                        showAddForm={this.handleShowAddForm}
                        showLoginForm={this.showLoginForm}
                        showRegistrationForm={this.showRegistrationForm}
                    />
                    <div className="ui stackable grid">
                        {showAddForm && (
                            <div className="six wide column">
                                <FilmForm hideAddForm={this.handleHideAddForm} />
                            </div>
                        )}
                        <div className={`${cls} wide column`}>
                            <FilmsList films={items} />
                        </div>
                        <div className="five wide column">
                            <RegistrationForm/>
                           </div>

                        <div className="five wide column">
                            <LoginForm/>
                        </div>

                    </div>

                </div>
            </AppContext.Provider>
        )
    }
}

export default App
