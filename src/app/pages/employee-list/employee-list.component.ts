import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  page = EmployeeService.page;
  employees: any = EmployeeService.getEmployee();
  search = EmployeeService.search;
  monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  inputSearch: FormControl = new FormControl(this.search);
  inputLimit: FormControl = new FormControl(EmployeeService.limit);

  constructor() {
    this.inputSearch.valueChanges.subscribe(() => {
      this.changeSearch(this.inputSearch.value);
    });
    this.inputLimit.valueChanges.subscribe(() => {
      this.changeLimit(this.inputLimit.value);
    });
  }

  ngOnInit(): void {
    this.employees = EmployeeService.getEmployee();
  }

  changeLimit(limit: any) {
    EmployeeService.setLimit(limit);
    this.employees = EmployeeService.getEmployee();
  }

  changeSearch(data: any) {
    EmployeeService.setSearch(data);
    this.employees = EmployeeService.getEmployee();
  }

  changePage(page: any) {
    EmployeeService.setPage(page);
    this.employees = EmployeeService.getEmployee();
  }

  deleteData(data: any) {
    if (confirm('Are you sure want to delete ' + data.username + ' ?')) {
      EmployeeService.deleteEmployee(data);
      this.employees = EmployeeService.getEmployee();
    }
  }
}
