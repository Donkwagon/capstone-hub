
export class Message {

    _id?: string;

    entity: any;

    from: string;
    to: String;
    content: String;
    attachments: any[];

    created_at: Date;

    constructor() {
    }
}
