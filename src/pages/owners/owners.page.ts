import { Component, OnInit } from 'angular2/core';
import {CanActivate, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {appInjector} from '../../app-injector';

@CanActivate((next, prev) => {
    let injector = appInjector();
    let router = injector.get(Router);
    if (!localStorage.getItem('token')) {
        console.log('token not found. redirecting to login.');
        router.navigate(['Login']);
        return false;
    }

    return true;
})

@Component({
    selector: 'owners',
    template: `
        <div>Owners</div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>User</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <tr *ngFor="#owner of owners">
                <td>{{owner.email}}</td>
                <td>{{owner.username}}</td>
                <td>{{owner.realname}}</td>
                <td><a [routerLink]="['OwnerDetails', {id: owner.username}]">show</a></td>
            </tr>
            </tbody>
        </table>
    `
})
export class OwnersComponent implements OnInit {
    
    owners: any = [];
    
    constructor(private http: Http) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/owners', {headers: headers}).subscribe(res => {
            // console.log(res);
            this.owners = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }

}