import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

// Import these at the top of your file
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Issued Books
import AddBoxIcon from "@mui/icons-material/AddBox"; // Add Books
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Pending Requests
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; // Transactions
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from '@mui/icons-material/Paid';

// Nav items array
const navItems = [
  { name: "Home", path: "/home", icon: <HomeIcon /> },
  { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
  { name: "Issued Books", path: "/issuedbooks", icon: <MenuBookIcon /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
  { name: "Fines", path: "/userfines", icon: <PaidIcon /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 270,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 64 : 270,
          boxSizing: 'border-box',
          transition: 'width',
          backgroundColor: '#0c0A09', // Dark background like login
          color: '#FAFAF9',           // Light text
          borderRight: '1px solid hsla(12,7%,15%,1)',
        },
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '0 18px',
          borderBottom: '1px solid hsla(12,7%,15%,1)',
        }}
      >
        {!collapsed && <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#FAFAF9' }}>V0</span>}
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: '#FAFAF9' }}>
          <MenuIcon />
        </IconButton>
      </div>

      <List>
        {navItems.map((item) => (
          <Tooltip key={item.name} title={collapsed ? item.name : ""} placement="right">
            <ListItem
              button
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'hsla(21,90%,48%,0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.name} sx={{ color: '#FAFAF9' }} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
