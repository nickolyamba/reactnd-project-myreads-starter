import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (

    <nav className="list-books-title">
        <h1>{props.headerText}</h1>
    </nav>

);

Header.propTypes = {
    headerText: PropTypes.string.isRequired
};

export default Header;