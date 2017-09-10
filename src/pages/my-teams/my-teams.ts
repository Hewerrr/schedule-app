import { Component } from '@angular/core';
import { NavController, LoadingController, LoadingOptions } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi } from '../../providers/providers';

@Component({
    templateUrl: 'my-teams.html'
})
export class MyTeamsPage{
    
    favorites = [
        {
            team: {id: 6182, name: 'Team 1', coach: 'Coach'},
            tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'Tournament name'
        },
        {
            team: { id: 6182, name: 'Team 2', coach: 'Coach' },
            tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'Tournament name'
        }
    ];

    constructor(
        private nav: NavController, 
        private loadingController: LoadingController,
        private api: EliteApi) {
    }

    goToTournaments(){
        this.nav.push(TournamentsPage);
    }

    favoriteClicked($event, favorite){
        let loadingOptions: LoadingOptions = {
            content: 'Loading...',
            dismissOnPageChange: true
        };
        let loader = this.loadingController.create(loadingOptions);
        loader.present().then(() => {
            this.api.getTournamentData(favorite.tournamentId)
                .subscribe(tournaments => this.nav.push(TeamHomePage, favorite.team));
        });
    }
}