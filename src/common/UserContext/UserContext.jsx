import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create context with default values
const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});

// Custom hook to allow children to use UserContext
function useUserContext() {
  return useContext(UserContext);
}

// Provide context to children
// Note: must be a protected route to properly read data
const UserContextProvider = ({ children }) => {
  // setUserData should only be set in ProtectedRoute.jsx
  const [userData, setUserData] = useState({});

  const contextValue = {
    userData,
    setUserData,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useUserContext, UserContextProvider };
