import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HStack, Flex, Button, Image, useMediaQuery } from '@chakra-ui/react';
import NavbarLink from './NavbarLink';
import ProfileDropdown from './ProfileDropdown';
import logo from '../../assets/OCH_Logo_SVG.svg';
import NavbarMobile from './NavbarMobile';

const Navbar = ({ isAdmin }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
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

  return isMobile ? (
    <NavbarMobile isAdmin />
  ) : (
    <Flex
      as="nav"
      bgColor="ochGrey"
      color="white"
      align="center"
      justify="space-between"
      position="sticky"
      zIndex="sticky"
      top={0}
      h="60px"
    >
      <Link to="/">
        <Image
          pl={4}
          pr={0}
          maxW="50%"
          maxH="100"
          src={logo}
          alt="logo"
          _hover={{ opacity: '0.8' }}
        />
      </Link>
      {/* TO DO: if user is not signed in, only logo */}
      <HStack h="inherit" spacing={6} pr={4}>
        {isAdmin
          ? admin.map(a => <NavbarLink key={a.text} text={a.text} path={a.path} />)
          : volunteer.map(v => <NavbarLink key={v.text} text={v.text} path={v.path} />)}
        {!isAdmin && (
          <Link to="/create-log">
            <Button size="sm" bgColor="ochBlue" color="ochBlack" _hover={{ opacity: '0.8' }}>
              Start Session
            </Button>
          </Link>
        )}
        <ProfileDropdown isAdmin={isAdmin} />
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
