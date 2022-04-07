import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import useForceUpdate from 'use-force-update';
import { initiateInviteProcess } from '../../common/auth_utils';

const AdminInviteModal = () => {
  const [role, setRole] = useState('volunteer');
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const forceUpdate = useForceUpdate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await initiateInviteProcess(email, role);
      setConfirmationMessage(
        `A one-time use ${role} sign up link was successfully sent to ${email}.`,
      );
      setErrorMessage('');
      setEmail('');
      setRole('');
      forceUpdate();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Center w="100vw" h="100vh" bgColor="gray">
      <Box w="460px" h="352px" bgColor="rgba(253, 253, 253, 1)" pl="21px" pt="24px">
        <Heading size="md" mb="10px">
          Create New User
        </Heading>
        <FormControl>
          <FormControl>
            <Text htmlFor="role" mb="5px">
              User Type
            </Text>
            <RadioGroup
              id="role"
              onChange={e => setRole(e.target.value)}
              value={role}
              maxW="700px"
              defaultValue="volunteer"
            >
              <Stack spacing="2px" mb="10px">
                <Radio value="volunteer">Volunteer</Radio>
                <Radio value="admin">Admin</Radio>
                <Radio value="super-admin">Super Admin</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl h="60px">
            <FormLabel>User Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              w="412px"
            />
          </FormControl>
          <br />
          <HStack spacing="10px" ml="150px" pb="30px">
            <Button>Cancel</Button>
            <Button type="submit" bgColor="ochBlue" onClick={handleSubmit}>
              Create New User
            </Button>
          </HStack>
        </FormControl>
        {confirmationMessage && (
          <Alert status="success" position="absolute" left="10px" bottom="30px">
            <AlertIcon />
            <AlertTitle mr={2}>Sign up link sent!</AlertTitle>
            <AlertDescription>{confirmationMessage}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        {errorMessage && (
          <Alert status="error" position="absolute" left="10px" bottom="30px">
            <AlertIcon />
            <AlertTitle mr={2}>There was an error sending the invite!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
      </Box>
    </Center>
  );
};

export default AdminInviteModal;
