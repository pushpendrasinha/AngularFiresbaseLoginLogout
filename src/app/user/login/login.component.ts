import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Model} from '../../model/user.model';
import {AuthService } from '../../service/auth.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService ,private fb : FormBuilder, private router : Router, private es: ErrorService) { }

  loginform! :FormGroup;
  error:any;
  errMsg :any=  this.es.errorMsg;
   loading : boolean;
   passwordType : boolean = true;

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(){
    if(this.loginform.invalid){
      alert("invalid credentials");
    }
    else{
      // console.log(this.loginform.value)

      const email = this.loginform.value.email;
      const password = this.loginform.value.password;

      this.as.signin(email, password).subscribe(
        res =>{
        console.log(res);
        this.router.navigate(['/dashboard']).then(()=>{
          location.reload();
        });
        }, 
        err =>{
         console.log(err);
         // this.error = err.error.error.message; 
         // this.error = this.errMsg[err.error.error.message]
         // if(!err.error || !err.error.error){
         //   this.error = this.errMsg['UNKNOWN']
         // }
         // this.error = this.errMsg[err.error.error.message]
         this.error = this.errMsg[err];
      }
      )
      this.loading = !this.loading;
    }
  }

  togglePassword(){
    this.passwordType = !this.passwordType;
  }

}
