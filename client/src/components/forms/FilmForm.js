import React from "react"
import {Link} from "react-router-dom"
import ReactImageFallback from "react-image-fallback"
import FormMessage from "./FormMessage"

const initialData = {
  _id: null,
  title: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  img: "",
  featured: false,
}

class FilmForm extends React.Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  }

  componentDidMount() {
    if (this.props.film._id) {
      this.setState({data: this.props.film})
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {film} = props
    const {data} = state

    if (film._id && film._id !== data._id) {
      return {...state, data: film}
    }
    if (!film._id && data._id !== null) {
      return {...state, data: initialData}
    }
    return null
  }

  validate(data) {
    const errors = {}
    if (!data.title) errors.title = "Title cannot be blank"
    if (!data.description) errors.description = "description cannot be blank"
    if (!data.img) errors.img = "img cannot be blank"
    if (!data.director) errors.director = "director cannot be blank"
    if (!data.duration) errors.duration = "duration cannot be blank"
    if (!data.price) errors.price = "price cannot be blank"

    if (parseFloat(data.duration <= 0))
      errors.duratino = "duration must be positive value"
    if (parseFloat(data.price <= 0))
      errors.price = "price must be positive value"
    return errors
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.setState({loading: true})
      this.props
          .submit(this.state.data)
          .catch(err =>
              this.setState({errors: err.response.data.errors, loading: false}),
          )
    }
  }

  handleStringChange = e =>
      this.setState({
          data: {...this.state.data, [e.target.name]: e.target.value},
          errors: {...this.state.errors, [e.target.name]: ""},
      })

  handleNumberChange = e =>
      this.setState({
          data: {...this.state.data, [e.target.name]: parseFloat(e.target.value)},
          errors: {...this.state.errors, [e.target.name]: ""},
      })

  handleCheckboxChange = e =>
      this.setState({
          data: {...this.state.data, [e.target.name]: e.target.checked},
      })

  render() {
    const {data, errors, loading} = this.state
    return (
        <form
            className={loading ? "ui form loading" : "ui form"}
            onSubmit={this.handleSubmit}
        >
            <div className="ui  grid">
                <div className="twelve wide column">
                    {/* title */}
                    <div className={errors.title ? "field error" : "field"}>
                        <label>Film title</label>
                        <input
                            type="text"
                            name="title"
                            id="name"
                            placeholder="film title"
                            value={data.title}
                            onChange={this.handleStringChange}
                        />
                        <FormMessage>{errors.title}</FormMessage>
                    </div>

                    {/* Description */}
                    <div className={errors.description ? "error field" : "field"}>
                        <label>Film description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="film description"
                            value={data.description}
                            onChange={this.handleStringChange}
                        />
                        <FormMessage>{errors.description}</FormMessage>
                    </div>
                    {/* twelve wide column */}
                </div>

                {/*  image box  */}
                <div className="four wide column">
                    <ReactImageFallback
                        src={data.img}
                        fallbackImage="http://via.placeholder.com/250x250"
                        alt={data.title}
                        className="ui image"
                    />
                </div>

                <div className="twelve wide column">
                    <div className={errors.img ? "error field" : "field"}>
                        <label>Image</label>
                        <input
                            type="text"
                            name="img"
                            id="img"
                            placeholder="img"
                            value={data.img}
                            onChange={this.handleStringChange}
                        />
                        <FormMessage>{errors.img}</FormMessage>
                    </div>
                </div>
                {/* END  image box  */}

                {/*  Director  */}
                <div className="six wide column field">
                    <div className={errors.director ? "error field" : "field"}>
                        <label>Director</label>
                        <input
                            type="text"
                            name="director"
                            id="director"
                            placeholder="film director"
                            value={data.director}
                            onChange={this.handleStringChange}
                        />
                        <FormMessage>{errors.director}</FormMessage>
                    </div>
                </div>
                {/*  END Director  */}

                {/* Duration */}
                <div className="six wide column">
                    <div className={errors.duration ? "error field" : "field"}>
                        <label>Duration</label>
                        <input
                            type="number"
                            name="duration"
                            min="1"
                            step="1"
                            id="duration"
                            placeholder="Duration"
                            value={data.duration}
                            onChange={this.handleNumberChange}
                        />
                        <FormMessage>{errors.duration}</FormMessage>
                    </div>
                </div>
                {/* END Duration */}

                {/*  Price */}
                <div className="six wide column">
                    <div className={errors.price ? "error field" : "field"}>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            min="1"
                            step="0.1"
                            id="price"
                            placeholder="price"
                            value={data.price}
                            onChange={this.handleNumberChange}
                        />
                        <FormMessage>{errors.price}</FormMessage>
                    </div>
                </div>
                {/*  END Price */}

                {/* Featured */}
                <div className="six wide column inline field">
                    <label htmlFor="featured">Featured</label>
                    <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        value={data.featured}
                        onChange={this.handleCheckboxChange}
                    />
                </div>
                {/* END Featured */}
            </div>
            {/* END ui grid */}

            {/* Buttons  */}
            <div className="ui fluid buttons">
                <button className="ui button primary" type="submit">
                    Save
                </button>
                <div className="or"/>
                <Link to="/films" className="ui button">
                    Hide form
                </Link>
            </div>
        </form>
    )
  }
}

export default FilmForm
