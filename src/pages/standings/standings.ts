import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers'

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  standings: any[];
  allStandings: any[];
  team: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: EliteApi) {
  } 
  
  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.standings = this.api.getCurrentTournament().standings;

    this.allStandings = this.groupByDivision(this.standings);

    console.log(this.standings);
    console.log(this.allStandings);
  }

  groupByDivision(standings) {
    return standings.reduce(function (result, standing) {
      let group = result.find(el => el.divisionName === standing.division);
      if (group) {
        group.standings.push(standing);
      } else {
        result.push({ divisionName: standing.division, standings: [standing] })
      }
      return result;
    }, []);
  }

}
