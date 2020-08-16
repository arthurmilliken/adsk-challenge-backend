// TODO: use supertest() to test routes.
// TODO: correctly mock asynchronous components.

describe('GET /myMovieList', () => {
  test.todo('calls myMovieList.getList() with appropriate params');
  test.todo('calls res.json() with Array of MyMovieListings objects');
  test.todo('correctly renders error when myMovieList.getList() fails.');
});

describe('POST /myMovieList', () => {
  test.todo('calls myMovieList.add() with appropriate params');
  test.todo('calls res.sendStatus(CREATED) when successful');
  test.todo('calls res.sendStatus(NO_CONTENT) when title is already saved');
  test.todo('calls res.sendStatus(NOT_FOUND) when title cannot be found');
  test.todo('correctly renders error when myMovieList.add() fails.');
  test.todo('write more tests for HTTP failure cases');
});

describe('GET /myMovieList/:imdbID', () => {
  test.todo('calls myMovieList.get() with appropriate params');
  test.todo('calls res.json() with MyMovie');
  test.todo('calls res.sendStatus(NOT_FOUND) when movie cannot be found');
  test.todo('correctly renders error when myMovieList.get() fails.');
});

describe('POST /myMovieList:imdbID', () => {
  test.todo('calls myMovie.addComment() when body includes comment');
  test.todo('calls myMovie.setRating() when body includes rating');
  test.todo('calls myMovie.setWatched() when body includes watched');
  test.todo('correctly calls myMovie methods when body includes multiple fields');
  test.todo('calls res.json() with MyMovie');
  test.todo('calls res.sendStatus(NOT_FOUND) when title cannot be found');
  test.todo('correctly renders error when component fails.');
});

describe('DELETE /myMovieList/:imdbID', () => {
  test.todo('calls myMovieList.remove() with appropriate params');
  test.todo('calls res.json() with MyMovie');
  test.todo('calls res.sendStatus(NO_CONTENT) when successful');
  test.todo('calls res.sendStatus(NOT_FOUND) when movie cannot be found');
  test.todo('correctly renders error when myMovieList.remove() fails.');
});
