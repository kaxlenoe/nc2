interface IEsportSlugs{
    [key: string]: string;
}
export const ESPORTS_SLUG_BY_CODE:IEsportSlugs = {
    csgo: 'counter-strike',
    dota2: 'dota-2',
    lol: 'league-of-legends',

}
export const ESPORTS_READABLE_BY_CODE = {
    csgo: 'CS:GO, CS:2',
    dota2: 'Dota 2',
    lol: 'League of Legends',
}
