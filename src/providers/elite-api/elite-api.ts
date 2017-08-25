import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs';

@Injectable()
export class EliteApi {

  currentTournament: any;
  private baseUrl = 'https://elite-schedule-app-13363.firebaseio.com';

  constructor(public http: Http, ) {
  }

  getTournaments(){
    return new Promise((resolve) => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tournamentId): Observable<any>{
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
                    .map((response:Response) => {
                      this.currentTournament = response.json();
                      return this.currentTournament;
                    });
  }

  getCurrentTournament(){
    return this.currentTournament;
  }
}
