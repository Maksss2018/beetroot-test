import React, {useState, useContext} from "react"
import PropTypes from "prop-types"
import Featured from "./Featured"
import FilmsContext from "../../context"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"


const FilmCard = ({film}) => {
    const {selectFilmForEdit, deleteFilm} = useContext(FilmsContext);
    const [confirm, setConfirm] = useState(false)
    const showConfirm = () => setConfirm(true)
    const hideConfirm = () => setConfirm(false)

    return (
        <div
            className="ui card">
        <span
            className="ui right corner label">
        <i
            className="empty star icon"/>
            </span>
            <div
                className="image">
        <span
            className="ui green label ribbon"> $
            {
                film.price
            }
            </span>
                <Featured
                    featured={film.featured}
                    id={film._id}
                />
                <img
                    src={film.img}
                    alt={film.title}
                />
            </div>

            <div
                className="content">
                <NavLink
                    to={`/film_details/${film._id}-${film.title}`}
                    className="header">
        {film.title}
                </NavLink>
                <div
                    className="meta">
                    <i
                        className="icon users"/> {film.director}
                    <span
                        className="right floated">
        <i
            className="icon wait right"/>
                        {film.duration}
                        min
                </span>
                </div>
            </div>

            <div
                className="extra content">
        {
            confirm ? (
                    <div className="ui two buttons">
                <span
                    className="ui red basic button"
                    onClick={() => deleteFilm(film)}
                >
<i
    className="ui icon check"/> YES
                    </span>
                        <span
                            className="ui grey basic button"
                            onClick={hideConfirm}>
        <i
            className="ui icon close"/> NO
            </span>
                    </div>
) :
    (
        <div
            className="ui two buttons">
        <span
            className="ui green basic button"
            onClick={() => selectFilmForEdit(film)}
        >
<i
    className="ui icon edit"/>
            </span>
            <span
                className="ui red basic button"
                onClick={showConfirm}>
        <i
            className="ui icon trash"/>
            </span>
        </div>
    )
        }
            </div>
        </div>
)
}

FilmCard.propTypes = {
    film: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),
}

export default React.memo(FilmCard)
