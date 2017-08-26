import React from 'react';
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
                {/*Populate each Bookshelf with corresponding books props*/}
                <ul>
                    {props.shelfTypes.map((shelf, key) => (
                        shelf.id !== 'none' &&
                        <li key={shelf.id}>
                            <Bookshelf books={getBooksByShelfName(props.books, shelf.id)}
                                       title={shelf.name} shelfId={shelf.id}/>
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