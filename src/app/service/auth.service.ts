import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Model } from '../model/user.model';
import { config } from '../config';
import { AuthResponse } from '../appInterface.auth-response.interface';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private es: ErrorService, private router : Router) {  }

  user = new BehaviorSubject<Model>(null);
  userProfileInfo = new BehaviorSubject({
    displayName : '',
    email : ''
  });
 

  signUp(email , password){
   return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.API_KEY, 
   {
      email:email, 
      password: password,
      returnSecureToken: true
    }).pipe(catchError(err =>{
        return this.es.handleError(err);
    }),
       tap((res: AuthResponse)=>{              
         this.authenticatedUser(res.email, res.idToken, +res.expiresIn, res.localId);
      })   
    )           
  }

  signin(email , password){
      return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ config.API_KEY,
       {
        email:email, 
        password: password,
        returnSecureToken: true
       }).pipe(catchError(err=>{
         return this.es.handleError(err);
       }),
       tap((res: AuthResponse)=>{              
         this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
      })   
       )
  }

  signOut(){
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');
  }

    keepLoggedIn(){
        const usrData = JSON.parse(localStorage.getItem('userData'));
        console.log(usrData );

        if(!usrData){
          return;
        }
        const loggedInUser = new Model(usrData.email, usrData.userId, usrData._token, new Date(usrData._tokenExpirationDate))
        if(loggedInUser.token){
            this.user.next(loggedInUser);
            this.getUserData(loggedInUser.token);   
              }
    }

   private authenticatedUser(email, userId, token, expiresIn:any){

       const expirationDate:any = new Date(new Date().getTime() + expiresIn*1000);
       const user = new Model(userId, email, token, expirationDate);
       console.log("User Data:->", user)
       this.user.next(user); //Storing data in user subject

       localStorage.setItem('userData', JSON.stringify(user));
       // this.getUserData(token)
   }

   updateUserProfile(data){
    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+ config.API_KEY,
         {
           idToken: data.token,
           displayName: data.name,
           photoUrl: data.picture,
           returnSecureToken:true
         }
      ).pipe(catchError(err=>{
        return this.es.handleError(err)
      }))
   }

   getUserData(token:any){
     this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + config.API_KEY,
          {
           idToken:token       
          }
     ).subscribe( res=>{
        console.log(res);
        this.userProfileInfo.next({
        displayName : res.users[0].displayName,
        email : res.users[0].email
     })
 })
}

changePassword(data){
   return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:update?key='  + config.API_KEY,
       {
          idToken : data.token,
          password : data.password
       }
     ).pipe(catchError(err=>{
        return this.es.handleError(err)
      }))
}



}
