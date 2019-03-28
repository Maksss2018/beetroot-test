import React, {Component} from "react"
import _orderBy from "lodash/orderBy"
import FilmsList from "./films"
import {films} from "../data"
import FilmForm from "./forms/FilmForm"
import TopNavigation from "./TopNavigation"

export const AppContext = React.createContext()

class App extends Component {
  state = {
    items: [],
    showAddForm: false,
  }

  componentDidMount() {
    this.setState({items: this.sortFilms(films)})
  }
  sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id =>
    this.setState(({items}) => ({
      items: this.sortFilms(
        items.map(item =>
          item._id === id ? {...item, featured: !item.featured} : item,
        ),
      ),
    }))

  showAddForm = () => this.setState({showAddForm: true})

  hideAddForm = () => this.setState({showAddForm: false})

  render() {
    const {items, showAddForm} = this.state
    const cls = showAddForm ? "ten" : "sixteen"
    return (
      <AppContext.Provider
        value={{
          toggledFeatured: this.toggleFeatured,
        }}
      >
        <div className="ui container pt-3">
          <TopNavigation showAddForm={this.showAddForm} />
          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm hideAddForm={this.hideAddForm} />
              </div>
            )}
            <div className={`${cls} wide column`}>
              <FilmsList films={items} />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
