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
import MonitorLogEditPage from './pages/MonitorLogEditPage';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';
import NewQuestionModal from './components/NewQuestionModal';
import Numbers from './pages/EmergencyNumbers';

import AdminInviteModal from './components/Authentication/AdminInviteModal';
import theme from './theme/theme';

import { UserContextProvider } from './common/UserContext/UserContext';
import UserContextExample from './common/UserContext/UserContextExample';
import AUTH_ROLES from './common/auth_config';

import HomePage from './HomePage';

const { ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

function App() {
  const [accMadeChanges, setAccMadeChanges] = useState(false);
  const isAdmin = true;
  const [onAdminPortal, setOnAdminPortal] = useState(true);

  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <UserContextProvider>
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
                      <ProtectedRoute redirectPath="/logout" roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}>
                        <AccountPage setChangesMade={setAccMadeChanges} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/edit-log/:id"
                    element={
                      <ProtectedRoute
                        Component={() => <MonitorLogPage mode="edit" />}
                        redirectPath="/login"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/review-log/:id"
                    element={
                      <ProtectedRoute
                        Component={() => <MonitorLogPage mode="review" />}
                        redirectPath="/login"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/sections"
                    element={
                      <ProtectedRoute
                        Component={SectionPage}
                        redirectPath="/login"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route exact path="/species" element={<Species />} />
                  {/* Admin only routes (TO DO, make admin only) */}
                  <Route exact path="/people" element={<PeoplePage />} />
                  <Route
                    exact
                    path="/create-log"
                    element={
                      <ProtectedRoute
                        Component={MonitorLogPage}
                        redirectPath="/login"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route exact path="/numbers" element={<Numbers />} />
                  <Route exact path="/map" />
                  <Route exact path="/logs" element={<AdminPage />} />
                  <Route exact path="/common-table-example" element={<CommonTableExample />} />
                  <Route
                    path="/user-context-example"
                    element={
                      <ProtectedRoute
                        Component={UserContextExample}
                        redirectPath="/logout"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  {/* NEW AUTH ROUTES */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/email-action" element={<EmailAction redirectPath="/" />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/logout"
                    element={
                      <ProtectedRoute
                        Component={Logout}
                        redirectPath="/"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  {/* <Route path="/new-user" element={<NewUser />} /> */}
                  <Route exact path="/map" />
                  <Route exact path="/logs" element={<AdminPage />} />
                  <Route exact path="/common-table-example" element={<CommonTableExample />} />
                  <Route exact path="/edit-log-template" element={<MonitorLogEditPage />} />
                </Routes>
              </Box>
              <Routes>
                <Route exact path="/create-log" />
                <Route path="/*" element={<Footer />} />
              </Routes>
            </Box>
          </Router>
        </UserContextProvider>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
