
export class Message {

    _id?: string;

    from: string;
    to: String;
    content: String;
    attachments: any[];

    created_at: Date;

    constructor() {
    }
}
