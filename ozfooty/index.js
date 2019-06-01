
const express = require('express')
const app = express()
const port = 3000
const https = require('https');
var HTMLParser = require('node-html-parser');
var html2json = require('html2json').html2json;

function getPlayers() {

    var promise = new Promise(function (resolve, reject) {
        // do a thing, possibly async, then…
     
        https.get('https://en.wikipedia.org/wiki/2019_AFL_season', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(Error('It broke'));
        });

    });

    return promise;

}


var environmentRoot = require('path').normalize(__dirname);
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(environmentRoot + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Api for getting all the users
app.get("/getTopPlayers", function (req, res) {

    getPlayers().then(function(result) {
        //console.log(result); // "Stuff worked!"
       
        var startIndex = result.indexOf('<li>Numbers underlined indicates the player did not play in that round.</li></ul>');
        var endIndex = result.indexOf('<h3><span class="mw-headline" id="Player_milestones">Player milestones<');
        var dd = result.substring(startIndex+81, endIndex);
        var r = dd.replace("/'<td></td>'/g", "");
        var json = html2json(r);
        //console.log();
        console.log(typeof json.child);
      
        const values = Object.values(json.child);
        const keys = Object.keys(json.child);

        console.log(keys.length);
        // for(var i = 0 ; i < keys.length;i++)
        // {
        //     console.log(values[i],"end");
        // }
       var rows =  Object.values((Object.values(values[1].child)[1].child));
       
        console.log(rows);
 
        var root = HTMLParser.parse(r);
      //  console.log(root.firstChild.firstChild);
        console.log(startIndex);
        console.log(endIndex);
        res.send({htmlData: 'ravi'});
      }, function(err) {
        console.log(err); // Error: "It broke"
      });
});



// var port = 3000;
// var express = require('express');
// var app = express();
// var server = app.listen(port);


// var morgan = require('morgan');
// var bodyParser = require('body-parser');

// var path = require('path');


// app.use(express.static(__dirname + '/dist/'));
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//  app.use(morgan('dev'));                                         // log every request to the console
//  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
//  app.use(bodyParser.json());


// //Api for getting all the users
//    app.get("/api/getUsers", function(req, res)
//   {
//    users.once("value")
//    .then(function(snapshot){
//         res.send(snapshot.val());
//    });
//  });


//  //Validate the email if it is in the correct format
//  function validateEmail(email)
//   {
//     var x = email;
//     //console.log(x);
//     var atpos = x.lastIndexOf('@');
//     var dotpos = x.lastIndexOf(".");
//     if (atpos < 1 || dotpos<atpos+2 || dotpos+2>=x.length)
//      {
//         throw new Error("Please enter a valid e-mail address");
//      }
//      return true;
//  }





