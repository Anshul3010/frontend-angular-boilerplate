import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit{
  roomList = [
    {
      name: 'Room 1'
    },
    {
      name: 'Room 2'
    },
    {
      name: 'Room 3'
    },
    {
      name: 'Room 4'
    },
    {
      name: 'Room 5'
    }
  ]
  constructor(private router: Router) {

  }
  
  ngOnInit(): void {
    // this.joinRoom('Room 5')
  }

  joinRoom(name: string) {
    console.log(name)
    this.router.navigateByUrl(`/room/${name}`)
  }
}
