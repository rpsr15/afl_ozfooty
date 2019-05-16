import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';

@Injectable()

export class DataService {

    teams: [];
    matches: [];

    gameURL = 'https://api.squiggle.com.au/?q=games;year=';
    teamURL = 'https://api.squiggle.com.au/?q=teams';

    newsUrl = 'https://newsapi.org/v2/top-headlines?country=au&category=sports&apiKey=bfcd98dce90244bd8d79b0e7f3b50511&q=afl';
    headlines: string[];
    constructor(private httpService: HttpClient) {

    }

    getNews() {
        const promise = new Promise(
            (resolve) => {
                this.httpService.get(this.newsUrl).subscribe(
                    (data: any) => {
                        const news = [];
                        const articles  = data.articles;
                        // tslint:disable-next-line: forin
                        for (const index in articles) {

                         news.push(articles[index].title);
                        }
                        resolve(news);
                    }
                );
             }
        );
        return promise;
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
