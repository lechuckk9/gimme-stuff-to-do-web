import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  missionsTitle = "Missions";

  constructor() { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;

        if (auth) {
          this.missionsTitle = "Your Missions";
        } else {
          this.missionsTitle = "Missions";
        }
      }
    );
  }

  logout(): void {
    localStorage.removeItem("jwt");
    Emitters.authEmitter.emit(false);
  }
}
