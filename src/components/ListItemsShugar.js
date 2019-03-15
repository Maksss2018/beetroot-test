import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import Filter from './Filter';
import {Context} from "../Context";


class ListItemsShugar extends Component {
    static contextType = Context;
    state = {
        flag:false ,
        items:[]||this.props.items,
        value:"",
    };

    //const  {handelChange}= useContext(Context);
    updateSearchTerm =(e) => {
        let {value} = e.target;
        this.setState({value});
        this.context.handelChange(e)
    };


    componentDidMount() {
        let flag = false;
        if(!flag){
            this.setState({items:this.props.items});
            flag= true;
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.items!==this.state.items){
            const { items } = nextProps;
            this.setState({items})
        }
         }
    componentWillUnmount() {

    }

    render() {
        const {
            flag
        } =this.props;
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
}

ListItemsShugar.propTypes = {
    items: PropTypes.array.isRequired,
    flag: PropTypes.bool.isRequired
};

export default ListItemsShugar;