import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HStack, Text, Flex, Button, Avatar, Image } from '@chakra-ui/react';
import logo from '../../assets/OCHlogo.png';

const Navbar = isAdmin => {
  const navbarLink = (text, path = '/') => {
    return (
      <Link to={path}>
        <Text size="sm">{text}</Text>
      </Link>
    );
  };

  // TO DO: get profile image

  const adminNav = () => {
    return (
      <Flex as="nav" bgColor="#4E4E4E" color="white" align="center" justify="space-between">
        <Link to="/">
          <Image pl={4} maxW="30%" src={logo} alt="logo" />
        </Link>
        <HStack spacing={12} justify="flex-end" pr={4}>
          {navbarLink('Monitor Logs', '/logs')}
          {navbarLink('People', '/people')}
          {navbarLink('Species List', '/species')}
          {navbarLink('Map', '/map')}
          {navbarLink('Contacts')}
          <Link to="/account">
            <Avatar m={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </Link>
        </HStack>
      </Flex>
    );
  };

  const volunteerNav = () => {
    return (
      <Flex as="nav" bgColor="#4E4E4E" color="white" align="center" justify="space-between">
        <Link to="/">
          <Image pl={4} maxW="30%" src={logo} alt="logo" />
        </Link>
        <HStack spacing={12} justify="flex-end" pr={4}>
          {navbarLink('Monitor Logs', '/logs')}
          {navbarLink('Species List', '/species')}
          {navbarLink('Map', '/map')}
          <Link to="/create-log">
            <Button size="sm" bgColor="#2BC0E3" color="black">
              Start Session
            </Button>
          </Link>
          <Link to="/account">
            <Avatar m={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </Link>
        </HStack>
      </Flex>
    );
  };

  return isAdmin ? adminNav() : volunteerNav();
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
