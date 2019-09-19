const request = require('supertest');

const server = require('../server');
const db = require('../database/dbConfig');
const bcrypt = require('bcrypt')


describe('server', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe('POST /api/register', () => {
    it('should return 201 status', () => {
      return request(server).post('/api/register')
        .send({
          username: "tommy",
          password: "password2"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.body.username).toBe('tommy')
        })
    })

    it('username should be {Name}', () => {
      return request(server).post('/api/register')
        .send({
          username: "newreg",
          password: "admin3"
        })
        .set('Content-Type', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
          // expect(res.body.username).toBe('newreg')
        })
    })
  })
});

describe('POST /LOGIN', () => {
  it('should return 200 status', () => {
  })
  it('username should be {Name}', () => {
    return request(server).post('/api/login')
      .send({
        username: "admin",
        password: "admin"
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body.username).toBe('admin')
      })
  })
})

describe('GET /api/users', () => {
  it('Returns json OK', () => {
    return request(server).get('/api/users')
      .expect('Content-Type', /json/)
  });

  it('Should Return 200 Status', () => {
    return request(server).get('/api/users')
      .set('authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY4ODgyNDc1LCJleHAiOjE1Njg5Njg4NzV9.0VrS0I-EVN8H40J0bABx7lwqd0GFHj8LvjQmNTbfNqg`)
      .then(res => {
        expect(res.status).toBe(200)
      })
  })

})
