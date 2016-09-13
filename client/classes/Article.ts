export class Article {
    public data: any;
    public comments: any[]

    constructor(data: any, comments: any[]) {
        this.data = data;
        this.comments = comments; 
    }
}