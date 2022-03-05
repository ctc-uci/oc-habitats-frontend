import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import EndangeredSpecies from './pages/EndangeredSpecies';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage'; // monitor-log table
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';

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
          <Route exact path="/species" element={<Species />} />
          {/* Admin only routes (TO DO, make admin only) */}
          <Route exact path="/people" element={<PeoplePage />} />
          <Route exact path="/logs" element={<AdminPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
