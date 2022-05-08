import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create context
const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});

// Custom hook to allow children to use UserContext
function useUserContext() {
  return useContext(UserContext);
}

// Allows project files to use data
const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const setDataWrapper = data => {
    console.log(`Setting userData to: ${JSON.stringify(data, null, 0)}`);
    setUserData(data);
  };

  const contextValue = {
    userData,
    setUserData: setDataWrapper,
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useUserContext, UserContextProvider };
