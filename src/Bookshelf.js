import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksShelf extends React.Component{
    render(){
        console.log(this.props.books);
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map((book, key) => (
                                <li key={book.id}>
                                    <Book title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail}/>
                                </li>
                            ))}
                        {console.log('yo',this.props.books)}
                    </ol>
                </div>
            </div>
        );
    };
}

BooksShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array
};

export default BooksShelf;