import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  hardCodeFill: boolean = true;
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
    if (this.hardCodeFill && this.employees.total == 0) {
      let dummyID = 100;
      for (let i = 0; i < dummyID; i++) {
        
        let dateTemp = new Date();
        let data = {
          username: 'Dummy ' + (i+1),
          firstName: 'First ' + (i+1),
          lastName: 'Last ' + (i+1),
          email: 'email' + (i+1) + '@domain.com',
          birthDate: dateTemp,
          basicSalary: 300000,
          status: 'dummy',
          group: 'Group7',
          description: dateTemp,
        };
        EmployeeService.addEmployee(data);
      }
    }

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
