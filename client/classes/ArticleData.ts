export class ArticleData {
    id: number;
    title: string;
    slug: string;
    createDate: any;
    authorName: string;
    authorUrl: string;
    content: string;

    constructor(id:number, title:string, slug:string, createDate:string, authorName:string, authorUrl:string, content:string) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.createDate = moment(createDate);
        this.authorName = authorName;
        this.authorUrl = authorUrl;
        this.content = content;
    }
}