'use client';
import React, { memo, useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/scss/pagination';
import styles from './FreeBetsPromotions.module.scss';
import cls from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '../Breadcrumbs';
import { chevronRightIcon } from '@/constants/StaticIcons'
import { lightenHexColor } from '@/utils/helpers';

// @ts-ignore
export const FreeBetsPromotions = ( { defaultBonusesData } ) => {
    const [ activeFilter, setActiveFilter ] = useState<string>( 'deposit' );
    const searchParams = useSearchParams();

    useEffect( () => {
        const filter = searchParams.get( 'filter' );
        if ( filter ) {
            setActiveFilter( filter );
        }
    }, [] );
    const router = useRouter();
    const handleFilterClick = ( filterType: string ) => {
        setActiveFilter( filterType );
        router.replace( `?filter=${ filterType.toLowerCase() }`);
    };

    const getOfferSportbookLogo = ( item: any ) => item.attributes.sportbook_logo.data.attributes.url
    const getOfferBackgroundImage = ( item: any ) => item.attributes.background_image.data.attributes.url
    const getOfferText = ( item: any ) => item.attributes.text
    const getOfferUri = ( item: any ) => item.attributes.uri
    const getOfferButtonText = ( item: any ) => item.attributes.button_text
    const getOfferButtonColor = ( item: any ) => item.attributes?.button_color || '#195685'

    const [ isBtnHovered, setBtnHovered ] = useState( false );
    return (
        <>
            <Breadcrumbs current_item_heading={ 'Free Bets & Promotions' }/>
            <div className={ 'select-none' }>
                <h1 className={ styles.title }>Free Bets & Promotions</h1>
                <h2 className={ styles.description }>
                    Exclusive Deals, Bonuses, and Offers from Top Bookies. Maximize Your
                    Winnings with Unbeatable Promotions.
                </h2>

                <div className={ styles.offersFilter }>
                    <div
                        className={ cls( styles.filterButton, {
                            [ styles.active ]: activeFilter === 'deposit',
                        } ) }
                        onClick={ () => {
                            handleFilterClick( 'deposit' );
                        } }
                    >
                        Deposit bonus
                    </div>
                    <div
                        className={ cls( styles.filterButton, {
                            [ styles.active ]: activeFilter === 'vip',
                        } ) }
                        onClick={ () => {
                            handleFilterClick( 'vip' );
                        } }
                    >
                        VIP Bonus
                    </div>
                </div>

                <div className="flex gap-[24px] flex-wrap mb-[40px]">
                    { defaultBonusesData
                        ?.filter(
                            ( item: { attributes: { category: string } } ) =>
                                item.attributes.category === activeFilter,
                        )
                        .map( ( item: any, index: number ) => (
                            <a

                                href={ getOfferUri( item ) }
                                target={ '_blank' }
                                className={ styles.bonusCard } key={ index }
                            >
                                <img src={ getOfferBackgroundImage( item ) } alt={ '' }
                                     className={ styles.bonusCardBackground }/>
                                <div className={ styles.bonusCardLogo }>
                                    <img src={ getOfferSportbookLogo( item ) } alt={ '' }/>
                                </div>
                                <div className={ styles.bonusCardText }>
                                    { getOfferText( item ) }
                                </div>
                                <div className={ styles.bonusCardButtons }>
                                    <div
                                        className={ styles.bonusCardButton }
                                        style={ {
                                            backgroundColor: `${ isBtnHovered ? lightenHexColor( getOfferButtonColor( item ), 5 ) : getOfferButtonColor( item ) }`,
                                        } }
                                        onMouseEnter={ () => setBtnHovered( true ) }
                                        onMouseLeave={ () => setBtnHovered( false ) }
                                    >

                                        { getOfferButtonText( item ) }
                                    </div>
                                    <div
                                        className={ styles.bonusCardLearnMore }>
                                        <span>Learn more</span>
                                        <img src={ chevronRightIcon.src } alt=""/>
                                    </div>
                                </div>
                            </a>
                        ) ) }
                </div>
            </div>
        </>
    );
};

export default memo( FreeBetsPromotions );
