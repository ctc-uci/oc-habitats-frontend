import React, { useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  FormControl,
  Image,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  Link,
} from '@chakra-ui/react';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from '../../utils/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../utils/auth_utils';

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
      maxWidth="650px"
      h="60%"
      bg="rgba(43, 192, 227, .10)"
      mx="auto"
      my="auto"
      direction="column"
      p="90px 50px"
    >
      <Image boxSize="200px" src="https://bit.ly/dan-abramov" alt="OCH Logo" />
      <FormControl>
        <FormLabel htmlFor="email">OC Habitats Email</FormLabel>
        <Input id="email" bg="white" onChange={({ target }) => setEmail(target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup size="md" bg="white">
          <Input
            type={showPassword ? 'text' : 'password'}
            onChange={({ target }) => setPassword(target.value)}
          />
          <InputRightElement>
            <Button size="lg" p="10px" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Link mt="10px" as={ReachLink} to="/forgotpassword">
        Forgot Your Password?
      </Link>
      <Button
        bg="#2BC0E3"
        color="white"
        onClick={handleSubmit}
        // w="50px"
        mt="30px"
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
