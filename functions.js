async function fetchGithubData() {
  try {
    const response = await fetch(
      "https://api.github.com/orgs/stackbuilders/repos",
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function getReposMoreThanFive(repos) {
  return repos.filter((repo) => repo.stargazers_count > 5);
}

function getLastUpdatedRepos(repos) {
  return [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);
}

function getTotalStars(repos) {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

function displayPopularRepos(allRepos) {
  const popular = getReposMoreThanFive(allRepos);
  const names = popular.map((repo) => repo.name).join(",\n");
  document.getElementById("output-popular").innerText = `${names}`;
}

function displayRecentRepos(allRepos) {
  const recent = getLastUpdatedRepos(allRepos);
  const names = recent.map((repo) => repo.name).join(",\n");
  document.getElementById("output-recent").innerText = `${names}`;
}

function displayTotalStars(allRepos) {
  const total = getTotalStars(allRepos);
  document.getElementById("output-total").innerText = `${total}`;
}

fetchGithubData().then((allRepos) => {
  if (allRepos.length === 0) return;

  document
    .getElementById("btn-popular")
    .addEventListener("click", () => displayPopularRepos(allRepos));
  document
    .getElementById("btn-recent")
    .addEventListener("click", () => displayRecentRepos(allRepos));
  document
    .getElementById("btn-total")
    .addEventListener("click", () => displayTotalStars(allRepos));
});

if (typeof module !== "undefined") {
  module.exports = { getReposMoreThanFive, getLastUpdatedRepos, getTotalStars };
}
