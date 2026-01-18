import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'orange'
});

function Wrapper() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App/>
    </MantineProvider>
  );
}

render(<Wrapper/>, document.getElementById('app')!)
