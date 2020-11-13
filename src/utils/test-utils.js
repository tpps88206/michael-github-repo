import React from 'react';
import { Provider } from 'react-redux';
// if you use Jest for testing and get the error with "use <Link> outside a <Router>"
// because just wrap your component with <BrowserRouter>
// see https://stackoverflow.com/questions/48640280/you-should-not-use-link-outside-a-router
import { BrowserRouter } from 'react-router-dom';

import { create } from 'jss';
import preset from 'jss-preset-default';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { render as rtlRender } from '@testing-library/react';

import theme from '@/constants/theme';
import configureStore from '@/redux/configureStore';
import styles from '@/styles';

library.add(fab);

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
          <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
          </Provider>
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
