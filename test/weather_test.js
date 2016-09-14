'use strict'
var request = require('supertest');
var Weather = require('../src/weather');
var expect = require('chai').expect;

describe('GET /weather', () => {
  var weather = new Weather('Londonderry','gb','2016-09-26')
  // var expectedFrom = Date.parse('2016-09-26')
  //var expected = {}

  it('returns true if its raining in an specific date', (done) => {
      weather.getIsGoingToRain((actual)=>{
      //expect(actual).to.deep.equal(expected);
      //console.log(actual)
      expect(actual).to.equal(true);
      done()
  })
  })
})
