import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';

@Injectable()

export class DataService {
    teams: [];
    matches: [];

    gameURL = 'https://api.squiggle.com.au/?q=games;year=';
    teamURL = 'https://api.squiggle.com.au/?q=teams';

    constructor(private httpService: HttpClient) {

    }



  getGameData(year) {


      const promise = new Promise((resolve) => {
            if (Array.isArray(this.matches) && this.matches.length) {
              resolve(this.matches);
            } else {
              this.httpService.get(this.gameURL + year).subscribe(
                (data) => {
                  // this.matches = data;
                  // console.log('DATA-->', data);
                  resolve(data);
                }
              );
            }
      });
      return promise;
  }

// return team as an array of string
  getTeam() {
      // if (Array.isArray(this.teams) && this.teams.length) {
      //   return this.teams;
      // }
      const promise = new Promise((resolve) => {
      this.httpService.get(this.teamURL).subscribe(
        (data) => {
          // convert to array of string
          resolve(data);

        }
      );
    });
      return promise;
  }

}
