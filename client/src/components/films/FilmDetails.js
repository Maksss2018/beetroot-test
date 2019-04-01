import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import FilmsContext from "../../context"

/*
const getDetails = (id) => {
    let [getFilm]  =  useContext(FilmsContext);
    useEffect(() => {
        document[`details-${id}`] = getFilm(id);
    }, [id]);
};
*/
const FilmDetails = ({match}) => {
    const {getFilm} = useContext(FilmsContext);
    let [id, setId] = useState(match.params.id || "");
    let [film, setFilm] = useState({});
    useEffect(() => setFilm(getFilm(id)), [id]);

    return (
        <span>
         <h4> Films Details </h4>
            {JSON.stringify(film)}
        </span>
    );
};


export default FilmDetails;