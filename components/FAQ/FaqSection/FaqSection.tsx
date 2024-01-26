import { FC } from 'react';
import AnimateHeight from 'react-animate-height';
import styles from './FaqSection.module.scss';

interface EndPredictionProps {
    showContent: boolean;
    content: string;
}

const FaqSection: FC<EndPredictionProps> = ( { showContent, content } ) => {
    return (
        <AnimateHeight height={ showContent ? 'auto' : 0 }>
            <div className={ styles.content }>{ content }</div>
        </AnimateHeight>
    );
};

export default FaqSection;
