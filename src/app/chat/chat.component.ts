import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  subject: any;
  message: string;
  messages: string[] = [];
  myI: any;
  token: any;
  topic: any;
  sendMessageUrl = 'http://localhost:8000/api/chat/message/create/';
  getTopicUrl = 'http://127.0.0.1:8000/api/chat/';
  myData: any;
  constructor(public router: Router, private http: HttpClient, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    this.myI = this.route.snapshot.paramMap.get('id');

    this.getTopic(this.myI);
    this.subject = new WebSocket('ws://localhost:8000/ws/chat/' + this.route.snapshot.paramMap.get('id') + '/');
    console.log(this.route.snapshot.paramMap.get('id'))
    this.subject.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      this.messages.push(data.data.author.username + ': ' + data.data.message);
      console.log(this.messages);
      this.getTopic(this.myI);
    };


  }


  getTopic(chatId) {

    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token);
    this.http.get(this.getTopicUrl + chatId + '/', {
      headers
    })
      .subscribe(data => {
        console.log(data);

        this.myData = data;
        this.topic = this.myData.name;

      });
  }

  sendMessage(myMessage: string) {
    const myObject = {
      message: myMessage,
      chat: this.myI,
    };
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token)
    this.http.post(this.sendMessageUrl, myObject, {
      headers
    })
      .subscribe(data => {
        console.log(data);

        this.myData = data;
        this.getTopic(this.myI);
        this.message = '';
      });

  }

}
