import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [{name: 'Team #1'}, { name: 'Team #2'}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

}
