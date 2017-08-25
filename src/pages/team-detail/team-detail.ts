import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers';
import { GamePage} from '../pages';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: any;
  games = [];
  tournamentData:any;

  constructor(
    private navCtrl: NavController, 
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
      })
  }

  private getScores(isTeam1, team1Score, team2Score){
    if (!team1Score || team2Score)
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

}
