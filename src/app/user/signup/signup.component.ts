import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Model } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import  {passwordValidator} from '../../validators/password.validator';
import { AuthService} from '../../service/auth.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private us: UserService,  public fb : FormBuilder, private router: Router, private as: AuthService, private es: ErrorService) { }

  signupForm!: FormGroup;
  error:any;
  errMsg:any = this.es.errorMsg;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name : ['' , Validators.required],
      email : ['' , Validators.required , Validators.email],
      password : ['' , Validators.required, Validators.minLength(6)],
      confirmPassword : ['', Validators.required]
    },{
      validator: passwordValidator
    });
  }

  onSubmit(){
    if(this.signupForm.invalid){
     console.log("Form is invalid")
    }else{
      console.log(this.signupForm.value)

      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      this.as.signUp(email, password).subscribe(
        res =>{
        console.log(res);
        }, 
        err =>{
         console.log(err); 
         // this.error = err.error.error.message;
         console.log(this.error = this.errMsg[err])
      }
      )
    }
   
  }

  get frmCntrls (){
    return this.signupForm.controls;
  }

  get password() {
    return this.signupForm.get('password');
  } 
   
  


}
