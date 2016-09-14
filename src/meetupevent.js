require('dotenv').config();

var http = require('http');



function MeetUpEvent(groupName, eventID){
  this.options = {
    //https://api.meetup.com/2/events?key=1e572e134473441c24501d105e1d5646&group_urlname=ny-tech&sign=true
    host: 'api.meetup.com',
    path: '/'+groupName+'/events/'+eventID+'/' + '?=' + process.env.MEETUP_KEY

  };

}

MeetUpEvent.prototype.getEventDetails = function(callback){


  var cbfunc = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      var JSONevent = JSON.parse(str)
      //console.log(JSONevent)

      callback({city:JSONevent.venue.city,eventTime:JSONevent.time,country:JSONevent.venue.country})

    });
  }

  http.request(this.options, cbfunc).end();

}

module.exports = MeetUpEvent;
