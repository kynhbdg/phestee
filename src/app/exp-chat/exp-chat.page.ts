import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CameraService } from '../services/camera.service';

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
      msg: 'hey whats up',
      photoMsg: {}
    },
    {
      user: 'Pedro Perez',
      createdAt: 1554090856000,
      msg: 'not much, whats up',
      photoMsg: {}
    },
    {
      user: 'Estética México',
      createdAt: 1554090856000,
      msg: 'all good',
      photoMsg: {}
    }
  ]

  constructor(
    public router: Router,
    public cameraService: CameraService
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
      msg: this.newMsg,
      photoMsg: {}
    });
    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(100);
    });
  }

  onTakePhoto() {
    this.cameraService.addNewToGallery();
    // this.messages.push({
    //   user: 'Pedro Perez',
    //   createdAt: new Date().getTime(),
    //   msg: '',
    //   photoMsg: this.cameraService.photos[0]
    // });
  }




}
