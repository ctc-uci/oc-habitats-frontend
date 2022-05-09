import { useState, React } from 'react';
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import './App.css';

// NEW AUTH IMPORTS
import InviteLandingPage from './components/Authentication/InviteLandingPage';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import ProtectedRoute from './common/ProtectedRoute';
import EmailAction from './components/Authentication/EmailAction';

import CommonTableExample from './pages/CommonTableExample';
import AdminPage from '../src/pages/AdminPage';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';

import AdminInviteModal from './components/Authentication/AdminInviteModal';
import theme from './theme/theme';

import AUTH_ROLES from './common/auth_config';

import HomePage from './HomePage';

const { SUPER_ADMIN_ROLE, ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

function App() {
  const [accMadeChanges, setAccMadeChanges] = useState(false);
  const isAdmin = true;
  const [onAdminPortal, setOnAdminPortal] = useState(true);

  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Router>
          <Box className="page-container">
            <Box className="content-wrap">
              <Navbar
                isAdmin={isAdmin}
                onAdminPortal={onAdminPortal}
                setOnAdminPortal={setOnAdminPortal}
                changesMade={accMadeChanges}
              />
              <Routes>
                {/* Add routes as needed; route names subject to change */}
                <Route path="/register/:inviteID" element={<InviteLandingPage />} />
                <Route exact path="/invite" element={<AdminInviteModal />} />
                <Route
                  exact
                  path="/"
                  element={<HomePage isAdmin={isAdmin} onAdminPortal={onAdminPortal} />}
                />
                <Route
                  exact
                  path="/account"
                  element={
                    <AccountPage changesMade={accMadeChanges} setChangesMade={setAccMadeChanges} />
                  }
                />
                <Route exact path="/create-log" element={<MonitorLogPage />} />
                <Route exact path="/sections" element={<SectionPage />} />
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
                <Route path="/email-action" element={<EmailAction redirectPath="/" />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
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
                {/* <Route path="/new-user" element={<NewUser />} /> */}
                <Route exact path="/contacts" />
                <Route exact path="/map" />
                <Route exact path="/logs" element={<AdminPage />} />
                <Route exact path="/common-table-example" element={<CommonTableExample />} />
              </Routes>
            </Box>
          </Box>
          <Routes>
            <Route path="/create-log" />
            <Route path="/*" element={<Footer />} />
          </Routes>
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
