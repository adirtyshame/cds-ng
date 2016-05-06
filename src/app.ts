import { Component } from 'angular2/core';
import { Router, RouteConfig, RouterLink, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx'; // load the full rxjs

import {LoginComponent} from './pages/login/login.page';
import {OwnersComponent} from './pages/owners/owners.page';
import {OwnerDetailsComponent} from './pages/owner-details/owner-details.page';
import {InstancesComponent} from './pages/instances/instances.page';
import {InstanceDetailsComponent} from './pages/instance-details/instance-details.page';
import {InstancetypesComponent} from './pages/instancetypes/instancetypes.page';
import {InstancetypeDetailsComponent} from './pages/instancetype-details/instancetype-details.page';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
    selector: 'app',
    template: `
        <navbar (logout)="logout()"></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavbarComponent]
})
@RouteConfig([
    { path: '/login', as: 'Login', component: LoginComponent, useAsDefault: true },
    { path: '/owners', as: 'Owners', component: OwnersComponent },
    { path: '/owners/:id', as: 'OwnerDetails', component: OwnerDetailsComponent },
    { path: '/instances', as: 'Instances', component: InstancesComponent },
    { path: '/instances/:id', as: 'InstanceDetails', component: InstanceDetailsComponent },
    { path: '/instancetypes', as: 'Instancetypes', component: InstancetypesComponent },
    { path: '/instancetypes/:id', as: 'InstancetypeDetails', component: InstancetypeDetailsComponent }
])
export class AppComponent {
    
    constructor(private router: Router) { }
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.router.navigate(['Login']);
    }
    
}