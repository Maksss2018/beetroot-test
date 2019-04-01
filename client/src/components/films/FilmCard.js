import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import Featured from "./Featured"
import {FilmsContext} from "../../context"

const FilmCard = ({film}) => {
    const {deleteFilm} = useContext(FilmsContext)
    const [confirm, setConfirm] = useState(false)
    const showConfirm = () => setConfirm(true)
    const hideConfirm = () => setConfirm(false)

    return (
        <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"/>
      </span>
            <div className="image">
                <span className="ui green label ribbon">$ {film.price} </span>
                <Featured featured={film.featured} id={film._id}/>
                <img src={film.img} alt={film.title}/>
            </div>

            <div className="content">
        <span href="#" className="header">
          {film.title}
        </span>
                <div className="meta">
                    <i className="icon users"/> {film.director}
                    <span className="right floated">
            <i className="icon wait right"/>
                        {film.duration} min
          </span>
                </div>
            </div>

            <div className="extra content">
                {confirm ? (
                    <div className="ui two buttons">
            <span
                className="ui red basic button"
                onClick={() => deleteFilm(film)}
            >
              <i className="ui icon check"/> YES
            </span>
                        <span className="ui grey basic button" onClick={hideConfirm}>
              <i className="ui icon close"/> NO
            </span>
                    </div>
                ) : (
                    <div className="ui two buttons">
                        <Link
                            to={`/films/edit/${film._id}`}
                            className="ui green basic button"
                        >
                            <i className="ui icon edit"/>
                        </Link>
                        <span className="ui red basic button" onClick={showConfirm}>
              <i className="ui icon trash"/>
            </span>
                    </div>
                )}
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
