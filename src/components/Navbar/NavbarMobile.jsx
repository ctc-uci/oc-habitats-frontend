import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { Flex, Image, Menu, MenuButton, MenuList, MenuItem, Spacer } from '@chakra-ui/react';
import NavbarLinkMobile from './NavbarLinkMobile';
import ProfileDropdown from './ProfileDropdown';

import logo from '../../assets/OCH_Logo_SVG.svg';

const NavbarMobile = ({ isAdmin, onAdminPortal, setOnAdminPortal, isLoggedIn }) => {
  const admin = [
    { text: 'Home', path: '/' },
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'People', path: '/people' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/numbers' },
  ];

  const volunteer = [
    { text: 'Home', path: '/' },
    { text: 'Monitor Logs', path: '/your-logs' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/numbers' },
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
      {!isLoggedIn && <Image pl={4} pr={0} maxH="50px" src={logo} alt="logo" />}
      {isLoggedIn && (
        <Link to="/">
          <Image pl={4} pr={0} maxH="50px" src={logo} alt="logo" _hover={{ opacity: '0.8' }} />
        </Link>
      )}
      <Spacer />
      {isLoggedIn && (
        <>
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
              {(!isAdmin || (isAdmin && !onAdminPortal)) && (
                <MenuItem>
                  <Spacer />
                  <Link to="/create-log">
                    <Flex
                      justify="center"
                      py={1}
                      bgColor="ochBlue"
                      color="ochBlack"
                      _hover={{ opacity: '0.8' }}
                      width="200px"
                      fontWeight={600}
                      borderRadius={5}
                    >
                      Start Session
                    </Flex>
                  </Link>
                  <Spacer />
                </MenuItem>
              )}
              {isAdmin && onAdminPortal
                ? admin.map(a => <NavbarLinkMobile key={a.text} text={a.text} path={a.path} />)
                : volunteer.map(v => <NavbarLinkMobile key={v.text} text={v.text} path={v.path} />)}
            </MenuList>
          </Menu>
          <ProfileDropdown
            isAdmin={isAdmin}
            onAdminPortal={onAdminPortal}
            setOnAdminPortal={setOnAdminPortal}
          />
        </>
      )}
    </Flex>
  );
};

NavbarMobile.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onAdminPortal: PropTypes.bool.isRequired,
  setOnAdminPortal: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavbarMobile;
