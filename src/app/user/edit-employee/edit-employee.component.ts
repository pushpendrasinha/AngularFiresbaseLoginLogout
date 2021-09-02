import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { EmployeeModel } from '../../model/employee.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private route:ActivatedRoute , private router : Router, private fb: FormBuilder, private us: UserService) { }

   editForm: FormGroup;
   employeeId :any;
   employee : EmployeeModel = {};
   employees : EmployeeModel[];

  ngOnInit(): void {
     this.route.paramMap.subscribe(params=> {
     this.employeeId = params.get('empId');
      this.us.getEmployeeById(this.employeeId).subscribe(
        (res) => {
            this.editForm = new FormGroup({
            name: new FormControl(res['name'], [Validators.required]),
            designation: new FormControl(res['designation'], Validators.required),
            skills: new FormControl(res['skills'], Validators.required)
          })
        })
   })

     this.getCurrentEmployee();

  }

  getCurrentEmployee(){
    this.route.paramMap.subscribe(params=> {
     this.employeeId = params.get('empId');
      this.us.getEmployeeById(this.employeeId).subscribe(
        employee => this.employee = employee)
  })
}


  onUpdate(){
    this.us.updateEmployee(this.employeeId, this.editForm.value)
    .subscribe(data=>{
     console.log( data);
    })

  }

}
