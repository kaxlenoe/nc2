import { styled } from '@stitches/react';
import * as Radix from '@radix-ui/react-select';

const Wrapper = styled( 'div', {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
} );

const SelTrigger = styled( 'button', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '240px',
    boxSizing: 'border-box',
    padding: '0px 24px',
    fontSize: '16px',
    lineHeight: '40px',
    fontFamily: 'sans-serif',
    border: '1px solid #192323',
    borderRadius: 24,
    outline: 'none',
    color: '#fff',
    background: '#0F1515',
    cursor: 'pointer',
    variants: {
        error: {
            true: {
                borderColor: '#df6c75',
            },
        },
    },
} );

const Dropdown = styled( 'div', {
    position: 'relative',
    minWidth: '230px',
    boxSizing: 'border-box',
    color: '#fff',
    backgroundColor: '#0F1515',
    padding: '16px 8px',
    fontFamily: 'sans-serif',
    fontSize: 16,
    border: '1px solid transparent',
    borderRadius: 12,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    pointerEvents: 'all',
} );

const Viewport = styled( Radix.Viewport, {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
} );

const Item = styled( Radix.Item, {
    padding: '8px',
    outline: 'none',
    transition: 'background ease 300ms',
    borderRadius: 4,
    '&:focus': {
        background: '#192425',
        cursor: 'pointer',
    },
} );

export { Dropdown, SelTrigger, Wrapper, Viewport, Item };
