/* eslint-disable no-console */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Select,
  Heading,
  InputRightAddon,
  Button,
  Flex,
  VStack,
  Center,
  Text,
} from '@chakra-ui/react';
import { withCookies } from '../../common/cookie_utils';
import { registerWithEmailAndPassword } from '../../common/auth_utils';

const Register = ({ inviteEmail, inviteRole }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [role, setRole] = useState(inviteRole);
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showCheckPassword, setShowCheckPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(`handleSubmit called with ${firstName}, ${lastName}, ${email}, ${password}`);
    try {
      if (password === checkPassword) {
        if (password.length > 5) {
          await registerWithEmailAndPassword(
            email,
            password,
            firstName,
            lastName,
            role,
            navigate,
            '/',
          );
        } else {
          setErrorMessage('Password must be 6 characters or longer');
        }
      } else {
        setErrorMessage("Passwords don't match");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  /**
   * This function handles signing up with Google
   * If the user logs in and is new, they are directed to a new-user path
   * If the user logs in and isn't new, they are directed to the dashboard.
   * If the user fails to log in, they are directed back to the login screen
   */

  // const handleGoogleSignIn = async e => {
  //   try {
  //     e.preventDefault();
  //     await signInWithGoogle('/new-user', '/logout', navigate, cookies);
  //   } catch (err) {
  //     setErrorMessage(err.message);
  //   }
  // };

  return (
    <div>
      <VStack>
        <Center w="100%" mt="50px" mb="20px">
          <Heading size="lg">Complete Account Sign Up</Heading>
        </Center>
        <Flex
          w="680px"
          maxWidth="50vw"
          direction="column"
          bg="rgba(43, 192, 227, 0.1)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="6px"
          gap="24px"
          padding="40px 55px"
        >
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              bg="white"
              onChange={({ target }) => setFirstName(target.value)}
              size="md"
              value={firstName}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              bg="white"
              onChange={({ target }) => setLastName(target.value)}
              size="md"
              value={lastName}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">OC Habitats Email</FormLabel>
            <Input
              id="email"
              bg="white"
              onChange={({ target }) => setEmail(target.value)}
              size="md"
              value={inviteEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Account Type</FormLabel>
            <Select
              id="role"
              onChange={e => setRole(e.target.value)}
              value={inviteRole}
              bg="white"
              disabled
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
              <option value="volunteer">Volunteer</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={({ target }) => setPassword(target.value)}
                bg="white"
              />
              <InputRightAddon
                children={`${showPassword ? 'Hide' : 'Show'}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Re-enter Password</FormLabel>
            <InputGroup>
              <Input
                type={showCheckPassword ? 'text' : 'password'}
                onChange={({ target }) => setCheckPassword(target.value)}
                bg="white"
              />
              <InputRightAddon
                children={`${showCheckPassword ? 'Hide' : 'Show'}`}
                onClick={() => setShowCheckPassword(!showCheckPassword)}
              />
            </InputGroup>
          </FormControl>
          {errorMessage && (
            <Center width="100%">
              <Text color="red">{errorMessage}</Text>
            </Center>
          )}
          <Text>
            {/* TODO: REPLACE THESE LINKS WITH ACTUAL URLS */}
            By continuing, you agree to OC Habitats&apos;s{' '}
            <a href="https://www.nba.com">Terms & Conditions</a> and
            <a href="https://www.nba.com"> Privacy Notice</a>.
          </Text>
          <Button
            bg="#2BC0E3"
            color="white"
            onClick={handleSubmit}
            w="200px"
            alignSelf="flex-end"
            px="10px"
            isDisabled={!(firstName && lastName && email && password && checkPassword)}
            _hover={{ _disabled: { opacity: 0.38, cursor: 'not-allowed' } }}
          >
            Sign Up
          </Button>
        </Flex>
      </VStack>
    </div>
  );
};

Register.propTypes = {
  inviteEmail: string.isRequired,
  inviteRole: string.isRequired,
};

export default withCookies(Register);
