import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Context} from "./../Context"
import './Item.css';



class ItemShugar extends Component {

    static contextType = Context;
    state = {
        packed:false,
        id:"",
        value:"",
        trgSearch: ""
    };

    trgGenerator = ()=>{
        let {
            packedItem,
            unPackedItem
        } = this.context;
        let rez =packed?packedItem:unPackedItem;
        return rez!==undefined?rez.toLowerCase():''
    }
    componentDidMount() {
        let flag = false;
        if(!flag){
            this.setState({
                trgSearch:this.trgGenerator()
            });
        }
    }

    componentWillReceiveProps(nextProps) {

        if(packed){
           if(this.context.packedItem!==this.state.packedItem){
               let {packedItem} = this.context;
               this.setState({
                   packedItem,
                   trgSearch:this.trgGenerator()
               })
           }

        } else {
            if(this.context.unPackedItem!==this.state.unPackedItem){

                let {unPackedItem} = this.context;
                this.setState({
                    unPackedItem,
                    trgSearch:this.trgGenerator()
                })

            }

        }
    }


    render() {
        let {
            handelRemove,
            handelUpdate
        } = this.context,
            {
                trgSearch,
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
}

ItemShugar.propTypes = {};

export default ItemShugar;