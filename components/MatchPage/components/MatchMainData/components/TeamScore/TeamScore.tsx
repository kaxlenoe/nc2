'use client';
import React, { FC } from 'react';
import cls from 'classnames';
import styles from './TeamScore.module.scss';

interface ITeamScoreProps {
    score: number;
    isWinner: boolean;
}

const TeamScore: FC<ITeamScoreProps> = ( { score, isWinner } ) => (
    <span
        className={ `
            ${ cls( { [ styles.winner ]: isWinner, [ styles.loser ]: !isWinner } ) }
        ` }>
    { score }
  </span>
);

export default TeamScore;
