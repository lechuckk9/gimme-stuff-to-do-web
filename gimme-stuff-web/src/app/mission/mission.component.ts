import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  message = "New mission";
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
    {
      title: '',
      description: '',
      type: '0',
      state: '0',
      userAssignee: '1',
      userAuthor: '1'
    });

    if (localStorage.getItem("jwt") == null) {
      this.router.navigate(["/login"]);
    }
  }

  submit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });

    console.log(this.form.getRawValue());
    var request = this.form.getRawValue();
    request.type = parseInt(request.type);
    request.state = parseInt(request.state);
    request.userAssignee = parseInt(request.userAssignee);
    request.userAuthor = parseInt(request.userAuthor);
    console.log(request);

    this.httpClient.post
    (
      'https://localhost:5001/api/missions',
      request,
      { withCredentials : true, headers: headers }
    ).subscribe(res => this.handleResponse(res));
  }

  handleResponse(res: any): void {
    if (res.resultCode == 0) {
      this.router.navigate(["/"]);      
    }
    else {
      localStorage.removeItem("jwt");
    }
  }
}
