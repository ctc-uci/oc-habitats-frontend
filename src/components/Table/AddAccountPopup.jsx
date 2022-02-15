import { React } from 'react';
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
} from '@chakra-ui/react';

function AddAccountPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" variant="solid">
        Open Modal
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup>
              <Stack column="vertical">
                <Radio value="inside">Volunteer</Radio>
                <Radio value="outside">Admin</Radio>
              </Stack>
            </RadioGroup>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Create New User</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddAccountPopup;
