import React from 'react';
import { useUserContext } from './UserContext';

const UserContextExample = () => {
  // Fetch the users data from UserContext
  // Note: route must be protected for UserContext to be populated
  const { userData } = useUserContext();
  return <pre>{JSON.stringify(userData, null, 2)}</pre>;
};

export default UserContextExample;
