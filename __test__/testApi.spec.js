const supertest = require('supertest')
const request = supertest.agent('https://suchonsite-server.herokuapp.com');

describe('All people information', () => {
  /**
	 * Test ID: 1
	 *
	 * GET all people information.
	 */
  it('all people information', async () => {
    return await request.get('/people/all')
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.any(Object))
    })
  });
})

describe('People information by date', () => {
  /**
	 * Test ID: 2
	 *
	 * GET people information by specific date.
	 */
  it('information from specific date', async () => {
    return await request.get('/people/by_date/29-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
      // expect(response.body.id).toEqual(expect.any(String))
      expect(response.body.date).toEqual(expect.any(String))
      expect(response.body.people).toEqual(expect.any(Array))
    })
  });

  /**
	 * Test ID: 3
	 *
	 * check structure of people data.
	 */
   it('test people information structure', async () => {
    return await request.get('/people/by_date/29-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)

      const peopleData = response.body.people[0]
      expect(peopleData.reservation_id).toEqual(expect.any(Number))
      expect(peopleData.register_timestamp).toEqual(expect.any(String))
      expect(peopleData.name).toEqual(expect.any(String))
      expect(peopleData.surname).toEqual(expect.any(String))
      expect(peopleData.birth_date).toEqual(expect.any(String))
      expect(peopleData.citizen_id).toEqual(expect.any(String))
      expect(peopleData.occupation).toEqual(expect.any(String))
      expect(peopleData.address).toEqual(expect.any(String))
      expect(peopleData.priority).toEqual(expect.any(String))
      expect(peopleData.vac_time).toEqual(expect.any(Number))
    })
  });

  /**
	 * Test ID: 4
	 *
	 * GET people information with no date given.
	 */
  it('no date', async () => {
    return await request.get('/people/by_date/')
    .then((response) => {
      expect(response.status).toBe(406)
      expect(response.body.msg).toBe("no date param included")
    })
  });

  /**
	 * Test ID: 5
	 *
	 * GET people information from the past that data don't exist.
	 */
  it('information from the middle era', async () => {
    return await request.get('/people/by_date/29-10-1469')
    .then((response) => {
      expect(response.status).toBe(204)
    })
  });

  /**
	 * Test ID: 6
	 *
	 * GET people information from the future that data don't exist.
	 */
  it('information from the future', async () => {
    return await request.get('/people/by_date/29-10-2023')
    .then((response) => {
      expect(response.status).toBe(204)
    })
  });

  /**
	 * Test ID: 7
	 *
	 * GET people information by using invalid date format.
	 */
  it('invalid date format 1', async () => {
    return await request.get('/people/by_date/2021-10-29')
    .then((response) => {
      expect(response.status).toBe(204)
    })
  });

  /**
	 * Test ID: 8
	 *
	 * GET people information by using invalid date format.
	 */
  it('invalid date format 3', async () => {
    return await request.get('/people/by_date/29-OCT-2023')
    .then((response) => {
      expect(response.status).toBe(204)
    })
  });
});

describe('Count total people in a spacific date', () => {

  /**
	 * Test ID: 9
	 *
	 * GET people information by using invalid date format.
  */
  it('count total people', async () => {
    return await request.get('/people/count/total/29-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.body.count).toBe(2)
    })
  });

  /**
	 * Test ID: 10
	 *
	 * GET people information by using invalid date format.
  */
   it('count total people with no date', async () => {
    return await request.get('/people/count/total/')
    .then((response) => {
      expect(response.status).toBe(406)
      expect(response.body.msg).toBe("no date param included")
    })
  });

});

describe('Count avaliable walk-in people in a spacific date', () => {

  /**
	 * Test ID: 11
	 *
	 * GET people information by using invalid date format.
  */
  it('count total walk-in', async () => {
    return await request.get('/people/count/walkin/29-10-2021')
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.body.total_walkin).toBe(28)
    })
  });

  /**
	 * Test ID: 12
	 *
	 * GET people information by using invalid date format.
  */
   it('count total people with no date', async () => {
    return await request.get('/people/count/walkin/')
    .then((response) => {
      expect(response.status).toBe(406)
      expect(response.body.msg).toBe("no date param included")
    })
  });

});
