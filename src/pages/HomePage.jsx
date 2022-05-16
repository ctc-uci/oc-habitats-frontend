import React from 'react';
import PropTypes from 'prop-types';

import AdminDashboardPage from './AdminDashboardPage';
import VolunteerDashboardPage from './VolunteerDashboardPage';

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
