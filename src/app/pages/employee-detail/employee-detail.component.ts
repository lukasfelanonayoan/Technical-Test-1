import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent {
  maxDate: Date;
  employees: any;

  constructor(private route: ActivatedRoute) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const param = routeParams.get('username');
    this.employees = EmployeeService.getDetailEmployee(param);
  }

  changeRP(data: any) {
    let result = '';
    let angka = '';
    let tempInput = '';
    
    for (let i = data.toString().length - 1; i >= 0; i--) {
      if (tempInput.length % 3 == 0 && tempInput.length != 0) {
        angka = '.' + angka;
      }
      angka = data.toString()[i] + angka;
      tempInput = data.toString()[i] + tempInput;
    }
    if (data.toString().length > 0) {
      result = 'Rp. ' + angka + ',00';
    }
    return result;
  }

  dateType(data: Date) {
    return data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
  }
}
