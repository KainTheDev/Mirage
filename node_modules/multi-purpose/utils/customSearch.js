const axios = require('axios');
/**
 * 
 * @param {String} query query to search
 * @param {Boolean} imageSearch toggle image search
 * @returns 
 */
async function customSearch(query, imageSearch) {
  const apiKey = 'AIzaSyDxiRbDNA26skPyvzjAb2iSD7wrmaQkpXM';
  const searchEngineId = '50cb02e24a0f0f93e';

  const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}${imageSearch ? "&searchType=image" : ''}&key=${apiKey}&cx=${searchEngineId}`;

  return axios.get(apiUrl)
    .then(response => {
      const items = response.data.items;
      const imageResults = items.map(item => item)
      return imageResults;
    })
    .catch(error => {
      throw new Error('Error fetching image search results: ' + error.message);
    });
}
module.exports = customSearch