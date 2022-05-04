import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Button,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import NavbarLinkMobile from './NavbarLinkMobile';

const user = {
  firstName: 'Dan',
  lastName: 'Abramov',
  profilePic: 'https://bit.ly/dan-abramov',
};
const ProfileDropdown = ({ isAdmin, onAdminPortal, setOnAdminPortal }) => {
  // console.log(typeof setOnAdminPortal);

  const handleOnClick = bool => {
    setOnAdminPortal(bool);
  };

  return (
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
        <NavbarLinkMobile text="Account" path="/account" />
        <MenuDivider />
        {/* {isAdmin && !onAdminPortal ? <NavbarLinkMobile text="Admin Portal" path="/" /> : null}
        {isAdmin && onAdminPortal ? <NavbarLinkMobile text="Volunteer Portal" path="/" /> : null} */}
        {isAdmin && onAdminPortal && (
          <MenuItem color="black" fontFamily="Inter" href="/" onClick={handleOnClick(false)}>
            Volunteer Portal
          </MenuItem>
        )}
        {isAdmin && !onAdminPortal && (
          <MenuItem color="black" fontFamily="Inter" href="/" onClick={handleOnClick(true)}>
            Admin Portal
          </MenuItem>
        )}
        {isAdmin ? <MenuDivider /> : null}
        <Link to="/sign-out">
          <MenuItem>
            <HStack color="ochRed">
              <Text fontWeight="600">Sign Out</Text>
              <FiLogOut />
            </HStack>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

ProfileDropdown.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onAdminPortal: PropTypes.bool.isRequired,
  setOnAdminPortal: PropTypes.func.isRequired,
};

export default ProfileDropdown;
