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
  gameTips = [];
  dateArray = [];
  gameResults = [];
  gameDates: Set<string>;


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
  yearSelect: any = '2019';
  roundSelect: any = [];

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

  // formatCustomDate(d) {
  //   const d1 = new Date(d);
  //   const wkdy = this.weekday[d1.getDay()];
  //   const month = this.monthNames[d1.getMonth()];
  //   const ds: string = wkdy + ', ' + d1.getDate() + ' ' + month;
  //   return ds;
  // }

  getDropdownTeamInfo() {
    this.dataService.getTeam().then((data: any) => {
      // console.log('Team data-->>', data.teams);
      this.teamOptions = data.teams;
    });
  }



  ngOnInit() {
    // this.roundOptions.apply(null, {length: N}).map(Number.call, Number)
    this.getDropdownTeamInfo();
    this.setRounds();

  }





  headToHead() {

    if (this.roundSelect === undefined) {
      // this.dataService.getCurrentRound().then((data: any) => {
      //  this.getAndFormatDataArray(data)
      //
      // });

      this.dataService.getGameData(this.yearSelect).then((data: any) => {
          const games = data.games;

          for(let index in games) {
            const game = games[index];
            if (this.myTeamSelect) {
              const myteam = this.myTeamSelect.id;
                  // console.log('gg',data);
                  // console.log('aid',game.ateamid);

              if (game.ateamid == myteam || game.hteamid == myteam) {
                console.log('here');
                // this.storeGameAndDate(game, game.date);
                const gameDate = Date.parse(game.date);
                const today = new Date();

                // @ts-ignore
                if (gameDate > today) {
                  this.dataService.getTippings(game.id).then((tipData: any) => {

                    const tips = tipData.tips;

                    for (const i in tips) {
                      this.gameTips.push(tips[i]);
                    }

                    this.gameDates.add(game.date.slice(0, 10));
                    this.gameResults.push(game);

                  });
              }
              }
            }

          }
        // console.log('Tips ->',this.gameTips);
        // console.log('Game ->',this.gameResults);
      });


    } else {

      this.getAndFormatDataArray(this.roundSelect);
    }




  }

  // testDates() {
  //   console.log(this.gameDates);
  //   this.gameDates.forEach(
  //    (a) => {
  //      console.log(a);
  //    }
  //  );
  // }



  getAndFormatDataArray(round) {

    this.gameResults = [];
    this.dateArray = [];
    this.gameTips = [];
    this.gameDates = new Set();


    this.dataService.getGamesFixtures(this.yearSelect, round).then((data: any) => {

      const games = data;

      for (const index in games) {

        const game = games[index] ;


        if (this.myTeamSelect) {
          const myteam = this.myTeamSelect.id;
          if (game.ateamid == myteam || game.hteamid == myteam) {
            // this.storeGameAndDate(game, game.date);
            this.dataService.getTippings(game.id).then(( tipData: any) => {

              const tips = tipData.tips;

              for(const i in tips) {
                this.gameTips.push(tips[i]);
              }

              this.gameDates.add(game.date.slice(0, 10));
              this.gameResults.push(game);

            });
          }
        } else {
          this.dataService.getTippings(game.id).then(( tipData: any) => {

            const tips = tipData.tips;

            for(const i in tips) {
              this.gameTips.push(tips[i]);
            }

            this.gameDates.add(game.date.slice(0, 10));
            this.gameResults.push(game);

          });
        }

      }

      console.log('Tips ->', this.gameTips);
      console.log('Game ->', this.gameResults);

    });
  }





}
