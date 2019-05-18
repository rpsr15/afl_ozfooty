import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {LadderItem} from '../model/ladder-item.model';
import {Game} from '../model/game.model';

@Component({
  selector: 'app-ladder-page',
  templateUrl: './ladder-page.component.html',
  styleUrls: ['./ladder-page.component.css']
})


export class LadderPageComponent implements OnInit {
  gameData: Array<Game> = [];
  ladder: Array<LadderItem> = [];
  options = ['2017', '2018', '2019'];
  config = {
    height: 'auto',
    placeholder: '2019', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
   // customComparator: ()=>{} // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  constructor(private service: DataService) { }

  ngOnInit() {

    // get ladder
    this.service.getLadder().then(
      (result) => {
        console.log(result);
        //console.log("round is"+result[0].round);
        //get data for round
        //get game data for current year and round
       
        this.service.getGamesByRoundYear(2019, result[0].round).then(
          (gameD:any) => {
            console.log(gameD);
            
            //generate data
            this.generateData(gameD);

          }
        );

        for (const index in result){

          this.ladder.push(result[index]);
        }


      }
    );

  }

  generateData(data)
  {
    console.log("generte data",this.ladder.length,this.gameData.length);
  }



}
