
export class Task {

    _id?: string;

    id: string;

    members: any[];

    title: String;
    info: String;

    subTasks: Task[];
    completion: Boolean;
    dependency: any;
    links: any[];

    duration: Number;

    due_at: Date;
    created_at: any;
    updated_at: Date;

    startTimestamp: Number;
    dueTimestamp: Number;

    constructor() {
        this.members = [];
        this.id = '';
        this.title = '';
        this.info = '';
        this.subTasks = [];
        this.completion = false;
        this.dependency = null;
        this.links = [];
        this.duration = 0;
        this.due_at = null;
        const today = new Date();
        const dd = today.toISOString().slice(0, 10);
        this.created_at = dd;
    }

    // public validate = () =>{
    //     var errors = [];
    //     this.users ? errors.push("please enter assigned member") : 0;
    //     this.title ? errors.push("please enter title") : 0;
    //     this.info ? errors.push("please enter task info") : 0;
    //     this.duration ? errors.push("please enter ") : 0;

    //     if(errors){
    //         return errors;
    //     }else{
    //         return true; //pass
    //     }
    // }
}
