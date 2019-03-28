import React, {Component} from "react"
import ReactImageFallback from "react-image-fallback"
import PropTypes from "prop-types"
import FormMessage from "./FormMessage"

const initialData = {
  title: "",
  description: "",
  img: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
}

class FilmForm extends Component {
  state = {
    data: initialData,
    errors: {},
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.data)
  }

  handleStringChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    })

  handleNumberChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: parseInt(e.target.value)},
    })

  handleCheckboxChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.checked},
    })

  render() {
    const {data, errors} = this.state
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui  grid">
          <div className="twelve wide column">
            <div className={errors.title ? "field error" : "field"}>
              <label>Film title</label>
              <input
                type="text"
                name="title"
                placeholder="film title"
                value={data.title}
                onChange={this.handleStringChange}
              />
              <FormMessage>{errors.title}</FormMessage>
            </div>

            <div className={errors.description ? "field error" : "field"}>
              <label>Film description</label>
              <textarea
                value={data.description}
                onChange={this.handleStringChange}
                name="description"
                placeholder="film description"
              />
              <FormMessage>{errors.description}</FormMessage>
            </div>
          </div>
          {/* END twelve*/}
          {/*  http://via.placeholder.com/250x250 */}
          <div className="four wide column">
            <ReactImageFallback
              src={data.img}
              fallbackImage="http://via.placeholder.com/250x250"
              alt={data.title}
              className="ui image"
            />
          </div>

          <div className="twelve wide column">
            <div className={errors.img ? "field error" : "field"}>
              <label>Image</label>
              <input
                value={data.img}
                onChange={this.handleStringChange}
                type="text"
                name="img"
                placeholder="img"
              />
              <FormMessage>{errors.img}</FormMessage>
            </div>
          </div>
          {/*  END img box*/}
          <div className="six wide column">
            <div className={errors.director ? "field error" : "field"}>
              <label>Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              <FormMessage>{errors.director}</FormMessage>
            </div>
          </div>
          {/*     END director */}

          <div className="six wide column">
            <div className={errors.duration ? "field error" : "field"}>
              <label>Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
          </div>
          {/*     END duration */}
          <div className="six wide column">
            <div className={errors.price ? "field error" : "field"}>
              <label>Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              <FormMessage>{errors.price}</FormMessage>
            </div>
          </div>
          {/*    end price */}
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              value={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
          {/* end featured */}
        </div>
        {/* END ui grid   */}

        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or" />
          <span className="ui button" onClick={this.props.hideAddForm}>
            Hide form
          </span>
        </div>
      </form>
    )
  }
}

FilmForm.propTypes = {
  hideAddForm: PropTypes.func.isRequired,
}

export default FilmForm
