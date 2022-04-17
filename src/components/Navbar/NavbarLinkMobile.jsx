import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { MenuItem, Text } from '@chakra-ui/react';

const NavbarLinkMobile = ({ text, path = '/', color }) => {
  return (
    <Link to={path} align="left">
      <MenuItem>
        <Text fontWeight="600" color={color}>
          {text}
        </Text>
      </MenuItem>
    </Link>
  );
};

NavbarLinkMobile.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  color: PropTypes.string,
};

NavbarLinkMobile.defaultProps = {
  color: 'ochBlack',
};

export default NavbarLinkMobile;
