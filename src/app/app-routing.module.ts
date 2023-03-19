import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './rooms/chat/chat.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'room-list',
    component: RoomsListComponent
  },
  {
    path: 'room/:room_name',
    component: ChatComponent
  },
  {
    path: '**',
    redirectTo: 'room-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
