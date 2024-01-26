'use client';
import { FC } from 'react';
import styles from './DesktopNavBar.module.scss'
import { navLinks } from '@/constants';
import cls from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface IDesktopNavBarProps {
    isFromBurger?: boolean
    setAccordionValue?: (value: string[]) => void; // Changed to string[] to match the type of setValue
    setBurgerIsOpen?: (value: boolean) => void;
}


const DesktopNavBar: FC<IDesktopNavBarProps> = ({isFromBurger, setAccordionValue, setBurgerIsOpen}) => {

    const pathname = usePathname();
    const getCorrectLink = ( id: string ) => {
        const parts = pathname.split( '/' );
        const gamePart = parts?.[ 2 ];

        if ( id === 'home' || id === 'blog' || id === 'faq' || id === 'promotions' ) {
            return '';
        }
        if ( gamePart?.includes( 'league-of-legends' ) ) {
            return 'league-of-legends';
        }
        else if ( gamePart?.includes( 'counter-strike' ) ) {
            return 'counter-strike';
        }
        else if ( gamePart?.includes( 'dota-2' ) ) {
            return 'dota-2';
        }
        return '';
    };

    return (
        <nav className={ styles.navbar }>
            <ul>
                { navLinks.map( ( nav, i ) => (
                    <li
                        key={ nav.id }
                        className={ cls( {
                            [ styles.active ]: pathname.includes( nav.id ),
                        } ) }
                    >
                        <Link
                            href={ `${ nav.url }/${ getCorrectLink( nav.id ) }`}
                            onClick={() => {
                                    revalidatePath( `${ nav.url }/${ getCorrectLink( nav.id ) }` )
                                    if (isFromBurger) {
                                        setAccordionValue && setAccordionValue( [''] )
                                        setBurgerIsOpen && setBurgerIsOpen( false )
                                    }
                                }
                            }
                        >
                            { nav.label }
                        </Link>
                    </li>
                ) ) }
            </ul>
        </nav>
    );
};

export default DesktopNavBar;
