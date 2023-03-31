import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Login } from '@hivehapp/models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm') form: NgForm;

  model: Login;

  ngOnInit() {
    this.model = {
      emailAddress: '',
      password: '',
    };
  }

  onSave() {
    if (this.form.valid) {
      console.log('Saved!');
    }
  }
}

function deepCopy<T>(object: T): T {
  if (object == null) {
    return object;
  }

  return JSON.parse(JSON.stringify(object));
}
