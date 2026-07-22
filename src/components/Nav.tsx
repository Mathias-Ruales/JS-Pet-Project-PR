import { tabs } from '../config/tabs'
import type { TabId } from '../config/tabs'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

interface NavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  onMenuToggle: () => void
}

export function Nav({ activeTab, onTabChange, onMenuToggle }: NavProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 6, md: 16 },
          minHeight: 64,
        }}
      >
        <Typography variant="h6">Repo Viewer</Typography>

        {!isMobile && (
          <Tabs
            value={activeTab}
            onChange={(_, value) => onTabChange(value)}
            textColor="inherit"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={tab.label}
                sx={{ mx: 0 }}
              />
            ))}
          </Tabs>
        )}

        {isMobile && (
          <IconButton color="inherit" onClick={onMenuToggle}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}
