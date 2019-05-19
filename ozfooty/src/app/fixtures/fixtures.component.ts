import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {formatDate} from '@angular/common';
import {Game} from '../model/game.model';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  weekday: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday', 'Saturday'];
  monthNames: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  games: Array<Game> = [];
  dateArray = [];
  gameResults = [];
  gameDates: Set<string>;
   minDate ;
   maxDate;
  yearOptions = ['2017', '2018', '2019'];
  yearConfig = {
    height: 'auto',
    placeholder: '2019', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
    // customComparator: ()=>{} // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  yearSelect = [];

  roundOptions = [];
  roundConfig = {
    height: '20vw',
    placeholder: 'Round', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
     customComparator: (a: number, b: number) => a - b, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  roundSelect = [];

  teamOptions = [];
  teamConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    height: '20vw',
    placeholder: 'Team', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
    customComparator: (a: number, b: number) => a - b, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  myTeamSelect: any = [];

  setRounds() {
    for (let i = 1; i <= 23; i++ ) {
      this.roundOptions.push(i);
    }

  }


  constructor(private dataService: DataService ) {
     this.gameDates = new Set();
  }

  // storeGameAndDate(game, gameDate) {
  //   if(this.dateArray && this.dateArray.filter(e => e.date !== game.date)) {
  //       console.log("heree");
  //     const d = this.formatCustomDate(gameDate);
  //
  //     const obj = {
  //       date: gameDate,
  //       formatedDate: d
  //     };
  //
  //     this.dateArray.push(obj);
  //
  //   }
  //
  //   this.gameResults.push(game);
  // }

  formatCustomDate(d) {
    const d1 = new Date(d);
    const wkdy = this.weekday[d1.getDay()];
    const month = this.monthNames[d1.getMonth()];
    const ds: string = wkdy + ', ' + d1.getDate() + ' ' + month;
    return ds;
  }

  getDropdownTeamInfo() {
    this.dataService.getTeam().then((data: any) => {
      console.log('Team data-->>', data.teams);
      this.teamOptions = data.teams;
    });
  }



  ngOnInit() {
    // this.roundOptions.apply(null, {length: N}).map(Number.call, Number)
    this.getDropdownTeamInfo();
    this.setRounds();
   // this.dataService.getCurrentRound();

  }





  headToHead() {

    if (this.roundSelect === undefined) {
      this.dataService.getCurrentRound().then((data: any) => {
        this.getAndFormatDataArray(data);

      });
    } else {
      this.getAndFormatDataArray(this.roundSelect);
    }



  }

  testDates()
  {
    console.log(this.gameDates);
    this.gameDates.forEach(
     (a) => {
       console.log(a);
     }
   );
  }



  getAndFormatDataArray(round) {

    this.gameResults = [];
    this.dateArray = [];


    this.dataService.getGamesByRoundYear('2019', round).then((data: any) => {

      const games = data;
      console.log('games data -->', data);

      for(const index in games) {

        // filter with team index
        // console.log('in for');
        const game = games[index] ;

        // console.log();
        // this.games.push(game);
        // let currentDate = Date.parse(game.date);
        // console.log(currentDate.getDate());
        // cosole.log(currentDate.get)

        if (this.myTeamSelect) {
          const myteam = this.myTeamSelect.id;
          if (game.ateamid == myteam || game.hteamid == myteam) {
            // this.storeGameAndDate(game, game.date);
            this.gameDates.add(game.date.slice(0, 10));
            this.gameResults.push(game);
          }
        } else {
          // this.storeGameAndDate(game, game.date);
          this.gameDates.add(game.date.slice(0, 10));
          this.gameResults.push(game);
        }

      }
      // done loading data into gamess array and dates
      // this.testDates();
      console.log('GAME --> ',this.gameResults);
    });
  }





}
