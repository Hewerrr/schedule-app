import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers';
import { TeamHomePage} from '../pages';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: EliteApi) {

  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
  }

  teamTapped($event, teamId){
    let tournamentData = this.api.getCurrentTournament();
    let team = tournamentData.teams.find(team => team.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
