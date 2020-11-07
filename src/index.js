import React from 'react';
import { render } from 'react-dom';

import { create } from 'jss';
import preset from 'jss-preset-default';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import App from '@/App';
import theme from '@/constants/theme';
import styles from '@/styles';

// A theme with custom primary and secondary color.
const muiTheme = createMuiTheme(theme);

// replace material jss plugins with jss-preset-default
const jss = create({
  plugins: [...preset().plugins],
});

// create global styles
jss.createStyleSheet(styles(muiTheme), { meta: 'global' }).attach();

const root = document.getElementById('root');

!!root &&
  render(
    <StylesProvider jss={jss}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StylesProvider>,
    root,
  );
