import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  requestLoading : boolean = false;
  constructor(
    private loginService : LoginService,
    private router : Router
  ) { }

  loginForm : FormGroup
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.requestLoading = true;
    this.loginService.login(this.loginForm.value).subscribe((response : any) => {
        this.requestLoading = false;
        localStorage.setItem("access_token", response.access_token)
        this.router.navigateByUrl("/")
    }, err => {
      this.requestLoading = false;
    })
  }

}
