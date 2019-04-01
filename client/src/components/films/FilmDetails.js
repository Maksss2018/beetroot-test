import React, {useMemo, useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import FilmsContext from "../../context"

const getDetails = (_id) => {
    const {getFilm, currentFilm} = useContext(FilmsContext);
    let [id, setId] = useState(_id);
    let [film, setFilm] = useState(currentFilm);

    useEffect(() => {
        document[`details-${id}`] = getFilm(id);
    }, [id]);
};

const FilmDetails = ({match}) => {
    const {currentFilm} = useContext(FilmsContext);
    getDetails(match.params.id);
    return (
        <span>
         <h4> Films Details </h4>
            {JSON.stringify(currentFilm)}
        </span>
    );
};


export default FilmDetails;