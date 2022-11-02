import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import { logout, useNavigate } from '../../common/auth_utils';
import { Cookies, withCookies } from '../../common/cookie_utils';
import { useUserContext } from '../../common/UserContext/UserContext';

const Logout = ({ cookies }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const { setUserData } = useUserContext();
  const handleSubmit = async () => {
    try {
      await logout('/login', navigate, cookies);
      setUserData({});
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" onClick={handleSubmit}>
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Logout);
