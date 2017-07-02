require("babel/register");
const app = require('../app');
const User = require('../models/user');
const request = require('supertest');
const q = require('q');

function Authed() {
  let agent = request(app);
  let deferred = q.defer();
  let token = "";
  let user = null;

  let admin = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@admin.com',
    password: 'password'
  };

  function createAdmin(done) {
    User.remove(() => {
      user = new User(admin);

      user.save(function(err) {
        if (err) return done(err);

        getToken(done);
      });
    });
  }

  function getToken(done) {
    agent
      .post('/api/auth/login')
      .send(admin)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        deferred.resolve();
        done();
      });
    return deferred.promise;
  }

  return {
    authorize: function() {
      before(function(done) {
        createAdmin(done);
      });
    },
    token: function() {
      return token;
    },
    get: function(url) {
      return agent.get(url).set('authorization', token);
    },
    post: function(url) {
      return agent.post(url).set('authorization', token);
    },
    put: function(url) {
      return agent.put(url).set('authorization', token);
    },
    delete: function(url) {
      return agent.delete(url).set('authorization', token);
    },
    userId: function() {
      return user._id;
    }
  }
}

module.exports = new Authed();
