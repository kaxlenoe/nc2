import allIcon from 'public/icons/all.svg';

import csgoIcon from 'public/icons/cs-go-menu.svg';
import dotaIcon from 'public/icons/dota-menu.svg';
import instagramIcon from 'public/icons/instagram.svg';
import legendsIcon from 'public/icons/legends-menu.svg';
import star1Icon from 'public/icons/star-1.svg';
import star2Icon from 'public/icons/star-2.svg';
import twitterIcon from 'public/icons/twitter.svg';

import oneXBetLogo from 'public/icons/bets/1xbet-logo.jpeg';
import onexbeticon from 'public/icons/bets/1xbet-logo.jpeg';

import cloudBetLogo from 'public/icons/bets/cloudbet-logo.svg';
import cloudbetIcon from 'public/icons/bets/cloudbet-logo.svg';

import rooBetLogo from 'public/icons/bets/roobet-logo.svg';
import uniBetLogo from 'public/icons/bets/unibet.svg';
import unibeticon from 'public/icons/bets/unibet.svg';
import vaveLogo from 'public/icons/bets/vave.svg';
import vaveBetLogo from 'public/icons/bets/vave.svg';
import twentybeticon from 'public/icons/bets/20bet.png';
import betWayBetLogo from 'public/icons/bets/bet-way-logo.jpeg';
import thunderpickLogo from 'public/icons/bets/thunderpick-logo.png';
import vBetLogo from 'public/icons/bets/vbet.svg';

import {
    mobileNavFreeBetsIcon,
    mobileNavHomeIcon,
    mobileNavMatchesIcon,
    mobileNavPicksIcon,
    mobileNavTournamentsIcon
} from '@/constants/StaticIcons';

// TODO: Refactor to env variables
// export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const GOOGLE_ANALYTICS_ID = 'G-9XCS01VENW';
export const games = {
    csgo: 'cs-go',
    dota: 'dota',
    legends: 'league-of-legends',
    allGames: 'all-games',
} as const;

export const paths = {
    root: '/',
    matches: '/matches',
    tournaments: '/tournaments',
    picks: '/picks',
    promotions: '/free-bets-promotions',
    blog: '/blog',
    faq: '/faq',
} as const;

export const navLinks = [
    {
        id: 'matches',
        label: 'Matches',
        url: paths.matches,
        path: 'matches',
    },
    {
        id: 'tournaments',
        label: 'Tournaments',
        url: paths.tournaments,
    },
    {
        id: 'picks',
        label: 'Picks',
        url: paths.picks,
    },
    {
        id: 'promotions',
        label: 'Free Bets & Promotions ',
        url: paths.promotions,
    },
    {
        id: 'blog',
        label: 'Blog',
        url: paths.blog,
    },
    {
        id: 'faq',
        label: 'F.A.Q.',
        url: paths.faq,
    },
] as const;
export const mobileNavLinks = [
    {
        id: 'matches',
        label: 'Matches',
        url: paths.matches,
        path: 'matches',
        icon: mobileNavMatchesIcon,
    },
    {
        id: 'tournaments',
        label: 'Tournam.',
        url: paths.tournaments,
        icon: mobileNavTournamentsIcon,
    },
    {
        id: 'home',
        label: 'Home',
        url: paths.root,
        icon: mobileNavHomeIcon,
    },
    {
        id: 'picks',
        label: 'Picks',
        url: paths.picks,
        icon: mobileNavPicksIcon,
    },
    {
        id: 'promotions',
        label: 'Free Bets',
        url: paths.promotions,
        icon: mobileNavFreeBetsIcon,
    }
] as const;

export const allGamesId = 'all-games';

export const navGamesLinks = [
    {
        id: games.allGames,
        icon: allIcon,
    },
    {
        id: games.csgo,
        icon: csgoIcon,
    },
    {
        id: games.dota,
        icon: dotaIcon,
    },
    {
        id: games.legends,
        icon: legendsIcon,
    },
];

export const buttonMediumVariants = {
    primary: 'primary',
    secondary: 'secondary',
    left: 'left',
    right: 'right',
};

export const buttonLargeVariants = {
    primary: 'primary',
    secondary: 'secondary',
};

export const viewTypes = {
    column: 'columns',
    row: 'rows',
};

export const breakpoints = {
    mediaXs: 400,
    mediaSm: 640,
    mediaTablet: 768,
    mediaLaptop: 1024,
    mediaMd: 1240,
    mediaLg: 1366,
    mediaXl: 1440,
};

export const matchStatuses = {
    past: 'PAST',
    running: 'RUNNING',
    upcoming: 'UPCOMING',
};

export const contentTypes = {
    matches: 'matches',
    ai_predictions: 'ai_predictions',
    results: 'results',
    picks: 'picks',
    deals_bonuses: 'deals_bonuses',
};

export const matchPageTabs = [
    {
        id: 'match',
        label: 'Match',
    },
    {
        id: 'prediction',
        label: 'Prediction',
    },
    {
        id: 'odds',
        label: 'Odds',
    },
];

export const csGoMaps = {
    overpass: 'Overpass',
    dust: 'Dust 2',
    ancient: 'Ancient',
    mirage: 'Mirage',
    nuke: 'Nuke',
    inferno: 'Inferno',
};

export const betTypeFilters = [
    {
        value: 'winner',
        label: 'Match Winner',
    },
    {
        value: 'handicap',
        label: 'Match Handicap',
    },
    {
        value: 'total-played',
        label: 'Total Maps Played',
    },
];

export const bookNames = {
    cloudbet: 'cloudbet',
};

export const bookList = {
    cloudbet: {
        name: bookNames.cloudbet,
        offerLink: `https://cloudbet.com/en/bitcoin-bonus?af_token=${ process.env.CLOUDBET_TOKEN }`,
    },
};

export const singleBetData = {
    label: 'Special Offers',
    icon: cloudBetLogo,
    background: '#121212',
};

export const mapStatsFlagsDota = [
    {
        id: 1,
        icon: star1Icon,
        label: 'FB',
        title: 'First Blood',
        stat: 'firstBlood',
    },
    {
        id: 3,
        icon: star2Icon,
        label: 'T1',
        title: 'First Tower',
        stat: 'firstTower',
    },
    {
        id: 4,
        icon: star1Icon,
        label: 'R',
        title: 'First Roshan',
        stat: 'firstRoshan',
    },
];

export const mapStatsFlagsLol = [
    {
        id: 1,
        icon: star1Icon,
        label: 'FB',
        title: 'First Blood',
        stat: 'firstBlood',
    },
    {
        id: 2,
        icon: star1Icon,
        label: 'FI',
        title: 'First Inhibitor',
        stat: 'firstInhibitor',
    },
    {
        id: 3,
        icon: star2Icon,
        label: 'FB',
        title: 'First Baron',
        stat: 'firstBaron',
    },
];

export const footerLinks = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/NeonCheeseAI',
        icon: twitterIcon,
    },
    {
        name: 'Instagram',
        href: '',
        icon: instagramIcon,
    },
];

export const betsList = [
    {
        id: 1,
        provider: 'cloudbet',
        link: 'https://www.cloudbet.com/en/landing/bitcoin-bonus/?af_token=723f264588e85f662cb14f4cc8be2780',
        label: 'Special Offers',
        icon: cloudBetLogo,
        backgroundColor: '#000',
        title: 'Cloudbet',
    },
    {
        id: 2,
        link: 'https://thunderpick.io?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142',
        provider: 'thunderpick',
        label: 'Special Offers',
        icon: thunderpickLogo,
        backgroundColor: '#222a33',
        title: 'Thunderpick',
        noPadding: true,
    },
    {
        id: 3,
        provider: 'parimatch',
        link: 'https://global.parimatch.com/',
        label: 'Special Offers',
        icon: rooBetLogo,
        backgroundColor: '#000',
        title: 'Parimatch',
    },
    {
        id: 4,
        provider: 'Unibet',
        link: 'https://www.unibet.com/',
        label: 'Special Offers',
        icon: uniBetLogo,
        backgroundColor: '#151922',
        title: 'Unibet',
        noPadding: true,
    },
    {
        id: 5,
        link: 'https://1xbet.com/',
        provider: '1xbet',
        label: 'Special Offers',
        icon: oneXBetLogo,
        backgroundColor: '#195685',
        title: '1XBet',
        noPadding: true,
    },
    {
        id: 6,
        link: 'https://top.moxtop.com/redirect.aspx?pid=22723&bid=1481&lpid=210',
        provider: 'Vave',
        label: 'Special Offers',
        icon: vaveLogo,
        backgroundColor: '#303E47',
        title: 'Vave',
        noPadding: true,
    },
    {
        id: 7,
        link: 'https://www.vbet.com',
        provider: 'vbet',
        label: 'Special Offers',
        icon: vBetLogo,
        backgroundColor: '#000C24',
        title: 'vbet',
        noPadding: true,
    },
    {
        id: 8,
        link: 'https://betway.com/',
        provider: 'betway',
        label: 'Special Offers',
        icon: betWayBetLogo,
        backgroundColor: '#000',
        title: 'BetWay',
        noPadding: true,
    },
];

export const bestOddsLogos = {
    cloudbet: {
        icon: cloudbetIcon,
        link: 'https://cldbt.cloud/go/en/bitcoin-bonus?af_token=723f264588e85f662cb14f4cc8be2780&aftm_content=match_feed',
    },
    thunderpick: {
        icon: thunderpickLogo,
        link: 'https://thunderpick.io?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142',
    },
    nitrobetting: {
        icon: null,
        link: 'https://nitrobetting.com/',
    },
    Unibet: {
        icon: unibeticon,
        link: 'https://www.unibet.com/',
    },
    '20bet': {
        icon: twentybeticon,
        link: 'https://www.20bet.com/',
    },
    '1xbet': {
        icon: onexbeticon,
        link: 'https://www.1xbet.com/',
    },
    Vave: {
        icon: vaveBetLogo,
        link: 'https://top.moxtop.com/redirect.aspx?pid=22723&bid=1481&lpid=210',
    },
    Vbet: {
        icon: vBetLogo,
        link: 'https://www.vbet.com',
    },
    betway: {
        icon: betWayBetLogo,
        link: 'https://betway.com/',
    },
};
