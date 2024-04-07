declare var google: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(public http: HttpClient){}
  isLoggedIn: boolean = false
  @Output() loginEvent = new EventEmitter<boolean>();
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '977609391501-7sdlhq5dl17lpiug21cg1dllpe24a919.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    })
    google.accounts.id.renderButton(document.getElementById("login-btn"), {
      type: 'icon',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }
  handleLogin(resp: any){
    this.isLoggedIn = true
    const jsonResp = JSON.parse(atob(resp.credential.split(".")[1]))
    const name: String = jsonResp.name
    const email: String = jsonResp.email
    console.log(name, email)
    const headers = new HttpHeaders({
      'X-Special-Token': 'chandranvenkat'
    });
    const requestBody = {
        "name": name,
        "email": email
    }
    
    this.isLoggedIn = true
    this.loginEvent.emit(this.isLoggedIn)
    this.http.post<any>('https://splashchemicals.in/check/api/login/get-tokens/', requestBody, {headers}).subscribe(
      (response) => {
        console.log(response)
        sessionStorage.setItem('refresh', response.refresh)
        sessionStorage.setItem('access', response.access)
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
  aboutUs(){
    console.log('in about us')
    this.isLoggedIn = true
    this.loginEvent.emit(this.isLoggedIn)
  }
}

