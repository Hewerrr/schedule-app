import { Component } from '@angular/core';
import { NavController, LoadingController, LoadingOptions} from 'ionic-angular';
import { TeamsPage } from '../pages';
import { EliteApi } from '../../providers/providers';


@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;

  constructor(
    private navCtrl: NavController, 
    private api: EliteApi,
    private loadingController: LoadingController) {
  }

  itemTapped($event, tournament){
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad() {
    // console.log("ionViewDidLoad fired!");
    let loadingOptions: LoadingOptions = { 
      content: 'Loading...',
      duration: 1000};
    let loader = this.loadingController.create(loadingOptions);
    loader.present().then(() => {
      this.api.getTournaments()
        .then(tournaments => this.tournaments = tournaments);
    });
  }

  ionViewWillEnter() {
    // console.log("ionViewWillEnter fired!");
  }

  ionViewDidEnter() {
    // console.log("ionViewDidEnter fired!");
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave fired!");
  }

  ionViewDidLeave() {
    // console.log("ionViewDidLeave fired!");
  }

  ionViewWillUnload() {
    // console.log("ionViewWillUnload fired!");
  }
}
