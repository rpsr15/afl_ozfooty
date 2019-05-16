import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-news-healines',
  templateUrl: './news-healines.component.html',
  styleUrls: ['./news-healines.component.css']
})
export class NewsHealinesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadNews();
  }
  news = ["sdfsdfsdfsd", "sdfdsfdsfsd", "sdfdsfdsf"];

  loadNews()
  {
    this.dataService.getNews().then(
      (data : [string]) => {
        console.log(data);
        this.news = data;
        
      }
    );
  }

}
