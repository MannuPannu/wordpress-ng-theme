import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageItem } from '../../../classes/PageItem';

@Component({
    moduleId: module.id,
    selector: 'pager',
    templateUrl: 'pager.html',
})
export class PagerComponent implements OnInit { 
    //Paging options
    @Input()
    numberOfItems: number;
    @Input()
    itemsPerPage: number;
    @Input()
    public pageIndex: number = 1;

    @Output()
    pageClicked = new EventEmitter();

    private pages: PageItem[];
    private numberOfPages: number;

    constructor() { }

    ngOnInit(){
        this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
        this.pages = [];

        for(var i = 1; i <= this.numberOfPages; i++){
            this.pages.push(new PageItem(i, i == this.pageIndex  ? true : false));
        }
    }

    gotoPage(pageIndex: number){
        this.pageIndex = pageIndex;

        this.updatePages();
    }

    gotoNextPage(){
       this.pageIndex += 1; 
        this.updatePages();
    }

    gotoPreviousPage(){
        this.pageIndex -= 1;
        this.updatePages();
    }

    updatePages(){
        this.pages.map(p => {
            p.pageIndex == this.pageIndex ? p.isSelected = true : p.isSelected = false;
        });

        this.pageClicked.emit(this.pageIndex);
    }
}
