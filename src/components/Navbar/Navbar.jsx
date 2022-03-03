import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HStack, Flex, Button, Avatar, Image } from '@chakra-ui/react';
import NavbarLink from './NavbarLink';
import logo from '../../assets/OCHlogo.png';

const Navbar = ({ isAdmin }) => {
  // TO DO: get profile image and name

  const admin = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'People', path: '/people' },
    { text: 'Species List', path: '/species' },
    { text: 'Sections & Segments', path: '/map' },
    { text: 'Contacts', path: '/contacts' },
  ];

  const volunteer = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'Species List', path: '/species' },
    { text: 'Sections & Segments', path: '/map' },
  ];

  return (
    <Flex
      as="nav"
      bgColor="#4E4E4E"
      color="white"
      align="center"
      justify="space-between"
      style={{ position: 'sticky', top: 0 }}
    >
      <Link to="/">
        <Image pl={4} maxW="25%" src={logo} alt="logo" />
      </Link>
      <HStack spacing={12} justify="flex-end" pr={4}>
        {isAdmin
          ? admin.map(a => <NavbarLink key={a.text} text={a.text} path={a.path} />)
          : volunteer.map(v => <NavbarLink key={v.text} text={v.text} path={v.path} />)}
        {!isAdmin && (
          <Link to="/create-log">
            <Button size="sm" bgColor="#2BC0E3" color="black">
              Start Session
            </Button>
          </Link>
        )}
        <Link to="/account">
          <Avatar m={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </Link>
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
