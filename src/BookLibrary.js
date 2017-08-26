import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Header from './Header';
import Bookshelf from './Bookshelf';

const getBooksByShelfName = (books, shelfName) => {
    return books.filter(book => book.shelf === shelfName);
};

const BookLibrary = (props) => {
    return(
        <div className="list-books">
            <Header headerText='MyReads'/>
            <div className="list-books-content">
                <Bookshelf books={getBooksByShelfName(props.books, props.shelfTypes.currentlyReading.value)}
                           title={props.shelfTypes.currentlyReading.name}/>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BookLibrary.propTypes = {
    shelfTypes: PropTypes.object.isRequired,
    books: PropTypes.array
};

export default BookLibrary;