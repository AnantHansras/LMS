import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setTheme } from "../slices/ThemeSlice";
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
  Typography,
  Grid,
  Box,
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Menu,
  AddCircle as AddCircleIcon,
  Settings as SettingsIcon,
  ReceiptLong as RequestIcon,
  Brightness4 as ThemeIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../Services/userAPI";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Check } from "lucide-react";
import {useSelector} from "react-redux";
const navItems = [
  { name: "All Books", path: "/AdminDashboard/admin", icon: <AutoStoriesIcon sx={{ color: '#ffffff' }}/> },
  { name: "Add Books", path: "/AdminDashboard/addbooks", icon: <AddCircleIcon sx={{ color: '#ffffff' }} /> },
  { name: "Requests", path: "/AdminDashboard/pending-req", icon: <HourglassEmptyIcon sx={{ color: '#ffffff' }}/> },
  { name: "AllTransactions", path: "/AdminDashboard/transactions", icon: <RequestIcon sx={{ color: '#ffffff' }}/> },
  // { name: "Settings", path: "/AdminDashboard/settings", icon: <SettingsIcon sx={{ color: '#ffffff' }}/> },
];

const themeOptions = [
  {
    name: "Midnight",
    color: "#6366F1",
    preview: "linear-gradient(to bottom right, #6366F1, #4F46E5)",
  },
  {
    name: "Forest",
    color: "#10B981",
    preview: "linear-gradient(to bottom right, #10B981, #059669)",
  },
  {
    name: "Sunset",
    color: "#F59E0B",
    preview: "linear-gradient(to bottom right, #F59E0B, #D97706)",
  },
  {
    name: "Rose",
    color: "#EC4899",
    preview: "linear-gradient(to bottom right, #EC4899, #DB2777)",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setOpenLogoutDialog(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName);
    dispatch(setTheme(themeName));
    setTimeout(() => setOpen(false), 300);
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
          {/* Theme Option */}
          <Tooltip title={collapsed ? "Theme" : ""} placement="right">
            <ListItem
              button
              onClick={() => setOpen(true)}
              className="rounded-md"
              sx={{
                '&:hover': {
                  backgroundColor: 'hsla(12,7%,15%,1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>
                <ThemeIcon sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText primary="Theme" sx={{ color: '#FAFAF9' }} />
              )}
            </ListItem>
          </Tooltip>
        </List>
      </div>

      {/* Logout at the Bottom */}
      <div style={{ borderTop: '1px solid hsla(12,7%,15%,1)' }} className="py-2">
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItem
            button
            onClick={() => setOpenLogoutDialog(true)}
            className="rounded-md"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>
              <ExitToAppIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Logout" sx={{ color: '#FAFAF9' }} />
            )}
          </ListItem>
        </Tooltip>
      </div>

      {/* Theme Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: "#18181b", color: "#f4f4f5" }}>
          Choose a theme
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#18181b" }}>
          <Typography variant="body2" color="#a1a1aa" mb={2}>
            Select a theme to personalize your experience.
          </Typography>
          <Grid container spacing={2}>
            {themeOptions.map((theme) => (
              <Grid item xs={6} key={theme.name}>
                <Box
                  onClick={() => handleThemeSelect(theme.name)}
                  sx={{
                    border: selectedTheme === theme.name
                      ? `2px solid ${theme.color}`
                      : "1px solid #3f3f46",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    position: "relative",
                    backgroundColor: "#27272a",
                    "&:hover": {
                      borderColor: "#52525b",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <Box
                    sx={{
                      height: 64,
                      borderRadius: 1,
                      mb: 2,
                      background: theme.preview,
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" color="#f4f4f5">
                      {theme.name}
                    </Typography>
                    {selectedTheme === theme.name && (
                      <Box
                        sx={{
                          backgroundColor: `${theme.color}`,
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                        }}
                      >
                        <Check size={12} />
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 2,
                      background: theme.color,
                      opacity: 0,
                      "&:hover": { opacity: 0.1 },
                      transition: "opacity 0.3s",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#18181b" }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#a1a1aa" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1C1917',
            color: '#FAFAF9',
            border: '1px solid hsla(12,7%,15%,1)',
          },
        }}
      >
        <DialogTitle style={{ color: '#FAFAF9' }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#A8A29E' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)} style={{ color: '#A8A29E' }}>Cancel</Button>
          <Button onClick={() => {
            dispatch(logout(navigate));
            setOpenLogoutDialog(false);
          }} autoFocus style={{ color: '#ef4444' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}