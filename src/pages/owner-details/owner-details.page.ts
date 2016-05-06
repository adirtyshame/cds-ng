import { Component, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'profile',
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Owner Details</h3>
            </div>
            <div class="panel-body">
                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email" disabled [value]="profile.email">
                </div>
                <div class="form-group">
                    <label for="exampleInpuusernametEmail1">User name</label>
                    <input type="text" class="form-control" id="username" placeholder="User" disabled [value]="profile.username">
                </div>
                <div class="form-group">
                    <label for="realname">Real name</label>
                    <input type="text" class="form-control" id="realname" placeholder="Name" disabled [value]="profile.realname">
                </div>
                <!-- <button type="submit" class="btn btn-default">Submit</button> -->
                </form>
            </div>
        </div>
    `
})
export class OwnerDetailsComponent implements OnInit {
    
    profile: any = {};
    
    constructor(private http: Http, private params: RouteParams) { }

    ngOnInit() { 
        let token = localStorage.getItem('token');
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/owners/' + this.params.get('id'), {headers: headers}).subscribe(res => {
            // console.log(res);
            this.profile = res.json();
        }, err => {
            console.log(err)
        }, 
        () => {
            // console.log('done');
        });
    }

}