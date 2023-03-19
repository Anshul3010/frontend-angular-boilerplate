import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  otp : any
  constructor(private dialogRef: MatDialogRef<DialogComponent>) {

  }
  ngOnInit(): void {
    this.otp = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/), Validators.maxLength(6), Validators.minLength(6)])
  }

  submit(){
    // console.log(this.otp)
    this.dialogRef.close({otp: this.otp.value})
  }

  close() {
    this.dialogRef.close()
  }
 
}
