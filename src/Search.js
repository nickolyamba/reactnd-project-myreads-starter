import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

const MAX_RESULTS = 5;

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            query: '',
            books: []
        }
    }

    onShelfChanged = (newShelfId, oldShelfId, bookId) => {
        const movedBook = this.state.books.filter(book => book.id === bookId)[0];
        this.props.onShelfChanged(newShelfId, oldShelfId, movedBook);
    };

    updateQuery(query){
        this.setState({query}, () => this.getBooksByQuery());
    }

    getBooksByQuery(){
        if(this.state.query === ''){
            this.setState({books: []});
            return;
        }
        BooksAPI.search(this.state.query, MAX_RESULTS).then(books => {
            if(!!books['error']) books = [];
            this.assignBooksToShelves(books);
            this.setState({books});
        });
    }

    /**
     * Assign queried books to shelves
     * @param booksByQuery
     */
    assignBooksToShelves(booksByQuery){
        const booksOnShelves = this.props.allBooks;
        for(let i = 0; i < booksByQuery.length; i++){
            const bookByQuery = booksByQuery[i];
            bookByQuery.shelf = booksOnShelves[bookByQuery.id] ? booksOnShelves[bookByQuery.id] : 'none';

        }
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input value={this.state.query} type="text"
                               placeholder="Search by title or author"
                               onChange={(event)=> this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.books.map(book => (
                                <li key={book.id}>
                                    <Book title={book.title} authors={!!book.authors ? book.authors : []}
                                          cover={book.imageLinks.thumbnail}
                                          shelfId={book.shelf} bookId={book.id}
                                          onShelfChanged={this.onShelfChanged}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}


Search.propTypes = {
    allBooks: PropTypes.object,
};

export default Search;