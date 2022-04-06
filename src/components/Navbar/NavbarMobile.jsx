import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
  Text,
} from '@chakra-ui/react';
import NavbarLinkMobile from './NavbarLinkMobile';

import logo from '../../assets/OCHlogo.png';

const NavbarMobile = ({ isAdmin }) => {
  // TO DO: get profile image and name
  const user = {
    firstName: 'Dan',
    lastName: 'Abramov',
    profilePic: 'https://bit.ly/dan-abramov',
  };

  const admin = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'People', path: '/people' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/emergency-numbers' },
  ];

  const volunteer = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/emergency-numbers' },
  ];

  const adminAccountDrop = [
    { text: 'Account', path: '/account' },
    { text: 'Admin Portal', path: '/adminportal' },
    { text: 'Sign Out', path: '/signout' },
  ];

  const volunteerAccountDrop = [
    { text: 'Account', path: '/account' },
    { text: 'Sign Out', path: '/signout' },
  ];
  return (
    <Flex
      as="nav"
      bgColor="ochGrey"
      align="center"
      position="sticky"
      zIndex="sticky"
      top={0}
      h="60px"
    >
      <Link to="/">
        <Image pl={4} pr={0} maxW="25%" src={logo} alt="logo" _hover={{ opacity: '0.8' }} />
      </Link>
      <Spacer />
      <Menu>
        <MenuButton
          px={4}
          py={2}
          color="white"
          transition="all 0.2s"
          _hover={{ bg: 'gray.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          <FiMenu size="32" />
        </MenuButton>
        <MenuList>
          {!isAdmin && (
            <MenuItem>
              <Spacer />
              <Link to="/create-log">
                <Button
                  size="md"
                  bgColor="ochBlue"
                  color="ochBlack"
                  _hover={{ opacity: '0.8' }}
                  width="200px"
                >
                  Start Session
                </Button>
              </Link>
              <Spacer />
            </MenuItem>
          )}
          {isAdmin
            ? admin.map(a => <NavbarLinkMobile key={a.text} text={a.text} path={a.path} />)
            : volunteer.map(v => <NavbarLinkMobile key={v.text} text={v.text} path={v.path} />)}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          color="white"
          transition="all 0.2s"
          _hover={{ bg: 'gray.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          <Avatar m={1} name={user.firstName + user.lastName} src={user.profilePic} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to="/account">
              <Button
                _hover={{ bg: 'transparent' }}
                stroke="ochLightGrey"
                width="200px"
                justifyContent="flex-start"
                bg="white"
                size="md"
              >
                <Text fontWeight="600">Account</Text>
              </Button>
            </Link>
          </MenuItem>
          <MenuDivider />
          {isAdmin ? (
            <MenuItem>
              <Link to="/admin-portal">
                <Button
                  _hover={{ bg: 'transparent' }}
                  stroke="ochLightGrey"
                  width="200px"
                  justifyContent="flex-start"
                  bg="white"
                  size="md"
                >
                  <Text fontWeight="600">Admin Portal</Text>
                </Button>
              </Link>
            </MenuItem>
          ) : null}
          {isAdmin ? <MenuDivider /> : null}

          <MenuItem>
            <Link to="/sign-out">
              <Button
                _hover={{ bg: 'transparent' }}
                stroke="ochLightGrey"
                width="200px"
                justifyContent="flex-start"
                bg="white"
                size="md"
              >
                <HStack color="ochRed">
                  <Text fontWeight="600">Sign Out</Text>
                  <FiLogOut />
                </HStack>
              </Button>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

NavbarMobile.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default NavbarMobile;
