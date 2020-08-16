require('dotenv').config();
const MockAdapter = require('axios-mock-adapter');
const proxyquire = require('proxyquire');

const mock = new MockAdapter(require('axios'));
const apiKey = process.env.OMDB_API_KEY;
const omdbMovie = require('../data_examples/omdb.movie.json');
const omdbSearch = require('../data_examples/omdb.search.json');
const imdbID = omdbMovie.imdbID;

const {
  OmdbAPI,
  OmdbSearchResult,
  OmdbTitle,
  omdbUrl
} = proxyquire('./omdb', { axios: mock });

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mock.resetHistory();
});

describe('OmdbAPI', () => {
  describe('callOmdb()', () => {
    const params = {
      apiKey, i: imdbID, plot: 'full'
    };

    test('returns response.data', async() => {
      mock.onGet(omdbUrl).reply(200, omdbMovie);
      const result = await OmdbAPI.callOmdb(params);
      expect(result).toEqual(omdbMovie);
    });

    test('calls axios.get() with appropriate params', async() => {
      mock.onGet(omdbUrl).reply(200, omdbMovie);
      await OmdbAPI.callOmdb(params);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(omdbUrl);
      expect(mock.history.get[0].params).toEqual(params);
    });

    test('returns null when response.data.Response !== "True"', async() => {
      mock.onGet(omdbUrl).reply(200, {
        Response: 'False',
        Error: 'Not Found'
      });
      const result = await OmdbAPI.callOmdb(params);
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
        await OmdbAPI.callOmdb(params);
      }
      catch (err) {
        expect(err.code).toBe(status);
        expect(err.message).toBe(message);
      }
    });
  });

  describe('findTitleById()', () => {
    test('returns OmdbTitle', async() => {
      mock.onGet(omdbUrl).reply(200, omdbMovie);
      const result = await OmdbAPI.findTitleById(imdbID);
      expect(result).toBeInstanceOf(OmdbTitle);
      expect(result.imdbID).toBe(omdbMovie.imdbID);
      expect(result.Title).toBe(omdbMovie.Title);
      expect(result.Ratings).toEqual(omdbMovie.Ratings);
    });

    test('calls callOmdb() with appropriate params', () => {
      const params = {
        apiKey, i: imdbID, plot: 'full'
      };

      const spy = jest.spyOn(OmdbAPI, 'callOmdb').mockImplementation(() => {
        return omdbMovie;
      });

      OmdbAPI.findTitleById(imdbID);
      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0].length).toBe(1);
      expect(spy.mock.calls[0][0]).toEqual(params);
      spy.mockRestore();
    });
  });

  describe('search()', () => {
    const searchText = 'apocalypse';

    test('returns OmdbSearchResult', async() => {
      mock.onGet(omdbUrl).reply(200, omdbSearch);
      const result = await OmdbAPI.search(searchText);
      expect(result).toBeInstanceOf(OmdbSearchResult);
      expect(result.Search.length).toBe(omdbSearch.Search.length);
      expect(result.totalResults).toBe(omdbSearch.totalResults);
      expect(result.Response).toEqual(omdbSearch.Response);
    });

    test('calls callOmdb() with appropriate params', () => {
      const type = 'movie';
      const year = 2011;
      const page = 2;

      const spy = jest.spyOn(OmdbAPI, 'callOmdb').mockImplementation(() => {
        return omdbSearch;
      });

      OmdbAPI.search(searchText, type, year, page);
      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0].length).toBe(1);
      expect(spy.mock.calls[0][0]).toEqual({
        apiKey,
        s: searchText,
        type,
        y: year,
        page
      });
      spy.mockRestore();
    });
  });
});

describe('OmdbError', () => {
  test.todo('takes response.data.Error as its message');
  test.todo('takes response.statusText when response.data.Error is missing');
  test.todo('takes response.status as code');
});
