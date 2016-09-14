'use strict'
var MeetUpEvent = require('../src/meetupevent');
var expect = require('chai').expect;

describe('GET /meetup', () => {
  var meetUpEvent = new MeetUpEvent('Derry-Professional-Development-Meetup','233750253')
  var expectedFrom = Date.parse('2016-09-26')
  var expectedTo = Date.parse('2016-09-27')

  it('returns date for an event', (done) => {
      meetUpEvent.getEventDetails((actual)=>{
      expect(actual.eventTime).within(expectedFrom, expectedTo);
      expect(actual.city).equal('Londonderry');
      expect(actual.country).equal('gb');
      done()
  })

  })
})
