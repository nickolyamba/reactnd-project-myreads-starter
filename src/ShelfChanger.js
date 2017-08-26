import React from 'react';
import PropTypes from 'prop-types';
import {shelfTypes, shelfChangerHeader} from './config';

class ShelfChanger extends React.Component{
    render(){
        return(
            //  the default value for the control should always be the current shelf the book is in.
            <div className="book-shelf-changer">
                <select>
                    <option key={shelfChangerHeader} value="none" disabled>{shelfChangerHeader}</option>
                    {shelfTypes.map(shelf => (
                        <option key={shelf.value} value={shelf.value}>{shelf.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default ShelfChanger;