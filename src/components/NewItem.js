import React, { useState,useEffect, useContext } from "react";
import { generate as id } from "shortid";
import PropTypes from 'prop-types';
import {Context} from "./../Context"




const  NewItem = (props,context) => {
    const {
        newItem,
        handelChange,
        handleSubmit
    } = useContext(Context);
    let {value, setValue} = useState(newItem);

    return (
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="row">
                <div className="col-md-10">
                    <input
                        className="form-control mb-3"
                        onChange={(e) =>{handelChange(e)}}
                        value={value}
                        name={"newItem"}
                        type="text"
                    />
                </div>
                <div className="col-md-2">
                    <input className="btn btn-success" type="submit" value="Add item" />
                </div>
            </div>
        </form>
    );
}

NewItem.propTypes = {
    newItem: PropTypes.string.isRequired,
    handelChange:PropTypes.func.isRequired,
    handleSubmit:PropTypes.func.isRequired
};

export default NewItem;