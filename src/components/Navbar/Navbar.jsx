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
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import NavbarLink from './NavbarLink';
import ProfileDropdown from './ProfileDropdown';
import logo from '../../assets/OCH_Logo_SVG.svg';
import Toast from '../Toast';
import NavbarMobile from './NavbarMobile';

const Navbar = ({ isAdmin, changesMade }) => {
  const [adminPortal, setAdminPortal] = useState(true);
  const [isMobile] = useMediaQuery('(max-width: 1024px)');

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

  const togglePortal = () => {
    if (adminPortal) {
      setAdminPortal(false);
    } else {
      setAdminPortal(true);
    }
  };

  const toast = useToast();

  const handleOnClick = e => {
    if (changesMade) {
      e.preventDefault();
      return Toast(toast, 'unsaved');
    }

    return {};
  };

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
      <Link to="/" onClick={handleOnClick}>
        <Image pl={4} pr={0} maxH="50px" src={logo} alt="logo" _hover={{ opacity: '0.8' }} />
      </Link>
      {/* TO DO: if user is not signed in, only logo */}
      <HStack h="inherit" spacing={6} pr={4}>
        {isAdmin && adminPortal
          ? admin.map(a => <NavbarLink key={a.text} text={a.text} path={a.path} />)
          : volunteer.map(v => <NavbarLink key={v.text} text={v.text} path={v.path} />)}
        {(!isAdmin || (isAdmin && !adminPortal)) && (
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
        {!isAdmin && (
          <Menu placement="right-start">
            <MenuButton>
              <Avatar m={1} name={user.firstName + user.lastName} src={user.profilePic} />
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/account" color="black" fontFamily="Inter">
                Account
              </MenuItem>
              <MenuItem color="red" fontFamily="Inter">
                <Text marginRight="5px">Sign Out</Text>
                <FaSignOutAlt style={{ display: 'inline' }} />
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
              <MenuItem as="a" href="/account" color="black" fontFamily="Inter">
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
                <Text marginRight="5px">Sign Out</Text>
                <FaSignOutAlt style={{ display: 'inline' }} />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <ProfileDropdown />
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  changesMade: PropTypes.bool.isRequired,
};

export default Navbar;
