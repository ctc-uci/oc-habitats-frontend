/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  Image,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Flex,
  Link,
  Text,
  Center,
  Container,
  Stack,
} from '@chakra-ui/react';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from '../../common/cookie_utils';
import { logInWithEmailAndPassword } from '../../common/auth_utils';
import authErrors from '../../common/auth_errors';

import OCHLogo from '../../assets/OCH_Logo_SVG.svg';

const Login = ({ cookies }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  /**
   * This function handles logging in with email/password (standard log in)
   * If the user signs in successfully, they are redirected to /, otherwise they are redirected to the login screen
   * @param {Event} e
   */
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await logInWithEmailAndPassword(email, password, navigate, cookies);
      navigate('/');
    } catch (err) {
      const error = err.code.slice(5);
      if (authErrors[error]) {
        setErrorMessage(authErrors[error]);
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <Container maxW="container.xl" centerContent>
      <Flex
        bg="rgba(43, 192, 227, .10)"
        borderRadius="6px"
        spacing="40px"
        p={{ md: 20, base: 5 }}
        w={{ md: '760px', base: '90vw' }}
        justifyContent="center"
        my="5%"
        direction="column"
      >
        <Center width="100%" mb={{ sm: 10, lg: 20 }}>
          <Image src={OCHLogo} alt="OCH Logo" w="80%" />
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">OC Habitats Email</FormLabel>
            <Input
              id="email"
              bg="white"
              onChange={({ target }) => setEmail(target.value)}
              mb="30px"
              w="100%"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup w="100%" cursor="pointer">
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
          <Flex direction="column">
            <Link mt="30px" as={ReachLink} to="/forgot-password" textDecoration="underline">
              Forgot Your Password?
            </Link>
            <Button
              type="submit"
              bg="ochBlue"
              color="white"
              mt={4}
              w={{ md: '200px', base: '100%' }}
              alignSelf={{ md: 'flex-end', base: 'center' }}
              px="10px"
              isDisabled={!(email && password)}
              _hover={{ _disabled: { opacity: 0.38, cursor: 'not-allowed' } }}
            >
              Sign In
            </Button>
          </Flex>
          <br />
          {errorMessage && (
            <Text mt="2" color="red">
              {errorMessage}
            </Text>
          )}
        </form>
      </Flex>
    </Container>
  );
};

Login.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Login);
