import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { Center } from '@chakra-ui/react';

const NavbarLink = ({ text, path = '/' }) => {
  const current = useLocation().pathname;
  return (
    <Center
      h="inherit"
      paddingX={5}
      borderTop="5px solid transparent"
      borderBottom="5px solid"
      borderBottomColor={current === path ? 'ochBlue' : 'transparent'}
      _hover={{ transitionDuration: '0.25s', color: 'ochOrange' }}
      fontWeight={500}
      whiteSpace="nowrap"
    >
      <Link to={path}>{text}</Link>
    </Center>
  );
};

NavbarLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavbarLink;
