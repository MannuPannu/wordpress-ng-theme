import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'menubar',
    templateUrl: 'menubar.html',
    styleUrls: ['menubar.css']
})
export class MenuBarComponent {

    mobileMenuOpen: boolean = false;

    public toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }
}