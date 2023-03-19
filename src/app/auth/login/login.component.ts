import { Component, OnInit,  } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/material/toast/toster.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private toast: TosterService, private httpService: AuthService, public dialog: MatDialog, private router: Router) {

  }

  loginForm : any
  loading: boolean = false
  dialogRef: any
  user: any
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  login() {
    console.log(this.loginForm.get('email'))
    this.loading = true;
    // this.dialogRef = this.dialog.open(DialogComponent, {
    //   width: '250px'
    // }).afterClosed().subscribe((res: any) => {
    //   console.log(res);
    // })
    if(this.loginForm.status === 'INVALID') {
      this.toast.successToast('Invalid Form')
    } else {
      let data = this.loginForm.value
      this.httpService.login(data).subscribe((res: any) => {
        if(true) {
          console.log(res)
          this.user = res.data[0]._id
          this.loading = false;
          this.openDialog()
        }
      }, (err: any) => {
        this.loading = false;
        this.toast.successToast('Email or password is Incorrect')
        console.log(err)
      })
    }    
  }


  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    }).afterClosed().subscribe((res: any) => {
      if(!res) {
        this.toast.successToast('Login Flow Cancelled')
        this.loginForm.reset()
        this.loginForm.markAsPristine()
        this.loginForm.markAsUntouched()
      } else {
        this.validateOTP(res);
      }
    })
  }


  validateOTP(otp: any) {
    this.loading = true
    otp.userId = this.user
    this.httpService.validateOTP(otp).subscribe((res) => {
      this.toast.successToast('Login successful')
      this.loading = false;
      this.router.navigateByUrl('/')
    }, (err) => {
      this.toast.successToast('Login Unsuccessfull, Please try Again')
      this.loading = false;
      this.openDialog()
    })
  }


  forgotPassword() {
    let email = this.loginForm.get('email').value
    if(!email) {
      this.loginForm.get('email').errors.email= true
      return;
    }
    this.httpService.forgotPassword(email).subscribe((res: any) => {
      if(res.status == 200) {
        console.log(res)
        this.toast.successToast('Email with link sent to email')
      }
    }, (err: any) => {
      console.log(err)
      this.toast.successToast('No Account associated with the email Found')

    })
  }
}
