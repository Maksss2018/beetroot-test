import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Context} from "../../src/Context"




class FilterSugar extends Component {

    state ={
        value:""
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
            updateSearchTerm,
            name
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
                       name={name}
                       onChange={(e)=>{
                           updateSearchTerm(e);
                           setState({value:""})
                       }}
                />
            </div>
        );
    }
}

FilterSugar.propTypes = {
    updateSearchTerm:PropTypes.func.isRequired,
    searchTerm : PropTypes.string.isRequired,

};

export default FilterSugar;