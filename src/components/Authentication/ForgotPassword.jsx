import { Box, Container, Center, Text, Flex, Heading, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from '../../common/auth_utils';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const handleForgotPassword = async e => {
    try {
      e.preventDefault();
      await sendPasswordReset(email);
      setConfirmed(true);
      // setConfirmationMessage(
      //   'If the email entered is associated with an account, you should receive an email to reset your password shortly.',
      // );
      setErrorMessage('');
      setEmail('');
    } catch (err) {
      setErrorMessage(`Sorry! We couldn't find an account associated with the email ${email}.`);
    }
  };

  return (
    <Container maxW="container.xl" mt="10vw" centerContent>
      <Flex maxW="700px" align="center" direction="column" gap={5}>
        <Heading>Forgot Password</Heading>
        {!confirmed && (
          <form onSubmit={handleForgotPassword}>
            <Flex direction="column" bg="rgba(43, 192, 227, .10)" gap={3} p={12} borderRadius={6}>
              <Text>
                Enter your OC Habitats email, and we will send you instructions to reset your
                password.
              </Text>
              <Box>
                <Text>OC Habitats Email</Text>
                <Input
                  bg="white"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder="och@ochabitats.org"
                />
              </Box>
              {errorMessage && (
                <Text mt={0} color="red">
                  {errorMessage}
                </Text>
              )}
              <Button type="submit" bgColor="ochBlue" w="200px" alignSelf="flex-end">
                Continue
              </Button>
            </Flex>
          </form>
        )}
        {confirmed && (
          <Flex direction="column" bg="rgba(43, 192, 227, .10)" gap={3} p={12} borderRadius={6}>
            <Text>
              An email has sent to allow you to reset your password. Please wait a few minutes for
              the email to be delivered and follow the instructions. Check your spam and promotions
              inboxes. If you do not receive an email within an hour, please re-enter your email and
              try again.
            </Text>
            <Button bgColor="ochBlue" w="200px" alignSelf="flex-end">
              <Link to="/login">Back to Login</Link>
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default ForgotPassword;
