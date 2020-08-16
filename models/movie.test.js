require('dotenv').config();
const proxyquire = require('proxyquire');
const { MyMovie, MyMovieListing, MyMovieList } = require('./movie');

describe('MyMovie', () => {
  describe('constructor', () => {
    test.todo('correctly sets OmdbTitle');
    test.todo('correctly sets default values');
  });

  describe('addComment()', () => {
    test.todo('correctly adds comment');
    test.todo('correctly logs action');
  });

  describe('rate()', () => {
    test.todo('correctly sets property');
    test.todo('correctly logs action');
  });

  describe('setWatched()', () => {
    test.todo('correctly sets property');
    test.todo('correctly logs action');
  });
});

describe('MyMovieListing', () => {
  describe('constructor', () => {
    test.todo('correctly sets OmdbTitle properties');
    test.todo('correctly sets user-defined properties');
    test.todo('correctly merges Ratings without mutating OmdbTitle object');
  });

});

describe('MyMovieList', () => {
  describe('constuctor', () => {
    test.todo('correctly creates new Map() for movies property');
  });

  describe('add()', () => {
    test.todo('returns false if movie has already been added');
    test.todo('calls OmdbAPI.findTitleById() with approprate params');
    test.todo('correctly constructs MyMovie object with OMDB result');
    test.todo('correctly adds MyMovie object to movies');
    test.todo('correctly logs action');
  });

  describe('remove()', () => {
    test.todo('correctly removes movie from movies and returns true');
    test.todo('returns false when movie was not in list');
    test.todo('correctly logs action');
  });

  describe('has()', () => {
    test.todo('calls movie.has() with approprate params');
  });

  describe('getList()', () => {
    test.todo('returns array of MyMovieListing objects');
    test.todo('correctly sorts based on sort argument');
    test.todo('correctly filters based on watched argument');
    test.todo('correctly filters based on rating argument');
    test.todo('correctly combines multiple filters');
  });
});
