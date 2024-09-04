'use client';
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    background: {
      default: 'var(--color-marble)',
    },
    text: {
      primary: '#1B1B1B',
    },
  },
  typography: {
    fontFamily: 'var(--font-family)',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const theme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: '#1B1B1B', // Example: Change primary color to red
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      letterSpacing: '-0.05em',
      lineHeight: 1.07,
      fontSize: '2.313rem',
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '4.375rem',
        lineHeight: 1.14,
      },
    },
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1.28,
      fontSize: '1.563rem',
      [baseTheme.breakpoints.up('md')]: {
        lineHeight: 1.06,
        fontSize: '1.875rem',
      },
    },
    h3: {
      fontWeight: 500,
      lineHeight: 1.71,
      fontSize: '1.25rem',
      [baseTheme.breakpoints.up('md')]: {
        lineHeight: 1.06,
        fontSize: '1.563rem',
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.MuiContainer-maxWidthLg': {
            maxWidth: '1324px',
            paddingLeft: '20px',
            paddingRight: '20px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // root: {
        //   backgroundColor: '#ff0000', // Example: Change button background color to red
        //   color: '#ffffff', // Example: Change button text color to white
        // },
        button: {
          backgroundColor: 'blue',
        },
      },
    },
  },
});

export default theme;
