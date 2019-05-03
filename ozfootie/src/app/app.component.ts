import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.stadiumData = new Map();
    this.stadiumData.set("Adelaide Oval", 5006);
    this.stadiumData.set("Gabba", 4102);
    this.stadiumData.set("M.C.G.", 3002);
    this.stadiumData.set("Perth Stadium", 6100);
    this.stadiumData.set("Sydney Showground", 2127);
    this.stadiumData.set("Marvel Stadium", 3008);
    this.stadiumData.set("Kardinia Park", 3220);
    this.stadiumData.set("Carrara", 4211);
    this.stadiumData.set("S.C.G.", 2021);
    this.stadiumData.set("Manuka Oval", 2603);
    this.stadiumData.set("York Park", 7248);
    this.stadiumData.set("Eureka Stadium", 3350);
    this.stadiumData.set("Bellerive Oval", 7018);
    this.stadiumData.set("Marrara Oval", 812);
    //  / this.stadiumData.set("Jiangwan Stadium",1001);
    this.stadiumData.set("Riverway Stadium", 4815);
    this.stadiumData.set("Traeger Park", 870);
  }
  title = "ozfootie";
  stadiums;
  stadiumData;

  getDistance(first: number, second: number) {
    let url = `https://ultraventus.info/postalcode_distance/API.php?postalcode1={ $first }&postalcode2={ $second}`;
    this.http.get(url).subscribe(response => {
      return response;
    });
  }

  getNearest(postcode: number) {
    this.stadiums = new Set();
    let near = "";
    let maxDistance = 9999;
    let nearestCode = 0;
    console.log(this.getDistance(123, 124));
    // console.log("here"+this.stadiumData.size);
    this.stadiumData.forEach(
      function(key, value) {
        const diff = this.getDistance(postcode, key);
        if (diff < maxDistance) {
          maxDistance = diff;
          nearestCode = key;
        } // 1 2 3 4 5 6
      }.bind(this)
    );
    console.log(nearestCode);
  }

  getNextFive(teamId: number) {
    const url = "https://api.squiggle.com.au/?q=games;complete=0";
    this.http.get(url).subscribe((data: any) => {
      let count = 0;
      const games = data.games;
      // tslint:disable-next-line: forin
      for (const index in games) {
        const game = games[index];
        if ((game.ateamid === teamId || game.hteamid === teamId) && count < 5) {
          if (game.ateamid === teamId) {
            // our team is playing away
            console.log(
              game.ateam +
                " vs : " +
                game.hteam +
                "Venue: " +
                game.venue +
                " date:" +
                game.date
            );
          } else {
            // our team is playing at home
            console.log(
              game.hteam +
                " vs : " +
                game.ateam +
                "Venue: " +
                game.venue +
                " date:" +
                game.date
            );
          }
          count++;
        }
      }
    });
  } // end of getNextFive

  getPercent(teamId: number) {
    const url = "https://api.squiggle.com.au/?q=games;complete=0";
    this.http.get(url).subscribe((data: any) => {
      let found = false;
      const games = data.games;
      // tslint:disable-next-line: forin
      for (const index in games) {
        const game = games[index];
        if ((game.ateamid === teamId || game.hteamid === teamId) && !found) {
          found = true;
          this.http
            .get("https://api.squiggle.com.au/?q=tips;source=8;game=" + game.id)
            .subscribe((response: any) => {
              const hconfidence = response.tips[0].hconfidence;
              const aconfidence = 100 - hconfidence;
              if (game.ateamid === teamId) {
                // our team is playing away
                console.log(
                  "win percent: " + aconfidence + " date:" + game.date
                );
              } else {
                // our team is playing at home
                console.log(
                  "win percent: " + hconfidence + " date:" + game.date
                );
              }
            });
        }
      }
    });
  } // end of getPercent
}
