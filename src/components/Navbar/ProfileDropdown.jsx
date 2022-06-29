import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
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
} from '@chakra-ui/react';
import NavbarLinkMobile from './NavbarLinkMobile';
import { logout, useNavigate } from '../../common/auth_utils';
import { Cookies, withCookies } from '../../common/cookie_utils';
import { useUserContext } from '../../common/UserContext/UserContext';

const ProfileDropdown = ({ isAdmin, onAdminPortal, setOnAdminPortal, cookies }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    setOnAdminPortal(!onAdminPortal);
  };
  const { userData, setUserData } = useUserContext();

  return (
    <Menu>
      <MenuButton
        color="white"
        transition="all 0.2s"
        _hover={{ bg: 'gray.400' }}
        _focus={{ boxShadow: 'outline' }}
      >
        <Avatar m={1} name={`${userData.firstName} ${userData.lastName}`} />
      </MenuButton>
      <MenuList>
        <MenuItem color="black" fontWeight="600" isDisabled>
          {userData.firstName} {userData.lastName}
        </MenuItem>
        <NavbarLinkMobile text="Account" path="/account" />
        <MenuDivider />
        {isAdmin && onAdminPortal && (
          <MenuItem color="black" fontWeight="600" href="/" onClick={handleOnClick}>
            Volunteer Portal
          </MenuItem>
        )}
        {isAdmin && !onAdminPortal && (
          <MenuItem color="black" fontWeight="600" href="/" onClick={handleOnClick}>
            Admin Portal
          </MenuItem>
        )}
        {isAdmin ? <MenuDivider /> : null}
        <MenuItem
          onClick={() => {
            setUserData({});
            logout('/login', navigate, cookies);
          }}
        >
          <HStack color="ochRed">
            <Text fontWeight="600">Sign Out</Text>
            <FiLogOut />
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

ProfileDropdown.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  onAdminPortal: PropTypes.bool.isRequired,
  setOnAdminPortal: PropTypes.func.isRequired,
};

export default withCookies(ProfileDropdown);
