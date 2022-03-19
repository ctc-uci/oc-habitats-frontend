import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import { useNavigate } from 'react-router-dom';
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            id="firstName"
            bg="white"
            onChange={({ target }) => setFirstName(target.value)}
            mb="30px"
            size="md"
            placeholder="First Name"
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
            placeholder="Last Name"
          />
        </FormControl>
        <p>Role: </p>
        <select onChange={e => setRole(e.target.value)} value={role}>
          <option value="admin" selected>
            Admin
          </option>
          <option value="super-admin">Super Admin</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md" bg="white">
            <Input
              type={showPassword ? 'text' : 'password'}
              onChange={({ target }) => setCheckPassword(target.value)}
            />
            <InputRightElement>
              <Button size="lg" p="10px" onClick={() => setShowCheckPassword(!showCheckPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password"> Re-enter Password</FormLabel>
          <InputGroup size="md" bg="white">
            <Input
              type={showCheckPassword ? 'text' : 'password'}
              onChange={({ target }) => setCheckPassword(target.value)}
            />
            <InputRightElement>
              <Button size="lg" p="10px" onClick={() => setShowCheckPassword(!showCheckPassword)}>
                {showCheckPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        <div className="login-buttons">
          <button type="button" onClick={handleGoogleSignIn}>
            <span>Sign Up With Google</span>
          </button>
        </div>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

Register.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Register);
