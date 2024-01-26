'use client';
import React, { useState } from 'react';
import * as Radix from '@radix-ui/react-select';
import { Dropdown, Item, SelTrigger, Viewport, Wrapper, } from './components/select';
import './GameDropdownHeader.scss';
import Chevron from './components/chevron';
import dotaIcon from 'public/icons/dota.svg';
import lolIcon from 'public/icons/legends.svg';
import { usePathname, useRouter } from 'next/navigation';

import csgoIcon from 'public/icons/cs-go.svg';
import logo from 'public/icons/logoNew.svg';
import Image from 'next/image';

const items = [
    { id: 'allGames', text: 'All games' },
    { id: 'csgo', text: 'CS:GO' },
    { id: 'dota2', text: 'Dota 2' },
    { id: 'lol', text: 'League of Legends' },
];

const imageMap = {
    allGames: logo,
    lol: lolIcon,
    dota2: dotaIcon,
    csgo: csgoIcon,
};

const error = null;

const GameDropdownHeader = () => {
    const [ toggled, setToggled ] = useState( 'closed' );
    const [ selectedValue, setSelectedValue ] = useState( 'All games' );

    const router = useRouter();
    const pathname = usePathname();

    const getCorrectDefaultValue = () => {
        if ( pathname.includes( 'league-of-legends' ) ) return 'League of Legends';
        if ( pathname.includes( 'counter-strike' ) ) return 'CS:GO';
        if ( pathname.includes( 'dota-2' ) ) return 'Dota 2';
        return 'All games';
    };

    const getCurrentTaxonomy = () => {
        if ( pathname.includes( '/matches' ) ) return '/matches';
        if ( pathname.includes( '/tournaments' ) ) return '/tournaments';
        return '/matches';
    }

    const getCorrectId = ( name: string ) => {
        if ( name === 'League of Legends' ) return 'lol';
        if ( name === 'CS:GO' ) return 'csgo';
        if ( name === 'Dota 2' ) return 'dota2';
        return 'allGames';
    };

    const handleChange = ( value: string ) => {
        switch ( value ) {
            case 'All games':
                router.push( getCurrentTaxonomy());
                break;
            case 'CS:GO':
                router.push( `${ getCurrentTaxonomy() }/counter-strike`);
                break;
            case 'Dota 2':
                router.push( `${ getCurrentTaxonomy() }/dota-2`);
                break;
            case 'League of Legends':
                router.push( `${ getCurrentTaxonomy() }/league-of-legends`);
                break;
        }
    };
    return (
        <div
            style={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            } }
        >
            <form style={ { width: '100%', maxWidth: 420 } }>
                <Wrapper className={ 'Wrapper' }>
                    <Radix.Root
                        dir="ltr"
                        onOpenChange={ ( e ) => setToggled( e === true ? 'open' : 'closed' ) }
                        onValueChange={ ( value ) => {
                            handleChange( value );
                            setSelectedValue( value ); // Updating the state when value changes
                        } }
                        value={ getCorrectDefaultValue() }
                    >
                        <Radix.Trigger asChild data-state={ toggled } className={ 'DropdownTrigger' }>
                            <SelTrigger error={ !!error }>
                <span style={ { display: 'flex', alignItems: 'center' } }>
                  <Image
                      //@ts-ignore
                      src={ imageMap[ getCorrectId( getCorrectDefaultValue() ) ] }
                      width={ 16 }
                      height={ 16 }
                      priority
                      alt={ 'icon' }
                      style={ { marginRight: '10px' } }
                  />
                  <Radix.Value>{ getCorrectDefaultValue() }</Radix.Value>
                </span>
                                <Radix.Icon asChild>
                                    <Chevron direction="down"/>
                                </Radix.Icon>
                            </SelTrigger>
                        </Radix.Trigger>
                        <Radix.Content asChild position={ 'popper' } alignOffset={ 5 }>
                            <Dropdown>
                                <Viewport>
                                    { items.map( ( item, i ) => {
                                        return (
                                            <Item
                                                key={ i }
                                                value={ item.text }
                                                style={ { display: 'flex', alignItems: 'center', gap: '.5em' }
                                                }
                                            >
                                                <Image
                                                    //@ts-ignore
                                                    src={ imageMap[ item.id ] }
                                                    width={ 16 }
                                                    height={ 16 }
                                                    priority
                                                    alt={ 'icon' }
                                                    style={ { marginRight: '5px' } }
                                                />
                                                <Radix.ItemText> { item.text } </Radix.ItemText>
                                            </Item>
                                        );
                                    } ) }
                                </Viewport>
                            </Dropdown>
                        </Radix.Content>
                    </Radix.Root>
                </Wrapper>
            </form>
        </div>
    );
};

export default GameDropdownHeader;
