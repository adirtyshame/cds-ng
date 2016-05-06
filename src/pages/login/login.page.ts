import { Component, OnInit } from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'login',
    template: `
                    <form (submit)="login()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email" [value]="username" (input)="username">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" [value]="password" (input)="password">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <br>
                    <alert *ngFor="#alert of alerts;#i = index" [type]="alert.type" dismissible="true" dismissOnTimeout="3000" (close)="closeAlert(i)">
                        {{ alert?.msg }}
                    </alert>
    `,
    directives: [AlertComponent]
})
export class LoginComponent implements OnInit {
    
    username: string = '';
    password: string = '';
    alerts: Array<any> = [];
    
    constructor(private http: Http, private router: Router) { }

    ngOnInit() { }
    
    login() {
        let token = btoa(this.username + ':' + this.password);
        let headers = new Headers({'Authorization': 'Basic ' + token});
        this.http.get('/api/owners', {headers: headers}).subscribe(res => {
            // console.log(res);
            let profile;
            let owners = res.json();
            owners.forEach(element => {
                if (element.username === this.username) {
                    localStorage.setItem('profile', JSON.stringify(element));
                }
            });
            localStorage.setItem('token', token);
            this.router.navigate(['Owners']);
        }, err => {
            console.log(err);
            this.alerts.push({msg: 'Login failed. Please check your credentials.', type: 'danger', closable: true});
        }, 
        () => {
            // console.log('done');
        });
    }
    
    closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    }

}