import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { EmployeeModel } from '../../model/employee.model';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private us :UserService, private route:ActivatedRoute , private router : Router, private fb: FormBuilder,
              private as: AuthService
              ) { }

  employees : EmployeeModel[];
  employee :EmployeeModel;
  userName ="";
  // token = JSON.parse(localStorage.getItem('userData'))._token;

  addForm!: FormGroup;

  ngOnInit(): void {

    this.getEmployeesList();

    this.addForm = this.fb.group({
      name : ['', Validators.required],
      designation: ['', Validators.required],
      skills: ['',Validators.required]
    })

    // this.as.userProfileInfo.subscribe(res=>{
    //    // let data =  this.as.getUserData(this.token)
    //  })

      }


   


  getEmployeesList(){
    this.us.getEmployees().subscribe(empData=>{
      this.employees = empData;
      console.log( empData );
    })
  }

  onSubmit(){
    this.us.addEmloyee(this.addForm.value).subscribe(
      data=>{
        console.log(data)
        this.ngOnInit();
      }
      )
  }

  onDelete(empId){
      if(confirm("Are you sure you want to delte this employee data")){
      this.us.deleteEmployee(empId).subscribe(data =>{
        this.getEmployeesList();
      })
     }
  }

  

  




}
