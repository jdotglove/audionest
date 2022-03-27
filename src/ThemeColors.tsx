import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLOR } from '../lib/utils/colors';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: COLOR.primary,
      contrastText: COLOR.secondary,
    },
    secondary: {
      main: COLOR.secondary,
    },
  },
});

class ThemeColors extends React.Component {
  render () {
    return (
      <ThemeProvider theme={mainTheme}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

export default ThemeColors