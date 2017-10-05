
export class Event {

    _id?: string;

    id: string;
    name: String;
    info: String;

    date: Date;
    dateTimestamp: Number;
    created_at: any;


    constructor(date) {
        if (date) {
            this.date = date;
            this.dateTimestamp = date.getTime();
        }
        const today = new Date();
        const dd = today.toISOString().slice(0, 10);
        this.created_at = dd;
    }
}
