import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import {Link} from 'react-router-dom';
export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton selected>
            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
         <Link to="/addevent"> 
         <ListItemButton>
            <ListItemIcon><AnalyticsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Gerer les evenements" />
          </ListItemButton>
         </Link>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton>
            <ListItemIcon><PeopleRoundedIcon /></ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton>
            <ListItemIcon><AssignmentRoundedIcon /></ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton>
            <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton>
            <ListItemIcon><InfoRoundedIcon /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton>
            <ListItemIcon><HelpRoundedIcon /></ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
