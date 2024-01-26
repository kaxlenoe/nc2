import styles from './Loader.module.scss';
import React from 'react';
import { ScaleLoader } from 'react-spinners';

type PropsType = {
    loading: boolean;
};

const Loader: React.FC<PropsType> = ( { loading } ) => {
    return (
        <div className={ styles.sweetLoading }>
            <ScaleLoader
                color={ '#121f21' }
                loading={ loading }
                // @ts-ignore
                css={ styles.beatLoader }
                size={ 20 }
            />
        </div>
    );
};

export default Loader;
