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
import {
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  Menu,
  Book as BookIcon,
  AddCircle as AddCircleIcon,
  Settings as SettingsIcon,
  ReceiptLong as RequestIcon,
} from "@mui/icons-material";

const navItems = [
  { name: "Home", path: "/home", icon: <HomeIcon /> },
  { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
  { name: "Issued Books", path: "/issuedbooks", icon: <BookIcon /> },
  { name: "Add Books", path: "/addbooks", icon: <AddCircleIcon /> },
  { name: "Pending Requests", path: "/pending-req", icon: <RequestIcon /> },
  { name: "Transactions", path: "/transactions", icon: <RequestIcon /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
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
          transition: 'width 0.5s',
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
          <Menu />
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
