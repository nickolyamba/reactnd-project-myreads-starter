import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";
import * as BooksAPI from './BooksAPI'
import {shelfTypes} from './config';

class BooksApp extends React.Component {
    state = {};

    componentDidMount(){
      BooksAPI.getAll().then(books => {
          shelfTypes.forEach(shelf => {
              const booksOnShelf = this.getBooksByShelf(books, shelf);
              this.setState({[shelf.id]: booksOnShelf});
          })
      })
    }

    getBooksByShelf = (books, shelf) => {
        return books.filter(book => book.shelf === shelf.id);
    };

    // sync with a backend
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

    onShelfChanged = (newShelfId, oldShelfId, bookId) => {
        // Update book's shelf by its id and new shelf id
        BooksAPI.update({id: bookId}, newShelfId).then(updatedBooks => {
            this.updateBooksByShelf(updatedBooks, newShelfId, oldShelfId, bookId);
        });
    };

    onShelfChangedInSearch = (newShelfId, oldShelfId, movedBook) => {
        BooksAPI.update({id: movedBook.id}, newShelfId).then(updatedBooks => {
            this.updateBooksByShelf(updatedBooks, newShelfId, oldShelfId, movedBook.id, movedBook);
        });
    };

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
                  <Search onShelfChanged={this.onShelfChangedInSearch} allBooks={this.state}/>
                )}
              />
          </div>
        )
    }
}

export default BooksApp
