import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HStack, Flex, Button, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import NavbarLink from './NavbarLink';
import ProfileDropdown from './ProfileDropdown';
import logo from '../../assets/OCH_Logo_SVG.svg';
import Toast from '../Toast';
import NavbarMobile from './NavbarMobile';

const Navbar = ({ isAdmin, changesMade }) => {
  const [isMobile] = useMediaQuery('(max-width: 1024px)');

  const admin = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'People', path: '/people' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/numbers' },
  ];

  const volunteer = [
    { text: 'Monitor Logs', path: '/logs' },
    { text: 'Species Catalog', path: '/species' },
    { text: 'Sections & Segments', path: '/sections' },
    { text: 'Emergency Numbers', path: '/emergency-numbers' },
  ];

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
        {isAdmin
          ? admin.map(a => (
              <NavbarLink key={a.text} text={a.text} path={a.path} changesMade={changesMade} />
            ))
          : volunteer.map(v => (
              <NavbarLink key={v.text} text={v.text} path={v.path} changesMade={changesMade} />
            ))}
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
        <ProfileDropdown isAdmin={isAdmin} />
      </HStack>
    </Flex>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  changesMade: PropTypes.bool.isRequired,
};

export default Navbar;
