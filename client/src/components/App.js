import React from "react"
import _orderBy from "lodash/orderBy"
import _find from "lodash/find"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import TopNavigation from "./TopNavigation"
import api from "../api"
import {FilmsContext} from " ../../context"

class App extends React.Component {
    static  ComponentContext = FilmsContext;
    state = {
        items: [],
        showAddForm: false,
        selectedFilm: {},
    };

    componentDidMount() {
        api.films.fetchAll().then(films =>
            this.setState({
                items: this.sortFilms(films),
            }),
        )
    }

    sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"])

    toggleFeatured = id => {
        const film = _find(this.state.items, {_id: id})
        return this.updateFilm({...film, featured: !film.featured})
    }

    saveFilm = film =>
        film._id === null ? this.addFilm(film) : this.updateFilm(film)

    addFilm = filmData =>
        api.films.create(filmData).then(film =>
            this.setState(({items, showAddForm}) => ({
                items: this.sortFilms([...items, film]),
                showAddForm: false,
            })),
        )

    updateFilm = filmData =>
        api.films.update(filmData).then(film =>
            this.setState(({items, showAddForm}) => ({
                items: this.sortFilms(
                    items.map(item => (item._id === film._id ? film : item)),
                ),
                showAddForm: false,
            })),
        );

    showAddForm = () => this.setState({showAddForm: true, selectedFilm: {}})

    hideAddForm = () => this.setState({showAddForm: false, selectedFilm: {}})

    selectFilmForEdit = selectedFilm =>
        this.setState({
            selectedFilm,
            showAddForm: true,
        })

    deleteFilm = film => api.films.delete(film).then(res => {
        this.setState(({items}) => ({
            items: this.sortFilms(items.filter(item => item._id !== film._id)),
        }))
    });


    render() {
        const {items, showAddForm, selectedFilm} = this.state
        const cls = showAddForm ? "ten" : "sixteen"
        return (
            < ComponentContext.Provider
        value = {
        {
            toggleFeatured: this.toggleFeatured,
                selectFilmForEdit
        :
            this.selectFilmForEdit,
                deleteFilm
        :
            this.deleteFilm,
        }
    }
    >
    <
        div
        className = "ui container mt-3" >
            < TopNavigation
        showAddForm = {this.showAddForm}
        />
        < div
        className = "ui stackable grid" >
            {showAddForm && (
            < div
        className = "six wide column" >
            < FilmForm
        hideAddForm = {this.hideAddForm}
        submit = {this.saveFilm}
        film = {selectedFilm}
        />
        < /div>
    )
    }

    <
        div
        className = {`${cls} wide column`
    }>
    <
        FilmsList
        films = {items}
        />
        < /div>
        < /div>
        < /div>
        < /ComponentContext.Provider>
    )
    }
}

export default App
