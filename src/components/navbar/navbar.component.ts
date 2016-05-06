import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { DropdownToggleDirective, DropdownDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'navbar',
    template: `
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a (click)="goHome()" class="navbar-brand">
                        Cloud-Deployment-System
                    </a>
                </div>
                <div  id="navbar" class="collapse navbar-collapse" *ngIf="showMenu()">   
                    <ul class="nav navbar-nav navbar-right">
                        <li dropdown keyboardNav="true">
                            <a id="apps" href="" dropdownToggle>
                                <i class="fa fa-database" aria-hidden="true"></i><span class="visible-xs-inline-block">Apps</span></a>
                            <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
                                <li>
                                    <a [routerLink]="['Owners']">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                        Owners
                                    </a>
                                </li>
                                <li>
                                    <a [routerLink]="['Instancetypes']">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                        Instance Types
                                    </a>
                                </li>
                                <li>
                                    <a [routerLink]="['Instances']">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                        Instances
                                    </a>
                                </li>
                            </ul>
                        </li>
                        
                        <li dropdown keyboardNav="true">   
                            <a href="" id="user" dropdownToggle>
                                <i class="fa fa-cogs" aria-hidden="true"></i></a> 
                            <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
                                <li>
                                    <a  [routerLink]="['OwnerDetails', {id: id}]">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                        Profile
                                    </a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a (click)="logout()" id="logout">
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> 
    `,
    styles: [`
        
    `],
    directives: [DropdownToggleDirective, DropdownDirective]
})
export class NavbarComponent implements OnInit {
    
    token: string;
    id: string;
    @Output('logout') logoutApp = new EventEmitter();;
    
    constructor(private router: Router) { }

    ngOnInit() { 
        this.id = JSON.parse(localStorage.getItem('profile')).username;
    }
    
    showMenu(): boolean {
        return localStorage.getItem('token');
    }
    
    logout() {
        this.logoutApp.next({});
    }

}