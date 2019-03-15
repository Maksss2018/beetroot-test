import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Context} from "../../src/Context"




class FilterShugar extends Component {

    state ={
        value:"",
        flag:false
    };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.searchTerm!==this.state.value){
            let {searchTerm} = nextProps;
            this.setState({value:searchTerm});
        }
    }



    render() {
        const {
            flag,
            updateSearchTerm,
        } = this.props;
        let {
            value,
            setState
        } =this.state;
        return (
            <div className="mb-3">
                <input type="text"
                       className="form-control"
                       value={value}
                       name={`${flag?"packedItem":"unPackedItem"}`}
                       onChange={(e)=>{
                           updateSearchTerm(e);
                           setState({value:""})
                       }}
                />
            </div>
        );
    }
}

FilterShugar.propTypes = {
    updateSearchTerm:PropTypes.func.isRequired,
    searchTerm : PropTypes.string.isRequired,

};

export default FilterShugar;