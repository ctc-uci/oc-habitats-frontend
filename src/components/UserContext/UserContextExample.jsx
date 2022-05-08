import React, { useEffect } from 'react';
import { OCHBackend } from '../../common/utils';
import { useUserContext } from './UserContext';

const UserContextExample = () => {
  const { userData, setUserData } = useUserContext();

  // Load userData into App, get from backend
  // useEffect(async () => {
  //   try {
  //     const res = await OCHBackend.get('/users/6VZ6MzWJstb96CW1puQv86Yutiu2');
  //     console.log(res);
  //     setUserData(res.data);
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.log(err);
  //   }
  // }, []);

  return <pre>{JSON.stringify(userData, null, 2)}</pre>;
};

export default UserContextExample;
