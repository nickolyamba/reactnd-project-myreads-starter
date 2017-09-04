import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksShelf extends React.Component{

    onShelfChanged = (newShelfId, shelfId, bookId) => {
        this.props.onShelfChanged(newShelfId, shelfId, bookId);
    };

    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books &&
                            this.props.books.map(book => (
                                <li key={book.id}>
                                    <Book title={book.title} authors={book.authors}
                                          cover={book.imageLinks.thumbnail}
                                          shelfId={this.props.shelfId} bookId={book.id}
                                          imageDimensions={[128, 193]}
                                          onShelfChanged={this.onShelfChanged}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    };
}

BooksShelf.propTypes = {
    title: PropTypes.string.isRequired,
    shelfId: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChanged: PropTypes.func.isRequired
};

export default BooksShelf;