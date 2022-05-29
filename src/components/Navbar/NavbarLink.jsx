import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import {
  Center,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';
import Toast from '../Toast';

const NavbarLink = ({ text, path = '/', isAdmin, changesMade }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      {isAdmin && text === 'Monitor Logs' ? (
        <>
          <Menu isOpen={isOpen}>
            <Link to={path}>
              <MenuButton onMouseEnter={onOpen}>
                <Text fontWeight={500}>{text}</Text>
              </MenuButton>
            </Link>
            <MenuList onMouseLeave={onClose} boxShadow="base" bgColor="#FDFDFD">
              <Link to={path}>
                <Text color="black" fontWeight={400} ml="17px" mr="17px" mb="17px">
                  View Submissions
                </Text>
              </Link>
              <Link to="edit-log-template">
                <Text color="black" fontWeight={400} ml="17px" mr="17px" mb="5px">
                  Edit Monitor Log Template
                </Text>
              </Link>
            </MenuList>
          </Menu>
        </>
      ) : (
        <Link to={path} onClick={handleOnClick}>
          {text}
        </Link>
      )}
    </Center>
  );
};

NavbarLink.defaultProps = {
  isAdmin: false,
};
NavbarLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  changesMade: PropTypes.bool.isRequired,
};

export default NavbarLink;
