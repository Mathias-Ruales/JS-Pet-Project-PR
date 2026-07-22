const logic = require("./functions");

const sampleRepos = [
  { name: "Repo1", stargazers_count: 10, updated_at: "2024-01-01T00:00:00Z" },
  { name: "Repo2", stargazers_count: 3, updated_at: "2024-02-01T00:00:00Z" },
  { name: "Repo3", stargazers_count: 7, updated_at: "2024-03-01T00:00:00Z" },
  { name: "Repo4", stargazers_count: 2, updated_at: "2024-04-01T00:00:00Z" },
  { name: "Repo5", stargazers_count: 15, updated_at: "2024-05-01T00:00:00Z" },
  { name: "Repo6", stargazers_count: 0, updated_at: "2024-06-01T00:00:00Z" },
  { name: "Repo7", stargazers_count: 8, updated_at: "2024-07-01T00:00:00Z" },
  { name: "Repo8", stargazers_count: 1, updated_at: "2024-08-01T00:00:00Z" },
  { name: "Repo9", stargazers_count: 12, updated_at: "2024-09-01T00:00:00Z" },
  { name: "Repo10", stargazers_count: 5, updated_at: "2024-10-01T00:00:00Z" },
];

test("getReposMoreThanFive returns repos with more than 5 stars", () => {
  const result = logic.getReposMoreThanFive(sampleRepos);
  expect(result).toEqual([
    { name: "Repo1", stargazers_count: 10, updated_at: "2024-01-01T00:00:00Z" },
    { name: "Repo3", stargazers_count: 7, updated_at: "2024-03-01T00:00:00Z" },
    { name: "Repo5", stargazers_count: 15, updated_at: "2024-05-01T00:00:00Z" },
    { name: "Repo7", stargazers_count: 8, updated_at: "2024-07-01T00:00:00Z" },
    { name: "Repo9", stargazers_count: 12, updated_at: "2024-09-01T00:00:00Z" },
  ]);
});

test("getLastUpdatedRepos returns the 5 most recently updated repos", () => {
  const result = logic.getLastUpdatedRepos(sampleRepos);
  expect(result).toEqual([
    { name: "Repo10", stargazers_count: 5, updated_at: "2024-10-01T00:00:00Z" },
    { name: "Repo9", stargazers_count: 12, updated_at: "2024-09-01T00:00:00Z" },
    { name: "Repo8", stargazers_count: 1, updated_at: "2024-08-01T00:00:00Z" },
    { name: "Repo7", stargazers_count: 8, updated_at: "2024-07-01T00:00:00Z" },
    { name: "Repo6", stargazers_count: 0, updated_at: "2024-06-01T00:00:00Z" },
  ]);
});

test("getTotalStars returns the total number of stars across all repos", () => {
  const result = logic.getTotalStars(sampleRepos);
  expect(result).toBe(63);
});
