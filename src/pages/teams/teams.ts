import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, LoadingOptions } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../providers/providers'

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];
  groupedTeams = [];

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private loadingController: LoadingController,
    private api: EliteApi) {
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({content: 'Loading...'});
    loader.present().then(() => {
      this.api.getTournamentData(this.navParams.data.id)
        .subscribe(result => {
          this.teams = result.teams;
          this.groupedTeams = this.groupBy(this.teams, 'division');
          loader.dismiss();
        });
    });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  groupBy(teams, division) {
    return teams.reduce(function (result, team) {
      let group = result.find(el => el.division === team.division);
      if(group){
        group.teams.push(team);
      }else{
        result.push({ division: team.division, teams: [team]})
      }
      return result;
    }, []);
  }

}
