'use client';
import { FC, useEffect, useState } from 'react';
import styles from './TabletNavBar.module.scss'
import * as Accordion from '@radix-ui/react-accordion';
import DesktopNavBar from '@/components/Header/Navbar/components/DesktopNavBar';

interface ITabletNavBarProps {
    navLinks:{}
}

const TabletNavBar: FC = () => {


    const [ isOpen, setIsOpen ] = useState( false );
    const [value, setValue] = useState(['']);

    const handleBurgerClick = () => {
        setIsOpen( !isOpen );
    };
    return (
        <>
            <Accordion.Root
                type={'multiple'}
                className={ styles.AccordionRoot }
                value={ value }
                onValueChange={ setValue }
            >
            <Accordion.Item
                value={'burgerMenu'}
                className={ styles.AccordionItem }
            >
                <Accordion.Header>
                    <Accordion.Trigger className={styles.AccordionTrigger}>
                        {/*Burger button*/}
                        <button
                                onClick={ handleBurgerClick }
                                className={ `${styles.burgerBtn} flex flex-col justify-center items-center` }>
                            <span className={ `bg-nch-50 block transition-all duration-300 ease-out 
                                            h-0.5 w-6 rounded-sm ${ isOpen ?
                                'rotate-45 translate-y-1' : '-translate-y-0.5'
                            }` }>
                            </span>
                            <span className={ `bg-nch-50 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${ isOpen ?
                                'opacity-0' : 'opacity-100'
                            }`} >
                            </span>
                            <span className={`bg-nch-50 block transition-all duration-300 ease-out
                                                        h-0.5 w-6 rounded-sm ${isOpen ?
                                '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                            }`}>
                            </span>
                        </button>
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                    className={ styles.AccordionContent }
                >
                    <div className={styles.accordionMenuWrapper}>
                        <DesktopNavBar isFromBurger={true} setAccordionValue={setValue} setBurgerIsOpen={setIsOpen}/>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
        </>
    );
};

export default TabletNavBar;
