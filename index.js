const axios = require('axios');
const getRepos = async ({
  username = 'varun9797',
  page = 1,
  per_page = 50
} = {}) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
    );
    return repos.data
      .map((repo) => {
        return {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count
        };
      })
      .sort((first, second) => second.stars - first.stars);
  } catch (error) {
    return [];
  }
};
getRepos().then((repositories) => console.log(repositories));

module.exports = { getRepos: getRepos };