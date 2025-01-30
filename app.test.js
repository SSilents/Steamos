const request = require('supertest');
const app = require('./app');

describe('Testing the steamos website', () => {
    test('GET api/bandmembers',() => {
        return request(app)
            .get('/api/bandmembers')
            .expect(200)
    })
});
