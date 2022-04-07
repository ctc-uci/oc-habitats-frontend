import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ListedSpeciesPopup from './components/ListedSpecies/ListedSpeciesPopup';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage'; // monitor-log table
import HomePage from './pages/HomePage';
import MonitorLogPage from './pages/MonitorLogPage';
import PeoplePage from './pages/PeoplePage';
import SectionPage from './pages/SectionPage';
import Species from './pages/Species';
import Numbers from './pages/EmergencyNumbers';
import theme from './theme/theme';

import CommonTableExample from './pages/CommonTableExample';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box className="page-container">
          <Box className="content-wrap">
            <Navbar isAdmin />
            <Routes>
              {/* Add routes as needed; route names subject to change */}
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/account" element={<AccountPage />} />
              <Route exact path="/create-log" element={<MonitorLogPage />} />
              <Route exact path="/sections" element={<SectionPage />} />
              <Route
                exact
                path="/endangered"
                element={<ListedSpeciesPopup adultName="Snowy Plovers" />}
              />
              <Route exact path="/species" element={<Species />} />
              {/* Admin only routes (TO DO, make admin only) */}
              <Route exact path="/people" element={<PeoplePage />} />
              <Route exact path="/numbers" element={<Numbers />} />
              <Route exact path="/map" />
              <Route exact path="/logs" element={<AdminPage />} />
              <Route exact path="/common-table-example" element={<CommonTableExample />} />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
