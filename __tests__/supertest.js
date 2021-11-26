const request = require('supertest');
const db = require('../server/models/EntryModel')
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/users/signup', () => {
    describe('POST', () => {
      // beforeAll((done) => {
      //   const queryString = 'DELETE FROM users WHERE users.username = "suzuki"'
      //   db.query(queryString)
      //     .then((data) => done());
      // })
      afterAll((done) => {
        const queryString = `DELETE FROM users WHERE username = 'suzuki';`
        db.query(queryString)
          .then((data) => done());
      })

      it('should return status 400 if username or password are not provided', () => {
        return request(server)
          .post('/users/signup')
          .send({ password: 'password', full_name: 'suzuki', email: 'suzuki@aol.com' })
          .expect(400)
      })

      it('should return status 400 if password is not provided', () => {
        return request(server)
          .post('/users/signup')
          .send({ full_name: 'suzuki', email: 'suzuki@aol.com' })
          .expect(400)
      })

      it('should return status 200 and application/json content type on successful signup', () => {
        return request(server)
          .post('/users/signup')
          .send({ full_name: 'suzuki', username: 'suzuki', password: 'password', email: 'suzuki@aol.com' })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
      })
      it('should return status 500 if username already exists', () => {
        return request(server)
          .post('/users/signup')
          .send({ full_name: 'suzuki', username: 'test', password: 'password', email: 'suzuki@aol.com' })
          .expect(500)
      })
    })
  })
})

xdescribe('/users/login', () => {

})

// no user_id
describe('/api', () => {
  describe('GET', () => {
    it('responds with 400 status and application/json content type when no user_id is provided', () => {
      return request(server)
        .get('/api')
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })
})





