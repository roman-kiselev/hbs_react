export interface IToLink {
    link: string;
    title: string;
}

export interface ICardLink {
    title: string;
    subtitle?: string;
    textCard: string;
    to: IToLink[];
}
