const { OmdbAPI, OmdbTitle } = require('./omdb');
const logger = require('../logger');

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
    const comment = {
      TimeStamp: (new Date()).toISOString(),
      Text: text,
    };
    this.Comments.push(comment);
    const json = JSON.stringify(comment);
    logger.info(`MyMovie:${OmdbTitle.imdbID}:ADD_COMMENT:${json}`);
  }

  rate(rating) {
    this.Rating = rating;
    logger.info(`MyMovie:${OmdbTitle.imdbID}:RATE:${rating}`);
  }

  setWatched(watched) {
    this.Watched = watched;
    logger.info(`MyMovie:${OmdbTitle.imdbID}:SET_WATCHED:${watched}`);
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
  // immutable, single-use object, the risk of using inheritance is mitigated.
  constructor(myMovie) {
    const omdbTitle = myMovie.OmdbTitle;
    // Populate OmdbTitle properties.
    super(omdbTitle);

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

  /**
   * add movie to list by imdbID
   * @param imdbID
   * @returns true if successfully added, false if already present.
   */
  async add(imdbID) {
    if (this.movies.has(imdbID)) {
      return false;
    }
    const omdbTitle = await OmdbAPI.findTitleById(imdbID);
    const movie = new MyMovie({ OmdbTitle: omdbTitle });
    this.movies.set(imdbID, movie);
    logger.info(`MyMovieList:ADD:${imdbID}`);
  }

  /**
   * remove movie from list by imdbID
   * @param imdbID
   * @returs true if succesfully removed.
   */
  remove(imdbID) {
    // TODO: log action.
    const result = this.movies.delete(imdbID);
    logger.info(`MyMovieList:REMOVE:${imdbID}`);
    return result;
  }

  /**
   * check to see if the movie corresponding to imdbID is already in the list.
   */
  has(imdbID) {
    return this.movies.has(imdbID);
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
