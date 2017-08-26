import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";
import * as BooksAPI from './BooksAPI'

const shelfTypes = {
        currentlyReading: {value: 'currentlyReading', name: 'Currently Reading'},
        wantToRead: {value: 'wantToRead', name: 'Want to Read'},
        read: {value: 'read', name: 'Read'},
        none: {value: 'none', name: 'None'}
    };

class BooksApp extends React.Component {
  state = {
      books: []
  };

  componentDidMount(){
      BooksAPI.getAll().then(books => (
          this.setState({books})
      ));
  }

  render() {
    return (
      <div className="app">
          {/*BookLibrary Component*/}
          <Route exact path="/" render={() => (
              this.state.books &&
              <BookLibrary books={this.state.books} shelfTypes={shelfTypes}/>
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
