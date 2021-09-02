import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  isLoggedIn = false;

  ngOnInit(): void {
      this.as.user.subscribe(res=>{
        if(res){
          this.isLoggedIn = true;
        }else{
        this.isLoggedIn = false;
          }
          // this.isLoggedIn = !res ? false : true;
      })
  }

  onLogout(){
    this.as.signOut();
  }

}
