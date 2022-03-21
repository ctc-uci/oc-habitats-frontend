/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
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
  Spacer,
  VStack,
  Center,
  Text,
} from '@chakra-ui/react';
import { Cookies, withCookies } from '../../utils/cookie_utils';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../utils/auth_utils';

const Register = ({ cookies }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showCheckPassword, setShowCheckPassword] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password !== checkPassword) {
        throw new Error("Passwords don't match");
      }
      await registerWithEmailAndPassword(email, password, firstName, lastName, role, navigate, '/');
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
  const handleGoogleSignIn = async e => {
    try {
      e.preventDefault();
      await signInWithGoogle('/new-user', '/logout', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Required Fields:
  // - firstName
  // - lastName
  // - email
  // - password
  //
  // -

  return (
    // <Flex
    //   w="60%"
    //   maxWidth="50vw"
    //   h="60%"
    //   bg="rgba(43, 192, 227, .10)"
    //   mx="auto"
    //   mt="10%"
    //   direction="column"
    //   p="90px 20px"
    // >
    //   <h2>Register</h2>
    //   <FormControl>
    //     <FormLabel htmlFor="firstName">First Name</FormLabel>
    //     <Input
    //       id="text"
    //       bg="white"
    //       onChange={({ target }) => setFirstName(target.value)}
    //       mb="30px"
    //     />
    //   </FormControl>
    //   <FormControl>
    //     <FormLabel htmlFor="password">Password</FormLabel>
    //     <InputGroup size="md" bg="white">
    //       <Input type="password" onChange={({ target }) => setPassword(target.value)} />
    //       <InputRightElement>
    //         <Button size="lg" p="10px" onClick={() => setShowPassword(!showPassword)}>
    //           {showPassword ? 'Hide' : 'Show'}
    //         </Button>
    //       </InputRightElement>
    //     </InputGroup>
    //   </FormControl>
    //   <FormControl>
    //     <FormLabel htmlFor="password">Password</FormLabel>
    //     <InputGroup size="md" bg="white">
    //       <Input type="password" onChange={({ target }) => setCheckPassword(target.value)} />
    //       <InputRightElement>
    //         <Button size="lg" p="10px" onClick={() => setShowCheckPassword(!showCheckPassword)}>
    //           {showPassword ? 'Hide' : 'Show'}
    //         </Button>
    //       </InputRightElement>
    //     </InputGroup>
    //   </FormControl>
    //   <Link mt="10px" as={ReachLink} to="/forgotpassword">
    //     Forgot Your Password?
    //   </Link>
    //   <Button
    //     bg="#2BC0E3"
    //     color="white"
    //     onClick={handleSubmit}
    //     // w="50px"
    //     mt="10px"
    //     alignSelf="flex-end"
    //     px="10px"
    //   >
    //     Register
    //   </Button>
    //   <br />
    //   {errorMessage && <p>{errorMessage}</p>}
    // </Flex>
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
            />
          </FormControl>
          <FormLabel htmlFor="role">Role</FormLabel>
          <select id="role" onChange={e => setRole(e.target.value)} value={role} maxW="700px">
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="volunteer" selected>
              Volunteer
            </option>
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
          <Flex className="login-buttons" direction="row" w="300px" mx="auto" mt="50px">
            <Button onClick={handleSubmit} className="register-button" bg="blue" color="white">
              Register
            </Button>
            <Spacer />
            <Button onClick={handleGoogleSignIn} bg="white">
              Sign Up With Google
            </Button>
          </Flex>
        </Flex>
      </VStack>
    </div>
  );
};

Register.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Register);
