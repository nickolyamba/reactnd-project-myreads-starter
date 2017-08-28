import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

class Book extends React.Component{
    onShelfChanged = (newShelfId) => {
        this.props.onShelfChanged(newShelfId, this.props.shelfId, this.props.bookId);
    };

    render(){
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                         style={{width: 128, height: 193, backgroundImage: `url(${this.props.cover})`}}>
                    </div>
                    <ShelfChanger selectedOption={this.props.shelfId} onShelfChanged={this.onShelfChanged}/>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors[0]}</div>
            </div>
        )
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    cover: PropTypes.string,
    shelfId: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default Book;