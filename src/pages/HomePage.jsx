/* eslint-disable no-unused-vars */
import { React } from 'react';
// import { withCookies } from 'react-cookie';
import { Cookies, withCookies, cookieConfig } from '../utils/cookie_utils';

const HomePage = props => {
  return (
    // eslint-disable-next-line react/no-unescaped-entities
    <div>Homepage</div>
  );
};

export default withCookies(HomePage);
