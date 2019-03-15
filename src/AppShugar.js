import React, { Component} from 'react';
import PropTypes from 'prop-types';
import NewItemShugar from './components/NewItemShugar';
import ListItemsShugar from './components/ListItemsShugar';
import defaultState from './data';
import {Context} from './Context/';
import {generate as id} from "shortid";


class   AppShugar extends Component{
    state = {
        newItem:"",
        packedItem:"",
        unPackedItem:"",
        value:"",
        defaultData: defaultState||null
    };

    selectAll = (e) => {
        let {defaultData} = this.state;
        let newData =defaultData.map((item)=>{
            if(item.packed){
                item.packed = false
            }
            return item
        });
        this.setState({defaultData:newData});
    };

    handelChange = (e) => {
        let {name,value} = e.target;
        this.setState({[name]:value});
        /*
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
         }*/
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
        const trgIndex =  defaultData.map((el)=>el.id).indexOf(e.target.value);
        defaultData = defaultData.filter((el,ind) =>ind!==trgIndex);
        this.setState({defaultData});
    };
    handelUpdate = (e) => {
        let {
            defaultData
        } = this.state;
        const trgIndex =  defaultData.map((el)=>el.id).indexOf(e.target.id);
        defaultData[trgIndex].packed = !defaultData[trgIndex].packed;
        this.setState({defaultData})
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
                    <NewItemShugar />
                    <div className="row">
                        <div className="col-md-5">
                            <ListItemsShugar flag={false} title="Unpacked Items" items={defaultData.filter((el)=>!el.packed)} />
                        </div>
                        <div className="offset-md-2 col-md-5">
                            <ListItemsShugar flag={true} title="Packed Items" items={defaultData.filter((el)=>el.packed)}/>
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

AppShugar.propTypes = {
    defaultState:PropTypes.array
};

export default AppShugar;