export class Task {
    constructor(
        public id: string, 
        public content: string, 
        public date: string,
        public isChecked: boolean ,
        public _id?: string
    ) {}
}