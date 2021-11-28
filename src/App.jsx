import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Add routes as needed; route names subject to change */}
          <Route exact path="/" />
          <Route exact path="/account" />
          <Route exact path="/create-log" />
          <Route exact path="/sections" />
          {/* Admin only routes (TO DO, make admin only) */}
          <Route exact path="/people" />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
