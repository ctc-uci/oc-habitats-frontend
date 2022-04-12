import { useState, React } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage'; // monitor-log table
import EndangeredSpeciesPopup from './pages/EndangeredSpeciesPopup';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';
import Navbar from './components/Navbar/Navbar';
import theme from './theme/theme';
import Footer from './components/Footer/Footer';

function App() {
  const [accMadeChanges, setAccMadeChanges] = useState(false);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box className="page-container">
          <Box className="content-wrap">
            <Navbar isAdmin changesMade={accMadeChanges} />
            <Routes>
              {/* Add routes as needed; route names subject to change */}
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/account"
                element={
                  <AccountPage changesMade={accMadeChanges} setChangesMade={setAccMadeChanges} />
                }
              />
              <Route exact path="/create-log" element={<MonitorLogPage />} />
              <Route exact path="/sections" element={<SectionPage />} />
              <Route
                exact
                path="/endangered"
                element={<EndangeredSpeciesPopup adultName="Snowy Plovers" />}
              />
              <Route exact path="/species" element={<Species />} />
              {/* Admin only routes (TO DO, make admin only) */}
              <Route exact path="/people" element={<PeoplePage />} />
              <Route exact path="/contacts" />
              <Route exact path="/map" />
              <Route exact path="/logs" element={<AdminPage />} />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
