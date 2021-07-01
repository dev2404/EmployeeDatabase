import { Component, OnInit } from '@angular/core';
import {NgForm } from "@angular/forms";
import { Employee } from '../employee.model';

import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  searchInput: any;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      id:0,
      Name: "",
      Office: "",
      Salary: 0
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        alert('Saved successfully');
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        alert('Updated successfully');
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(id: number, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        alert('Deleted successfully');
      });
    }
  }

 filterCondition(emp: Employee) {
   return emp.Name.toLowerCase().indexOf(this.searchInput.toLowerCase()) != -1
 }

}
