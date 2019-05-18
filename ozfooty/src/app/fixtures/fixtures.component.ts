import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  teamData = [];

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
    height: 'auto',
    placeholder: '1', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
     customComparator: (a:number, b:number) => {return a - b; }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  teamOptions = [];

  setRounds() {
    for (let i = 1; i <= 23; i++ ) {
      this.roundOptions.push(i);
    }

  }


  constructor(private dataService: DataService ) {

  }

  getDropdownTeamInfo() {
    this.dataService.getTeam().then((data:any)=>{
      console.log('Team data-->>', data.teams);
      this.teamData = data.teams;
    });
  }



  ngOnInit() {
    // this.roundOptions.apply(null, {length: N}).map(Number.call, Number)
    this.setRounds();
    this.getDropdownTeamInfo();
  }

}
