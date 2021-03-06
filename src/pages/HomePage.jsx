import React from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../common/UserContext/UserContext';
import AdminDashboardPage from './AdminDashboardPage';
import VolunteerDashboardPage from './VolunteerDashboardPage';

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
