import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HStack, Flex, Button, Avatar, Image, useToast } from '@chakra-ui/react';
import NavbarLink from './NavbarLink';
import logo from '../../assets/OCHlogo.png';
import Toast from '../Toast';

const Navbar = ({ isAdmin, changesMade }) => {
  const toast = useToast();
  // TO DO: get profile image and name
  const user = {
    firstName: 'Dan',
    lastName: 'Abramov',
    profilePic: 'https://bit.ly/dan-abramov',
  };

  const admin = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'People', path: '/people' },
    { text: 'Species List', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Contacts', path: '/contacts' },
  ];

  const volunteer = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'Species List', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
  ];

  const handleOnClick = e => {
    if (changesMade) {
      e.preventDefault();
      return Toast(toast, 'unsaved');
    }

    return {};
  };

  return (
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
      <Link to="/" onClick={handleOnClick}>
        <Image pl={4} pr={0} maxW="25%" src={logo} alt="logo" _hover={{ opacity: '0.8' }} />
      </Link>
      {/* TO DO: if user is not signed in, only logo */}
      <HStack h="inherit" spacing={6} pr={4}>
        {isAdmin
          ? admin.map(a => <NavbarLink key={a.text} text={a.text} path={a.path} changesMade />)
          : volunteer.map(v => <NavbarLink key={v.text} text={v.text} path={v.path} changesMade />)}
        {!isAdmin && (
          <Link to="/create-log">
            <Button
              size="sm"
              bgColor="ochBlue"
              color="ochBlack"
              _hover={{ opacity: '0.8' }}
              onClick={handleOnClick}
            >
              Start Session
            </Button>
          </Link>
        )}
        <Link to="/account">
          <Avatar m={1} name={user.firstName + user.lastName} src={user.profilePic} />
        </Link>
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  changesMade: PropTypes.bool.isRequired,
};

export default Navbar;
