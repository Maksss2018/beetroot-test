# Beetroot Academy 
## Course : Advanced Javascript Developer 
  This repos accumulate result`s of my studding in  [Beetroot Academy](https://beetroot.academy/en/).

  All results a sorted by studding projects in this repository by  [***branches*** ](https://github.com/Maksss2018/beetroot-test/branches): 
 1. [master](https://github.com/Maksss2018/beetroot-test/) branch: 
 2.  ***hooks_search_three_inputs*** branch:
 3. [hooks_search_three_inputs_shugar](https://github.com/Maksss2018/beetroot-test/tree/hooks_search_three_inputs_shugar) branch:
 4. [cinema_project](https://github.com/Maksss2018/beetroot-test/tree/cinema_project) branch:
 5. [cinema_project_my_on_variant](https://github.com/Maksss2018/beetroot-test/tree/cinema_project_my_on_variant) branch:
 6. [cinema_project_hw](https://github.com/Maksss2018/beetroot-test/tree/cinema_project_hw) branch:
 7. [cinema_project_server_with_db](https://github.com/Maksss2018/beetroot-test/tree/cinema_project_server_with_db)
 8. [hw_courses_project_27_apr](https://github.com/Maksss2018/beetroot-test/tree/hw_courses_project_27_apr)
 9. [courses_proj_by_oogway](https://github.com/Maksss2018/beetroot-test/tree/courses_proj_by_oogway)
 
 --- 
##  React stateless functional component - form
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

 One of the first  task vere we were  using   class's and life cycle methods.
 To start this studding project run `npm install` and `npm start` in your console.
 Don't forget to run `nvm use 10` - switch to NODE version 10  
###Task :
* make three  list : new item's List,
packed item's, unpacked item's
* make functionality:
 1. for two fields add new item, search item's;
 2. items 'checkbox' (packed/unpack, delete):
---
###Result 
 In this  task  used context  to store data of new item's,
 array of  items id's that match search request and  item's that been packed and unpacked.
 ```
import React, { useState, useContext}  from 'react'; // using hooks 
import PropTypes from 'prop-types';
import NewItemSugar from './components/NewItemSugar';
import ListItemsSugar from './components/ListItemsSugar';

import defaultState from './data';

import {Context} from './Context/';  // configur context in this dir in index.js
import {generate as id} from "shortid"; // using this npm module to make random id for items


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

  ... some code ...

     return (
                <Context.Provider value={{
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
                                                    }}
                                                    >
      ... child..
                </Context.Provider>
            );
}
AppSugar.propTypes = {
    defaultState:PropTypes.array
};
export default AppSugar;
 ```
 
 ---
 to add new, or update item  used this code :
 
  ```
  //App.js
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

  ```

 to put search requirements   used this code :
 
  ```
    //Filter.js
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
  ```
