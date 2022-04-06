import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { Button, MenuItem, Text } from '@chakra-ui/react';

const NavbarLinkMobile = ({ text, path = '/' }) => {
  const current = useLocation().pathname;
  return (
    <MenuItem>
      <Link to={path} align="left">
        <Button
          _hover={{ bg: 'transparent' }}
          stroke="ochLightGrey"
          width="200px"
          justifyContent="flex-start"
          bg="white"
          size="md"
        >
          <Text fontWeight="600">{text}</Text>
        </Button>
      </Link>
    </MenuItem>
  );
};

NavbarLinkMobile.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavbarLinkMobile;
