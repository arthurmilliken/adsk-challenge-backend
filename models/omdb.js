const omdbUrl = 'https://www.omdbapi.com/';
const apiKey = process.env.OMDB_API_KEY;

/**
 * represents a single title returned from OMDB
 */
class OmdbTitle {
  constructor(props) {
    // TODO: make properties immutable to prevent bugs when merging this data
    // with user-provided data.
    this.Title = props.Title;
    this.Year = props.Year;
    this.Rated = props.Rated;
    this.Released = props.Released;
    this.Runtime = props.Runtime;
    this.Genre = props.Genre;
    this.Director = props.Director;
    this.Writer = props.Writer;
    this.Actors = props.Actors;
    this.Plot = props.Plot;
    this.Language = props.Language;
    this.Country = props.Country;
    this.Awards = props.Awards;
    this.Poster = props.Poster;
    this.Ratings = props.Ratings;
    this.Metascore = props.Metascore;
    this.imdbRating = props.imdbRating;
    this.imdbVotes = props.imdbVotes;
    this.imdbID = props.imdbID;
    this.Type = props.Type;
    this.Response = props.Response;
  }
};

class OmdbSearchListing {
  constructor(props) {
    this.imdbID = props.imdbID;
    this.Title = props.Title;
    this.Year = props.Year;
    this.Type = props.Type;
    this.Poster = props.Poster;
  }
};

class OmdbSearchResult {
  constructor(props) {
    this.Search = props.Search;
    this.totalResults = props.totalResults;
    this.Response = props.Response;
  }
}

class OmdbAPI {
  /**
   * Fetch movie from OMDB, given the imdbID.
   * @param imdbID the IMDB identifier for the movie.
   * @returns {OmdbSearchResult}
   */
  static findTitleById(imdbID) {
    throw 'Not Implemented.';
  }

  /**
   * Search OMDB for movies
   * @param query the search query
   * @param type movie, series, or episode
   * @param year filter results by year
   * @param page return this page of results
   * @returns {Array} of OmdbListing objects
   */
  static search(query, type, year, page) {
    throw 'Not Implemented';
  }
}


module.exports = {
  OmdbAPI,
  OmdbTitle,
  OmdbSearchListing,
  OmdbSearchResult,
}
