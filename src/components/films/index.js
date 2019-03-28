import React from "react"
import PropTypes from "prop-types"
import FilmCard from "./FilmCard"
import Message from "../Message"

const FilmsList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.length === 0 ? (
        <Message type="star outline" color="red">
          Not yet films in our base
        </Message>
      ) : (
        films.map(film => <FilmCard key={film._id} film={film} />)
      )}
    </div>
  )
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
}
FilmsList.defaultProps = {
  films: [],
}

export default FilmsList
