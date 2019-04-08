import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import ReactImageFallback from "react-image-fallback"
import FormMessage from "./FormMessage"
import setFormObject from "./FormUtils"

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

const FilmForm = props => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.film._id && props.film._id !== data._id) {
            setData(props.film)
        } else {
            setData(initialData)
        }
    }, [props.film._id])

    const validate = data => {
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

    const handleSubmit = e => {
    e.preventDefault()
        const errors = validate(data)
        setErrors(errors)
    if (Object.keys(errors).length === 0) {
        setLoading(true)
        props.submit(data).catch(error => {
            setErrors(error.response.data.errors)
            setLoading(false)
        })
    }
  }
    return (
        <form
            className={loading ? "ui form loading" : "ui form"}
            onSubmit={handleSubmit}
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
                            onChange={setFormObject(setData, data)}
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
                            onChange={setFormObject(setData, data)}
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
                            onChange={setFormObject(setData, data)}
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
                            onChange={setFormObject(setData, data)}
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
                            onChange={setFormObject(setData, data)}
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
                            onChange={setFormObject(setData, data)}
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
                        onChange={setFormObject(setData, data)}
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

export default FilmForm
