import { Component, OnInit } from 'angular2/core';
import {CanActivate, Router, RouterLink} from 'angular2/router';
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
    selector: 'instances',
    template: `
        <div>Instances</div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>URL</th>
                    <th>Expires in</th>
                    <th>Usage</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <tr *ngFor="#instance of instances" [ngClass]="{warning: instance.is_expired}">
                <td>{{instance.name}}</td>
                <td>{{instance.state}}</td>
                <td>{{instance.url[0]}}</td>
                <td>{{instance.expires_in_days + ' days'}}</td>
                <td>{{instance.usagetype}}</td>
                <td>{{instance.description}}</td>
                <td><a [routerLink]="['InstanceDetails', {id: instance.id}]">show</a></td>
            </tr>
            </tbody>
        </table>
    `,
    directives: [RouterLink]
})
export class InstancesComponent implements OnInit {
    
    instances: any = [];
    
    constructor(private http: Http) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/instances', {headers: headers}).subscribe(res => {
            // console.log(res);
            this.instances = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }

}