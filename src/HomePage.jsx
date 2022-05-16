import React from 'react';
import PropTypes from 'prop-types';

import AdminDashboardPage from './pages/AdminDashboardPage';
import VolunteerDashboardPage from './pages/VolunteerDashboardPage';

const HomePage = ({ isAdmin, onAdminPortal }) => {
  return (
    <>
      {isAdmin && onAdminPortal && <AdminDashboardPage />}
      {!isAdmin && <VolunteerDashboardPage />}
      {isAdmin && !onAdminPortal && <VolunteerDashboardPage />}
    </>
  );
};

HomePage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onAdminPortal: PropTypes.bool.isRequired,
};

export default HomePage;
