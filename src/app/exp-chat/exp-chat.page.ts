import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-exp-chat',
  templateUrl: './exp-chat.page.html',
  styleUrls: ['./exp-chat.page.scss'],
})
export class ExpChatPage implements OnInit {

  currentUser = 'Pedro Perez';
  newMsg = '';
  @ViewChild(IonContent, {static: true}) content: IonContent;


  messages = [
    {
      user: 'Estética México',
      createdAt: 1554090856000,
      msg: 'hey whats up'
    },
    {
      user: 'Pedro Perez',
      createdAt: 1554090856000,
      msg: 'not much, whats up'
    },
    {
      user: 'Estética México',
      createdAt: 1554090856000,
      msg: 'all good'
    }
  ]

  constructor(
    public router: Router
  ) { }

  ngOnInit() {

  }

  navigateInfo(id: string) {
    this.router.navigate(['/', 'exp-chat', id, 'exp-chat-info', id]);
  }

  sendMessage() {
    this.messages.push({
      user: 'Pedro Perez',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(100);
    })
  }




}
