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
                <ul>
                    {props.shelfTypes.map((shelf, key) => (
                        shelf.value !== 'none' &&
                        <li key={shelf.value}>
                            <Bookshelf books={getBooksByShelfName(props.books, shelf.value)}
                                       title={shelf.name}/>
                            {console.log(shelf.name)}
                        </li>

                    ))}

                </ul>

            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BookLibrary.propTypes = {
    shelfTypes: PropTypes.array.isRequired,
    books: PropTypes.array
};

export default BookLibrary;