import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers';
import { GamePage} from '../pages';

import * as moment from 'moment';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: any;
  games = [];
  allgames: any[];
  tournamentData:any;
  teamStanding: any = {};
  dateFilter: string;
  useDateFilter = false;
  isFollowing = false;

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    private navParams: NavParams,
    private api: EliteApi) {
      this.team = this.navParams.data;
  }

  ionViewDidLoad(){
    this.tournamentData = this.api.getCurrentTournament();
    this.games = this.tournamentData.games
      .filter(game => game.team1Id == this.team.id || game.team2Id == this.team.id)
      .map(game => {
        let isTeam1 = game.team1Id === this.team.id;
        let opponentName = isTeam1 ? game.team2 : game.team1;
        let scoreDisplay = this.getScores(isTeam1, game.team1Score, game.team2Score);
        return {
          gameId: game.id,
          teamId: this.team.id,
          opponent: opponentName,
          time: Date.parse(game.time),
          location: game.location,
          locationUrl: game.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? 'vs.' : 'at')
        }
      });
      this.allgames = this.games;
      this.teamStanding = this.tournamentData.standings.find(s => s.teamId === this.team.id);
  }

  private getScores(isTeam1, team1Score, team2Score){
    if (!team1Score || !team2Score)
      return '';

    let teamScore = isTeam1 ? team1Score : team2Score;
    let opponentScore = isTeam1 ? team2Score : team1Score;
    let winIndicator = teamScore > opponentScore ? 'W' : 'L';
    return `${winIndicator}:   ${teamScore} --- ${opponentScore}`;
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game: any){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBangeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = this.allgames.filter(g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allgames;
    }
  }

  toggleFollow(){
    if (this.isFollowing) {
      let confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            handler: () => { 
              this.isFollowing = false;
              // TODO: persist data

              let toast = this.toastCtrl.create({
                message: 'You have unfollowed this team!',
                duration: 2000,
                position: 'bottom'
              });
              toast.present(); 
            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      // TODO: persist data
    }
  }

}
