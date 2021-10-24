const supertest = require('supertest')
const request = supertest.agent('https://suchonsite-server.herokuapp.com');

describe('People information', () => {
  it('all people information', () => {
    return request.get('/people/all').expect(200);
  });

  it('no date', () => {
    return request.get('/people/by_date/')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  it('information from specific date', () => {
    return request.get('/people/by_date/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
    })
  });

  it('information from the middle era', () => {
    return request.get('/people/by_date/20-10-1469')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  it('information from the future', () => {
    return request.get('/people/by_date/20-10-2023')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  it('invalid date format 1', () => {
    return request.get('/people/by_date/2021-10-20')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  it('invalid date format 2', () => {
    return request.get('/people/by_date/20/OCT/2023')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  it('invalid date format 3', () => {
    return request.get('/people/by_date/20-OCT-2023')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });
});


describe('Retrive data from Gov', () => {
  it('no date', () => {
    return request.post('/getDataFromGov/')
    .then((response) => {
      expect(response.status).toBe(202)
      expect(response.body.msg).toBe('no date included.')
    })
  });

  it('retrive data from specific date', () => {
    return request.post('/getDataFromGov/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(401)
      expect(response.body.msg).toBe('already have data in this date.')
    })
  });

  it('invalid date format 1', () => {
    return request.post('/getDataFromGov/2021-10-20')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  it('invalid date format 2', () => {
    return request.post('/getDataFromGov/20/10/2021')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  it('invalid date format 3', () => {
    return request.post('/getDataFromGov/20-OCT-2021')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });
});
