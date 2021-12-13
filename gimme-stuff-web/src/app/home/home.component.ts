import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { ApiResponsePage } from '../models/apiResponsePage';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messageMissionsCount: string;

  response: ApiResponsePage;
  missions: Mission[] = [];
  
  public headers = ['Title', 'Description', 'Type', 'State', 'UserAssignee', 'UserAuthor', "Actions" ];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("jwt"));
    if (localStorage.getItem("jwt") == null) {
      Emitters.authEmitter.emit(false);
      this.router.navigate(["/login"]);
    }

    Emitters.authEmitter.emit(true);
    this.loadMissions();
  }

  loadMissions(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    })

    this.httpClient.get<ApiResponsePage>
    (
      'https://localhost:5001/api/missions',
      { withCredentials : true, headers: headers }
    ).subscribe(res => this.handleResponse(res));
  }

  handleResponse(res: ApiResponsePage): void {
    this.missions = res.data;
    this.messageMissionsCount = "Page: " + (res.page.page + 1) + " of requested size: " + res.page.pageSize + ", out of total: " + res.page.totalCount + " elements.";
  }
}
