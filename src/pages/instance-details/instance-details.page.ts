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
    selector: 'instance-details',
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Instance Details</h3>
            </div>
            <div class="panel-body">
                <pre>{{instance | json}}</pre>
            </div>
            <div class="panel-footer">
                <button class="btn btn-default" (click)="start()">start</button>
                <button class="btn btn-default" (click)="stop()">stop</button>
                <button class="btn btn-danger" (click)="delete()">delete</button>
            </div>
        </div>
    `
})
export class InstanceDetailsComponent implements OnInit {
    
    instance: any = {};
    
    constructor(private http: Http, private params: RouteParams) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/instances/' + this.params.get('id'), {headers: headers}).subscribe(res => {
            // console.log(res);
            this.instance = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }
    
    start() {
        let action = JSON.stringify({action: 'start'});
        let token = localStorage.getItem('token');
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + token);
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/instances/' + this.instance.id, action, {headers: headers}).map(res => res.json()).subscribe(res => {
            // console.log(res);
        });
    }
    
    stop() {
        let action = JSON.stringify({action: 'stop'});
        let token = localStorage.getItem('token');
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + token);
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/instances/' + this.instance.id, action, {headers: headers}).map(res => res.json()).subscribe(res => {
            // console.log(res);
        });
    }
    
    delete() {
        alert('Not yet implementet');
    }

}