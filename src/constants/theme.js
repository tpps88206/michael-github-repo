import primary from './colors/primary';
import secondary from './colors/secondary';

const theme = {
  palette: {
    primary: {
      main: primary[500],
    },
    secondary: {
      main: secondary[500],
    },
    error: {
      main: '#FF3B30',
    },
    background: {
      default: '#bdced8',
    },
    link: {
      main: '#11456C',
    },
    action: {
      hover: primary[100],
      selected: primary[50],
    },
  },
};

export default theme;
