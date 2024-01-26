'use client';
import styles from './Roster.module.scss';
/*import { Tooltip } from "@/components/Tooltip";*/
import { IMatch } from '@/types/games';
import cls from 'classnames';
import { FC, useState } from 'react';
import Flag from 'react-world-flags';
import { notFoundIcon } from '@/constants/StaticIcons';

interface RosterProps {
    showContent?: boolean;
    match: IMatch;
}

const Roster: FC<RosterProps> = ( { showContent, match } ) => {
    const matchGame = match?.games?.[ 0 ];

    const team1 = matchGame?.teams?.[ 0 ];
    const team2 = matchGame?.teams?.[ 1 ];
    const team1Players = matchGame?.players?.filter(
        ( f ) => f.teamId === team1?.teamId,
    );
    const team2Players = matchGame?.players?.filter(
        ( f ) => f.teamId === team2?.teamId,
    );

    const [ countryTooltip, setCountryTooltip ] = useState( false );
    const [ countryTooltipTarget, setCountryTooltipTarget ] =
        useState<HTMLDivElement | null>( null );
    const [ countryTooltipText, setCountryTooltipText ] = useState<string>( '' );

    const countryFlag = ( nationality: string ) => {

        return (
            <Flag
                code={ nationality }
                fallback={
                    <div
                        className={ cls( styles.flag, styles.blank ) }
                    />
                }
                className={ styles.flag }
                height="16"
                width="24"
            />
        );
    };

    const regionNames = new Intl.DisplayNames( [ 'en' ], { type: 'region' } );
    const team1Logo = matchGame?.teams?.[ 0 ]?.logo || notFoundIcon.src;
    const team2Logo = matchGame?.teams?.[ 1 ]?.logo || notFoundIcon.src;
    const team1Name = matchGame?.teams?.[ 0 ]?.name || 'Team 1';
    const team2Name = matchGame?.teams?.[ 1 ]?.name || 'Team 2';
    return (
        <div className={ styles.wrapper }>
            {/*Team names*/ }
            <div className={ styles.teams }>
                <div className={ styles.team }>
                    <img
                        src={ team1Logo }
                        alt={ team1Name }
                    />
                    <span>
                        { team1Name }
                    </span>
                </div>
                <div className={ `${ styles.team } ${ styles.team_away }` }>
                    <span>
                        { team2Name }
                    </span>
                    <img
                        src={ team2Logo }
                        alt={ team2Name }
                    />
                </div>
            </div>
            {/*Player names*/ }
            <div className={ styles.players }>
                <div className={ styles.team1players }>
                    { team1Players && team1Players.length ? (
                        team1Players.slice( 0, 5 ).map( ( { nickName, avatar, nationality }, i ) => (
                            <div className={ styles.player } key={ i }>
                                <span>{ countryFlag( nationality ) }</span>
                                <span className={ styles.player_nickname }>{ nickName }</span>
                            </div>
                        ) )
                    ) : null }
                </div>
                <div className={ styles.team2players }>
                    { team2Players && team2Players.length ? (
                        team2Players.slice( 0, 5 ).map( ( { nickName, avatar, nationality }, i ) => (
                            <div className={ `${ styles.player } ${ styles.player_away }` } key={ i }>
                                <span>{ countryFlag( nationality ) }</span>
                                <span className={ styles.player_nickname }>{ nickName }</span>
                            </div>
                        ) )
                    ) : null }
                </div>

                <div className={ styles.vs }>VS</div>
            </div>
        </div>
    );
};

export default Roster;
