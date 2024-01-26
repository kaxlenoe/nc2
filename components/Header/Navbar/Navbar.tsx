'use client';
import styles from './Navbar.module.scss';

import { FC } from 'react';
import { navLinks } from '@/utils/constants';
import useWindowSize from '@/hooks/useWindowSize';
import TabletNavBar from '@/components/Header/Navbar/components/TabletNavBar';
import DesktopNavBar from '@/components/Header/Navbar/components/DesktopNavBar';
import MobileNavBar from '@/components/Header/Navbar/components/MobileNavBar';

const Navbar: FC = () => {

    const { isMobile, isDesktop, isLaptop, isTablet } = useWindowSize();

    return (
        <>
            { isMobile && <MobileNavBar /> }
            { isTablet && <TabletNavBar /> }
            { (isDesktop || isLaptop) && <DesktopNavBar /> }
        </>
    );
};

export default Navbar;
