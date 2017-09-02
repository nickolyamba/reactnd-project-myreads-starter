import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Header from './Header';
import Bookshelf from './Bookshelf';

class BookLibrary extends React.Component{
    onShelfChanged = (newShelfId, oldShelfId, bookId) => {
        this.props.onShelfChanged(newShelfId, oldShelfId, bookId);
    };

    render(){
        return(
            <div className="list-books">
                <Header headerText='MyReads'/>
                <div className="list-books-content">
                    {/*Populate each Bookshelf with corresponding books props*/}
                    <ul>
                        {this.props.shelfTypes.map(shelf => (
                            this.props.books[shelf.id] && shelf.id !== 'none' &&
                            <li key={shelf.id}>
                                <Bookshelf books={this.props.books[shelf.id]}
                                           title={shelf.name} shelfId={shelf.id}
                                           onShelfChanged={this.onShelfChanged}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

}

BookLibrary.propTypes = {
    shelfTypes: PropTypes.array.isRequired,
    books: PropTypes.object,
    onShelfChanged: PropTypes.func.isRequired
};

export default BookLibrary;