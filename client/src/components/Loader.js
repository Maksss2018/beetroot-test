import React from 'react';
import PropTypes from 'prop-types';

function Loader(props) {
    return (<div className="ui icon message">
        <i className="notched circle loading icon"/>
        <div className="content">
            <div className="header">films loading</div>
        </div>
    </div>);
}

export default Loader;