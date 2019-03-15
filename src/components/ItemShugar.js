import React, {useState, useEffect , useContext} from 'react';
import PropTypes from 'prop-types';
import {Context} from "./../Context"
import './Item.css';


const Item = (props) => {
    let {
            packedItem,
            unPackedItem,
         //   dataInputs,
            handelRemove,
            handelUpdate
        } = useContext(Context)/*,
        {
            unPackedItem,
            packedItem
        } = dataInputs*/,
        [newState,setNewState] = useState(props),
        {
            packed,
            id,
            value
        } = newState,
        trgGenerator = ()=>{
            let rez =packed?packedItem:unPackedItem;
            return rez!==undefined?rez.toLowerCase():''
        },
        [trgSearch,setTrgSearch] = useState(trgGenerator());



    useEffect(()=>{
        setNewState(props);
        setTrgSearch(trgGenerator());
    },[props,unPackedItem,
        packedItem]);

    return (
        <li className={` ${
            trgSearch!==""?
            value.toLowerCase().includes(
                trgSearch
            )?"bg-warning"
                :"":""} item-box list-group-item`}>
            <div className="form-check">
                <input className="form-check-input"
                       type="checkbox"
                       checked={packed}
                       onChange={(e) => {handelUpdate(e)}}
                       id={id}
                />
                <label className="form-check-label" htmlFor={ id}> { value }</label>
            </div>
            <button className="btn btn-secondary btn-sm" value={id} onClick={(e) => {handelRemove(e)}}>Remove</button>

        </li>

    );
}

Item.propTypes = {

};

export default Item;