import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class DataService {

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
}
