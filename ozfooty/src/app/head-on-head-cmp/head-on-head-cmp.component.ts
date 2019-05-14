import { Component, OnInit } from '@angular/core';
import {Game} from '../model/game.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-head-on-head-cmp',
  templateUrl: './head-on-head-cmp.component.html',
  styleUrls: ['./head-on-head-cmp.component.css']
})
export class HeadOnHeadCmpComponent implements OnInit {

  singleSelect: any = [];
  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,

  };
  options = [
    {
      "_id": "5a66d6c31d5e4e36c7711b7a",
      "index": 0,
      "balance": "$2,806.37",
      "picture": "http://placehold.it/32x32",
      "name": "Burns Dalton"
    },
    {
      "_id": "5a66d6c3657e60c6073a2d22",
      "index": 1,
      "balance": "$2,984.98",
      "picture": "http://placehold.it/32x32",
      "name": "Mcintyre Lawson"
    },
    {
      "_id": "5a66d6c376be165a5a7fae33",
      "index": 2,
      "balance": "$2,794.16",
      "picture": "http://placehold.it/32x32",
      "name": "Amie Franklin"
    },
    {
      "_id": "5a66d6c3f7854b6b4d96333b",
      "index": 3,
      "balance": "$2,537.14",
      "picture": "http://placehold.it/32x32",
      "name": "Jocelyn Horton"
    },
    {
      "_id": "5a66d6c31f967d4f3e9d84e9",
      "index": 4,
      "balance": "$2,141.42",
      "picture": "http://placehold.it/32x32",
      "name": "Fischer Erickson"
    },
    {
      "_id": "5a66d6c34cfa8cddefb31602",
      "index": 5,
      "balance": "$1,398.60",
      "picture": "http://placehold.it/32x32",
      "name": "Medina Underwood"
    },
    {
      "_id": "5a66d6c3d727c450794226de",
      "index": 6,
      "balance": "$3,915.65",
      "picture": "http://placehold.it/32x32",
      "name": "Goldie Barber"
    }
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
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
