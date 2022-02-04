import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiLink: string;
  employeeToEdit: Subject<Employee> = new Subject<Employee>();

  constructor(private http: HttpClient) {
    this.apiLink = environment.baseURL;
  }

  getDeptData(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiLink}/department`);
  }

  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiLink}/employees`);
  }

  getEmpDetail(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiLink}/employees/${id}`);
  }

  sendEmployeeToEdit(employee: Employee): void {
    this.employeeToEdit.next(employee);
  }

  getEmployeeToEdit(): Observable<Employee> {
    return this.employeeToEdit.asObservable();
  }

  private editEmp(employee: Employee): Observable<Employee> {
    console.log('hgasdf');
    return this.http.put<Employee>(`${this.apiLink}/employees/${employee.id}`, employee);
  }

  private addEmp(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiLink}/employees`, employee);
  }

  saveEmp(employee: Employee): Observable<Employee> {
    console.log(employee);
    return employee.id ? this.editEmp(employee) : this.addEmp(employee);
  }

  deleteEmp(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiLink}/employees/${id}`);
  }
}