import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { Center, useToast } from '@chakra-ui/react';
import Toast from '../Toast';

const NavbarLink = ({ text, path = '/', changesMade }) => {
  const current = useLocation().pathname;
  const toast = useToast();
  const handleOnClick = e => {
    if (changesMade) {
      e.preventDefault();
      return Toast(toast, 'unsaved');
    }
    return {};
  };
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
      <Link to={path} onClick={handleOnClick}>
        {text}
      </Link>
    </Center>
  );
};

NavbarLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  changesMade: PropTypes.bool.isRequired,
};

export default NavbarLink;
