const { OmdbTitle } = require('./omdb');

/**
 * represents a movie the user saved to MyMovieList. It is composed
 * of the movie from OMDB, plus properties supplied by the user.
 *
 * NOTE: I have chosen to use composition over inheritance here, to cleanly
 * separate between data which comes from the user vs. data which comes from
 * OMDB.
 */
class MyMovie {
  constructor(props) {
    this.OmdbTitle = props.OmdbTitle;
    this.Watched = props.Watched == true ? true : false;
    this.Rating = props.Rating ? props.Rating : null;
    this.Comments = props.Comments ? props.Comments : [];
  }

  addComment(text) {
    // TODO: log action.
    this.Comments.push({
      TimeStamp: (new Date()).toISOString(),
      Text: text,
    });
  }

  rate(rating) {
    // TODO: log action.
    this.Rating = rating;
  }

  setWatched(watched) {
    // TODO: log action.
    this.Watched = watched;
  }
}

/**
 * MyMovieListing represents a single entry returned from the /myMovieList API.
 * It has all of the properties from MyMovie, above, but rearranged to match
 * the required output of /myMovieList API.
 */
class MyMovieListing extends OmdbTitle {
  // NOTE: I normally try to avoid using inheritance because it tends to
  // create confusion among developers. However, maintaining a list of 20
  // movie properties in two separate places violates DRY principle and comes
  // with its own risks. Because this class is supposed to represent an
  // immutable, single-use object, the risk of using inheritance is somewhat
  // mitigated.
  constructor(myMovie) {
    const omdbMovie = myMovie.OmdbTitle;
    // Populate OmdbTitle properties.
    super(omdbMovie);

    // Populate MyMovie properties.
    this.Watched = myMovie.Watched;
    this.Comments = myMovie.Comments;
    // Must clone Ratings so that merging user rating into Ratings does not
    // mutate the underlying OmdbTitle object.
    this.Ratings = omdbMovie.Ratings.slice();
    if (myMovie.Rating) {
      this.Ratings.push({
        Source: 'MYSELF',
        Value: `${myMovie.Rating}/10`,
      });
    }
  }
}

/**
 * MyMovieList is represented with a Map for fast retrieval by ID.
 */
class MyMovieList {
  constructor() {
    this.movies = new Map();
  }

  add(movie) {
    // TODO: log action.
    const id = movie.imdbID;
    this.movies.set(id, movie);
  }

  remove(id) {
    // TODO: log action.
    return this.movies.delete(id);
  }

  has(id) {
    return this.movies.has(id);
  }

  /**
   * Return movies as an array.
   * @param {string} sort can be: 'title asc' [default], 'title desc', 'year asc', 'year desc'
   * @param {boolean} watched filter by movie.Watched
   * @param {string} rating filter by user rating (or imdbRating if no user rating).
   *                 '1'  - '10': return movies matching this rating
   *                 '-2' - '-9': return movies with this rating or less
   *                 '+2' - '+9': return movies with this rating or greater.
   * @returns {Array} of MyMovieListing objects.
   */
  getList(sort, watched, rating) {
    const movies = Array.from(this.movies.values()).map(m => {
      new MyMovieListing(m)
    });
    // TODO: apply sort
    // TODO: apply watched filter
    // TODO: apply rating filter
    return movies;
  }
}

module.exports = {
  MyMovie,
  MyMovieListing,
  MyMovieList
};
