import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'technical-test-back-office';

  constructor() {
    if (environment.hardCodeFill && EmployeeService.getEmployee().total == 0) {
      let dummyID = 100;
      for (let i = 0; i < dummyID; i++) {
        let dateTemp = new Date();
        let data = {
          username: 'Dummy ' + (i + 1),
          firstName: 'First ' + (i + 1),
          lastName: 'Last ' + (i + 1),
          email: 'email' + (i + 1) + '@domain.com',
          birthDate: dateTemp,
          basicSalary: 300000,
          status: 'dummy',
          group: 'Group7',
          description: dateTemp,
        };
        EmployeeService.addEmployee(data);
      }
    }
  }
}
