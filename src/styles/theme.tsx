import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

const colors = {
  blastOffBronze: '#AD7D6C',
  minionYellow: '#ECD444'
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.minionYellow
    },
    secondary: {
      main: colors.blastOffBronze
    },
  },
});

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <StyledComponentsThemeProvider theme={theme}>
      {children}
    </StyledComponentsThemeProvider>
  </MuiThemeProvider>
);
