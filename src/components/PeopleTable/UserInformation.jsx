import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OCHBackend } from '../../common/utils';

const UserInformation = () => {
  // Fetch user's id from URL params
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    if (!id) navigate('/people');
    try {
      const res = await OCHBackend.get(`/users/${id}`);
      console.log(res);
      setUserData(res.data);
    } catch {
      navigate('/people');
    }
  }, [id]);

  return <div>{JSON.stringify(userData, null, 2)}</div>;
};

export default UserInformation;
