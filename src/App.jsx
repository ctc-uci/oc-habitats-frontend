import { useState, React } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { UserContextProvider } from './common/UserContext/UserContext';

// NEW AUTH IMPORTS
import InviteLandingPage from './components/Authentication/InviteLandingPage';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import AdminInviteModal from './components/Authentication/AdminInviteModal';
import EmailAction from './components/Authentication/EmailAction';
import ProtectedRoute from './common/ProtectedRoute';

import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import MonitorLogEditPage from './pages/MonitorLogEditPage';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';
import Numbers from './pages/EmergencyNumbers';
import VolunteerLogs from './pages/VolunteerLogsPage';
import NotFoundPage from './pages/NotFoundPage';
import SegmentAssignments from './pages/SegmentAssignments';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import UserInformation from './components/PeopleTable/UserInformation';

import theme from './theme/theme';
import AUTH_ROLES from './common/auth_config';
import './App.css';

const { ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

const App = () => {
  const [accMadeChanges, setAccMadeChanges] = useState(false);
  const [onAdminPortal, setOnAdminPortal] = useState(true);

  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <UserContextProvider>
          <Router>
            <Box className="page-container">
              <Box className="content-wrap">
                <Navbar
                  onAdminPortal={onAdminPortal}
                  setOnAdminPortal={setOnAdminPortal}
                  changesMade={accMadeChanges}
                />
                <Routes>
                  {/* Add routes as needed; route names subject to change */}
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/register/:inviteID" element={<InviteLandingPage />} />
                  <Route exact path="/invite" element={<AdminInviteModal />} />
                  <Route
                    exact
                    path="/"
                    element={
                      <ProtectedRoute redirectPath="/login" roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}>
                        <HomePage onAdminPortal={onAdminPortal} />
                      </ProtectedRoute>
                    }
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
                      <ProtectedRoute redirectPath="/login" roles={[ADMIN_ROLE]}>
                        <MonitorLogPage mode="edit" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/review-log/:id"
                    element={
                      <ProtectedRoute redirectPath="/login" roles={[ADMIN_ROLE]}>
                        <MonitorLogPage mode="review" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/sections"
                    element={
                      <ProtectedRoute
                        Component={SectionPage}
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/species"
                    element={<ProtectedRoute Component={Species} roles={[ADMIN_ROLE]} />}
                  />
                  <Route
                    exact
                    path="/people"
                    element={<ProtectedRoute Component={PeoplePage} roles={[ADMIN_ROLE]} />}
                  />
                  <Route
                    exact
                    path="/people/segment-assignments"
                    element={<ProtectedRoute Component={SegmentAssignments} roles={[ADMIN_ROLE]} />}
                  />
                  <Route
                    exact
                    path="/people/user-info/:id"
                    element={<ProtectedRoute Component={UserInformation} roles={[ADMIN_ROLE]} />}
                  />
                  <Route
                    exact
                    path="/create-log"
                    element={
                      <ProtectedRoute roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}>
                        <MonitorLogPage key="new-create" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/create-log/:id"
                    element={
                      <ProtectedRoute roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}>
                        <MonitorLogPage key="continue-create" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/edit-log-template"
                    element={<ProtectedRoute Component={MonitorLogEditPage} roles={[ADMIN_ROLE]} />}
                  />
                  <Route
                    exact
                    path="/your-logs"
                    element={
                      <ProtectedRoute
                        Component={VolunteerLogs}
                        path="/logout"
                        roles={[ADMIN_ROLE, VOLUNTEER_ROLE]}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/numbers"
                    element={
                      <ProtectedRoute Component={Numbers} roles={[ADMIN_ROLE, VOLUNTEER_ROLE]} />
                    }
                  />
                  <Route
                    exact
                    path="/logs"
                    element={<ProtectedRoute Component={AdminPage} roles={[ADMIN_ROLE]} />}
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
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </UserContextProvider>
      </CookiesProvider>
    </ChakraProvider>
  );
};

export default App;
