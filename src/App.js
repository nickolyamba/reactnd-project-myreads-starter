import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";
import * as BooksAPI from './BooksAPI'
import {shelfTypes} from './config';

class BooksApp extends React.Component {
    state = {
    };

    componentDidMount(){
      BooksAPI.getAll().then(books => {
          console.log(books);
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
    updateBooksByShelf = (updatedBooks, newShelfId, oldShelfId, bookId) => {
        // if succesfully updated shelf on a backend,
        // remove the book from the shelf
        let movedBook;
        if(updatedBooks[oldShelfId] && !updatedBooks[oldShelfId].includes(bookId)){
            console.log('inUpdate', bookId);
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
        // const updatedBook = this.state.books.filter(book => book.id === id)[0];
        console.log(newShelfId, oldShelfId, bookId);

        // Update book's shelf by its id and new shelf id
        BooksAPI.update({id: bookId}, newShelfId).then(updatedBooks => {
            this.updateBooksByShelf(updatedBooks, newShelfId, oldShelfId, bookId);
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
              <Route path="/search" render={({history}) => (
                  <Search/>
                )}
              />
          </div>
        )
    }
}

export default BooksApp
