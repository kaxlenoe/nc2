export interface IMatchStreamInfo {
    main: boolean;
    raw_url: string;
    language: string;
    official: boolean;
    embed_url: string;
    [key: string]:  boolean | number | string | null;
}