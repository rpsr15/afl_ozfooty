import { Component, OnInit } from '@angular/core';
import {Game} from '../model/game.model';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-head-on-head-cmp',
  templateUrl: './head-on-head-cmp.component.html',
  styleUrls: ['./head-on-head-cmp.component.css']
})
export class HeadOnHeadCmpComponent implements OnInit {
  teams: [];
  matches : [];

  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,

  };
  options = [];
  myTeamSelect: any = [];
  rivalTeamSelect: any = [];

  gameResults:any = [];

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  ngOnInit() {
      this.getDropdownTeamInfo();
  }

    getDropdownTeamInfo() {
      this.dataService.getTeam().then((data:any)=>{
        console.log('Team data-->>',data.teams);
        this.options = data.teams;
      });
    }

    headToHead() {

    this.gameResults = [];


      let myteam = this.myTeamSelect.id;
      let rivalTeam = this.rivalTeamSelect.id;

      this.dataService.getGameData('2019').then((data:any) => {

        const games = data.games;

        for (let index in games) {

          // filter with team index
          const game = games[index] ;
          // console.log(game);
          // for selected team
          // console.log(game.ateamid, game.hteamid, myteam, rivalTeam);
          if ((game.ateamid == myteam || game.hteamid == myteam) && (game.ateamid == rivalTeam || game.hteamid == rivalTeam)) {
            // console.log(game);

            this.gameResults.push(game);

            // // Away Team
            // console.log('Away Team', game.ateam);
            //
            // // Home Team
            // console.log('Home Team', game.hteam);
            //
            // // Winner
            // console.log('Winner Team', game.winner || 'Not Available');
          }

        }
        console.log(this.gameResults);
        // this.gameResults.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
      });

    }

  // headToHead(MyTeam, RivalTeam) {
  //   // As a fan, I want to see the head-to-head games and if available, results between my team and my team's rival.
  //
  //   let myteam = MyTeam;
  //   let rivalTeam = RivalTeam;
  //
  //   // get all the games of year 2019
  //   this.httpClient.get('https://api.squiggle.com.au/?q=games;year=2019').subscribe(
  //     (res) => {
  //       console.log(res);
  //       let games  = res.games as [Game];
  //       for (let index in games) {
  //
  //         // filter with team index
  //         let game = games[index] as Game;
  //         // for selected team
  //         if ((game.ateamid === myteam || game.hteamid === myteam) && ((game.ateamid === rivalTeam || game.hteamid === rivalTeam))) {
  //           console.log(game);
  //
  //           // Away Team
  //           console.log('Away Team', game.ateam);
  //
  //           // Home Team
  //           console.log('Away Team', game.hteam);
  //
  //           // Winner
  //           console.log('Away Team', game.winner || 'Not Available');
  //         }
  //       }
  //     }
  //   );
  // }


}
