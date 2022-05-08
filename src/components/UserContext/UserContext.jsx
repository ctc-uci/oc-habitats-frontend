import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create context
const UserContext = createContext({
  userData: {},
});

// Custom hook to allow children to use UserContext
function useUserContext() {
  return useContext(UserContext);
}

// Allows project files to use data
const UserContextProvider = ({ children }) => {
  // Data state variable
  const [userData, setUserData] = useState({
    firstName: 'test',
  });
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useUserContext, UserContextProvider };
