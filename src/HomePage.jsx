import React from 'react';
import PropTypes from 'prop-types';

import AdminDashboardPage from './pages/AdminDashboardPage';
import VolunteerDashboardPage from './pages/VolunteerDashboardPage';
import { useUserContext } from './common/UserContext/UserContext';

const HomePage = ({ onAdminPortal }) => {
  const userData = useUserContext();
  const isAdmin = userData.userData.role === 'admin';

  return (
    <>
      {isAdmin && onAdminPortal && <AdminDashboardPage />}
      {!isAdmin && <VolunteerDashboardPage />}
      {isAdmin && !onAdminPortal && <VolunteerDashboardPage />}
    </>
  );
};

HomePage.propTypes = {
  onAdminPortal: PropTypes.bool.isRequired,
};

export default HomePage;
