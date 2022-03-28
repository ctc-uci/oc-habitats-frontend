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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const schema = yup.object({
  userType: yup.string('User type is required').required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const AddAccountPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

    // TODO: send user request

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
      >
        Create New Account
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors?.userType}>
                <Text mb="10px">User Type</Text>
                <Controller
                  control={control}
                  name="userType"
                  // eslint-disable-next-line no-unused-vars
                  render={({ field: { onChange, value, ref } }) => (
                    <RadioGroup selected={value} onChange={onChange}>
                      <Stack column="vertical">
                        <Radio value="volunteer">Volunteer</Radio>
                        <Radio value="admin">Admin</Radio>
                        <Radio value="superAdmin">Super Admin</Radio>
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
              <Button type="submit" colorScheme="blue" bg="ochBlue" color="#F7FAFC" variant="solid">
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
