import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../providers/providers'

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public api: EliteApi) {
  }

  ionViewDidLoad(){
    this.api.getTournamentData(this.navParams.data.id)
      .subscribe(result => this.teams = result.teams);
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

}
