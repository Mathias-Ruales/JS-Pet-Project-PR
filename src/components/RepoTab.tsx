import { useState } from 'react'
import type { Repo } from '../types/repo'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

interface RepoTabProps {
  title: string
  repos: Repo[]
  error: string | null
  actionLabel: string
  runAction: (repos: Repo[]) => string
}

export function RepoTab({
  title,
  repos,
  error,
  actionLabel,
  runAction,
}: RepoTabProps) {
  const [result, setResult] = useState<string | null>(null)

  const displayText = error
    ? `Failed to load repos: ${error}`
    : (result ?? 'Repos will appear here...')

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        {title}
      </Typography>

      <Paper
        elevation={1}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: 700 },
          minHeight: 200,
          display: 'grid',
          placeItems: 'center',
          p: 3,
          textAlign: 'center',
          fontSize: '1.125rem',
          color: error ? 'error.main' : 'inherit',
        }}
      >
        {displayText}
      </Paper>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => setResult(runAction(repos))}
      >
        {actionLabel}
      </Button>
    </Box>
  )
}
