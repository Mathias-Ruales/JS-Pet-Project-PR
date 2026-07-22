import { tabs } from '../config/tabs'
import type { TabId } from '../config/tabs'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

interface SidebarProps {
  isOpen: boolean
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  onClose: () => void
}

export function Sidebar({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
}: SidebarProps) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      slotProps={{ paper: { sx: { bgcolor: 'primary.main' } } }}
    >
      <List sx={{ width: 260, pt: 2 }}>
        {tabs.map((tab) => (
          <ListItemButton
            key={tab.id}
            selected={activeTab === tab.id}
            onClick={() => {
              onTabChange(tab.id)
              onClose()
            }}
            sx={{
              '&.Mui-selected': { bgcolor: 'primary.dark' },
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ListItemText primary={tab.label} sx={{ color: 'white' }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
