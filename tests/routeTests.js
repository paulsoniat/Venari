const { expect } = require('chai');
const models = require('../database/models');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
const routeHelpers = require('../routehelpers.js');
const dbHelpers = require('../database/dbHelper.js');

chai.use(chaiHttp);


describe('Testing test', () => {
  it('should run this test', () => {
    expect(true).to.equal(true);
  });
});

describe('Server test', () => {
  it('should list all submissions on Get', (done) => {
    chai.request(server)
      .get('/findSubmissions', routeHelpers.getSubmissionsData)
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
});

describe('DB helper', () => {
  it('should find a challenge by id', (done) => {
    const result = dbHelpers.getChallengeById(1);
    result.should.be.json
    done();
  });
});

