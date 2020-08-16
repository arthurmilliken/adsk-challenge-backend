# Autodesk Code Challenge - ExpressJS Backend

**HOW TO INSTALL/RUN ON PORT 5000:**

- install NodeJS v14 and npm v6
- `npm install -g yarn`
- `git clone https://github.com/arthurmilliken/adsk-challenge.git`
- `cd adsk-challenge`
- `yarn`
- update `.env.example` with your OMDB API KEY and save as `.env`
- `yarn start`

To run a brief demo of OMDB and MyMovieList models, execute:

  `yarn run demo`

---
### TESTING
**To run unit tests:**

  `yarn test`

NOTE: most unit tests are stubbed due to time constraints. However, a
full-realized example of unit testing with properly mocked components can be
found here: `/models/omdb.test.js`

---
### ROUTES:

**/** _(application root)_

  - GET: display this README

**/api/omdb**

- GET { searchText, type, year, page }: OMDB search by text, type, year, page

**/api/omdb/:imdbID**

- GET: OMDB find by ID

**/api/myMovieList**

- GET { sort, watched, rating }: get all movies (plus fitering/sort)
- POST { imdbID }: add movie to list

**/api/myMovieList/:imdbID**

  - GET: find movie by ID
  - POST { comment, rating, watched }: add user data to movie
  - DELETE: remove movie from list.

---
### APPLICATION LOGGING

- DEBUG level messages are logged to the console
- INFO level messages are logged to /logs/combined.log
