import { useState, useEffect } from 'react'
import type { Repo } from './types/repo'
import {
  fetchGithubData,
  getReposMoreThanFive,
  getLastUpdatedRepos,
  getTotalStars,
  getTopFiveByStars,
  getAlphabeticalExcludingH,
} from './utils/github'
import type { TabId } from './config/tabs'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Nav } from './components/Nav'
import { Sidebar } from './components/Sidebar'
import { RepoTab } from './components/RepoTab'
import Box from '@mui/material/Box'

const tabConfigs: Record<
  TabId,
  {
    title: string
    actionLabel: string
    runAction: (repos: Repo[]) => string
  }
> = {
  popular: {
    title: 'Popular Repos',
    actionLabel: 'Get Repos > 5 Stars',
    runAction: (repos) =>
      getReposMoreThanFive(repos)
        .map((r) => r.name)
        .join(', '),
  },
  recent: {
    title: 'Recently Updated',
    actionLabel: 'Get Last 5 Updated',
    runAction: (repos) =>
      getLastUpdatedRepos(repos)
        .map((r) => r.name)
        .join(', '),
  },
  total: {
    title: 'Total Star Count',
    actionLabel: 'Get Total Stars',
    runAction: (repos) => String(getTotalStars(repos)),
  },
  'top-stars': {
    title: 'Top 5 by Stars',
    actionLabel: 'Get Top 5 by Stars',
    runAction: (repos) =>
      getTopFiveByStars(repos)
        .map((r) => r.name)
        .join(', '),
  },
  alpha: {
    title: 'Alphabetical (no "h")',
    actionLabel: 'Get Alphabetical List',
    runAction: (repos) =>
      getAlphabeticalExcludingH(repos)
        .map((r) => r.name)
        .join(', '),
  },
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('popular')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchGithubData()
      .then(setRepos)
      .catch((err) => setError(err.message))
  }, [])

  const config = tabConfigs[activeTab]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
        <Nav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setSidebarOpen(false)}
        />

        <Box
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)',
            p: { xs: 3, md: 5 },
          }}
        >
          <RepoTab
            key={activeTab}
            title={config.title}
            repos={repos}
            error={error}
            actionLabel={config.actionLabel}
            runAction={config.runAction}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
