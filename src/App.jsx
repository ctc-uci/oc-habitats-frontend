import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import EndangeredSpecies from './pages/EndangeredSpecies';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import EndangeredSpecies from './pages/EndangeredSpecies';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Add routes as needed; route names subject to change */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/account" element={<AccountPage />} />
          <Route exact path="/create-log" element={<MonitorLogPage />} />
          <Route exact path="/sections" element={<SectionPage />} />
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
