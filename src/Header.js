import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (

    <div className="list-books-title">
        <h1>{props.headerText}</h1>
    </div>

);

Header.propTypes = {
    headerText: PropTypes.string.isRequired
};

export default Header;