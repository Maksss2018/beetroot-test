import React ,{useContext, useState, useEffect}from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import Filter from './Filter';
import {Context} from "../Context";

const  ListItems = (props) => {
    const  {handelChange}= useContext(Context);
    const updateSearchTerm =(e) => {
            let {value} = e.target;
            setValue(value);
            handelChange(e)
        },
        [flag,setFlag]= useState(props.flag);
    let [items,setItems] = useState(props.items),
        [value,setValue]= useState("");

    useEffect(()=>{
        setItems(props.items)
    },[props.items,value]);
    return (
        <section>
            <h3 className="mb-3">
                Title
            </h3>
            <Filter  flag={flag} searchTerm={value} updateSearchTerm={updateSearchTerm} />
            <ul className="list-group mb-3">
                {items.map((item,ind)=>{
                    console.log(" onChange ()");
                    return <Item
                        isSelected={(
                            value!==""?
                            item.value.toLowerCase().includes(
                                value.toLowerCase()
                            )?"bg-warning"
                                :""
                            :""
                        )}
                        key={item.id}
                        {...item}/>
                })}
            </ul>
        </section>
    );
}


ListItems.propTypes = {

};

export default ListItems;