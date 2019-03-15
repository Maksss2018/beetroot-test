import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Context} from "../../src/Context"


function Filter(props) {
   let [{value,flag},setValue] = useState("");
    let {updateSearchTerm} = props;
    useEffect(()=>{
        if(value!=props.searchTerm){
            setValue(props.searchTerm);
        }
    },[props.searchTerm]);
    return (
        <div className="mb-3">
            <input type="text"
                   className="form-control"
                   value={value}
                   name={`${props.flag?"packedItem":"unPackedItem"}`}
                   onChange={e=>updateSearchTerm(e)}
            />
        </div>
    );
}

Filter.propTypes = {

};


export default Filter;
