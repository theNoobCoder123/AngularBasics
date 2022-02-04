import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-employee-list-view',
  templateUrl: './employee-list-view.component.html',
  styleUrls: ['./employee-list-view.component.css']
})
export class EmployeeListViewComponent implements OnInit {

  employeeData: Employee[];

  constructor(private router: Router, private crudService: CrudService) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.crudService.getEmpList().subscribe(data => {
      this.employeeData = data;
    }, errors => {
      alert("Something went wrong!! - emp" + errors);
    })
  }

  editEmp(employee: Employee): void {
    this.crudService.sendEmployeeToEdit(employee);
    this.router.navigate([`/crud-operation/edit/${employee.id}`])
  }
}