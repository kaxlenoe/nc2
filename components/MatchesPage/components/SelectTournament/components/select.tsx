import * as Radix from '@radix-ui/react-select'
// @ts-ignore
import { styled } from '@stitches/react'

const Wrapper = styled( 'div', {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 32,
} )

const SelTrigger = styled( 'button', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    background: '#081517',
    padding: '9px 16px 9px 15px',
    fontSize: 12,
    fontFamily: 'sans-serif',
    border: '1px solid #1b1b1b',
    borderRadius: 20,
    outline: 'none',
    color: '#fff',
    minWidth: 384,
    variants: {
        error: {
            true: {
                borderColor: '#df6c75',
            },
        },
    },
    '@media(max-width: 768px)': {
        width: '150px',
        minWidth: '150px',
        padding: '7px 14px 7px 13px',
        fontSize: 10,
    },
    '@media(max-width: 1024px)': {
        width: '130px',
        minWidth: '130px',
        fontSize: 10,
    },
} )

const Dropdown = styled( 'div', {
    position: 'relative',
    boxSizing: 'border-box',
    color: '#fff',
    padding: '16px 8px',
    fontFamily: 'sans-serif',
    fontSize: 12,
    background: '#081517',
    border: '1px solid #1b1b1b',
    borderRadius: 4,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    pointerEvents: 'all',
    zIndex: 1000,
    top: 56,
    cursor: 'pointer',
    right: 83,
    width: 255,
    '@media(max-width: 768px)': {
        width: '180px',
        fontSize: 10,
    },
    '@media(max-width: 1024px)': {
        width: '150px',
        fontSize: 12,
    },
} )

const Viewport = styled( Radix.Viewport, {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
} )

const Item = styled( Radix.Item, {
    padding: '8px',
    outline: 'none',
    transition: 'background ease 300ms',
    borderRadius: 4,
    '&:focus': {
        background: '#081517',
    },
    '@media(max-width: 768px)': {
        padding: '6px',
    },
} )

export { Dropdown, SelTrigger, Wrapper, Viewport, Item }
