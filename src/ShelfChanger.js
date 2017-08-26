import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends React.Component{

    render(){
        return(
            //  the default value for the control should always be the current shelf the book is in.
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>{this.props.header}</option>
                    {this.props.shelves.forEach(shelf => {
                        <option value={shelf[0]}>shelf[1]</option>
                    })}
                    {/*<option value="currentlyReading">Currently Reading</option>*/}
                    {/*<option value="wantToRead">Want to Read</option>*/}
                    {/*<option value="read">Read</option>*/}
                    {/*<option value="none">None</option>*/}
                </select>
            </div>
        )
    }
}

ShelfChanger.propTypes = {
    header: PropTypes.string.isRequired,
    shelves: PropTypes.array.isRequired
};

export default ShelfChanger;