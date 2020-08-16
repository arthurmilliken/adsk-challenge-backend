require('dotenv').config();
const logger = require('./logger');
const { OmdbAPI } = require('./models/omdb');
const { MyMovieList } = require('./models/movie');

(async () => {
  const imdbID = 'tt0078788';
  const imdbID2 = 'tt1508238';
  const noID = 'tt9999999';
  const searchText = 'apocalypse';
  try {
    console.log('-------------------------');
    console.log(`OmdbAPI.findTitleById('${imdbID}')`)
    let title = await OmdbAPI.findTitleById(imdbID);
    console.log(title);
    console.log('-------------------------');
    console.log(`OmdbAPI.search('${searchText}')`)
    let result = await OmdbAPI.search(searchText);
    console.log(result);
    console.log('-------------------------');
    const myMovieList = new MyMovieList();
    let movie;
    console.log('-------------------------');
    console.log(`myMovieList.add('${imdbID}')`)
    movie = await myMovieList.add(imdbID);
    console.log(movie);
    console.log('-------------------------');
    console.log(`myMovie.addComment().rate().setWatched()`)
    movie.addComment('I love this movie.').setRating(10).setWatched(true);
    console.log(movie);
    console.log('-------------------------');
    console.log(`myMovieList.add('${imdbID2}')`);
    movie = await myMovieList.add(imdbID2);
    console.log(`myMovie.addComment()`)
    movie.addComment('I will never watch this.');
    console.log(movie);
    console.log('-------------------------');
    console.log(`myMovieList.getList()`);
    console.log(JSON.stringify(myMovieList.getList(), null, 2));
    console.log('-------------------------');
  } catch (err) {
    console.error(err);
  }
})();
