import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { useColorScheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function ThemeControls() {
  const { mode, setMode } = useColorScheme();

  const handleModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  const isDarkMode = mode === 'dark';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Switch
        checked={isDarkMode}
        onChange={handleModeToggle}
        size="medium"
        sx={{
          '& .MuiSwitch-switchBase': {
            color: isDarkMode ? '#ffffff' : '#919EAB',
            '&.Mui-checked': {
              color: '#ffffff',
            },
            '&.Mui-checked + .MuiSwitch-track': {
              backgroundColor: isDarkMode ? '#0ea5e9' : '#C4CDD5',
              opacity: 1,
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#E5E7EB',
            opacity: 1,
          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          },
        }}
      />
    </Box>
  );
}
