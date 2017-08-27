import React from 'react';
import PropTypes from 'prop-types';
import {shelfTypes, shelfChangerHeader} from './config';

class ShelfChanger extends React.Component{
    onShelfChanged(newShelfId){
        this.props.onShelfChanged(newShelfId)
    }

    render(){
        const defaultOption = this.props.selectedOption;
        return(
            //  the default value for the control should always be the current shelf the book is in.
            <div className="book-shelf-changer">
                <select value={defaultOption} onChange={(event) => this.onShelfChanged(event.target.value)}>
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
    onShelfChanged: PropTypes.func.isRequired,
};

export default ShelfChanger;