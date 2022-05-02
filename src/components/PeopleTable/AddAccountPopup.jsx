import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Text,
  FormErrorMessage,
  FormControl,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { initiateInviteProcess } from '../../common/auth_utils';

const schema = yup.object({
  role: yup.string('User type is required').required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const roles = {
  volunteer: 'Volunteer',
  admin: 'Admin',
};

const AddAccountPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // Workaround for responsive modal sizes
  const modalSizes = useBreakpointValue({ base: 'sm', md: 'md' });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  useEffect(() => {
    reset();
  }, [isOpen]);

  const onSubmit = async data => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 2));

    try {
      await initiateInviteProcess(data.email, data.role);
      toast({
        title: 'Sign Up Link Sent!',
        description: `
          A one-time use ${roles[data.role]} sign up link
          was successfully sent to ${data.email}!
        `,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Sign Up Invite Failed!',
        description: `
          The following error occurred when inviting a user: ${err}
        `,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    // Close modal
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg="ochBlue"
        color="ochBlack"
        variant="solidNoHover"
        rightIcon={<AddIcon />}
        w={{ md: 'auto', base: '100%' }}
      >
        Create New Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSizes} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors?.role}>
                <Text mb="10px">User Type</Text>
                <Controller
                  control={control}
                  name="role"
                  // eslint-disable-next-line no-unused-vars
                  render={({ field: { onChange, value, ref } }) => (
                    <RadioGroup selected={value} onChange={onChange}>
                      <Stack column="vertical">
                        {Object.keys(roles).map(key => {
                          return (
                            <Radio value={key} key={key}>
                              {roles[key]}
                            </Radio>
                          );
                        })}
                      </Stack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>{errors.userType?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.email}>
                <Stack column="vertical">
                  <br />
                  <p>User Email:</p>
                  <Input id="email" name="email" {...register('email')} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" bg="ochBlue" color="white" variant="solid">
                Create New User
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAccountPopup;
