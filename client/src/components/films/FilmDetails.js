import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import films from "../../api.js"


const getDetails = (id) => {
    useEffect(() => {
        document[`details-${id}`] = films.getFilm(id);
    }, [id]);
};

const FilmDetails = ({id}) => {
    //   getDetails(id);
    return (
        <p>
            {document[`details-${id}`]}
        </p>
    );
}

FilmDetails.propTypes = {
    id: PropTypes.string.isRequired
};

export default FilmDetails;