const supertest = require('supertest')
const request = supertest.agent('https://suchonsite-server.herokuapp.com');

describe('People information', () => {
  it('all people information', () => {
    return request.get('/people/all').expect(200);
  });

  it('no date', () => {
    return request.get('/people/by_date/')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  it('information from specific date', () => {
    return request.get('/people/by_date/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
    })
  });
});


describe('Retrive data from Gov', () => {
  it('retrive data from Gov', () => {
    return request.post('/getDataFromGov/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(401)
      expect(response.body.msg).toBe('already have data in this date.')
    })
  });
});
