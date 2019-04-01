import React, {useMemo, useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import FilmsContext from "../../context"


const FilmDetails = ({currentFilm, match}) => {
    let {getFilm} = useContext(FilmsContext);
    let [film, setFilm] = useState({});
    useEffect(() => {
        getFilm(match.params.id);
        setFilm(currentFilm);
    }, [match.params.id]);

    return (
        <div>
            <h4> Films Details : {match.params.title} </h4>
            <ul> {Object.keys(film).map((item, ind) => <li key={`${item}-${ind}`}>
                {item} : {film[item]}
            </li>)}
            </ul>
        </div>
    );
};


export default FilmDetails;