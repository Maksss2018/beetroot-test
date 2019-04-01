import React from "react"
import _orderBy from "lodash/orderBy"
import _find from "lodash/find"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import TopNavigation from "./TopNavigation"
import FilmDetails from "./films/FilmDetails"
import Loader from "./Loader"
import api from "../api"
import FilmsContext from "./../context"
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

class App extends React.Component {
    static  ComponentContext = FilmsContext;
    state = {
        items: [],
        selectedFilm: {},
        loading: false,
        currentFilm: {}
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            api.films.fetchAll().then(films =>
                this.setState({
                    items: this.sortFilms(films),
                    loading: false
                }),
            )

        }, 2000);
    }

    /*  ASYNC  way
    async componentDidMount() {
        this.setState({
            loading: true
        });
          await  api.films.fetchAll().then(films =>
                this.setState({
                    items: this.sortFilms(films),
                    loading: false
                }),
            )
    }

    */


    sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"]);

    toggleFeatured = id => {
        const film = _find(this.state.items, {_id: id});
        return this.updateFilm({...film, featured: !film.featured})
    };

    saveFilm = film =>
        film._id === null ? this.addFilm(film) : this.updateFilm(film);

    addFilm = filmData =>
        api.films.create(filmData).then(film =>
            this.setState(({items, showAddForm}) => ({
                items: this.sortFilms([...items, film]),
                showAddForm: false,
            })),
        );

    updateFilm = filmData =>
        api.films.update(filmData).then(film =>
            this.setState(({items, showAddForm}) => ({
                items: this.sortFilms(
                    items.map(item => (item._id === film._id ? film : item)),
                ),
                showAddForm: false,
            })),
        );

    showAddForm = () => this.setState({showAddForm: true, selectedFilm: {}});

    hideAddForm = () => this.setState({showAddForm: false, selectedFilm: {}});

    selectFilmForEdit = selectedFilm =>
        this.setState({
            selectedFilm,
            showAddForm: true,
        });

    deleteFilm = film => api.films.delete(film).then(res => {
        this.setState(({items}) => ({
            items: this.sortFilms(items.filter(item => item._id !== film._id)),
        }))
    });
    getFilm = film => api.films.getFilm(film).then(res => {
        this.setState(({currentFilm}) => ({
            currentFilm: {...res}
        }))
    });

    render() {
        const {items, showAddForm, selectedFilm, loading, currentFilm} = this.state;
        const cls = showAddForm ? "ten" : "sixteen";
        return (
            <FilmsContext.Provider
                value={
                    {
                        toggleFeatured: this.toggleFeatured,
                        selectFilmForEdit: this.selectFilmForEdit,
                        deleteFilm: this.deleteFilm,
                        getFilm: this.getFilm,
                        currentFilm: currentFilm
                    }
                }
            >
                <Router>
                    <div
                        className="ui container mt-3">
                        <TopNavigation
                            showAddForm={this.showAddForm}
                        />
                        {loading ? <Loader/> : <>
                            <Route path="/form" render={(props) => <div
                                className="ui stackable grid">
                                <div
                                    className="six wide column">
                                    <FilmForm
                                        hideAddForm={this.hideAddForm}
                                        submit={this.saveFilm}
                                        film={selectedFilm}
                                    />
                                </div>

                                <div
                                    className={`ten wide column`
                                    }>
                                    <FilmsList
                                        films={items}
                                    />
                                </div>
                            </div>}/>

                            <Route exact path="/" render={(props) => <div
                                className="ui stackable grid">
                                <div
                                    className={`sixteen wide column`
                                    }>
                                    <FilmsList
                                        films={items}
                                    />
                                </div>
                            </div>}/>

                            <Route
                                path="/film_details/:id-:title-:img"
                                render={(props) => <FilmDetails  {...props}/>}
                            />

                        </>}
                    </div>

                </Router>
            </FilmsContext.Provider>
        )
    }
}

export default App
