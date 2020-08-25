import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';


const SOCKET_ENDPOINT = 'https://chatbot-facbook.herokuapp.com/';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  socket;
  message: string;
  guestid: string;
  constructor() {
  }

  ngOnInit() {
    this.setupSocketConnection();
    this.createGusetID();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('div');
        element.innerHTML = data;
        element.style.background = '#0360a5';
        element.style.padding = '10px 10px';
        element.style.margin = '10px';
        element.style.color = 'white';
        element.style.overflowY = 'auto';
        element.style.borderRadius = '8px';
        document.getElementById('message-list').appendChild(element);
      }
    });

    this.socket.on('guest-broadcast', (data: string) => {
      const element = document.createElement('p');
      element.classList.add('join-rom');
      element.innerHTML = data;
      element.style.color = 'mediumvioletred';
      element.style.textAlign = 'center';
      element.style.background = 'yellow';
      element.style.width = '100%';
      element.style.height = 'auto';
      element.style.borderRadius = '3px';
      document.getElementById('message-list').appendChild(element);
    });
  }

  SendMessage() {
    if (this.message.trim() !== '') {
      this.message ="<span style='color: red ; font-weight: bold'>" + this.guestid + ' : '+"</span>" + this.message;
      this.socket.emit('message', this.message);
      const element = document.createElement('p');
      element.innerHTML = this.message;
      element.style.background = 'black';
      element.style.padding = '10px 10px';
      element.style.margin = '10px';
      element.style.color = 'white';
      element.style.textAlign = 'right';
      element.style.borderRadius = '8px';
      document.getElementById('message-list').appendChild(element);
      this.message = '';
    }
    this.message = '';
  }

  createGusetID() {
    this.guestid = 'Guest' + Math.floor(Math.random() * Math.floor(100));
    this.socket.emit('guest', this.guestid);
    const  element = document.createElement('span');
    element.innerHTML = this.guestid + ' Join in rom ';
    element.style.color = 'red';
    element.style.fontWeight = 'bold';
    document.getElementById('message-list').appendChild(element);
  }


}
