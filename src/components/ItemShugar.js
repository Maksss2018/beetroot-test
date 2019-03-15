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
        const {name} = this.props;
        let rez =  this.context[name];
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
   const {name}  = this.props ;
        if(this.context[name]!==this.state.trgSearch){
            this.setState({
                trgSearch:this.context[name]
            })
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

ItemShugar.propTypes = {
    name: PropTypes.string.isRequired
};

export default ItemShugar;