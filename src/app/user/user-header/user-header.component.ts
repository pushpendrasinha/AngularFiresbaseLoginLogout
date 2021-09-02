import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor( private as: AuthService, private router : Router) { }

  user;

  ngOnInit(): void {

     this.as.userProfileInfo.subscribe(res=>{
        this.user = res ;
    })

  }

}
