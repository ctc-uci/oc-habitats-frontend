/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
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
  Center,
} from '@chakra-ui/react';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from '../../common/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../common/auth_utils';

import OCHLogo from '../../assets/OCH_Logo_SVG.svg';

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
    <Box w="100%" px={4}>
      <Flex
        bg="rgba(43, 192, 227, .10)"
        borderRadius="6px"
        w={{ xl: '60%', lg: '70%' }}
        justifyContent="center"
        alignItems="center"
        h="60%"
        mx={{ xl: 'auto', lg: 'auto', md: 'auto' }}
        my="10%"
        direction="column"
        p={{ md: '90px 20px', sm: '45px 10px' }}
      >
        <Center width="100%" mb={{ sm: 10, lg: 20 }}>
          <Image src={OCHLogo} alt="OCH Logo" w="80%" />
        </Center>
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
          <InputGroup w="100%">
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
        <Link mt="30px" as={ReachLink} to="/forgot-password" textDecoration="underline">
          Forgot Your Password?
        </Link>
        <Button
          bg="#2BC0E3"
          color="white"
          onClick={handleSubmit}
          mt="10px"
          w={{ md: '200px', sm: '80%' }}
          alignSelf={{ md: 'flex-end', sm: 'center' }}
          px="10px"
          isDisabled={!(email && password)}
          _hover={{ _disabled: { opacity: 0.38, cursor: 'not-allowed' } }}
        >
          Sign In
        </Button>
        <br />
        {errorMessage && <p>{errorMessage}</p>}
      </Flex>
    </Box>
  );
};

Login.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Login);
