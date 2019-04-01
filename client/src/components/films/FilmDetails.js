import React, {useMemo, useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import FilmsContext from "../../context"


const FilmDetails = ({currentFilm, match}) => {
    let {getFilm} = useContext(FilmsContext);
    let [state, setState] = useState(match.params);
    getFilm(state.id);
    return (
        <div>
            <h4> Films Details : {match.params.title} </h4>
            {JSON.stringify(currentFilm)}
            <ul> {Object.keys(state).map((item, ind) => <li key={`${item}-${ind}`}>
                {item} : {state[item]}
            </li>)}
            </ul>
        </div>
    );
};


export default FilmDetails;