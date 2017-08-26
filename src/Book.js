import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

class Book extends React.Component{

    render(){
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                         style={{width: 128, height: 193, backgroundImage: `url(${this.props.cover})`}}>
                    </div>
                    <ShelfChanger selectedOption={this.props.shelfId}/>
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
};

export default Book;