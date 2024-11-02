import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
  maxDate: any;
  addForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addForm = fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
    
    this.maxDate = new Date().toISOString().slice(0, 10);
  }

  ngOnInit(): void {}

  changeRP(data: String) {
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
    if (data.length > 0) {
      result = 'Rp. ' + angka + ',00';
    }
    return result;
  }

  onChangeHandler = (data: any) => {
    data.target.type = 'text';
    data.target.value = this.changeRP(data.target.value);
  };

  onFocus = (data: any) => {
    let change = data.target.value
      .replace('Rp. ', '')
      .replace(',00', '')
      .replace('.', '');
    data.target.value = change;
    data.target.type = 'number';
  };

  focusType(event: any, type: any) {
    if (type === 'blur') {
      event.target.type = event.value ? 'date' : 'text';
      if (event.target.value != null && event.target.value != '') {
        let dataInput = new Date(event.target.value);
        event.target.value =
          dataInput.getDate() +
          '-' +
          (dataInput.getMonth() + 1) +
          '-' +
          dataInput.getFullYear();
      }
    } else {
      let temp: any = null;
      if (event.target.value != null && event.target.value != '') {
        let dataInput = event.target.value.split('-');
        temp = new Date(dataInput[2] + '-' + dataInput[1] + '-' + dataInput[0]);
      }
      event.target.type = 'date';
      if (temp !== null) {
        event.target.valueAsDate = temp;
      }
      event.currentTarget.showPicker();
    }
  }

  submitAdd() {
    let data = this.addForm.value;
    let dump = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: new Date(data.birthDate),
      basicSalary: data.basicSalary
        .replace('Rp. ', '')
        .replace(',00', '')
        .replace('.', ''),
      status: data.status,
      group: data.group,
      description: new Date(data.description),
    };
    let result = EmployeeService.addEmployee(dump);
    if (result) {
      alert('Already Exist');
    } else {
      alert('Add Employee Done');
      this.router.navigateByUrl('/employee');
    }
  }
}
