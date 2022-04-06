import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from '@chakra-ui/react';

const user = {
  firstName: 'Dan',
  lastName: 'Abramov',
  profilePic: 'https://bit.ly/dan-abramov',
};
const ProfileDropdown = ({ isAdmin }) => {
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
        <MenuItem>
          <Link to="/account">
            <Button
              _hover={{ bg: 'transparent' }}
              stroke="ochLightGrey"
              width="200px"
              justifyContent="flex-start"
              bg="white"
              size="md"
              color="ochBlack"
            >
              <Text fontWeight="600">Account</Text>
            </Button>
          </Link>
        </MenuItem>
        <MenuDivider />
        {isAdmin ? (
          <MenuItem>
            <Link to="/admin-portal">
              <Button
                _hover={{ bg: 'transparent' }}
                stroke="ochLightGrey"
                width="200px"
                justifyContent="flex-start"
                bg="white"
                size="md"
                color="ochBlack"
              >
                <Text fontWeight="600">Admin Portal</Text>
              </Button>
            </Link>
          </MenuItem>
        ) : null}
        {isAdmin ? <MenuDivider /> : null}

        <MenuItem>
          <Link to="/sign-out">
            <Button
              _hover={{ bg: 'transparent' }}
              stroke="ochLightGrey"
              width="200px"
              justifyContent="flex-start"
              bg="white"
              size="md"
            >
              <HStack color="ochRed">
                <Text fontWeight="600">Sign Out</Text>
                <FiLogOut />
              </HStack>
            </Button>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

ProfileDropdown.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default ProfileDropdown;
