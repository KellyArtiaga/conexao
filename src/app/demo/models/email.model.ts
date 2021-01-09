export interface EmailPost {
    from?: string;
    to?: string[];
    subject?: string;
    text?: string;
    html?: string;
    header?: any;
    body?: any;
    footer?: any;
}
