import type { Repo } from '../types/repo'
import {
  getReposMoreThanFive,
  getLastUpdatedRepos,
  getTotalStars,
  getTopFiveByStars,
  getAlphabeticalExcludingH,
} from './github'

const sampleRepos: Repo[] = [
  { name: 'Repo1', stargazers_count: 10, updated_at: '2024-01-01T00:00:00Z' },
  { name: 'Repo2', stargazers_count: 3, updated_at: '2024-02-01T00:00:00Z' },
  { name: 'Repo3', stargazers_count: 7, updated_at: '2024-03-01T00:00:00Z' },
  { name: 'Repo4', stargazers_count: 2, updated_at: '2024-04-01T00:00:00Z' },
  { name: 'Repo5', stargazers_count: 15, updated_at: '2024-05-01T00:00:00Z' },
  { name: 'Repo6', stargazers_count: 0, updated_at: '2024-06-01T00:00:00Z' },
  { name: 'Repo7', stargazers_count: 8, updated_at: '2024-07-01T00:00:00Z' },
  { name: 'Repo8', stargazers_count: 1, updated_at: '2024-08-01T00:00:00Z' },
  { name: 'Repo9', stargazers_count: 12, updated_at: '2024-09-01T00:00:00Z' },
  { name: 'Repo10', stargazers_count: 5, updated_at: '2024-10-01T00:00:00Z' },
  { name: 'Haskell', stargazers_count: 20, updated_at: '2024-11-01T00:00:00Z' },
  { name: 'hex-tool', stargazers_count: 4, updated_at: '2024-12-01T00:00:00Z' },
]

test('getReposMoreThanFive returns repos with more than 5 stars', () => {
  const result = getReposMoreThanFive(sampleRepos)
  expect(result).toEqual([
    { name: 'Repo1', stargazers_count: 10, updated_at: '2024-01-01T00:00:00Z' },
    { name: 'Repo3', stargazers_count: 7, updated_at: '2024-03-01T00:00:00Z' },
    { name: 'Repo5', stargazers_count: 15, updated_at: '2024-05-01T00:00:00Z' },
    { name: 'Repo7', stargazers_count: 8, updated_at: '2024-07-01T00:00:00Z' },
    { name: 'Repo9', stargazers_count: 12, updated_at: '2024-09-01T00:00:00Z' },
    {
      name: 'Haskell',
      stargazers_count: 20,
      updated_at: '2024-11-01T00:00:00Z',
    },
  ])
})

test('getLastUpdatedRepos returns the 5 most recently updated repos', () => {
  const result = getLastUpdatedRepos(sampleRepos)
  expect(result).toEqual([
    {
      name: 'hex-tool',
      stargazers_count: 4,
      updated_at: '2024-12-01T00:00:00Z',
    },
    {
      name: 'Haskell',
      stargazers_count: 20,
      updated_at: '2024-11-01T00:00:00Z',
    },
    { name: 'Repo10', stargazers_count: 5, updated_at: '2024-10-01T00:00:00Z' },
    { name: 'Repo9', stargazers_count: 12, updated_at: '2024-09-01T00:00:00Z' },
    { name: 'Repo8', stargazers_count: 1, updated_at: '2024-08-01T00:00:00Z' },
  ])
})

test('getTotalStars returns the total number of stars across all repos', () => {
  const result = getTotalStars(sampleRepos)
  expect(result).toBe(87)
})

test('getTopFiveByStars returns the 5 repos with the most stars', () => {
  const result = getTopFiveByStars(sampleRepos)
  expect(result).toEqual([
    {
      name: 'Haskell',
      stargazers_count: 20,
      updated_at: '2024-11-01T00:00:00Z',
    },
    { name: 'Repo5', stargazers_count: 15, updated_at: '2024-05-01T00:00:00Z' },
    { name: 'Repo9', stargazers_count: 12, updated_at: '2024-09-01T00:00:00Z' },
    { name: 'Repo1', stargazers_count: 10, updated_at: '2024-01-01T00:00:00Z' },
    { name: 'Repo7', stargazers_count: 8, updated_at: '2024-07-01T00:00:00Z' },
  ])
  expect(result).toHaveLength(5)
})

test('getAlphabeticalExcludingH returns repos sorted alphabetically, excluding those starting with h', () => {
  const result = getAlphabeticalExcludingH(sampleRepos)
  expect(result).toEqual([
    { name: 'Repo1', stargazers_count: 10, updated_at: '2024-01-01T00:00:00Z' },
    { name: 'Repo10', stargazers_count: 5, updated_at: '2024-10-01T00:00:00Z' },
    { name: 'Repo2', stargazers_count: 3, updated_at: '2024-02-01T00:00:00Z' },
    { name: 'Repo3', stargazers_count: 7, updated_at: '2024-03-01T00:00:00Z' },
    { name: 'Repo4', stargazers_count: 2, updated_at: '2024-04-01T00:00:00Z' },
    { name: 'Repo5', stargazers_count: 15, updated_at: '2024-05-01T00:00:00Z' },
    { name: 'Repo6', stargazers_count: 0, updated_at: '2024-06-01T00:00:00Z' },
    { name: 'Repo7', stargazers_count: 8, updated_at: '2024-07-01T00:00:00Z' },
    { name: 'Repo8', stargazers_count: 1, updated_at: '2024-08-01T00:00:00Z' },
    { name: 'Repo9', stargazers_count: 12, updated_at: '2024-09-01T00:00:00Z' },
  ])
  expect(result.every((r) => !r.name.toLowerCase().startsWith('h'))).toBe(true)
})

test('getAlphabeticalExcludingH is case-insensitive for h filtering', () => {
  const reposStartingWithH: Repo[] = [
    {
      name: 'hello-world',
      stargazers_count: 5,
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      name: 'Haskell',
      stargazers_count: 10,
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      name: 'safe-repo',
      stargazers_count: 3,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ]
  const result = getAlphabeticalExcludingH(reposStartingWithH)
  expect(result).toEqual([
    {
      name: 'safe-repo',
      stargazers_count: 3,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ])
})
