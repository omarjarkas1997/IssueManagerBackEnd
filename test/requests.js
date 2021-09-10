var request = require('request');
var expect = require("chai").expect;
const jwtFunctions = require('../controllers/jwtControllers');
const { assert } = require("chai");



// Testing User resgisteration Routes
describe("Register Request", function () {
  it("Creating an existing User", function () {
    const email = "uq1"
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/register',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": "604ae695332a8a438c0317a4",
        "firstName": "Steve",
        "lastName": "Harvey",
        "email": `${email}@blx.com`,
        "password": "1234567809",
        "profileImage": "profile-images\\604ae695332a8a438c0317a4-image3.jpeg"
      })
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      assert.equal(JSON.stringify({ error: 'User already exists!' }), response.body);
    });
  });
  it("Creating a new User", function () {
    var number = Math.floor((Math.random() * 10000000));
    const email = "uq1" + number
    var reqBody = {
      firstName: "Steve",
      lastName: "Harvey",
      email: `${email}@blx.com`,
      password: "1234567809",
      profileImage: "profile-images\\604ae695332a8a438c0317a4-image3.jpeg"
    }
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/register',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    };

    var expectedBody = {
      firstName: "Steve",
      lastName: "Harvey",
      profileImage: "profile-images/default-profile-picture.jpeg",
      token: jwtFunctions.generateJwtToken('1234', reqBody.firstName, reqBody.lastName)
    }
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      assert(expectedBody, response.body);
    });
    describe("Verifying that a normal user cannot view all users", function () {
      it("Admin has the permission to view all user", function () {
        var options = {
          'method': 'GET',
          'url': 'http://localhost:3000/all-users',
          'headers': {
            'Authorization': `Bearer ${expectedBody.token}`
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(JSON.parse(JSON.stringify(response)).statusCode);
          assert.equal(JSON.parse(JSON.stringify(response)).statusCode, 403);
        });    
      });
    });
  });
  it("Creating a new Admin", function () {
    var number = Math.floor((Math.random() * 10000000));
    const email = "omar" + number
    var reqBody = {
      firstName: "omar",
      lastName: "oj",
      email: `${email}@blx.com`,
      password: "1234567809",
      profileImage: "profile-images\\604ae695332a8a438c0317a4-image3.jpeg"
    }
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/register',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    };

    var expectedBody = {
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      profileImage: "profile-images/default-profile-picture.jpeg",
      token: jwtFunctions.generateJwtTokenAdmin('1234', reqBody.firstName, reqBody.lastName)
    }
    
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      assert(JSON.stringify(expectedBody), response.body);
    });
    describe("Verifying route only accesable to the Admin", function () {
      it("Admin has the permission to view all user", function () {
        var options = {
          'method': 'GET',
          'url': 'http://localhost:3000/all-users',
          'headers': {
            'Authorization': `Bearer ${expectedBody.token}`
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(JSON.parse(JSON.stringify(response)).statusCode);
          assert(JSON.parse(JSON.stringify(response)).statusCode, 200);
        });    
      });
    });
  });
});


// Testing User Permission Routes

describe("Getting information f", function () {
  it("Creating an existing User", function () {

  });
});

