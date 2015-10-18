var assert = require('assert');
var request = require('supertest');
var nock = require('nock');
var mongoose = require('mongoose');
var app = require('../../app');
var agent = request.agent(app);

// TODO: Figure out how to record HTTP requests (using nock?)!

describe("Restaurants Controller", function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/test');
    mongoose.connection.on('open', function(){
      mongoose.connection.db.dropDatabase(function (err) {
        console.log('Test database dropped.');

        // TODO: Seed database?

        mongoose.connection.close();
        done();
      });
    });
  });

  describe("GET /search", function() {
    var restaurantSearchRequest;

    describe("one search result", function() {
      before(function(done) {
        restaurantSearchRequest = agent
          .get('/api/restaurants/search?name=Helena\'s+Hawaiian&location=Hawaii')
          .set('Accept', 'application/json');
        done();
      });

      it("responds with json", function(done) {
        restaurantSearchRequest
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      it("returns an array of restaurants (name & address)", function(done) {
        restaurantSearchRequest
          .expect(200, function(err, res) {
            assert.equal(res.body.length, 1);

            var keys = ['name', 'address'];
            assert.deepEqual(Object.keys(res.body[0]), keys);
            done();
          });
      });

      it("the restaurant object has the correct results", function(done) {
        restaurantSearchRequest
          .expect(200, function(error, res) {
            assert.equal(res.body[0].name, "Helena's Hawaiian Food");
            assert.equal(res.body[0].address, "1240 N School St, Honolulu, HI 96817, United States");
            done();
          });
      });
    });

    describe("one search result", function() {
      before(function(done) {
        restaurantSearchRequest = agent
          .get('/api/restaurants/search?name=Teddy\'s+Burgers&location=Honolulu')
          .set('Accept', 'application/json');
        done();
      });

      it("responds with json", function(done) {
        restaurantSearchRequest
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      it("returns an array of restaurants (name & address)", function(done) {
        restaurantSearchRequest
          .expect(200, function(err, res) {
            assert.equal(res.body.length, 9);

            var keys = ['name', 'address'];
            for (var i = 0; i < res.body.length; i++) {
              assert.deepEqual(Object.keys(res.body[i]), keys);
              if (i == res.body.length - 1) {
                done();
              }
            }
          });
      });

      it("returns an object with the correct results", function(done) {
        restaurantSearchRequest
          .expect(200, function(error, res) {
            assert.equal(res.body[0].name, "Teddy's Bigger Burgers");
            assert.equal(res.body[0].address, "134 Kapahulu Ave, Honolulu, HI 96815, United States");
            done();
          });
      });
    });
  });

  describe("GET /select", function() {
    var restaurantSelectRequest;

    before(function(done) {
      restaurantSelectRequest = agent
        .get('/api/restaurants/search')
        .query({ name:"Helena's Hawaiian Food", address:"1240 N School St, Honolulu, HI 96817, United States" })
        .set('Accept', 'application/json');
      done();
    });

    it("responds with json", function(done) {
      restaurantSelectRequest
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it("returns a restaurant object", function(done) {
      restaurantSelectRequest
        .expect(200, function(err, res) {
          var keys = ['name', 'address'];
          assert.deepEqual(Object.keys(res.body), keys);
        });
    });

    it("returns an object with the correct results", function(done) {
      restaurantSelectRequest
        .expect(200, function(error, res) {
          assert.equal(res.body.name, "Helena's Hawaiian Food");
          assert.equal(res.body.address, "1240 N School St, Honolulu, HI 96817, United States");
          done();
        });
    });
  });
});
