import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './styles.css';

// @ts-ignore
const SwitchToggle = ( { isToggled, setIsToggled } ) => {
    const onToggle = () => setIsToggled( !isToggled );

    return (
        <form>
            <div style={ { display: 'flex', alignItems: 'center', cursor: 'pointer' } }>
                <Switch.Root
                    className="SwitchRoot"
                    checked={ isToggled }
                    onCheckedChange={ onToggle }
                >
                    <Switch.Thumb className="SwitchThumb"/>
                </Switch.Root>
            </div>
        </form>
    );
};

export default SwitchToggle;
