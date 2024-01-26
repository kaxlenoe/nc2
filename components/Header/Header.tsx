import { FC, memo } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/icons/logoNew.svg';
import { paths } from '@/utils/constants';
import { Navbar } from '@/components/Header/Navbar';
import { GameDropdownHeader } from '@/components/Header/GameDropdownHeader';

const Header: FC = () => {
    return (
        <article className={ styles.headerWrapper }>
            <div className={ styles.headerContainer }>
                <header className={ styles.header }>
                    <Link href={ paths.root } className={ styles.logoLink }>
                        <Image
                            src={ logo }
                            width={ 32 }
                            height={ 32 }
                            alt="Neon cheese logo"
                            priority
                        />
                        <span className={ styles.logoText }>
              <span>Neon</span>
              <span>Cheese</span>
            </span>
                    </Link>
                    <GameDropdownHeader/>
                    <Navbar/>
                </header>
            </div>
        </article>
    );
};

export default memo( Header );
