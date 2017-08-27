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
              let booksOnShelf = this.getBooksByShelfName(books, shelf);
              this.setState({[shelf.id]: booksOnShelf});
          })
      })
    }

    getBooksByShelfName = (books, shelf) => {
        return books.filter(book => book.shelf === shelf.id);
    };

    onShelfChanged = (shelfId, id) => {
        // const updatedBook = this.state.books.filter(book => book.id === id)[0];
        console.log(shelfId, id);

        // Update book's shelf by its id and new shelf id
        BooksAPI.update({id: id}, shelfId).then(book => {
            console.log('updated', book);
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
