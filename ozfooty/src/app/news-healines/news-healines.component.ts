import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { parse } from 'node-html-parser';

@Component({
  selector: 'app-news-healines',
  templateUrl: './news-healines.component.html',
  styleUrls: ['./news-healines.component.css']
})
export class NewsHealinesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadNews();
    // Get top players
      this.dataService.getTopPlayers().then(
        (data:any) =>
        {
          console.log('getting top players');
        //  console.log(data.htmlData);
          const root : any = parse(data.htmlData);
          console.log(data.htmlData);
         
        }
      );

  }
  news = [];

  loadNews()
  {
    this.dataService.getNews().then(
      (data: [string]) => {
        // console.log(data);
        this.news = data;

      }
    );
  }

}
