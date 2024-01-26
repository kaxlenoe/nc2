import { styled } from '@stitches/react';
import { forwardRef } from 'react';

const Chev = styled( 'svg', {
    transition: 'transform 300ms',
    variants: {
        direction: {
            up: {
                transform: 'rotate(-90deg)',
                '[data-state=open] > &': { transform: 'rotate(90deg)' },
            },
            down: {
                transform: 'rotate(90deg)',
                '[data-state=open] > &': { transform: 'rotate(-90deg)' },
            },
            left: {
                transform: 'rotate(180deg)',
                '[data-state=open] > &': { transform: 'rotate(0deg)' },
            },
            right: {
                transform: 'rotate(0deg)',
                '[data-state=open] > &': { transform: 'rotate(180deg)' },
            },
        },
    },
    defaultVariants: {
        direction: 'right',
    },
} );

const Chevron = forwardRef( ( { width = 8, ...props }: ChevronTypes, ref ) => (
    <Chev
        { ...ref }
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
    </Chev>
) );

Chevron.displayName = 'Chevron';

type ChevronTypes = {
    direction?: 'up' | 'down' | 'left' | 'right';
    width?: number;
    props?: any;
};

export default Chevron;
