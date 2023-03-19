import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor(private _snackBar: MatSnackBar) { }


  successToast(message: string, action: string = 'close', time: number =1000) {
    this._snackBar.open(message, action, {
      duration: time
    })
  }
}
