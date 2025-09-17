
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

export default function Drawer({
  onSelect,
  activeSection = 'home',
  width = 300,
  mobileOpen = false,
  onClose,
  isMobile = false,
  profile = {
    name: 'Adithya Gowda S',
    role: 'Frontend Developer',
    avatarUrl: '/adii.jpg',
  },
  links = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'about', label: 'About', icon: <InfoIcon /> },  
    { id: 'projects', label: 'Projects', icon: <WorkIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactSupportIcon /> },
  ],
  socials = [
    { id: 'github', icon: <GitHubIcon />, href: 'https://github.com/Adithy20/my-portfolio' },
    { id: 'linkedin', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/Adithya-Gowda-S2004' },
    { id: 'email', icon: <MailOutlineIcon />, href: 'mailto:aadithyagowda20@gmail.com' },
  ],
}) {
  const theme = useTheme();
  const firstItemRef = useRef(null);

  const handleSelect = (id) => () => {
    onSelect && onSelect(id);
    window.history.pushState(null, null, `#${id}`);
    setTimeout(() => {
      const section = document.querySelector(`[data-section="${id}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    // Focus first item when drawer opens, or on desktop where it acts as a side nav
    if (mobileOpen || !isMobile) {
      setTimeout(() => {
        if (firstItemRef.current) {
          firstItemRef.current.focus();
        }
      }, 0);
    }
  }, [mobileOpen, isMobile]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'auto', 
      borderBottom: 1, 
      borderColor: 'divider', 
      bgcolor: 'background.paper',
      color: 'text.primary',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1200,
      overflow: 'hidden',
      boxShadow: 3
    }} aria-label="Primary navigation" aria-expanded>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: { xs: '64px', sm: '80vh' } }}>
        {/* Header */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2.5,
            bgcolor: 'transparent',
            color: 'text.primary',
          }}
        >
          <Avatar
            src={profile.avatarUrl}
            alt={profile.name}
            sx={{ 
              width: 56, 
              height: 56, 
              bgcolor: '#42a5f5', 
              fontWeight: 600,
              border: `2px solid ${theme.palette.divider}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            {profile?.name?.[0] || 'A'}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              {profile.name}
            </Typography>
            <Typography variant="body2" noWrap color="text.secondary">
              {profile.role}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            aria-label="Close drawer"
            sx={{ color: 'inherit' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Navigation */}
        <Box component="nav" role="navigation" aria-label="Sections" sx={{ width: '100%', overflowX: 'auto' }}>
          <List sx={{ py: { xs: 0.5, sm: 0 }, px: { xs: 0.5, sm: 0 }, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
            {links.map((item, index) => (
              <ListItem key={item.id} disablePadding sx={{ width: 'auto' }}>
                <ListItemButton 
                  onClick={handleSelect(item.id)}
                  ref={index === 0 ? firstItemRef : undefined}
                  sx={{
                    bgcolor: activeSection === item.id ? 'primary.main' : 'transparent',
                    color: activeSection === item.id ? '#fff' : 'text.primary',
                    '&:hover': {
                      bgcolor: activeSection === item.id ? 'primary.dark' : 'action.hover',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: 1,
                    mx: { xs: 0.5, sm: 1 },
                    my: 0.5,
                    px: { xs: 1, sm: 1.5 },
                    minHeight: 40
                  }}
                >
                  {item.icon ? (
                    <ListItemIcon sx={{ 
                      color: activeSection === item.id ? '#fff' : 'text.secondary',
                      display: { xs: 'none', sm: 'flex' }
                    }}>
                      {item.icon}
                    </ListItemIcon>
                  ) : null}
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ 
                      sx: { 
                        color: activeSection === item.id ? '#fff' : 'text.primary', 
                        fontWeight: activeSection === item.id ? 700 : 500,
                        whiteSpace: 'nowrap'
                      } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />

        {/* Footer / Socials */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.25 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} {profile.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socials.map((s) => (
              <IconButton
                key={s.id}
                size="small"
                color="inherit"
                component="a"
                href={s.href}
                target={s.href?.startsWith('http') ? '_blank' : undefined}
                rel={s.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.id}
              >
                {s.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}