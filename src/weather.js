require('dotenv').config();

var http = require('http');

var timediff = require('timediff');



function Weather (city,country,date){

  var numberOfDays = timediff(Date.now(), date, 'D').days;

  this.options = {
    //api.openweathermap.org/data/2.5/forecast/daily?id=2643734&cnt=12&APPID=3b225c2b019fc478ae626961489a691d
    //api.openweathermap.org/data/2.5/forecast/daily?q=Londonderry,gb&cnt=12&APPID=3b225c2b019fc478ae626961489a691d
    host: 'api.openweathermap.org',
    path: '/data/2.5/forecast/daily?q='+city+','+country+'&cnt='+numberOfDays+''+'&APPID=' + process.env.WEATHER_KEY
  };

}

Weather.prototype.getIsGoingToRain = function(callback){

  var cbfunc = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      var JSONevent = JSON.parse(str)
      //console.log(JSONevent.list[JSONevent.list.length-1])
      //console.log(!(JSONevent.list[JSONevent.list.length-1].weather[0].description.indexOf('rain')===-1))

      callback(!(JSONevent.list[JSONevent.list.length-1].weather[0].description.indexOf('rain')===-1))

    });
  }

  http.request(this.options, cbfunc).end();

}

module.exports = Weather;
