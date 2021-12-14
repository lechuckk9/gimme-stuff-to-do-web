import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { Globals } from '../globals/globals';
import { ApiResponsePage } from '../models/apiResponsePage';
import { Mission } from '../models/mission';
import { MissionState } from '../models/missionState';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messageMissionsCount: string;

  response: ApiResponsePage;
  missions: Mission[] = [];
  
  public headers = ['Title', 'Description', 'Type', 'State', 'UserAssignee', 'UserAuthor', "State progress", "State set" ];

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
    this.httpClient.get<ApiResponsePage>
    (
      Globals.host + '/api/missions',
      { withCredentials : true, headers: this.getHeaders() }
    ).subscribe(res => this.handleResponse(res));
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
  }

  handleResponse(res: ApiResponsePage): void {
    this.missions = res.data;
    this.messageMissionsCount = "Page: " + (res.page.page + 1) + " of requested size: " + res.page.pageSize + ", out of total: " + res.page.totalCount + " elements.";
  }

  setNextState(missionId: number) {
    this.httpClient.patch
    (
      Globals.host + "/api/missions/" + missionId + "/state/next",
      null,
      { withCredentials : true, headers: this.getHeaders() }
    ).subscribe(res => this.reloadComponent(res));
  }

  setPreviousState(missionId: number) {
    this.httpClient.patch
    (
      Globals.host + "/api/missions/" + missionId + "/state/previous",
      null,
      { withCredentials : true, headers: this.getHeaders() }
    ).subscribe(res => this.reloadComponent(res));
  }

  resetState(missionId: number) {
    this.httpClient.patch
    (
      Globals.host + "/api/missions/" + missionId + "/state/reset",
      null,
      { withCredentials : true, headers: this.getHeaders() }
    ).subscribe(res => this.reloadComponent(res));
  }

  finishState(missionId: number) {
    this.httpClient.patch
    (
      Globals.host + "/api/missions/" + missionId + "/state/finish",
      null,
      { withCredentials : true, headers: this.getHeaders() }
    ).subscribe(res => this.reloadComponent(res));
  }

  reloadComponent(res: any): void {
    // this.router.navigate(["/"]);
    location.reload();
  }
}
