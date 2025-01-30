const request = require('request');
const app = require('./app');

describe('Testing the steamos website', () => {
    test('GET api/bandmembers',() => {
        return request(app)
            .server('/api/bandmembers')
            .expect(200)
    })
});
