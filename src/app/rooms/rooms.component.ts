import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  getUrl = 'http://127.0.0.1:8000/api/chat/list/';
  token: any;
  gotData: any;
  roomCount: any;
  allRooms: any;
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    this.loadRooms();
  }

  loadRooms() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    this.http.get(this.getUrl, {
      headers
    })
      .subscribe(data => {
        console.log(data);
        this.gotData = data;
        this.roomCount = this.gotData.count;
        this.allRooms = this.gotData.results;

      });


  }

}
