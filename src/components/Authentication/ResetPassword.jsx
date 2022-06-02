import {
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { confirmNewPassword, verifyPasswordReset } from '../../common/auth_utils';

const ResetPassword = ({ code }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  useEffect(async () => {
    try {
      const verifiedEmail = await verifyPasswordReset(code);
      setEmail(verifiedEmail);
    } catch (err) {
      console.log(err);
    }
  });

  const handleResetPassword = async e => {
    e.preventDefault();
    // console.log(`handleSubmit called with ${firstName}, ${lastName}, ${email}, ${password}`);
    try {
      if (password === checkPassword) {
        if (password.length > 5) {
          await confirmNewPassword(code, password);
          setConfirmationMessage('yay');
        } else {
          console.log('to short');
          setErrorMessage('Password must be 6 characters or longer');
        }
      } else {
        console.log('no match');
        setErrorMessage("Passwords don't match");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxW="container.xl" mt="10vw" centerContent>
      <Flex maxW="700px" align="center" direction="column" gap={5}>
        <Heading>Reset Password</Heading>
        {!confirmationMessage && (
          <form onSubmit={handleResetPassword}>
            <Flex direction="column" bg="rgba(43, 192, 227, .10)" gap={3} p={12} borderRadius={6}>
              <Text>
                {' '}
                Enter a new password below to reset the password for <b>{email}</b>{' '}
              </Text>
              <Text fontWeight="500">New Password</Text>
              <Box>
                <InputGroup size="md">
                  <Input
                    bgColor="white"
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder=""
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="#718096">Password must contain at least 6 characters.</Text>
              </Box>
              <Box>
                <Text fontWeight="500">Confirm New Password</Text>
                <InputGroup size="md">
                  <Input
                    bgColor="white"
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder=""
                    onChange={({ target }) => setCheckPassword(target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errorMessage && <Text color="#E53E3E">{errorMessage}</Text>}
              </Box>
              <Spacer />
              <Flex justify="flex-end" w="100%">
                <Button
                  type="submit"
                  color="white"
                  bgColor="ochBlue"
                  w={{ md: '200px', base: '100%' }}
                  alignSelf="flex-end"
                >
                  Reset Password
                </Button>
              </Flex>
            </Flex>
          </form>
        )}
        {confirmationMessage && (
          <div>
            <p>{confirmationMessage}</p>
            <a href="/">Back to Login</a>
          </div>
        )}
      </Flex>
    </Container>
  );
};

ResetPassword.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ResetPassword;
