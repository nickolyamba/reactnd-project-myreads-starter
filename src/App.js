import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";
import * as BooksAPI from './BooksAPI'
import {shelfTypes} from './config';

class BooksApp extends React.Component {
    state = {};

    /**
     * Get all the books from backend.
     * Place each book in a corresponding shelf
     * in this.state
     */
    componentDidMount(){
      BooksAPI.getAll().then(books => {
          shelfTypes.forEach(shelf => {
              const booksOnShelf = this.getBooksByShelf(books, shelf);
              this.setState({[shelf.id]: booksOnShelf});
          })
      })
    }

    /**
     * Returns books in a given shelf
     * @param books
     * @param shelf
     * @returns {Array}
     */
    getBooksByShelf = (books, shelf) => {
        return books.filter(book => book.shelf === shelf.id);
    };

    /**
     * Update this.state when book is moved.
     * Ensure that update is in sync with backend.
     * @param updatedBooks
     * @param newShelfId
     * @param oldShelfId
     * @param bookId
     * @param movedBook
     */
    updateBooksByShelf = (updatedBooks, newShelfId, oldShelfId, bookId, movedBook=null) => {
        // if succesfully updated shelf on a backend,
        // remove the book from the shelf
        if(updatedBooks[oldShelfId] && !updatedBooks[oldShelfId].includes(bookId)){
            this.setState(prevState => (
                {
                    [oldShelfId]: prevState[oldShelfId].filter(book => {
                        if(bookId === book.id)
                            movedBook = book;
                        return bookId !== book.id;
                    })
                }
            ))
        }

        // if succesfully updated shelf on a backend,
        // add the book to a new shelf
        if(updatedBooks[newShelfId] && updatedBooks[newShelfId].includes(bookId)){
            this.setState(prevState => {
                movedBook.shelf = newShelfId;
                prevState[newShelfId].push(movedBook);
                return {[newShelfId]: prevState[newShelfId]}
            })
        }
    };

    /**
     * Update book's shelf on a backend and then UI
     * @param newShelfId
     * @param oldShelfId
     * @param bookId
     */
    onShelfChanged = (newShelfId, oldShelfId, bookId) => {
        BooksAPI.update({id: bookId}, newShelfId).then(updatedBooks => {
            this.updateBooksByShelf(updatedBooks, newShelfId, oldShelfId, bookId);
        });
    };

    /**
     * Update book's shelf on a backend and UI
     * when update is coming from Search
     * @param newShelfId
     * @param oldShelfId
     * @param movedBook
     */
    onShelfChangedInSearch = (newShelfId, oldShelfId, movedBook) => {
        BooksAPI.update({id: movedBook.id}, newShelfId).then(updatedBooks => {
            this.updateBooksByShelf(updatedBooks, newShelfId, oldShelfId, movedBook.id, movedBook);
        });
    };

    /**
     * Map book.id to book.shelf
     * return object - {book.id: book.shelf}
     */
    getMapBookIdToShelf(){
        const bookIdToShelfMap = {};

        Object.values(this.state).forEach(booksOnShelf => {
            for(let j = 0; j < booksOnShelf.length; j++){
                bookIdToShelfMap[booksOnShelf[j].id] = booksOnShelf[j].shelf;
            }
        });
        return bookIdToShelfMap;
    }

    render() {
        return (
          <div className="app">
              {/*BookLibrary Component*/}
              <Route exact path="/" render={() => (
                  this.state &&
                  <BookLibrary books={this.state} shelfTypes={shelfTypes}
                               onShelfChanged={this.onShelfChanged}
                  />
                )}
              />

              {/*Search Component*/}
              <Route path="/search" render={() => (
                  <Search onShelfChanged={this.onShelfChangedInSearch} allBooks={this.getMapBookIdToShelf()}/>
                )}
              />
          </div>
        )
    }
}

export default BooksApp
