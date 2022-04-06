import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  HStack,
  Flex,
  Button,
  Avatar,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import NavbarLink from './NavbarLink';
import logo from '../../assets/OCHlogo.png';

const Navbar = ({ isAdmin }) => {
  const [adminPortal, setAdminPortal] = useState(true);
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

  const togglePortal = () => {
    if (adminPortal) {
      setAdminPortal(false);
    } else {
      setAdminPortal(true);
    }
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
      <Link to="/">
        <Image pl={4} pr={0} maxW="25%" src={logo} alt="logo" _hover={{ opacity: '0.8' }} />
      </Link>
      {/* TO DO: if user is not signed in, only logo */}
      <HStack h="inherit" spacing={6} pr={4}>
        {isAdmin && adminPortal
          ? admin.map(a => <NavbarLink key={a.text} text={a.text} path={a.path} />)
          : volunteer.map(v => <NavbarLink key={v.text} text={v.text} path={v.path} />)}
        {(!isAdmin || (isAdmin && !adminPortal)) && (
          <Link to="/create-log">
            <Button size="sm" bgColor="ochBlue" color="ochBlack" _hover={{ opacity: '0.8' }}>
              Start Session
            </Button>
          </Link>
        )}
        {!isAdmin && (
          <Menu placement="right-start">
            <MenuButton>
              <Avatar m={1} name={user.firstName + user.lastName} src={user.profilePic} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={<Link to="/account" />} color="black" fontFamily="Inter">
                Account
              </MenuItem>
              <MenuItem color="red" fontFamily="Inter">
                {'Sign Out  '}
                <FaSignOutAlt marginLeft="10" />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {isAdmin && (
          <Menu placement="right-start">
            <MenuButton>
              <Avatar m={1} name={user.firstName + user.lastName} src={user.profilePic} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={<Link to="/account" />} color="black" fontFamily="Inter">
                Account
              </MenuItem>
              {adminPortal && (
                <MenuItem color="black" fontFamily="Inter" onClick={togglePortal}>
                  Volunteer Portal
                </MenuItem>
              )}
              {!adminPortal && (
                <MenuItem color="black" fontFamily="Inter" onClick={togglePortal}>
                  Admin Portal
                </MenuItem>
              )}
              <MenuItem color="red" fontFamily="Inter">
                {'Sign Out  '}
                <FaSignOutAlt marginLeft="10" />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
