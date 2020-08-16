# Autodesk Code Challenge - ExpressJS Backend

**How to install/run on port 5000:**

- install NodeJS v14 and npm v6
- `npm install -g yarn`
- `git clone https://github.com/arthurmilliken/adsk-challenge.git`
- `cd adsk-challenge`
- `yarn`
- update .env.example with the appropriate values and save as .env
- `yarn start`

To run unit tests:

  `yarn test`

To run a brief demo of OMDB and MyMovieList models, execute:

  `yarn run demo`

---

## ROUTES:

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

**/**

  - GET: display this README
