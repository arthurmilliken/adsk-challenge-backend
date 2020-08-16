const logger = require('../logger');
const { OmdbAPI } = require('../models/omdb');

const router = require('express').Router();

/**
 * GET /omdb
 * Search OMDB for titles
 * @params: (querystring) searchText, type, year, page
 * @see OmdbAPI.search()
 */
router.get('/omdb', async (req, res) => {
  try {
    const result = await OmdbAPI.search(
      req.query.searchText,
      req.query.type,
      req.query.year,
      req.query.page,
    );
    res.json(result);
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || 500).json(err.toString());
  }
});

/**
 * GET /omdb
 * Search OMDB for titles
 * @param imdbID (path)
 * @see OmdbAPI.findTitleById()
 */
router.get('/omdb/:imdbID', async (req, res) => {
  try {
    const result = await OmdbAPI.findTitleById(imdbID);
    res.json(result);
  }
  catch (err) {
    logger.error(err);
    res.status(err.code || 500).json(err.toString());
  }
});

module.exports = router;
