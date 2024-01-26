import React, { useState } from 'react';
import styles from './PromoSideBanner.module.scss';
import { chevronRightIcon } from '@/constants/StaticIcons';
import { lightenHexColor } from '@/utils/helpers'; // Adjust the path to your CSS module
import useWindowSize from '@/hooks/useWindowSize';
// @ts-ignore
const PromoSideBanner = ( { sidebarLandingData } ) => {

    const [ isBtnHovered, setBtnHovered ] = useState( false );
    const { isMobile, isTablet } = useWindowSize();

    let background_image_url = sidebarLandingData?.[ 0 ].attributes?.background_image?.data?.attributes?.url || '';
    let sportbook_logo_url = sidebarLandingData?.[ 0 ].attributes?.sportbook_logo?.data?.attributes?.url
    let banner_url = sidebarLandingData?.[ 0 ].attributes?.uri || '';
    let banner_text = sidebarLandingData?.[ 0 ].attributes?.text || '';
    let button_text = sidebarLandingData?.[ 0 ].attributes?.button_text || 'Claim offer';
    let button_color = sidebarLandingData?.[ 0 ].attributes?.button_color || 'transparent';
    let button_hover_color = lightenHexColor( button_color, 5 );
    const linearMobileOverlay = `
        linear-gradient(90deg, rgba(3,11,13,0.3642533936651584) 0%, rgba(3,11,13,0) 85%, rgba(3,11,13,0) 100%),
    `;
    return (
        <a
            href={ sidebarLandingData?.[ 0 ]?.attributes?.uri || '' }
            target={ '_blank' }
            className={ styles.sidebar_promo_wrapper }
            style={ {
                backgroundImage: `${ ( isMobile || isTablet ) ? `${linearMobileOverlay},` : ''} url(${ background_image_url })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            } }
        >
            <div className={ styles.card_top }>
                <img src={ sportbook_logo_url } alt=""/>
                <p className={ styles.promoTitle }>
                    { banner_text }
                </p>
            </div>
            <div className={ styles.promoButtons }>
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
                    <img src={ chevronRightIcon.src }/>
                </div>
            </div>
        </a>
    );
};

export default PromoSideBanner;
