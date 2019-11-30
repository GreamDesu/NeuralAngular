import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticationService } from '../_services';
import { User } from '../_models';
@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  isAdmin: any = false;
  id: any;
  isAdminUrl = 'isAdmin';
  me: any;
  userWay: any;
  wayUrl = 'wayUrl';
  AllMyData: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    try {
      this.id = JSON.parse(localStorage.getItem('currentUser'))[0]._id;
      // this.userWay = JSON.parse(localStorage.getItem('currentUser'))[0].way;

    } catch (error) {
      console.log('not logged in');
    }
  }
  ngOnInit() {
    //this.isAdmin = JSON.parse(localStorage.getItem('currentUser'))[0].isAdmin;

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
