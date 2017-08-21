import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './BookLibrary';
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="app">
          {/*BookLibrary Component*/}
          <Route exact path="/" render={() => (
              <BookLibrary/>
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
