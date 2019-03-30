import React, {useContext} from 'react';
import FilmCard from "./FilmCard";
import {Context} from "../../Context";


function FilmList() {
    const {films} = useContext(Context);
    return (
        <div className="ui four cards">
            {films.map((item,ind)=>{
                return(<FilmCard {...item} key={`${item._id}`} />)
                })}
        </div>
    );
}

export default React.memo(FilmList);