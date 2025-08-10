// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#dbdbdb',
      300: '#b8b8b8',
      400: '#969696',
      500: '#737373',  // gris medio (color base)
      600: '#5c5c5c',
      700: '#444444',
      800: '#2e2e2e',
      900: '#1a1a1a',
    },
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    status: {
      green: '#38A169',   // verde saludable
      orange: '#DD6B20',  // naranja precaución
      red: '#E53E3E',     // rojo riesgo
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
});


export default theme;
