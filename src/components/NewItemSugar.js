import React, { Component } from "react";
import { generate as id } from "shortid";
import PropTypes from 'prop-types';
import {Context} from "./../Context"

class NewItemSugar extends Component {

    static contextType = Context;

    state = {
        value:"",
    };


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    componentDidUpdate(prevProps, prevState) {
        let { newItem }  = this.context;
        if(newItem!==prevState.value){

            this.setState({value:newItem})
        }
    }


    render() {
        const {
            handelChange,
            handleSubmit
        } = this.context;
        let {value} =this.state;
        console.dir(this.context);
        return (
            <form onSubmit={(e) =>{
                handleSubmit(e);
                this.setState({value:""});
            }}>
                <div className="row">
                    <div className="col-md-10">
                        <input
                            className="form-control mb-3"
                            onChange={handelChange}
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
}

export default NewItemSugar;


