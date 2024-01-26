import React from 'react';
import './Toggle.module.scss';

// @ts-ignore
function ToggleNew( { setIsChecked, isChecked } ) {
    const onToggle = () => setIsChecked( !isChecked );
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={ isChecked } onChange={ onToggle }/>
            <span className="switch"/>
        </label>
    );
}

export default ToggleNew;
