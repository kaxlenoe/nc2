'use client';
import { FC } from 'react';
import styles from './MobileNavBar.module.scss'
import { mobileNavLinks } from '@/constants';
import cls from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { revalidatePath } from 'next/cache';

interface IMobileNavBarProps {
    isFromBurger?: boolean
    setAccordionValue?: ( value: string[] ) => void; // Changed to string[] to match the type of setValue
    setBurgerIsOpen?: ( value: boolean ) => void;
}


const MobileNavBar: FC<IMobileNavBarProps> = ( { isFromBurger, setAccordionValue, setBurgerIsOpen } ) => {

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
                { mobileNavLinks.map( ( nav, i ) => (
                    <Link
                        href={ `${ nav.url }/${ getCorrectLink( nav.id ) }` }
                        key={ nav.id }
                        className={
                            `
                            ${ cls( { [ styles.active ]: pathname.includes( nav.id ) || ( nav.id === 'home' && pathname === '/' ) } ) }
                            ${ styles.Link }
                            `
                        }
                        onClick={ () => {
                            revalidatePath( `${ nav.url }/${ getCorrectLink( nav.id ) }` )
                        } }
                    >
                        <Image
                            src={ nav.icon.src }
                            alt={ nav.label }
                            width={ 16 }
                            height={ 16 }
                            className={ `
                            ${ styles.iconImage }
                            ${ cls( { [ styles.active ]: pathname.includes( nav.id ) || ( nav.id === 'home' && pathname === '/' ) } ) }
                            ` }
                        />
                        <li> { nav.label }</li>

                    </Link>
                ) ) }
            </ul>
        </nav>
    );
};

export default MobileNavBar;
