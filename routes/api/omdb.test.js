// TODO: use supertest() to test routes.
// TODO: correctly mock asynchronous components.

describe('/omdb', () => {
  test.todo('calls OmdbAPI.search() with appropriate params');
  test.todo('calls res.json() with OmdbSearchResult');
  test.todo('correctly renders error when OmdbAPI.search() fails.');
  test.todo('write more tests for HTTP failure cases');
});

describe('/omdb/:imdbID', () => {
  test.todo('calls OmdbAPI.findTitleById() with appropriate params');
  test.todo('calls res.json with OmdbTitle');
  test.todo('correctly renders error when OmdbAPI.findTitleById() fails.');
  test.todo('write more tests for HTTP failure cases');
});
