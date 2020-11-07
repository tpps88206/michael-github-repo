import React from 'react';
import { Provider } from 'react-redux';

import { create } from 'jss';
import preset from 'jss-preset-default';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { render as rtlRender } from '@testing-library/react';

import theme from '@/constants/theme';
import configureStore from '@/redux/configureStore';
import styles from '@/styles';

const render = (ui, { ...renderOptions } = {}) => {
  const muiTheme = createMuiTheme(theme);
  const jss = create({
    plugins: [...preset().plugins],
  });
  const store = configureStore();

  jss.createStyleSheet(styles(muiTheme), { meta: 'global' }).attach();

  const Wrapper = ({ children }) => {
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </StylesProvider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
