import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
    {
      username: '',
      password: ''
    });
  }

  submit(): void {
    this.httpClient.post
    (
      'https://localhost:5001/api/users/signin',
      this.form.getRawValue(),
      { withCredentials : true }
    ).subscribe(res => this.handleResponse(res));
  }

  handleResponse(res: any): void {
    if (res.resultCode == 0) {
      localStorage.setItem("jwt", res.data);
      this.router.navigate(["/"]);      
    }
    else {
      localStorage.removeItem("jwt");
    }
  }
}
