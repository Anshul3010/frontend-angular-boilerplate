import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/material/toast/toster.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm : any

  constructor(private toast: TosterService, private httpService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }


  register() {
    if(this.registrationForm.status === 'INVALID') {
      this.toast.successToast('Invalid Form')
    } else {
      let data = this.registrationForm.value
      if(this.checkPassword(data.password, data.confirmPassword)) {
        delete data.confirmPassword;
        this.httpService.register(data).subscribe((res: any) => {
          if(res.code == 200) {
            this.toast.successToast('Registration Successful, Please Login')
            this.router.navigateByUrl('/auth/login')
          }
        }, (err: any) => {
          console.log(err)
          this.toast.successToast('Unable to Register, Please try again')

        })
      }
    }
    
  }


  checkPassword(password1: string, password2: string) {
    if(password1 === password2) {
      return true;
    }
    return false;
  }

}
