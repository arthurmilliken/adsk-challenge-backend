require('dotenv').config();
const { OmdbAPI } = require('./models/omdb');

(async () => {
  const imdbID = 'tt0078788';
  const noID = 'tt9999999';
  const query = 'apocalypse';
  const noQuery = 'notitlematchesthis';
  try {
    let result;
    console.log('-------------------------');
    console.log(`OmdbAPI.search('${query}')`)
    result = await OmdbAPI.search(query);
    console.log(result);
    console.log('-------------------------');
    console.log(`OmdbAPI.search('${noQuery}')`)
    result = await OmdbAPI.search(noQuery);
    console.log(result);
    console.log('-------------------------');
    console.log(`OmdbAPI.findTitleById('${imdbID}')`)
    result = await OmdbAPI.findTitleById(imdbID);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
