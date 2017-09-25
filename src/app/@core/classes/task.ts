
export class Task {
    
    _id?: string;

    members: any[];

    title: String;
    info: String;

    subTasks: Task[];

    completion: Boolean;

    dependency: any;
    
    links: any[];

    duration: Number;

    due_at: Date;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.members = [];
        this.title = "";
        this.info = "";
        this.subTasks = [];
        this.completion = false;
        this.dependency = null;
        this.links = [];
        this.duration = 0;
        this.due_at = null;
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