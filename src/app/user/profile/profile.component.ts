import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import {  Router} from '@angular/router';

import { AuthService  } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb : FormBuilder, private as : AuthService , private router :Router) { }

  userForm: FormGroup;
  token = JSON.parse(localStorage.getItem('userData'))._token;
  profileInfo;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: '',
      email: ''
    });

    this.as.userProfileInfo.subscribe(res=>{
      this.profileInfo = res;
    })

  }

  onSubmit(){
    if(this.userForm.invalid){
       return;
    }

    const userData = ({token: this.token, ...this.userForm.value})

    this.as.updateUserProfile(userData).subscribe(
      err => console.log(err),
      res => console.log(res),
    // console.log(this.userForm.value);
    // console.log(this.token)     
    ); this.router.navigate(['/dashboard'])
  }

}
