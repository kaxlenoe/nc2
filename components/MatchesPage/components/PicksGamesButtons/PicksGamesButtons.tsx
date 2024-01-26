'use client';

import styles from './PicksGamesButtons.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import csgoIcon from "public/icons/cs-go.svg";
import dotaIcon from "public/icons/dota.svg";
import lolIcon from "public/icons/legends.svg";
import React from 'react';
import { revalidatePath } from 'next/cache';
import { chevronRightIcon } from '@/constants/StaticIcons';

interface GamesButtonsProps {
    isMatches: boolean;
}
// Enum-like structure for games
const GAMES = [
    { name: 'Counter-Strike', slug: 'counter-strike', icon: csgoIcon },
    { name: 'Dota 2', slug: 'dota-2', icon: dotaIcon },
    { name: 'League of Legends', slug: 'league-of-legends', icon: lolIcon },
];

const PicksGamesButtons:React.FC<GamesButtonsProps> = ({ isMatches }) => {
    return (
        <div className={styles.gamesButtonsWidget}>
            <div className={styles.gamesButtonsWrapper}>
            {GAMES.map((game, index) => (
                <Link key={index} className={styles.gameLogoLink} href={`/picks/${game.slug}`}>
                    <div  className={styles.gameLogo}>
                            <Image src={game.icon} width={24} height={24} alt={`${game.name} icon`} />
                    </div>
                </Link>
            ))}
                {!isMatches ? (
                        <Link href={ '/picks' } className={ styles.allGamesBtn }
                              onClick={ () => revalidatePath( '/picks' ) }>
                            All picks <Image src={ chevronRightIcon.src } alt={ '' } width={ 10 } height={ 10 }/>
                        </Link>
                ) : null}
            </div>
        </div>
    );
};

export default PicksGamesButtons;
