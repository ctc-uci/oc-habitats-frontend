/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PropTypes, instanceOf } from 'prop-types';
import { withCookies, Cookies, clearCookies } from './cookie_utils';
import { refreshToken } from './auth_utils';
import { OCHBackend } from './utils';
import { useUserContext } from './UserContext/UserContext';

const userIsAuthenticated = async (roles, cookies) => {
  try {
    const { idToken: accessToken, currentUserId } = await refreshToken(cookies);
    if (!accessToken) return false;

    const [loggedIn, currentUser] = await Promise.all([
      OCHBackend.get(`/auth/verifyToken/${accessToken}`),
      OCHBackend.get(`/users/${currentUserId}`),
    ]);

    // User role matches, and token is verified
    return {
      authenticated: roles.includes(currentUser.data?.role) && loggedIn.status === 200,
      userData: currentUser.data,
    };
  } catch (err) {
    // console.log(err);
    clearCookies(cookies);
    return false;
  }
};

/**
 * Protects a route from unauthenticated users
 * @param {Component} children The component the user is trying to access
 * @param {string} redirectPath The path to redirect the user to if they're not logged in
 * @param {Array} roles A list of roles that are allowed to access the route
 * @param {Cookies} cookies The user's current cookies
 * @returns The relevant path to redirect the user to depending on authentication state.
 */
const ProtectedRoute = ({ Component, children, redirectPath, roles, cookies }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUserData } = useUserContext();

  useEffect(async () => {
    const { authenticated, userData } = await userIsAuthenticated(roles, cookies);
    setIsAuthenticated(authenticated);
    setUserData(userData);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  if (isAuthenticated) {
    const childCount = React.Children.count(children);
    return childCount ? children : <Component />;
  }
  return <Navigate to={redirectPath} />;
};

ProtectedRoute.defaultProps = {
  Component: PropTypes.elementType,
  children: PropTypes.node,
};

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType,
  children: PropTypes.node,
  redirectPath: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(ProtectedRoute);
