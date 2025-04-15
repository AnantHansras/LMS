import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slices/ThemeSlice";
import { logout } from "../Services/userAPI";
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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Menu,
  AddCircle as AddCircleIcon,
  ReceiptLong as RequestIcon,
  Brightness4 as ThemeIcon,
} from "@mui/icons-material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Check } from "lucide-react";

const navItems = [
  { name: "All Books", path: "/AdminDashboard/admin", icon: <AutoStoriesIcon /> },
  { name: "Add Books", path: "/AdminDashboard/addbooks", icon: <AddCircleIcon /> },
  { name: "Requests", path: "/AdminDashboard/pending-req", icon: <HourglassEmptyIcon /> },
  { name: "AllTransactions", path: "/AdminDashboard/transactions", icon: <RequestIcon /> },
];
const themeStyles = {
  sunset: {
    background: "hsl(20,14.3%,4.1%)",
    cardBg: "hsl(20, 14.3%, 4.1%)",
    border: "hsl(12, 6.5%, 15.1%)",
    textPrimary: "hsl(60, 9.1%, 97.8%)",
    textMuted: "hsl(24, 5.4%, 63.9%)",
    accent: "hsl(20.5, 90.2%, 48.2%)",
    accentHover: "hsl(20.5, 90.2%, 43%)",
    inputFocusRing: "hsl(20.5, 90.2%, 48.2%)",
    buttonText: "hsl(60, 9.1%, 97.8%)",
  },
  forest: {
  background: "hsl(150, 25%, 5%)",           // deeper forest green-black
  cardBg: "hsl(150, 20%, 10%)",              // soft forest green-dark
  border: "hsl(150, 10%, 20%)",              // subtle greenish-gray
  textPrimary: "hsl(0, 0%, 95%)",            // bright white
  textMuted: "hsl(150, 10%, 60%)",           // muted sage tone
  accent: "hsl(140, 70%, 45%)",              // vibrant leaf green
  accentHover: "hsl(140, 70%, 38%)",         // darker leaf green on hover
  inputFocusRing: "hsl(140, 80%, 25%)",      // strong jungle green
  buttonText: "hsl(140, 100%, 10%)",         // very dark green
},

  midnight: {
    background: "hsl(224,71.4%,4.1%)",
    cardBg: "hsl(224,71.4%,4.1%)",
    border: "hsl(215,27.9%,16.9%)",
    textPrimary: "hsl(210,20%,98%)",
    textMuted: "hsl(217.9,10.6%,64.9%)",
    accent: "hsl(263.4,70%,50.4%)",
    accentHover: "hsl(263.4,70%,45%)",
    inputFocusRing: "hsl(263.4,70%,50.4%)",
    buttonText: "hsl(210,20%,98%)",
  },
  rose: {
  background: "hsl(340, 20%, 6%)",             // deep rose-black with subtle warmth
  cardBg: "hsl(345, 15%, 12%)",                // dark rose-tinted card
  border: "hsl(345, 10%, 22%)",                // warm rose-gray for softer edges
  textPrimary: "hsl(0, 0%, 96%)",              // soft white for high readability
  textMuted: "hsl(345, 10%, 65%)",             // muted dusty rose
  accent: "hsl(346, 75%, 50%)",                // rich vibrant rose
  accentHover: "hsl(346, 75%, 42%)",           // darker rose on hover
  inputFocusRing: "hsl(346, 85%, 40%)",        // slightly deeper pink-red for focus
  buttonText: "hsl(350, 100%, 98%)",           // pale rose-white for contrast
},
};
const themeOptions = [
  {
    name: "Midnight",
    color: "hsl(263.4,70%,50.4%)",
    preview: "hsl(224,71.4%,4.1%)",
  },
  {
    name: "Forest",
    color: "hsl(140, 70%, 45%)",
    preview: "hsl(150, 25%, 5%)",
  },
  {
    name: "Sunset",
    color: "hsl(20.5, 90.2%, 48.2%)",
    preview: "hsl(20,14.3%,4.1%)",
  },
  {
    name: "Rose",
    color: "hsl(346, 75%, 50%)",
    preview: "hsl(340, 20%, 6%)",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [open, setOpen] = useState(false);

  // const handleLogout = () => {
  //   dispatch(logout(navigate));
  //   setOpenLogoutDialog(false);
  // };

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
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 270,
          boxSizing: "border-box",
          transition: "width 0s",
          backgroundColor: theme.background,
          color: "#FAFAF9",
          borderRight: "1px solid hsla(12,7%,15%,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Header + Nav List */}
      <div>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: "0 18px",
            borderBottom: "1px solid hsla(12,7%,15%,1)",
          }}
        >
          {!collapsed && (
            <span style={{ fontWeight: "bold", fontSize: "18px", color: "#FAFAF9" }}>Admin</span>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: "#FAFAF9" }}>
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
                  "&:hover": {
                    backgroundColor: "hsla(12,7%,15%,1)",
                  },
                  backgroundColor: "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? `${theme.accent}` : "#FAFAF9",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.name}
                    sx={{
                      color: location.pathname === item.path ? `${theme.accent}` : "#FAFAF9",
                    }}
                  />
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
                "&:hover": {
                  backgroundColor: "hsla(12,7%,15%,1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A8A29E", minWidth: 40 }}>
                <ThemeIcon sx={{ color: "#FAFAF9" }}/>
              </ListItemIcon>
              {!collapsed && (
                <ListItemText primary="Theme" sx={{ color: "#FAFAF9" }} />
              )}
            </ListItem>
          </Tooltip>
        </List>
      </div>

      {/* Logout at the Bottom */}
      <div style={{ borderTop: "1px solid hsla(12,7%,15%,1)" }} className="py-2">
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItem
            button
            onClick={() => setOpenLogoutDialog(true)}
            className="rounded-md"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.8)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#A8A29E", minWidth: 40 }}>
              <ExitToAppIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Logout" sx={{ color: "#FAFAF9" }} />
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
                      background: theme.color,
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
            backgroundColor: "#1C1917",
            color: "#FAFAF9",
            border: "1px solid hsla(12,7%,15%,1)",
          },
        }}
      >
        <DialogTitle style={{ color: "#FAFAF9" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#A8A29E" }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)} style={{ color: "#A8A29E" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(logout(navigate));
              setOpenLogoutDialog(false);
            }}
            autoFocus
            style={{ color: `${theme.accent}` }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}


