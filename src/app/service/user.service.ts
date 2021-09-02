import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, take, exhaustMap } from 'rxjs/operators';

import { EmployeeModel } from '../model/employee.model';
import {AuthService} from './auth.service';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private as: AuthService) { }

  api = config.API_URL;

   addEmloyee(employee:EmployeeModel) : Observable<EmployeeModel>{
     return this.http.post<EmployeeModel>(this.api + 'employee.json', employee);
   }

   getEmployees(): Observable<EmployeeModel[]>{
      return this.http.get<EmployeeModel[]>(this.api + 'employee.json').pipe(map(resData =>{
         const empArray : EmployeeModel[] = [];
           for (const key in resData){
             // console.log(key)
             // console.log(resData[key])
             empArray.push({empId : key, ...resData[key]})
           }
           return empArray
       }))
     }

    

   getEmployeeById(empId:any): Observable<EmployeeModel>{
     // console.log(this.api+ 'employee/' + empId + '.json');
     return this.http.get<EmployeeModel>(this.api + 'employee/' + empId + '.json');
   }

   updateEmployee(empId:any, employee : EmployeeModel){
     // console.log('https://demowebloginlogout-default-rtdb.firebaseio.com/employee/' + empId + '.json');
     return this.http.put(this.api+ 'employee/' + empId + '.json', employee);
   }

   deleteEmployee(empId){
       return this.http.delete(this.api + 'employee/' + empId + '.json');
   }



}
