import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  AuthGuard } from '../guard/auth.guard';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes : Routes = [
  {path : 'signin' , component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'profile', canActivate: [AuthGuard], component: ProfileComponent},
   {path : 'change-password', canActivate:[AuthGuard], component: ChangePasswordComponent},
  {path : 'dashboard', canActivate :[AuthGuard], component : DashboardComponent},
   {path : 'edit/:empId', canActivate:[AuthGuard], component: EditEmployeeComponent}
]


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    EditEmployeeComponent,
    ProfileComponent,
    UserHeaderComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule , FormsModule
  ]
})
export class UserModule { }
