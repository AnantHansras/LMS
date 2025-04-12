import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Grid,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  DialogContentText,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Home as HomeIcon,
  AutoStories as AutoStoriesIcon,
  Menu as MenuIcon,
  MenuBook as MenuBookIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Brightness4 as ThemeIcon,
} from "@mui/icons-material";
import { logout } from "../Services/userAPI";
import { Check } from "lucide-react"
const navItems = [
  { name: "Home", path: "/home", icon: <HomeIcon sx={{ color: '#ffffff' }} /> },
  { name: "All Books", path: "/allbooks", icon: <AutoStoriesIcon sx={{ color: '#ffffff' }} /> },
  { name: "MyPending", path: "/mypending", icon: <HourglassEmptyIcon sx={{ color: '#ffffff' }} /> },
  { name: "Issued Books", path: "/issuedbooks", icon: <MenuBookIcon sx={{ color: '#ffffff' }} /> },
  { name: "Fines", path: "/userfines", icon: <CurrencyRupeeIcon sx={{ color: '#ffffff' }} /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Sunset")
  const [open, setOpen] = useState(false)

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
  ]

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName)
    // Apply theme logic here if needed
    setTimeout(() => setOpen(false), 300)
  }

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
          backgroundColor: '#0c0A09',
          color: '#FAFAF9',
          borderRight: '1px solid hsla(12,7%,15%,1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      {/* Top section */}
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
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#FAFAF9' }}>
              LibraryHub
            </span>
          )}
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
                className="rounded-md"
                sx={{
                  '&:hover': {
                    backgroundColor: 'hsla(12,7%,15%,1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#A8A29E', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText primary={item.name} sx={{ color: '#FAFAF9' }} />
                )}
              </ListItem>
            </Tooltip>
          ))}

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

      {/* Bottom Logout Section */}
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

// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Tooltip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import {
//   Home as HomeIcon,
//   AutoStories as AutoStoriesIcon,
//   Menu as MenuIcon,
//   MenuBook as MenuBookIcon,
//   HourglassEmpty as HourglassEmptyIcon,
//   CurrencyRupee as CurrencyRupeeIcon,
//   Brightness4 as Brightness4Icon,
//   Brightness7 as Brightness7Icon,
// } from "@mui/icons-material";
// import { logout } from "../Services/userAPI";
// import { toggleTheme } from "../slices/ThemeSlice";

// const navItems = [
//   { name: "Home", path: "/home", icon: <HomeIcon /> },
//   { name: "All Books", path: "/allbooks", icon: <AutoStoriesIcon /> },
//   { name: "MyPending", path: "/mypending", icon: <HourglassEmptyIcon /> },
//   { name: "Issued Books", path: "/issuedbooks", icon: <MenuBookIcon /> },
//   { name: "Fines", path: "/userfines", icon: <CurrencyRupeeIcon /> },
//   // { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
// ];

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
//   const [collapsed, setCollapsed] = useState(true);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const themeStyles = {
//     dark: {
//       bg: '#0c0A09',
//       text: '#FAFAF9',
//       divider: 'hsla(12,7%,15%,1)',
//       hover: 'hsla(12,7%,15%,1)',
//       logoutHover: 'rgba(239, 68, 68, 0.8)',
//       icon: '#ffffff',
//       iconText: '#A8A29E',
//       dialogBg: '#1C1917',
//     },
//     light: {
//       bg: '#ffffff',
//       text: '#111827',
//       divider: '#e5e7eb',
//       hover: '#f3f4f6',
//       logoutHover: '#fee2e2',
//       icon: '#111827',
//       iconText: '#6b7280',
//       dialogBg: '#f9fafb',
//     },
//   };

//   const theme = isDarkMode ? themeStyles.light : themeStyles.dark;

//   const handleLogout = () => {
//     dispatch(logout(navigate));
//     setOpen(false);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: collapsed ? 64 : 270,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: collapsed ? 64 : 270,
//           boxSizing: 'border-box',
//           transition: 'width',
//           backgroundColor: theme.bg,
//           color: theme.text,
//           borderRight: `1px solid ${theme.divider}`,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         },
//       }}
//     >
//       {/* Top Section */}
//       <div>
//         <div
//           style={{
//             height: 64,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: collapsed ? 'center' : 'space-between',
//             padding: '0 18px',
//             borderBottom: `1px solid ${theme.divider}`,
//           }}
//         >
//           {!collapsed && (
//             <span style={{ fontWeight: 'bold', fontSize: '18px', color: theme.text }}>
//               LibraryHub
//             </span>
//           )}
//           <div style={{ display: 'flex', gap: 6 }}>
//             {!collapsed && (
//               <IconButton onClick={() => dispatch(toggleTheme())} sx={{ color: theme.icon }}>
//                 {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//               </IconButton>
//             )}
//             <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: theme.icon }}>
//               <MenuIcon />
//             </IconButton>
//           </div>
//         </div>

//         <List>
//           {navItems.map((item) => (
//             <Tooltip key={item.name} title={collapsed ? item.name : ""} placement="right">
//               <ListItem
//                 button
//                 onClick={() => navigate(item.path)}
//                 className="rounded-md"
//                 sx={{
//                   '&:hover': {
//                     backgroundColor: theme.hover,
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: theme.iconText, minWidth: 40 }}>
//                   {React.cloneElement(item.icon, { sx: { color: theme.icon } })}
//                 </ListItemIcon>
//                 {!collapsed && (
//                   <ListItemText primary={item.name} sx={{ color: theme.text }} />
//                 )}
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>
//       </div>

//       {/* Bottom Section */}
//       <div style={{ borderTop: `1px solid ${theme.divider}` }} className="py-2">
//         <Tooltip title={collapsed ? "Logout" : ""} placement="right">
//           <ListItem
//             button
//             onClick={handleOpen}
//             className="rounded-md"
//             sx={{
//               '&:hover': {
//                 backgroundColor: theme.logoutHover,
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: theme.iconText, minWidth: 40 }}>
//               <ExitToAppIcon sx={{ color: theme.icon }} />
//             </ListItemIcon>
//             {!collapsed && (
//               <ListItemText primary="Logout" sx={{ color: theme.text }} />
//             )}
//           </ListItem>
//         </Tooltip>
//       </div>

//       {/* Logout Confirmation Dialog */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         PaperProps={{
//           style: {
//             backgroundColor: theme.dialogBg,
//             color: theme.text,
//             border: `1px solid ${theme.divider}`,
//           },
//         }}
//       >
//         <DialogTitle id="alert-dialog-title" style={{ color: theme.text }}>
//           {"Confirm Logout"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description" style={{ color: theme.iconText }}>
//             Are you sure you want to logout?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} style={{ color: theme.iconText }}>Cancel</Button>
//           <Button onClick={handleLogout} autoFocus style={{ color: '#ef4444' }}>
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Drawer>
//   );
// }
