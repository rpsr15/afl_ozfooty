import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {Team} from '../model/team.model';
import {LadderItem} from '../model/ladder-item.model';

@Injectable()

export class DataService {


  matches = [];
  teams: Array<Team> = [];
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


  getLadder()
  {
    const ladderURL = 'https://api.squiggle.com.au/?q=ladder;source=1';
    const promise = new Promise(
      (resolve) => {
        this.httpService.get(ladderURL).subscribe(
          (data: any) => {
            const ladderData = data.ladder
            // tslint:disable-next-line:prefer-const
            let ladderItem: Array<LadderItem> = [];
            for (const index in ladderData){

              const item = ladderData[index];

              const tm = new LadderItem(
                +item.year,
                +item.round,
                +item.rank,
                +item.percentage,
                item.source,
                item.team,
                Date.parse(item.updated)
              );
              ladderItem.push(tm);
            }
            //sort ladderItem array
            ladderItem.sort((a,b) => {
              return a.rank - b.rank;
            });
            resolve(ladderItem);
          }
        );
      }
    );
    return promise;
  }


// return team as an array of string
  getTeam() {


    const promise = new Promise((resolve) => {
        if ( this.teams.length && this.teams.length > 0) {
          console.log("mil gayi ghar se");
          resolve(this.teams);
        } else {
          console.log("bhar se mil gati");
          this.httpService.get(this.teamURL).subscribe(
            (data) => {
              resolve(data);
            }
          );
        }
      }
    );


    return promise;
  }
}
