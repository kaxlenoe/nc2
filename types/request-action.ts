export interface IAction {
    url: string
    method?: string
    data?: any
    query?: any
    timeout?: number
    contentType?: string
}

export interface IRequestParams {
    page?: number
    take?: number
    status?: string
    order?: string
    query?: string
    leagueId?: string
    beginAtMin?: string
    beginAtMax?: string
}

export type SectionName = 'all-games' | 'cs-go' | 'dota' | 'league-of-legends'
