import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const NavbarLink = ({ text, path = '/' }) => {
  return (
    <Link to={path}>
      <Text size="sm">{text}</Text>
    </Link>
  );
};

NavbarLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavbarLink;
