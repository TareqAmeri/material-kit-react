import type { IconButtonProps } from '@mui/material/IconButton';

import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ThemeToggleProps = IconButtonProps;

export function ThemeToggle({ sx, ...other }: ThemeToggleProps) {
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      aria-label="Toggle theme"
      onClick={handleToggle}
      sx={[
        (theme) => ({
          p: 0,
          width: 40,
          height: 40,
          color: theme.vars.palette.text.primary,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {mode === 'light' ? (
        <Iconify icon={'solar:moon-bold-duotone' as any} width={24} />
      ) : (
        <Iconify icon={'solar:sun-bold-duotone' as any} width={24} />
      )}
    </IconButton>
  );
}
