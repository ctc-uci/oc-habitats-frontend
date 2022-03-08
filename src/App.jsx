import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import './App.css';

// NEW AUTH IMPORTS
import AdminInvite from './components/AdminInvite';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './utils/ProtectedRoute';
import Register from './components/register/register';
import EmailAction from './components/EmailAction';
import NewUser from './components/NewUser';

import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';
import MonitorLogPage from './pages/MonitorLogPage';
import EndangeredSpecies from './pages/EndangeredSpecies';
import PeoplePage from './pages/PeoplePage';
import Species from './pages/Species';

import AUTH_ROLES from './utils/auth_config';

const { SUPER_ADMIN_ROLE, ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

function App() {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Router>
          <Routes>
            {/* Add routes as needed; route names subject to change */}
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/create-log" element={<MonitorLogPage />} />
            <Route path="/sections" element={<SectionPage />} />
            <Route path="/endangered" element={<EndangeredSpecies adultName="Snowy Plovers" />} />
            <Route path="/species" element={<Species />} />
            {/* Admin only routes (TO DO, make admin only) */}
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/logs" />

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
            <Route path="/new-user" element={<NewUser />} />
          </Routes>
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
