import { Component, OnInit } from 'angular2/core';
import {CanActivate, Router, RouteParams} from 'angular2/router';
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
    selector: 'instancetype-details',
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Instancetype Details</h3>
            </div>
            <div class="panel-body">
                <pre>{{instancetype | json}}</pre>
            </div>
        </div>
    `
})
export class InstancetypeDetailsComponent implements OnInit {
    
    instancetype: any = {};
    
    constructor(private http: Http, private params: RouteParams) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/instancetypes/' + this.params.get('id'), {headers: headers}).subscribe(res => {
            // console.log(res);
            this.instancetype = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }

}