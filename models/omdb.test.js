require('dotenv').config();
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');
const omdbFoundData = require('../data_examples/omdb.movie.json');

const mock = new MockAdapter(require('axios'));
const {
  OmdbAPI,
  OmdbTitle,
  omdbUrl
} = proxyquire('./omdb', { axios: mock });
const apiKey = process.env.OMDB_API_KEY;

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mock.resetHistory();
});

describe('OmdbAPI', () => {
  describe('findTitleById()', () => {
    const imdbID = omdbFoundData.imdbID;

    test('returns OmdbTitle', async() => {
      mock.onGet(omdbUrl).reply(200, omdbFoundData);
      const result = await OmdbAPI.findTitleById(imdbID);
      expect(result).toBeInstanceOf(OmdbTitle);
      expect(result.imdbID).toBe(omdbFoundData.imdbID);
      expect(result.Title).toBe(omdbFoundData.Title);
      expect(result.Ratings).toEqual(omdbFoundData.Ratings);
    });

    test('calls axios.get() with appropriate params', async() => {
      mock.onGet(omdbUrl).reply(200, omdbFoundData);
      await OmdbAPI.findTitleById(imdbID);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(omdbUrl);
      expect(mock.history.get[0].params).toEqual({
        apiKey: apiKey,
        i: imdbID,
        plot: 'full',
      });
    });

    test('returns null when response.data.Response !== "True"', async() => {
      mock.onGet(omdbUrl).reply(200, {
        Response: 'False',
        Error: 'Not Found'
      });
      const result = await OmdbAPI.findTitleById('INVALID');
      expect(result).toBe(null);
    });

    test('throws OmdbError when axios returns error', async() => {
      const status = 401;
      const message = 'Invalid API Key';
      mock.onGet(omdbUrl).reply(status, {
        Response: 'False',
        Error: message,
      });
      expect.assertions(2);
      try {
        await OmdbAPI.findTitleById(imdbID);
      }
      catch (err) {
        expect(err.code).toBe(status);
        expect(err.message).toBe(message);
      }
    });
  });

  describe('search()', () => {
    test.todo('returns OmdbSearchResult');
    test.todo('calls axios.get() with appropriate params');
    test.todo('returns empty array when response.data.Response !== "True"');
    test.todo('throws OmdbError when axios returns error');
  });
});
