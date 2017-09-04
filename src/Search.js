import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

const MAX_RESULTS = 5;

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            books: []
        }
    }

    componentDidMount(){
        this.bookInput.focus();
        this.networkWarning = document.getElementById('errorMsg');
    }

    onShelfChanged = (newShelfId, oldShelfId, bookId) => {
        const movedBook = this.state.books.filter(book => book.id === bookId)[0];
        this.props.onShelfChanged(newShelfId, oldShelfId, movedBook);
    };

    /**
     * Updates this.state.books based on query
     * @param query - keyword for a book
     */
    getBooksByQuery(query){
        if(query === ''){
            this.setState({books: []});
            return;
        }
        // hide a warning message
        this.networkWarning.style.visibility = "hidden";

        BooksAPI.search(query, MAX_RESULTS).then(books => {
                if(!books){
                    books = [];
                    this.requestError('No books found: ', query);
                }
                else if(books.error){
                    this.requestError(books.error, query);
                    books = [];
                }


            this.assignBooksToShelves(books);
            this.setState({books});
        }).catch(error => this.requestError(error, query));
    }

    /**
     * Assigns queried books to shelves
     * @param booksByQuery
     */
    assignBooksToShelves(booksByQuery){
        const booksOnShelves = this.props.bookMap;
        for(let i = 0; i < booksByQuery.length; i++){
            const bookByQuery = booksByQuery[i];
            bookByQuery.shelf = booksOnShelves[bookByQuery.id] ?
                booksOnShelves[bookByQuery.id] : 'none';
        }
    }

    requestError = (error, query)=>{
        console.log(error);
        this.networkWarning.style.visibility = "visible";
        this.networkWarning.innerHTML = `There was an error making a request for the ${query}: ${error}`;
    };

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*Use debounce to control frequency of onChange events*/}
                        <Debounce time="100" handler="onChange">
                            <input type="text"
                                   placeholder="Search by title or author"
                                   /*source: https://stackoverflow.com/questions/28889826*/
                                   ref={input => this.bookInput = input}
                                   onChange={event => this.getBooksByQuery(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>

                <div className="search-books-results">
                    <p id="errorMsg" style={{'visibility': 'hidden', 'color': 'red'}}> </p>
                    <ol className="books-grid">
                        {
                            this.state.books.map(book => (
                                <li key={book.id}>
                                    <Book title={book.title ? book.title : 'No Title!'} authors={!!book.authors ? book.authors : []}
                                          cover={book.imageLinks.thumbnail}
                                          imageDimensions={[128, 193]}
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
    bookMap: PropTypes.object
};

export default Search;