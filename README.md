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
 7master branch. [cinema_project_server_with_db](https://github.com/Maksss2018/beetroot-test/tree/cinema_project_server_with_db)
 8. [hw_courses_project_27_apr](https://github.com/Maksss2018/beetroot-test/tree/hw_courses_project_27_apr)
 9. [courses_proj_by_oogway](https://github.com/Maksss2018/beetroot-test/tree/courses_proj_by_oogway)
 
 --- 
##  React class component - form
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

 One of the first  task vere we were  using   class's and life cycle methods.
 To start this studding project run `npm install` and `npm start` in your console.
 Don't forget to run `nvm use 10` - switch to NODE version 10  
###Task :
* make three  list : new items List
packed item's, unpacked item's
* make functionality:
 1. for two fields add new item, search items;
 2. items 'checkbox' (packed,unpack, delete):
---
###Result 
 In this  task  used context  to store date of new item`s,
 array of  items id's that match search request and  item's that been packed and unpacked.
 ```
import React, { Component } from 'react'; // using es6  standards
import PropTypes from 'prop-types';
import NewItemSugar from './components/NewItemSugar';
import ListItemsSugar from './components/ListItemsSugar';

import defaultState from './data';

import {Context} from './Context/';  // configur context in this dir in index.js
import {generate as id} from "shortid"; // using this npm module to make random id for items


class   AppSugar extends Component{
    state = {
        newItem:"",
        packedItem:"",
        unPackedItem:"",
        value:"",
        defaultData: defaultState||null,
    };
  ... some code ...
    render(){
        let {
            newItem,
            inputs,
            packedItem,
            unPackedItem,
            defaultData
        } = this.state;
        return (
            <Context.Provider value={
                {
                    dataOutput:[],
                    newItem:newItem,
                    dataInputs:inputs,
                    packedItem:packedItem,
                    unPackedItem:unPackedItem,
                    handelChange:this.handelChange,
                    handleSubmit:this.handleSubmit,
                    handelRemove:this.handelRemove,
                    handelUpdate:this.handelUpdate
                }
            }>
  ... child..
            </Context.Provider>
        );
    };

}
AppSugar.propTypes = {
    defaultState:PropTypes.array
};
export default AppSugar;
 ```
 
 ---
 to add  new item  used this code :
 
  ```
  //App.js
  

  ```

 to put search requirements   used this code :
 
  ```
    //ListItem.js
....
    static contextType = Context;
    state = {
        flag:false ,
        items:[]||this.props.items,
        value:"",
    };

....
      updateSearchTerm =(e) => {
          let {value} = e.target;
          this.setState({value});
          this.context.handelChange(e)
      };
      /*
      ./App.js
          handelChange = (e) => {
              let {name,value} = e.target;
              this.setState({[name]:value});
          };
      
      */
....
render() {
        const { flag } =this.props;
        // "flag" used  to make possebly to use one  component for to difrent list's
        let {
            items,
            value }  = this.state;
        return (
            <section>
                <h3 className="mb-3">
                    Title
                </h3>
                <Filter  flag={flag} name={flag?"packedItem":"unPackedItem"} searchTerm={value} updateSearchTerm={this.updateSearchTerm} />
                <ul className="list-group mb-3">
                    {items.map((item,ind)=><Item
                        name={flag?"packedItem":"unPackedItem"}
                        key={item.id}
                        {...item}/>)}
                </ul>
            </section>
        );
    }
  ```

to mark the item that are looking for  with search field  I wrote next code :
   ```
     //Item.js
 ...
  render() {
         let {
             handelRemove,
             handelUpdate
         } = this.context,
             {
                 trgSearch, // all  items  get string from search  field after every change of it
                 //this actualy not correct better  use redux to watch it,
                 // but on this stage  of studing  we are not using React-Redux
                 value,
                 packed,
                 id
             } = this.state;
         return (
             <li className={` ${
                 trgSearch!==""?
                     value.toLowerCase().includes(
                         trgSearch
                     )?"bg-warning"
                         :"":""} item-box list-group-item`}>
                         
  ...
   ```
 "checkbox" switching with this code :
   ```
     //App.js
  handelUpdate = (e) => {
         let {
             defaultData
         } = this.state;
     
         this.setState({
             defaultData:defaultData.map((el)=>{
             if(el.id===e.target.id){   el.packed = !el.packed  }
         return el
         })
         })
     };
 ...
   ```
 "delete item"  with this code :
   ```
     //App.js
 
     handelRemove = (e) => {
         let {
             defaultData
         } = this.state;
        
         defaultData = defaultData.filter((el,ind) =>el.id!==e.target.value);
         this.setState({defaultData});
     };
 ...
   ```
