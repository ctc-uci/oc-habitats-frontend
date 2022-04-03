/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { instanceOf, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Heading,
  InputRightAddon,
  Button,
  Flex,
  VStack,
  Center,
  Text,
} from '@chakra-ui/react';
import { Cookies, withCookies } from '../../utils/cookie_utils';
import { registerWithEmailAndPassword } from '../../utils/auth_utils';

// eslint-disable-next-line no-unused-vars
const Register = ({ cookies, inviteFirstName, inviteLastName, inviteEmail, inviteRole }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [firstName, setFirstName] = useState(inviteFirstName);
  const [lastName, setLastName] = useState(inviteLastName);
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showCheckPassword, setShowCheckPassword] = useState();
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(`handleSubmit called with ${firstName}, ${lastName}, ${email}, ${password}`);
    try {
      if (password !== checkPassword) {
        throw new Error("Passwords don't match");
      }
      await registerWithEmailAndPassword(email, password, firstName, lastName, role, navigate, '/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <VStack>
        <Center w="100%" mt="50px" mb="20px">
          <Heading size="lg">Complete Account Sign Up</Heading>
        </Center>
        <Flex
          w="60%"
          maxWidth="50vw"
          h="60%"
          bg="rgba(43, 192, 227, .10)"
          mx="auto"
          mt="10%"
          direction="column"
          p="90px 20px"
        >
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              bg="white"
              onChange={({ target }) => setFirstName(target.value)}
              mb="30px"
              size="md"
              w="700px"
              value={inviteFirstName}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              bg="white"
              onChange={({ target }) => setLastName(target.value)}
              mb="30px"
              size="md"
              w="700px"
              value={inviteLastName}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">OC Habitats Email</FormLabel>
            <Input
              id="email"
              bg="white"
              onChange={({ target }) => setEmail(target.value)}
              mb="30px"
              size="md"
              w="700px"
              value={inviteEmail}
            />
          </FormControl>
          <FormLabel htmlFor="role">Role</FormLabel>
          <select id="role" onChange={e => setRole(e.target.value)} maxW="700px" value={inviteRole}>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="volunteer">Volunteer</option>
          </select>
          <FormControl>
            <FormLabel htmlFor="password" mt="30px">
              Password
            </FormLabel>
            <InputGroup w="700px">
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={({ target }) => setPassword(target.value)}
                w="630px"
                bg="white"
              />
              <InputRightAddon
                children={`${showPassword ? 'Hide' : 'Show'}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" mt="30px">
              {' '}
              Re-enter Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showCheckPassword ? 'text' : 'password'}
                onChange={({ target }) => setCheckPassword(target.value)}
                w="630px"
                bg="white"
              />
              <InputRightAddon
                children={`${showCheckPassword ? 'Hide' : 'Show'}`}
                onClick={() => setShowCheckPassword(!showCheckPassword)}
              />
            </InputGroup>
          </FormControl>
          <br />
          {errorMessage && (
            <Center width="100%">
              <Text color="red">{errorMessage}</Text>
            </Center>
          )}
          <Button
            bg="#2BC0E3"
            color="white"
            onClick={handleSubmit}
            mt="10px"
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
  cookies: instanceOf(Cookies).isRequired,
  inviteFirstName: string.isRequired,
  inviteLastName: string.isRequired,
  inviteEmail: string.isRequired,
  inviteRole: string.isRequired,
};

export default withCookies(Register);
