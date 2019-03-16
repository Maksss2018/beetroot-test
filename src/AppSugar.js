import React, { Component} from 'react';
import PropTypes from 'prop-types';
import NewItemSugar from './components/NewItemSugar';
import ListItemsSugar from './components/ListItemsSugar';

import defaultState from './data';


import {Context} from './Context/';
import {generate as id} from "shortid";


class   AppSugar extends Component{
    state = {
        newItem:"",
        packedItem:"",
        unPackedItem:"",
        value:"",
        defaultData: defaultState||null,
    };

    selectAll = (e) => {
        let {defaultData} = this.state;
        let newData =defaultData.map((item)=>{
            if(item.packed){
                item.packed = false
            }
            return item
        });
        this.setState({
            defaultData:newData,
            unPackedItem:""
        });
    };

    handelChange = (e) => {
        let {name,value} = e.target;
        this.setState({[name]:value});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let {
            newItem,
            defaultData
        } = this.state;
        defaultData=[{ value: newItem , id: id(), packed: false },...defaultData];
        this.setState({
            defaultData
        });
    };
    handelRemove = (e) => {
        let {
            defaultData
        } = this.state;
        /* const trgIndex =  defaultData.map((el)=>el.id).indexOf(e.target.value);
         defaultData = defaultData.filter((el,ind) =>el.id!==trgIndex);
         this.setState({defaultData});
         */
        defaultData = defaultData.filter((el,ind) =>el.id!==e.target.value);
        this.setState({defaultData});
    };
    handelUpdate = (e) => {
        let {
            defaultData
        } = this.state;
     /*
        const trgIndex =  defaultData.map((el)=>el.id).indexOf(e.target.id);
        defaultData[trgIndex].packed = !defaultData[trgIndex].packed;
      */
        this.setState({
            defaultData:defaultData.map((el)=>{
            if(el.id===e.target.id){   el.packed = !el.packed  }
        return el
        })
        })
    };

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
                <div className="container py-3">
                    <NewItemSugar />
                    <div className="row">
                        <div className="col-md-5">
                            <ListItemsSugar flag={false} title="Unpacked Items" items={defaultData.filter((el)=>!el.packed)} />
                        </div>
                        <div className="offset-md-2 col-md-5">
                            <ListItemsSugar flag={true} title="Packed Items" items={defaultData.filter((el)=>el.packed)}/>
                            <button
                                onClick={this.selectAll}
                                className="btn btn-danger btn-lg btn-block">
                                Mark All As Unpacked
                            </button>

                        </div>
                    </div>



                </div>
            </Context.Provider>
        );
    };

}

AppSugar.propTypes = {
    defaultState:PropTypes.array
};

export default AppSugar;