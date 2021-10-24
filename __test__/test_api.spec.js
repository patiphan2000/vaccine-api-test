const supertest = require('supertest')
const request = supertest.agent('https://suchonsite-server.herokuapp.com');

describe('People information', () => {
  /**
	 * Test ID: 1
	 *
	 * GET all people information.
	 */
  it('all people information', () => {
    return request.get('/people/all').expect(200);
  });

  /**
	 * Test ID: 2
	 *
	 * GET people information by specific date.
	 */
  it('information from specific date', () => {
    return request.get('/people/by_date/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
    })
  });

  /**
	 * Test ID: 3
	 *
	 * GET people information with no date given.
	 */
  it('no date', () => {
    return request.get('/people/by_date/')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  /**
	 * Test ID: 4
	 *
	 * GET people information from the past that data don't exist.
	 */
  it('information from the middle era', () => {
    return request.get('/people/by_date/20-10-1469')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  /**
	 * Test ID: 5
	 *
	 * GET people information from the future that data don't exist.
	 */
  it('information from the future', () => {
    return request.get('/people/by_date/20-10-2023')
    .then((response) => {
      expect(response.status).toBe(202)
    })
  });

  /**
	 * Test ID: 6
	 *
	 * GET people information by using invalid date format.
	 */
  it('invalid date format 1', () => {
    return request.get('/people/by_date/2021-10-20')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  /**
	 * Test ID: 7
	 *
	 * GET people information by using invalid date format.
	 */
  it('invalid date format 2', () => {
    return request.get('/people/by_date/20/OCT/2023')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  /**
	 * Test ID: 8
	 *
	 * GET people information by using invalid date format.
	 */
  it('invalid date format 3', () => {
    return request.get('/people/by_date/20-OCT-2023')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });
});


describe('Retrive data from Gov', () => {
  /**
	 * Test ID: 9
	 *
	 * GET people information from Gov on specific date.
	 */
  it('retrive data from specific date', () => {
    return request.post('/getDataFromGov/20-10-2021')
    .then((response) => {
      expect(response.status).toBe(401)
      expect(response.body.msg).toBe('already have data in this date.')
    })
  });

  /**
	 * Test ID: 10
	 *
	 * GET people information from Gov with no date given.
	 */
  it('no date', () => {
    return request.post('/getDataFromGov/')
    .then((response) => {
      expect(response.status).toBe(202)
      expect(response.body.msg).toBe('no date included.')
    })
  });

  /**
	 * Test ID: 11
	 *
	 * GET people information from Gov with invalid date format.
	 */
  it('invalid date format 1', () => {
    return request.post('/getDataFromGov/2021-10-20')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  /**
	 * Test ID: 12
	 *
	 * GET people information from Gov with invalid date format.
	 */
  it('invalid date format 2', () => {
    return request.post('/getDataFromGov/20/10/2021')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });

  /**
	 * Test ID: 13
	 *
	 * GET people information from Gov with invalid date format.
	 */
  it('invalid date format 3', () => {
    return request.post('/getDataFromGov/20-OCT-2021')
    .then((response) => {
      expect(response.status).toBe(404)
    })
  });
});
