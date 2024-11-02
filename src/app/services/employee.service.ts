import { Injectable } from '@angular/core';
import { employees } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  static search = '';
  static limit = 100;
  static sorter = '';
  static page = 0;

  static setSearch(data: any) {
    EmployeeService.search = data;
    EmployeeService.page = 0;
  }

  static setLimit(data: any) {
    EmployeeService.limit = data;
    EmployeeService.page = 0;
  }

  static setPage(data: any) {
    EmployeeService.page = data;
  }

  static getEmployee() {
    let result: any = {};
    let data: any[] = [];
    let dataPerPage: any[] = [];
    let counter = 0;
    let counterPage = 0;
    employees.filter((selected: any) => {
      let inserted = false;
      if (selected.username.toLowerCase().includes(EmployeeService.search)) {
        counter++;
        dataPerPage.push(selected);
        inserted = true;
      }
      if (
        (inserted && dataPerPage.length % EmployeeService.limit == 0) ||
        selected == employees[employees.length - 1]
      ) {
        counterPage++;
        data.push(dataPerPage);
        dataPerPage = [];
      }
    });

    result['data'] = data;
    result['page'] = EmployeeService.page;
    result['limit'] = EmployeeService.limit;
    result['total'] = counter;
    result['totalPage'] = counterPage;

    return result;
  }

  static getDetailEmployee(username: any) {
    let result = null;
    employees.find((data: any) => {
      if (data.username === username) result = data;
    });

    return result;
  }

  static addEmployee(data: any) {
    let exist = false;
    employees.find((check: any) => {
      if (check.username === data.username) {
        exist = true;
      }
    });

    if (!exist) {
      employees.push(data);
    }
    return exist;
  }

  static deleteEmployee(dataSelected: any) {
    let index = employees.findIndex(d => d === dataSelected);
    employees.splice(index, 1);
  }

  static editEmployee(username: any) {
    let selected;
    employees.find((data: any) => {
      selected = data.username === username;
    });
  }
}
