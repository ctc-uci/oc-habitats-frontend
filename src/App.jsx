/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import './App.css';

// NEW AUTH IMPORTS
import InviteLandingPage from './components/Authentication/InviteLandingPage';
import AdminInvite from './components/Authentication/AdminInvite';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import ProtectedRoute from './common/ProtectedRoute';
import EmailAction from './components/Authentication/EmailAction';

import CommonTableExample from './pages/CommonTableExample';
import AdminPage from '../src/pages/AdminPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import EndangeredSpeciesPopup from './pages/EndangeredSpeciesPopup';
import Register from './components/Authentication/Register';
// import NewUser from './components/Authentication/NewUser';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AdminInviteModal from './components/Authentication/AdminInviteModal';

import theme from './theme/theme';
import AUTH_ROLES from './common/auth_config';

const { SUPER_ADMIN_ROLE, ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Router>
          <Box className="page-container">
            <Box className="content-wrap">
              <Navbar isAdmin />
              <Routes>
                {/* Add routes as needed; route names subject to change */}
                <Route path="/invite-user/:inviteID" element={<InviteLandingPage />} />
                <Route exact path="/invite-modal" element={<AdminInviteModal />} />
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/account" element={<AccountPage />} />
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
                <Route exact path="/common-table-example" element={<CommonTableExample />} />

                {/* NEW AUTH ROUTES */}
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      Component={Logout}
                      redirectPath="/logout"
                      roles={[SUPER_ADMIN_ROLE, ADMIN_ROLE]}
                    />
                  }
                />
                <Route
                  path="/adminInvite"
                  element={
                    <ProtectedRoute
                      Component={AdminInvite}
                      redirectPath="/"
                      roles={[SUPER_ADMIN_ROLE, ADMIN_ROLE]}
                    />
                  }
                />
                <Route path="/emailAction" element={<EmailAction redirectPath="/" />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route
                  path="/logout"
                  element={
                    <ProtectedRoute
                      Component={Logout}
                      redirectPath="/"
                      roles={[SUPER_ADMIN_ROLE, ADMIN_ROLE, VOLUNTEER_ROLE]}
                    />
                  }
                />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/new-user" element={<NewUser />} /> */}
                <Route exact path="/contacts" />
                <Route exact path="/map" />
                <Route exact path="/logs" element={<AdminPage />} />
                <Route exact path="/common-table-example" element={<CommonTableExample />} />
              </Routes>
            </Box>
          </Box>
          <Footer />
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
