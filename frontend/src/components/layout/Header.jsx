import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenu, setSubmenu] = React.useState({ anchor: null, type: null });

  // Xử lý mở/đóng menu dọc
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSubmenu({ anchor: null, type: null });
  };

  // Xử lý mở submenu
  const handleSubmenuOpen = (event, type) => {
    setSubmenu({ anchor: event.currentTarget, type });
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Bọc cả hai menu trong một div và chỉ dùng onMouseLeave ở đây */}
        <div
          style={{ display: 'inline-block', position: 'relative' }}
          onMouseLeave={handleClose}
        >
          {/* Logo + Tên + Icon Report */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onMouseEnter={handleMenu}
          >
            <MenuBookIcon sx={{ mr: 1, color: '#1976d2' }} />
            <Typography variant="h6" component="div" sx={{ color: '#1a237e', fontWeight: 'bold', mr: 1 }}>
              HRC REPORT
            </Typography>
          </IconButton>
          {/* Menu dọc khi hover */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              sx: { minWidth: 220 }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {/* CCM */}
            <MenuItem
              onMouseEnter={e => handleSubmenuOpen(e, 'ccm')}
              sx={{ fontWeight: 'bold', justifyContent: 'space-between' }}
            >
              CCM <ArrowRightIcon fontSize="small" />
            </MenuItem>
            {/* RHF */}
            <MenuItem
              onMouseEnter={e => handleSubmenuOpen(e, 'rhf')}
              sx={{ fontWeight: 'bold', justifyContent: 'space-between' }}
            >
              RHF <ArrowRightIcon fontSize="small" />
            </MenuItem>
            {/* HSM */}
            <MenuItem
              onMouseEnter={e => handleSubmenuOpen(e, 'hsm')}
              sx={{ fontWeight: 'bold', justifyContent: 'space-between' }}
            >
              HSM <ArrowRightIcon fontSize="small" />
            </MenuItem>
          </Menu>

          {/* Submenu cấp 2 */}
          <Menu
            anchorEl={submenu.anchor}
            open={Boolean(submenu.anchor)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            MenuListProps={{
              sx: { minWidth: 200 }
            }}
          >
            {submenu.type === 'ccm' && (
              <>
                <MenuItem component={Link} to="/ccm/heat-report" onClick={handleClose}>Heat Report</MenuItem>
                <MenuItem component={Link} to="/ccm/shift-report" onClick={handleClose}>Shift Report</MenuItem>
                <MenuItem component={Link} to="/ccm/quality-report" onClick={handleClose}>Quality Report</MenuItem>
              </>
            )}
            {submenu.type === 'rhf' && (
              <>
                <MenuItem component={Link} to="/rhf/slab-discharged-report" onClick={handleClose}>Slab Discharged</MenuItem>
              </>
            )}
            {submenu.type === 'hsm' && (
              <>
                <MenuItem component={Link} to="/hsm/production-coil-report" onClick={handleClose}>Production Coil</MenuItem>
              </>
            )}
          </Menu>
        </div>

        {/* Menu ngang */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 32 }}>
          <Typography
            component={Link}
            to="/ccm"
            sx={{ color: '#1a237e', textDecoration: 'none', fontWeight: 500, mx: 2, '&:hover': { color: '#1976d2' } }}
          >
            CCM
          </Typography>
          <Typography
            component={Link}
            to="/rhf"
            sx={{ color: '#1a237e', textDecoration: 'none', fontWeight: 500, mx: 2, '&:hover': { color: '#1976d2' } }}
          >
            RHF
          </Typography>
          <Typography
            component={Link}
            to="/hsm"
            sx={{ color: '#1a237e', textDecoration: 'none', fontWeight: 500, mx: 2, '&:hover': { color: '#1976d2' } }}
          >
            HSM
          </Typography>
        </div>

        {/* Icon login bên phải */}
        <IconButton color="primary" sx={{ ml: 2 }}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}