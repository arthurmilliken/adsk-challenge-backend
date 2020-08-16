const logger = require('../../logger');
const { MyMovieList } = require('../../models/movie');
const {
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  SERVER_ERROR
} = require('./httpStatus');

const router = require('express').Router();

router.route('/myMovieList')
/**
 * GET /myMovieList
 * retrieve myMovieList from application.
 * querystring parameters: sort, watched, rating
 * @see MyMovieList.getList()
 */
.get((req, res) => {
  try {
    const sort = req.query.sort;
    const watched = req.query.watched;
    const rating = req.query.rating;
    const myMovieList = res.app.locals.myMovieList;
    res.json(myMovieList.getList(sort, watched, rating));
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || SERVER_ERROR).json(err.toString());
  }
})
/**
 * POST /myMovieList
 * add movie to MyMovieList
 * body {json}: { imdbID }
 */
.post(async(req, res) => {
  try {
    const imdbID = req.body.imdbID;
    const myMovieList = res.app.locals.myMovieList;
    if (myMovieList.has(imdbID)) {
      res.sendStatus(httpStats.NO_CONTENT);
    }
    else {
      const result = await myMovieList.add(imdbID);
      res.sendStatus(result ? CREATED : NOT_FOUND);
    }
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || SERVER_ERROR).json(err.toString());
  }
});

router.route('/myMovieList/:imdbID')
/**
 * GET /myMovieList/:imdbID
 * fetch MyMovie from myMovieList by ID
 * @see require('../models/movie').MyMovie
 */
.get((req, res) => {
  try {
    const imdbID = req.params.imdbID;
    const myMovieList = res.app.locals.myMovieList;
    const myMovie = myMovieList.get(imdbID);
    if (myMovie) {
      res.json(myMovie);
    }
    else {
      res.sendStatus(NOT_FOUND);
    }
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || SERVER_ERROR).json(err.toString());
  }
})
/**
 * POST /myMovieList/:imdbID
 * modify state of movie in myMovieList
 * body {json}: { comment, rating, watched }
 */
.post((req, res) => {
  try {
    const imdbID = req.params.imdbID;
    const comment = req.body.comment;
    const rating = req.body.rating;
    const watched = req.body.watched;
    const myMovieList = res.app.locals.myMovieList;
    const myMovie = myMovieList.get(imdbID);
    if (!myMovie) {
      return res.sendStatus(NOT_FOUND);
    }
    if (comment !== undefined) {
      myMovie.addComment(comment);
    }
    if (rating !== undefined) {
      myMovie.setRating(rating);
    }
    if (watched !== undefined) {
      myMovie.setWatched(watched);
    }
    res.json(myMovie);
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || SERVER_ERROR).json(err.toString());
  }
});

module.exports = router;
