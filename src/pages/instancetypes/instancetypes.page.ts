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
    selector: 'instancetypes',
    template: `
        <div>Instance types</div>
        <!--<span>{{instancetypes | json}}<span>-->
        <table class="table table-striped table-hover">
            <tr>
                <th>Name</th>
                <th>Identifier</th>
                <th>Template</th>
                <th>Machines</th>
                <th>Owner</th>
                <th>Action</th>
            </tr>
            <tr *ngFor="#instancetype of instancetypes" [ngClass]="{danger: instancetype.deprecated}">
                <td>{{instancetype.displayname}}</td>
                <td>{{instancetype.identifier}}</td>
                <td>{{instancetype.recipe.templatename}}</td>
                <td>{{instancetype.recipe.machines.length}}</td>
                <td>{{instancetype.owner}}</td>
                <td><a [routerLink]="['InstancetypeDetails', {id: instancetype.identifier}]">show</a></td>
            </tr>
        </table>
    `
})
export class InstancetypesComponent implements OnInit {
    
    instancetypes: any = [];
    
    constructor(private http: Http) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/instancetypes', {headers: headers}).subscribe(res => {
            // console.log(res);
            this.instancetypes = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }

}