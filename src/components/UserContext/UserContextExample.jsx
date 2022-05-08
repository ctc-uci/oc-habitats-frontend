import React from 'react';

import { useUserContext } from './UserContext';

const UserContextExample = () => {
  const userData = useUserContext();
  return <pre>{JSON.stringify(userData, null, 2)}</pre>;
};

export default UserContextExample;
