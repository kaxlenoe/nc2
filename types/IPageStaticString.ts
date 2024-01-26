interface IPageStaticString {
    id: number;
    alias: string;
    text: string | null;
    html: string | null;
    [key: string]: number | string | null;
}