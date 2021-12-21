import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import EndangeredSpecies from './pages/EndangeredSpecies';

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
          <Route
            exact
            path="/endangered"
            element={<EndangeredSpecies adultName="Snowy Plovers" />}
          />
          {/* Admin only routes (TO DO, make admin only) */}
          <Route exact path="/people" />
          <Route exact path="/logs" />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
