'use strict'
var request = require('supertest');
var MeetUpEvent = require('../../src/meetupevent');
var Weather = require('../../src/weather');
var expect = require('chai').expect;

describe('GET /meetup and weather together', () => {
  var meetUpEvent = new MeetUpEvent('Derry-Professional-Development-Meetup','233750253')
  var expectedFrom = Date.parse('2016-09-26')
  var expectedTo = Date.parse('2016-09-27')

  it('returns date for an event', (done) => {
      meetUpEvent.getEventDetails((actual)=>{
        expect(actual.eventTime).within(expectedFrom, expectedTo);
        expect(actual.city).equal('Londonderry');
        var weather = new Weather(actual.city,actual.country,actual.eventTime)
        console.log(actual)
          weather.getIsGoingToRain((otherActual)=>{
          //expect(actual).to.deep.equal(expected);
            console.log(otherActual)
            expect(otherActual).to.equal(true);
            done()
          })

      })
    })
})
