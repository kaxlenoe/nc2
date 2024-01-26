'use client'
import { Pagination } from 'swiper/modules';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@/components/MatchesPage/MatchesPage.module.scss';
import { useRouter } from 'next/navigation';
import { chevronRightIcon } from '@/constants/StaticIcons';
import { lightenHexColor, openInNewTab } from '@/utils/helpers';

const SpecialOffers = ( { specialOffers }: any ) => {
    const router = useRouter();
    const [ isBtnHovered, setBtnHovered ] = useState( false );

    return (
        <Swiper
            className={ 'swiper-landing' }
            pagination={ {
                clickable: true,
            } }
            modules={ [ Pagination ] }
        >
            { specialOffers?.map(
                (
                    item: any,
                    index: React.Key | null | undefined,
                ) => {
                    let background_image_url = item.attributes?.background_image?.data?.attributes?.url || '';
                    let sportbook_logo_url = item.attributes?.sportbook_logo?.data?.attributes?.url
                    let banner_url = item.attributes?.uri || '';
                    let banner_text = item.attributes?.text || '';
                    let button_text = item.attributes?.button_text || 'Claim offer';
                    let button_color = item.attributes?.button_color || 'transparent';
                    let button_hover_color = lightenHexColor( button_color, 5 );
                    return (
                        <SwiperSlide key={ index }>
                            <div
                                className={ styles.promo }
                                style={ {
                                    backgroundImage: `url(${ background_image_url })`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                } }
                                onClick={ () => {openInNewTab( banner_url )} }
                            >
                                <p className={ styles.promoText }>{ banner_text }</p>
                                <img
                                    className={ styles.sportbookLogo }
                                    src={ sportbook_logo_url }
                                />
                                <div
                                    className={ styles.promoButton }
                                    style={ { backgroundColor: isBtnHovered ? button_hover_color : button_color } }
                                    onMouseEnter={ () => setBtnHovered( true ) }
                                    onMouseLeave={ () => setBtnHovered( false ) }
                                >
                                    { button_text }
                                </div>
                                <div className={ styles.promoLearnMore }>
                                    Learn more
                                    <img src={ chevronRightIcon.src } />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                },
            ) }
        </Swiper>
    );
};

export default SpecialOffers;
