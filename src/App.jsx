import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" />
          <Route exact path="/account" />
          <Route exact path="/surveys" />
          {/* admin specific routes (TO DO, specify admin) */}
          <Route exact path="/sections" />
          <Route exact path="/people" />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
