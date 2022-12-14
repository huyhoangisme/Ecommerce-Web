import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';

interface ThemeColors {
  textColor: string;
  background: string;
  primary: string;
  secondary: string;
  bgColor: string;
}

interface ThemeProps {
  children?: JSX.Element;
  toggleTheme?: () => void;
  theme: ThemeColors;
}

const initTheme: ThemeProps = {
  theme: {
    textColor: '#212529',
    background: '#f5f5f5',
    primary: '#3a529b;',
    bgColor: '#f45c43;',
    secondary: '#ff5c00',
  },
};

export const ThemeContext = createContext<ThemeProps>(initTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColors>(initTheme.theme);

  const toggleTheme = () => {
    // Later
  };

  const value = {
    toggleTheme,
    theme,
  };

  const customTheme = extendTheme({
    colors: {
      ...theme,
    },
    components: {
      Button: {
        variants: {
          'button-outline': {
            color: theme.background,
            width: 'full',
            py: '20px',
            fontSize: '16px',
            fontWeight: 600,
            rounded: '0',
            lineHeight: '30px',
            _hover: { bg: theme.bgColor },
            _active: {},
          },
          'button-product-list': {
            color: '#fff',
            width: 'full',
            bgColor: theme.bgColor,
            height: '30px',
            fontWeight: 400,
            fontSize: '14px',
            _hover: { bgColor: theme.primary },
          },
          'button-quanity': {
            height: '40px',
            width: '40px',
            border: '1px solid #e9edf5',
            borderRadius: 'full',
            fontSize: '16px',
            fontWeight: 400,
            _hover: { bgColor: 'inherit' },
            _active: { bgColor: 'inherit' },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={value}>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => React.useContext(ThemeContext) as unknown as ThemeProps;
