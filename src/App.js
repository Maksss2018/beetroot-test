import React, { useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import NewItem from './components/NewItem';
import ListItems from './components/ListItems';
import defaultState from './data';
import {Context} from './Context/';
import {generate as id} from "shortid";


const  App = (props)=> {
    let [value,setValue] = useState(""),
        [inputs, setInputs] = useState({
            newItem:"",
            packedItem:"",
            unPackedItem:"",
        }),
        //newItem
        [newItem, setNewItem] = useState(""),
        [packedItem, setPackedItem] = useState(""),
        [unPackedItem, setUnPackedItem] = useState(""),
        [state, setState] = useState(defaultState);
    const  selectAll = (e) => {
        state.map((item)=>{
            if(item.packed){
                item.packed = false
            }
            return item
        });
        setState([...state])
    };

    return (
        <Context.Provider value={
            {
                dataOutput:[],
                newItem:newItem,
                dataInputs:inputs,
                packedItem:packedItem,
                unPackedItem:unPackedItem,
                handelChange: (e)=>{
                    let {name,value} = e.target;
                    setInputs({[name]:value});
                    switch (name) {
                        case "packedItem":
                            setPackedItem(value);
                            break;
                        case "unPackedItem":
                            setUnPackedItem(value);
                            break;
                        case "newItem":
                            setNewItem(value);
                            break;
                    }
                },
                handleSubmit :(e => {
                    e.preventDefault();
                    console.dir(e.target);
                    setState([{ value: inputs.newItem , id: id(), packed: false },...state]);
                }),
                handelRemove:(e)=>{
  /*                  const trgIndex =  state.map((el)=>el.id).indexOf(e.target.value);
                    state = state.filter((el,ind) =>ind!==trgIndex);
*/
                    state = state.filter((el,ind) =>el.id!==e.target.value);

                    setState(state);
                },
                handelUpdate:(e)=>{
                    const trgIndex =  state.map((el)=>{
                        if(el.id=== e.target.id){
                            el.packed = !el.packed;
                        }
                        return el
                    });
                    setState([...trgIndex]);

                }
            }
        }>
            <div className="container py-3">
                <NewItem />
                <div className="row">
                    <div className="col-md-5">
                        <ListItems flag={false} title="Unpacked Items" items={state.filter((el)=>!el.packed)} />
                    </div>
                    <div className="offset-md-2 col-md-5">
                        <ListItems flag={true} title="Packed Items" items={state.filter((el)=>el.packed)}/>
                        <button
                            onClick={selectAll}
                            className="btn btn-danger btn-lg btn-block">
                            Mark All As Unpacked
                        </button>

                    </div>
                </div>


            </div>
        </Context.Provider>
    );
};

App.propTypes = {

};

export default App;