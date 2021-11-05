import React from 'react';
import {Box, ChakraProvider, FormControl, FormLabel, Switch} from '@chakra-ui/react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Box>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="example-checkbox" mb="0">
                Example
              </FormLabel>
              <Switch id="example-checkbox" />
            </FormControl>
          </Box>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
