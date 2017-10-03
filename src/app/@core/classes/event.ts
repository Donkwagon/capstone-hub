
export class Event {

    _id?: string;

    id: string;
    name: String;

    date: Date;
    dateTimestamp: Number;


    constructor(date) {
        this.date = date;
        this.dateTimestamp = date.getTime();
    }
}
