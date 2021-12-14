import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import SectionPage from './pages/SectionPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Add routes as needed; route names subject to change */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/account" element={<AccountPage />} />
          <Route exact path="/account" />
          <Route exact path="/create-log" />
          <Route exact path="/sections" element={<SectionPage />} />
          {/* Admin only routes (TO DO, make admin only) */}
          <Route exact path="/people" />
          <Route exact path="/logs" />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
