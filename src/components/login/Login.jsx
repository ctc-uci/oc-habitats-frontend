/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  FormControl,
  Image,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Flex,
  Link,
  Center,
} from '@chakra-ui/react';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from '../../utils/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../utils/auth_utils';

import OCHLogo from '../../assets/OCHlogo.png';

const Login = ({ cookies }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  /**
   * This function handles logging in with email/password (standard log in)
   * If the user signs in successfully, they are redirected to /logout, otherwise they are redirected to the login screen
   * @param {Event} e
   */
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await logInWithEmailAndPassword(email, password, '/logout', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
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
      <Center width="100%" mb="20">
        <Image src={OCHLogo} alt="OCH Logo" w="379px" h="115px" />
      </Center>
      <FormControl>
        <FormLabel htmlFor="email">OC Habitats Email</FormLabel>
        <Input id="email" bg="white" onChange={({ target }) => setEmail(target.value)} mb="30px" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
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
      <Link mt="30px" as={ReachLink} to="/forgotpassword" textDecoration="underline">
        Forgot Your Password?
      </Link>
      <Button
        bg="#2BC0E3"
        color="white"
        onClick={handleSubmit}
        mt="10px"
        w="200px"
        alignSelf="flex-end"
        px="10px"
      >
        Sign In
      </Button>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
    </Flex>
  );
};

Login.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Login);
