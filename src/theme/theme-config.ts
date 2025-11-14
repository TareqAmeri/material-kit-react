import type { CommonColors } from '@mui/material/styles';

import type { ThemeCssVariables } from './types';
import type { PaletteColorNoChannels } from './core/palette';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'DM Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    // DARK PREMIUM THEME (Option E) - Deep blue gradient
    primary: {
      lighter: '#7899d4', // Lighter shade of our blue
      light: '#2a5298',   // Main gradient end color
      main: '#1e3c72',    // Main gradient start color (primary brand)
      dark: '#15305a',    // Darker variation
      darker: '#0f2027',  // Darkest variation (gradient bottom)
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#EFD6FF',
      light: '#C684FF',
      main: '#8E33FF',
      dark: '#5119B7',
      darker: '#27097A',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#CAFDF5',
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      darker: '#003768',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#c6f6d5', // Lighter green
      light: '#68d391',   // Light green
      main: '#10b981',    // Emerald green (matches our previous design)
      dark: '#059669',    // Dark green
      darker: '#047857',  // Darker green
      contrastText: '#ffffff',
    },
    warning: {
      lighter: '#fed7aa', // Lighter orange
      light: '#fbbf24',   // Light orange
      main: '#f59e0b',    // Amber/Orange (matches our previous design)
      dark: '#d97706',    // Dark orange
      darker: '#b45309',  // Darker orange
      contrastText: '#ffffff',
    },
    error: {
      lighter: '#fecaca', // Lighter red
      light: '#f87171',   // Light red
      main: '#ef4444',    // Red (matches our previous design)
      dark: '#dc2626',    // Dark red
      darker: '#b91c1c',  // Darker red
      contrastText: '#FFFFFF',
    },
    grey: {
      '50': '#FCFDFD',
      '100': '#F9FAFB',
      '200': '#F4F6F8',
      '300': '#DFE3E8',
      '400': '#C4CDD5',
      '500': '#919EAB',
      '600': '#637381',
      '700': '#454F5B',
      '800': '#1C252E',
      '900': '#141A21',
    },
    common: { black: '#000000', white: '#FFFFFF' },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
