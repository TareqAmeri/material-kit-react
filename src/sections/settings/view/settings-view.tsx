import { HexColorPicker } from 'react-colorful';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ComponentColors = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

const STORAGE_KEY_COLORS = 'dmo-component-colors';
const STORAGE_KEY_LOGO = 'dmo-system-logo';
const STORAGE_KEY_SYSTEM_NAME = 'dmo-system-name';

// Default colors
const DEFAULT_COLORS: ComponentColors = {
  primary: '#1e3c72',
  secondary: '#8E33FF',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#00B8D9',
};

export function SettingsView() {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentColors, setCurrentColors] = useState<ComponentColors>(DEFAULT_COLORS);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [activeColorKey, setActiveColorKey] = useState<keyof ComponentColors | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [systemName, setSystemName] = useState<string>('Data Management Office');

  // Apply theme colors using CSS variables
  const applyColors = useCallback((colors: ComponentColors) => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
        : '0 0 0';
    };

    // Remove existing style element if any
    const existingStyle = document.getElementById('custom-component-colors');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create a style element to inject CSS variables
    const style = document.createElement('style');
    style.id = 'custom-component-colors';
    
    let css = ':root {\n';
    
    Object.entries(colors).forEach(([key, value]) => {
      const rgbValue = hexToRgb(value);
      css += `  --palette-${key}-main: ${value};\n`;
      css += `  --palette-${key}-mainChannel: ${rgbValue};\n`;
    });
    
    css += '}\n\n';
    css += '[data-mui-color-scheme="dark"] {\n';
    
    Object.entries(colors).forEach(([key, value]) => {
      const rgbValue = hexToRgb(value);
      css += `  --palette-${key}-main: ${value};\n`;
      css += `  --palette-${key}-mainChannel: ${rgbValue};\n`;
    });
    
    css += '}\n';
    
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedColors = localStorage.getItem(STORAGE_KEY_COLORS);
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors);
        setCurrentColors(colors);
        applyColors(colors);
      } catch (error) {
        console.error('Failed to load saved colors:', error);
      }
    }

    const savedLogo = localStorage.getItem(STORAGE_KEY_LOGO);
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }

    const savedSystemName = localStorage.getItem(STORAGE_KEY_SYSTEM_NAME);
    if (savedSystemName) {
      setSystemName(savedSystemName);
    }
  }, [applyColors]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleColorClick = (event: React.MouseEvent<HTMLElement>, colorKey: keyof ComponentColors) => {
    setActiveColorKey(colorKey);
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorChange = (color: string) => {
    if (activeColorKey) {
      setCurrentColors((prev) => ({ ...prev, [activeColorKey]: color }));
    }
  };

  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
    setActiveColorKey(null);
  };

  const handleSaveColors = () => {
    localStorage.setItem(STORAGE_KEY_COLORS, JSON.stringify(currentColors));
    applyColors(currentColors);
    window.alert('Component colors saved! The changes are now applied.');
  };

  const handleResetColors = () => {
    setCurrentColors(DEFAULT_COLORS);
    localStorage.removeItem(STORAGE_KEY_COLORS);
    applyColors(DEFAULT_COLORS);
  };

  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to compress image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Max dimensions for logo (to keep file size reasonable)
          const maxWidth = 400;
          const maxHeight = 400;
          
          let { width, height } = img;
          
          // Calculate new dimensions maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression (0.8 quality for JPEG)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          
          // Check size (localStorage limit is ~5MB, we'll limit to 2MB to be safe)
          const sizeInBytes = (compressedBase64.length * 3) / 4;
          const sizeInMB = sizeInBytes / (1024 * 1024);
          
          if (sizeInMB > 2) {
            window.alert('Image is too large. Please use a smaller image (max 2MB after compression).');
            return;
          }
          
          setLogoPreview(compressedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSystemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemName(event.target.value);
  };

  const handleSaveBranding = useCallback(() => {
    try {
      if (logoPreview) {
        localStorage.setItem(STORAGE_KEY_LOGO, logoPreview);
      }
      localStorage.setItem(STORAGE_KEY_SYSTEM_NAME, systemName);
      window.dispatchEvent(new Event('branding-updated'));
      window.alert('Branding saved successfully!');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        window.alert('Failed to save branding: Storage quota exceeded. Please use a smaller logo image.');
      } else {
        window.alert('Failed to save branding. Please try again.');
      }
      console.error('Error saving branding:', error);
    }
  }, [logoPreview, systemName]);

  const handleResetBranding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_LOGO);
    localStorage.setItem(STORAGE_KEY_SYSTEM_NAME, 'Data Management Office');
    setLogoPreview('');
    setSystemName('Data Management Office');
    window.dispatchEvent(new Event('branding-updated'));
  }, []);

  const colorOptions: Array<{ key: keyof ComponentColors; label: string; description: string }> = [
    { key: 'primary', label: 'Primary Color', description: 'Main brand color used throughout the app' },
    { key: 'secondary', label: 'Secondary Color', description: 'Accent color for highlights' },
    { key: 'success', label: 'Success Color', description: 'Used for positive actions and states' },
    { key: 'warning', label: 'Warning Color', description: 'Used for warnings and caution states' },
    { key: 'error', label: 'Error Color', description: 'Used for errors and negative states' },
    { key: 'info', label: 'Info Color', description: 'Used for informational messages' },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 3,
        }}
      >
        Settings
      </Typography>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            px: 3,
            borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
          }}
        >
          <Tab label="Profile" icon={<Iconify icon={'solar:user-bold' as any} width={20} />} iconPosition="start" />
          <Tab label="Notifications" icon={<Iconify icon={'solar:bell-bold' as any} width={20} />} iconPosition="start" />
          <Tab label="Security" icon={<Iconify icon={'solar:shield-bold' as any} width={20} />} iconPosition="start" />
          <Tab label="Theme Colors" icon={<Iconify icon={'solar:palette-bold' as any} width={20} />} iconPosition="start" />
          <Tab label="Branding" icon={<Iconify icon={'solar:star-bold' as any} width={20} />} iconPosition="start" />
        </Tabs>

        <CardContent sx={{ p: 3 }}>
          {/* Profile Tab */}
          {currentTab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Profile Settings
              </Typography>
              <Stack spacing={2.5}>
                <TextField label="Full Name" defaultValue="Admin User" fullWidth />
                <TextField label="Email" defaultValue="admin@datamanagementoffice.com" fullWidth />
                <TextField label="Phone" defaultValue="+1 234 567 8900" fullWidth />
                <TextField label="Job Title" defaultValue="System Administrator" fullWidth />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    alignSelf: 'flex-start',
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Box>
          )}

          {/* Notifications Tab */}
          {currentTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Notification Preferences
              </Typography>
              {['Email Notifications', 'Push Notifications', 'Task Reminders', 'Weekly Reports', 'Team Updates', 'System Alerts'].map(
                (label) => (
                  <Box key={label}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Iconify
                          icon={'solar:bell-bold' as any}
                          width={20}
                          sx={{ color: 'text.secondary' }}
                        />
                        <Typography variant="body2">{label}</Typography>
                      </Box>
                      <Switch defaultChecked />
                    </Box>
                    <Divider />
                  </Box>
                )
              )}
            </Box>
          )}

          {/* Security Tab */}
          {currentTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Security Settings
              </Typography>
              <Stack spacing={2.5}>
                <TextField label="Current Password" type="password" fullWidth />
                <TextField label="New Password" type="password" fullWidth />
                <TextField label="Confirm Password" type="password" fullWidth />
                <Button variant="contained" color="error" size="large" sx={{ alignSelf: 'flex-start' }}>
                  Update Password
                </Button>
              </Stack>
            </Box>
          )}

          {/* Theme Colors Tab */}
          {currentTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Component Color Customization
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Customize the color palette for UI components. Click on any color box to open the color picker.
              </Typography>

              <Stack spacing={3}>
                {colorOptions.map((option) => (
                  <Box key={option.key}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Box
                        onClick={(e) => handleColorClick(e, option.key)}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          bgcolor: currentColors[option.key],
                          border: (theme) => `3px solid ${theme.vars.palette.divider}`,
                          flexShrink: 0,
                          cursor: 'pointer',
                          boxShadow: (theme) => theme.vars.customShadows.z8,
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {option.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {option.description}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                          {currentColors[option.key]}
                        </Typography>
                      </Box>
                    </Stack>
                    {option.key !== 'info' && <Divider sx={{ mt: 2.5 }} />}
                  </Box>
                ))}
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button variant="contained" size="large" onClick={handleSaveColors} sx={{ flexGrow: 1 }}>
                  Save Colors
                </Button>
                <Button variant="outlined" size="large" onClick={handleResetColors}>
                  Reset to Default
                </Button>
              </Stack>
            </Box>
          )}

          {/* Branding Tab */}
          {currentTab === 4 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                System Branding
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Customize your system logo and name that appears in the header.
              </Typography>

              {/* System Name Input */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  System Name
                </Typography>
                <TextField
                  fullWidth
                  value={systemName}
                  onChange={handleSystemNameChange}
                  placeholder="Enter system name"
                  helperText="This name will appear in the header of the application"
                />
              </Box>

              {/* Logo Upload */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  System Logo
                </Typography>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: 2,
                    border: (theme) => `2px dashed ${theme.vars.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: (theme) => theme.vars.palette.background.neutral,
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '16px',
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No logo uploaded
                    </Typography>
                  )}
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="logo-upload-input"
                  type="file"
                  onChange={handleLogoUpload}
                />
                <label htmlFor="logo-upload-input">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<Iconify icon={'solar:upload-bold' as any} />}
                  >
                    Upload Logo
                  </Button>
                </label>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Recommended: Square image (PNG, JPG, or SVG) with transparent background.
                  <br />
                  Images will be automatically compressed and resized to 400x400px max.
                </Typography>
              </Box>

              {/* Save Buttons */}
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={handleSaveBranding} sx={{ flexGrow: 1 }}>
                  Save Branding
                </Button>
                <Button variant="outlined" size="large" onClick={handleResetBranding}>
                  Reset to Default
                </Button>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Color Picker Popover */}
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={handleCloseColorPicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>
          <HexColorPicker
            color={activeColorKey ? currentColors[activeColorKey] : '#000000'}
            onChange={handleColorChange}
          />
          <TextField
            fullWidth
            size="small"
            value={activeColorKey ? currentColors[activeColorKey] : ''}
            onChange={(e) => handleColorChange(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="#000000"
          />
        </Box>
      </Popover>
    </DashboardContent>
  );
}
