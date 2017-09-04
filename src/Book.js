import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

class Book extends React.Component{
    onShelfChanged = (newShelfId) => {
        this.props.onShelfChanged(newShelfId, this.props.shelfId, this.props.bookId);
    };

    render(){
        const width = this.props.imageDimensions[0];
        const height = this.props.imageDimensions[1];
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                         style={{width: width, height: height, backgroundImage: `url(${this.props.cover})`}}>
                    </div>
                    <ShelfChanger selectedOption={this.props.shelfId} onShelfChanged={this.onShelfChanged}/>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{Array.isArray(this.props.authors) ? this.props.authors[0] : this.props.authors}</div>
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
    onShelfChanged: PropTypes.func.isRequired,
    imageDimensions: PropTypes.array.isRequired
};

export default Book;