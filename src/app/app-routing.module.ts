import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserModule } from './user/user.module';

const routes : Routes = [
  {path : '' , pathMatch : 'full' , redirectTo : 'signin'},
  {path: 'user', loadChildren: ()=> import('./user/user.module').then(m => m.UserModule) },

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
