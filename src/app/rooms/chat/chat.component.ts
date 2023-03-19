import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { io } from "socket.io-client";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  socketConnection: any
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.socketConnection = io('http://127.0.0.1:3000')
    let roomName = this.route.snapshot.params['room_name'];
    this.socketConnection.emit('join room', {room_name: roomName})
    this.socketConnection.emit('message', {room_name: roomName, message: 'Hello'})
    this.socketConnection.on('message', (data: any) =>{
      console.log('message received', data)
    })
  }
}
