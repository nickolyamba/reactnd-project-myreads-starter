import React from 'react';
import PropTypes from 'prop-types';
import {shelfTypes, shelfChangerHeader} from './config';

class ShelfChanger extends React.Component{
    render(){
        const selectedOption = this.props.selectedOption;
        return(
            //  the default value for the control should always be the current shelf the book is in.
            <div className="book-shelf-changer">
                <select defaultValue={selectedOption}>
                    <option key={shelfChangerHeader} value="none" disabled>{shelfChangerHeader}</option>
                    {shelfTypes.map(shelf => (
                        <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

ShelfChanger.propTypes = {
    selectedOption: PropTypes.string.isRequired,
};

export default ShelfChanger;