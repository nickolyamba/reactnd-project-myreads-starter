import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";
import * as BooksAPI from './BooksAPI'
import {shelfTypes} from './config';

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
