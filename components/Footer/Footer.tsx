'use client';
import styles from './Footer.module.scss';
import { FC } from 'react';

import Link from 'next/link';
import { footerLogo } from '@/constants/StaticIcons';
import { SOCIALS_LINKS } from '@/constants/SocialLinks';
import { footerNavLinks } from '@/constants/FooterNavLinks';
import useWindowSize from '@/hooks/useWindowSize';
import { revalidatePath } from 'next/cache';

const Footer: FC = () => {

    const { isTablet, isMobile } = useWindowSize();
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.section }>
                <Link className={ styles.logo } href="/">
                    <div className={ styles.logo_img }>
                        <img src={ footerLogo.src } alt="NeonCheese"/>
                    </div>
                    <div className={ styles.logo_text }>
                        <span>Neon</span>
                        <span>Cheese</span>
                    </div>
                </Link>
                <div className={ styles.socials }>
                    { SOCIALS_LINKS.map( ( item, index ) => {
                        return (
                            <Link href={ item.link } key={ index }>
                                <div className={ styles.socials_item }>
                                    <img src={ item.image.src } alt={ item.name }/>
                                </div>
                            </Link>
                        )
                    } )
                    }
                </div>
                { (isTablet || isMobile) &&

                    <nav className={ styles.navbar }>
                        <ul>
                            { footerNavLinks.map( ( nav:any, i:number ) => (
                                <li
                                    key={ nav.id }
                                >
                                    <Link
                                        href={ `${ nav.url }` }
                                        className={ styles.navbar_link }
                                        onClick={ () => {
                                            // revalidatePath( `${ nav.url }` )
                                        }
                                        }
                                    >
                                        { nav.label }
                                    </Link>
                                </li>
                            ) ) }
                        </ul>
                    </nav>
                }
            </div>
            <div className={ styles.divider }></div>
            <div className={ styles.section }>
                <div className={ styles.copyright }>
                    © 2023 Best Esports Odds, LLC. All Rights Reserved.
                </div>
                <div className={ styles.muted_text }>
                    Gamble responsibly 18+
                </div>
            </div>

        </div>
    );
};

export default Footer;
