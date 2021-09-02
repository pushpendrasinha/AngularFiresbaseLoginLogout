import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private as: AuthService, private fb: FormBuilder) { }

  passwordForm! : FormGroup;
  passwordType : boolean = true;
  token = JSON.parse(localStorage.getItem('userData'))._token;
  successBox : boolean = false;


  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password : ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.passwordForm.value.password);
    // console.log({token : this.token});

    const data = ({token : this.token, ...this.passwordForm.value })
    
    this.as.changePassword(data).subscribe(
      data => console.log(data)
      )
    this.successBox = true;
  }

  togglePassword(){
   this.passwordType = !this.passwordType;
  }

}
