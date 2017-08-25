import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage, StandingsPage} from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.data;
  }

  goHome(){
    this.navCtrl.popToRoot();
  }
}
