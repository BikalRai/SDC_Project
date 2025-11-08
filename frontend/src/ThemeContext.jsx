import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
  setMode: () => {}
});

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Apply theme class to body for CSS variables
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(() => {
    // Your CSS variables from index.css
    const cssVariables = {
      fontSans: 'var(--font-sans, "Poppins", ui-sans-serif, system-ui, sans-serif)',
      primary: 'var(--color-primary, #0090B8)',
      lightPrimary: 'var(--color-light-primary, #00B8EB)',
      secondary: 'var(--color-secondary, #FF6F61)',
      cardBg: 'var(--color-card-bg, #F0F4F8)',
      textWhite: 'var(--color-text-white, #F5F5F5)',
      textBlack: 'var(--color-text-black, #2B2B2B)',
      textMuted: 'var(--color-text-muted, #A3A3A3)',
      border: 'var(--color-border, #B3B3B3)',
      background: 'var(--color-background, #FAFBFC)',
      secondaryButton: 'var(--color-secondary-button, #EFEFEF)',
    };

    return createTheme({
      palette: {
        mode,
        primary: {
          main: cssVariables.primary,
          light: cssVariables.lightPrimary,
        },
        secondary: {
          main: cssVariables.secondary,
        },
        background: {
          default: mode === 'dark' ? '#121212' : cssVariables.background,
          paper: mode === 'dark' ? '#1e1e1e' : cssVariables.cardBg,
        },
        text: {
          primary: mode === 'dark' ? cssVariables.textWhite : cssVariables.textBlack,
          secondary: cssVariables.textMuted,
        },
        ...(mode === 'light'
          ? {
              // Light theme uses your CSS variables directly
              divider: cssVariables.border,
              action: {
                hover: cssVariables.secondaryButton,
              },
            }
          : {
              // Dark theme adaptations
              divider: '#444',
              action: {
                hover: 'rgba(255, 255, 255, 0.08)',
              },
            }),
      },
      typography: {
        fontFamily: cssVariables.fontSans,
        h1: {
          fontFamily: cssVariables.fontSans,
          fontWeight: 600,
        },
        h2: {
          fontFamily: cssVariables.fontSans,
          fontWeight: 600,
        },
        h3: {
          fontFamily: cssVariables.fontSans,
          fontWeight: 600,
        },
        button: {
          fontFamily: cssVariables.fontSans,
          fontWeight: 500,
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: cssVariables.fontSans,
              backgroundColor: mode === 'dark' ? '#121212' : cssVariables.background,
              color: mode === 'dark' ? cssVariables.textWhite : cssVariables.textBlack,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'dark' ? '#1e1e1e' : cssVariables.cardBg,
              backgroundImage: 'none', // Remove default gradient in dark mode
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
              color: mode === 'dark' ? cssVariables.textWhite : cssVariables.textBlack,
              backgroundImage: 'none',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              fontFamily: cssVariables.fontSans,
              fontWeight: 500,
              textTransform: 'none',
            },
            outlined: {
              borderColor: mode === 'dark' ? '#444' : cssVariables.border,
            },
          },
        },
      },
    });
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setMode: (newMode) => {
        setMode(newMode);
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};