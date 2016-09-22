export class Comment {
    createdDate: any;

    replyFormIsOpened: boolean;

    constructor(public id: number, 
                public articleId:number, 
                createdDate:string, 
                public authorName:string, 
                public authorEmail: string, 
                public authorUrl:string, 
                public content:string, 
                public childs:Comment[]) {
                    
        this.createdDate = moment(createdDate);

        this.replyFormIsOpened = false; //Default
    }
}