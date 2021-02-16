import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from "../../services/employee.service";

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  addEmployee(employeeForm: NgForm) {

    if (employeeForm.value._id) {
      this.employeeService.putEmployee(employeeForm.value)
        .subscribe(res=>{
          this.resetForm(employeeForm) 
        this.getEmployees()
        M.toast({html: 'Update successfuly!'}) 
          
        })
    } else {
      this.employeeService.postEmployee(employeeForm.value)
      .subscribe(res => {
        this.resetForm(employeeForm) 
        this.getEmployees()
        M.toast({html: 'Save successfuly'})         
      })
    }

      
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res=>{
        this.employeeService.employees = res as Employee[];
      console.log(res);
      
      })
  }

  selectEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee
  }

  deleteEmployee(_id: string) {
    if (confirm('Are u sure u want to delete?')) {
      this.employeeService.deleteEmployee(_id)
      .subscribe(res=> {
        this.getEmployees()
        M.toast({html: 'Deleted successfuly'}) 
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }
}
