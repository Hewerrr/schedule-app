import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamsPage} from '../pages'


@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments = [{name: 'Tournament #1'}, {name: 'Tournament #2'}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  itemTapped(){
    this.navCtrl.push(TeamsPage);
  }

}
