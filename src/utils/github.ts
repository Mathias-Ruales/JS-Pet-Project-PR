import type { Repo } from '../types/repo'
export type { Repo }

export async function fetchGithubData(): Promise<Repo[]> {
  const org = import.meta.env.VITE_GITHUB_ORG
  const response = await fetch(
    `https://api.github.com/orgs/${org}/repos?per_page=100`,
  )
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)
  return await response.json()
}

export function getReposMoreThanFive(repos: Repo[]): Repo[] {
  return repos.filter((repo) => repo.stargazers_count > 5)
}

export function getLastUpdatedRepos(repos: Repo[]): Repo[] {
  return [...repos]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
    .slice(0, 5)
}

export function getTotalStars(repos: Repo[]): number {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0)
}

export function getTopFiveByStars(repos: Repo[]): Repo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
}

export function getAlphabeticalExcludingH(repos: Repo[]): Repo[] {
  return repos
    .filter((repo) => !repo.name.toLowerCase().startsWith('h'))
    .sort((a, b) => a.name.localeCompare(b.name))
}
