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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  Menu,
  Book as BookIcon,
  AddCircle as AddCircleIcon,
  Settings as SettingsIcon,
  ReceiptLong as RequestIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../Services/userAPI";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
const navItems = [
  { name: "All Books", path: "/AdminDashboard/admin", icon: <AutoStoriesIcon sx={{ color: '#ffffff' }}/> },
  { name: "Add Books", path: "/AdminDashboard/addbooks", icon: <AddCircleIcon sx={{ color: '#ffffff' }} /> },
  { name: "Requests", path: "/AdminDashboard/pending-req", icon: <HourglassEmptyIcon sx={{ color: '#ffffff' }}/> },
  { name: "AllTransactions", path: "/AdminDashboard/transactions", icon: <RequestIcon sx={{ color: '#ffffff' }}/> },
  // { name: "Settings", path: "/AdminDashboard/settings", icon: <SettingsIcon sx={{ color: '#ffffff' }}/> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
      dispatch(logout(navigate));
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
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
      backgroundColor: '#0c0A09',
      color: '#FAFAF9',
      borderRight: '1px solid hsla(12,7%,15%,1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }}
>
  {/* Header + Nav List */}
  <div>
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
      {!collapsed && (
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#FAFAF9' }}>Admin</span>
      )}
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
            className="rounded-md"
            sx={{
              '&:hover': {
                backgroundColor: 'hsla(12,7%,15%,1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>{item.icon}</ListItemIcon>
            {!collapsed && (
              <ListItemText primary={item.name} sx={{ color: '#FAFAF9' }} />
            )}
          </ListItem>
        </Tooltip>
      ))}
    </List>
  </div>

  {/* Logout at the Bottom */}
  <div style={{ borderTop: '1px solid hsla(12,7%,15%,1)' }} className="py-2">
    <Tooltip key="Logout" title={collapsed ? "Logout" : ""} placement="right">
      <ListItem
        button
        onClick={handleOpen}
        className="rounded-md"
        sx={{
          '&:hover': {
          backgroundColor: 'rgba(239, 68, 68, 0.8)', // soft red background
        },
        }}
      >
        <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>
          <ExitToAppIcon sx={{ color: '#ffffff' }}/>
        </ListItemIcon>
        {!collapsed && (
          <ListItemText primary="Logout" sx={{ color: '#FAFAF9' }} />
        )}
      </ListItem>
    </Tooltip>
  </div>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#1C1917', // Dark background
            color: '#FAFAF9', // Light text
            border: '1px solid hsla(12,7%,15%,1)',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ color: '#FAFAF9' }}>
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: '#A8A29E' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#A8A29E' }}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus style={{ color: '#ef4444' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
</Drawer>

  );
}