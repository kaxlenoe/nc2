import React from 'react';
import Image from 'next/image';
import styles from './Tournaments.module.scss';
import { chevronRightIcon, notFoundIcon } from '@/constants/StaticIcons';
import csgoIcon from 'public/icons/cs-go.svg';
import dotaIcon from 'public/icons/dota.svg';
import lolIcon from 'public/icons/legends.svg';
import { useRouter } from 'next/navigation';
import { removeSpaces } from '@/utils/helpers';

// @ts-ignore
const Tournaments = ( { dataTournaments } ) => {
    const imageMap = {
        lol: lolIcon,
        dota2: dotaIcon,
        csgo: csgoIcon,
    };

    const createLink = ( item: { esportCode: string; id: any; name: string } ) => {
        if ( item.esportCode === 'csgo' ) {
            return `/tournaments/counter-strike/${ removeSpaces( item.name ) }-${
                item.id
            }`;
        }
        else if ( item.esportCode === 'dota2' ) {
            return `/tournaments/dota-2/${ removeSpaces( item.name ) }-${ item.id }`;
        }
        else if ( item.esportCode === 'lol' ) {
            return `/tournaments/league-of-legends/${ removeSpaces( item.name ) }-${
                item.id
            }`;
        }
    };

    const router = useRouter();

    const handleClick = ( item: { esportCode: string; id: any; name: string } ) => {
        // @ts-ignore
        router.push( createLink( item ) );
    };

    if ( !dataTournaments ) return null;
    return (
        <div>
            <div className={ styles.tournamentsWrapper }>
                <p className={ styles.tournamentsTitle }>Tournaments</p>
                <div className={ styles.tournamentsFeed }>
                    { dataTournaments.map( ( item: any, index: number ) => {
                        return (
                            <div
                                className={ styles.tournamentCard }
                                key={ index }
                                onClick={ () => handleClick( item ) }
                            >
                                <img
                                    src={ item.logo || notFoundIcon.src }
                                    alt={ item.logo || 'logo' }
                                    className={ styles.tournamentLogo }
                                />
                                <span className={ styles.tournamentName }>{ item.name }</span>
                                <Image
                                    // @ts-ignore
                                    src={ imageMap[ item.esportCode ] }
                                    width={ 16 }
                                    height={ 16 }
                                    priority
                                    alt={ 'icon' }
                                    className={ styles.esportIcon }
                                />
                                <Image
                                    src={ chevronRightIcon.src }
                                    width={ 16 }
                                    height={ 16 }
                                    priority
                                    alt={ 'icon' }
                                    className={ styles.chevronIcon }
                                />
                            </div>
                        );
                    } ) }
                </div>
            </div>
        </div>
    );
};

export default Tournaments;
