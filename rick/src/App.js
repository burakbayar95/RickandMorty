import logo from './logo.svg';
import './App.css';
import AutocompleteAsync from '../src/components/AutocompleteAsync.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
const theme = createTheme({
  palette: {
    background: {
      default: 'beige'
    }
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline /> 
        <AutocompleteAsync />
      </ThemeProvider>
    </>
  );
}

export default App;
