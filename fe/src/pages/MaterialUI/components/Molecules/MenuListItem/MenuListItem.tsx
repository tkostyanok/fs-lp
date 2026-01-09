import { Link } from 'react-router';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import type { MenuListItemProps } from './MenuListItemProps';

export const MenuListItem = ({
  Icon,
  text,
  to
}: MenuListItemProps) => {
  return (
    <Link key={`menu-list-item-${text}`} to={to}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {Icon}
          </ListItemIcon>
          <ListItemText 
            primary={text}
            slotProps={{ 
              primary: { 
                color: 'primary',
                fontWeight: 500
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
